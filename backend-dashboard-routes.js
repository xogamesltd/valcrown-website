// ── ADD THESE ROUTES TO routes/auth.js before module.exports ──────────────────
// These power the user dashboard

// ── UPDATE PROFILE ────────────────────────────────────────────────────────────
router.post('/update-profile', requireAuth, async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const userId = req.user.id;
    const updates = [];
    const vals = [];
    let idx = 1;

    if (fullName) { updates.push(`full_name = $${idx++}`); vals.push(fullName); }
    if (email && email.includes('@')) {
      // Check email not taken
      const { rows } = await db.query('SELECT id FROM users WHERE email = $1 AND id != $2', [email.toLowerCase(), userId]);
      if (rows.length) return res.status(409).json({ error: 'Email already in use.' });
      updates.push(`email = $${idx++}`); vals.push(email.toLowerCase());
    }

    if (!updates.length) return res.status(400).json({ error: 'Nothing to update.' });
    vals.push(userId);
    await db.query(`UPDATE users SET ${updates.join(', ')} WHERE id = $${idx}`, vals);
    res.json({ success: true });
  } catch (err) {
    console.error('[Auth] Update profile error:', err.message);
    res.status(500).json({ error: 'Update failed' });
  }
});

// ── CHANGE PASSWORD ───────────────────────────────────────────────────────────
router.post('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Both passwords required.' });
    if (newPassword.length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters.' });

    const { rows } = await db.query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
    if (!rows.length) return res.status(404).json({ error: 'User not found.' });

    const valid = await require('bcryptjs').compare(currentPassword, rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect.' });

    const hash = await require('bcryptjs').hash(newPassword, 12);
    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, req.user.id]);

    // Revoke all sessions so user re-logs in everywhere
    await db.query('UPDATE sessions SET is_revoked = TRUE WHERE user_id = $1', [req.user.id]);

    res.json({ success: true });
  } catch (err) {
    console.error('[Auth] Change password error:', err.message);
    res.status(500).json({ error: 'Password change failed' });
  }
});

// ── RESET DEVICE ──────────────────────────────────────────────────────────────
router.post('/reset-device', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Check cooldown — 30 days
    const { rows: devices } = await db.query(
      `SELECT id, last_reset FROM devices WHERE user_id = $1 AND is_active = TRUE ORDER BY last_seen DESC LIMIT 1`,
      [userId]
    );

    if (devices.length) {
      const lastReset = devices[0].last_reset;
      if (lastReset) {
        const daysSince = (Date.now() - new Date(lastReset)) / 86400000;
        if (daysSince < 30) {
          const daysLeft = Math.ceil(30 - daysSince);
          return res.status(429).json({
            error: `Device reset is on cooldown. ${daysLeft} days remaining.`,
            daysLeft
          });
        }
      }
    }

    // Deactivate all devices for this user
    await db.query(
      'UPDATE devices SET is_active = FALSE, last_reset = NOW() WHERE user_id = $1',
      [userId]
    );

    res.json({ success: true, message: 'Device reset. Your next login will activate a new device.' });
  } catch (err) {
    console.error('[Auth] Reset device error:', err.message);
    res.status(500).json({ error: 'Reset failed' });
  }
});

// ── GET DEVICE INFO ───────────────────────────────────────────────────────────
router.get('/device', requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT device_vid, device_name, os_version, app_version, last_seen, last_reset
       FROM devices WHERE user_id = $1 AND is_active = TRUE
       ORDER BY last_seen DESC LIMIT 1`,
      [req.user.id]
    );
    if (!rows.length) return res.json(null);
    res.json({
      deviceVid:   rows[0].device_vid,
      deviceName:  rows[0].device_name,
      osVersion:   rows[0].os_version,
      appVersion:  rows[0].app_version,
      lastSeen:    rows[0].last_seen,
      lastReset:   rows[0].last_reset,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch device' });
  }
});

// ── DELETE ACCOUNT ────────────────────────────────────────────────────────────
router.delete('/delete-account', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    // Soft delete — mark as deleted
    await db.query(`UPDATE users SET is_active = FALSE, email = CONCAT('deleted_', id, '_', email) WHERE id = $1`, [userId]);
    await db.query('UPDATE sessions SET is_revoked = TRUE WHERE user_id = $1', [userId]);
    await db.query('UPDATE devices SET is_active = FALSE WHERE user_id = $1', [userId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});
