// ── ADD THESE TO routes/auth.js before module.exports ────────────────────────
// Requires: npm install nodemailer (or use Resend API)
// Also need env vars: RESEND_API_KEY (or SMTP settings)

const crypto = require('crypto');

// ── FORGOT PASSWORD ───────────────────────────────────────────────────────────
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const { rows } = await db.query(
      'SELECT id, email, full_name FROM users WHERE email = $1 AND is_active = TRUE',
      [email.toLowerCase().trim()]
    );

    // Always return success (don't reveal if email exists)
    res.json({ success: true, message: 'If account exists, reset email sent.' });

    // Only send email if user exists
    if (!rows.length) return;

    const user = rows[0];

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash  = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiresAt  = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store token in DB (need a password_resets table or store in users)
    await db.query(
      `INSERT INTO password_resets (user_id, token_hash, expires_at)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id) DO UPDATE SET token_hash = $2, expires_at = $3`,
      [user.id, tokenHash, expiresAt]
    ).catch(async () => {
      // If table doesn't exist, create it first
      await db.query(`
        CREATE TABLE IF NOT EXISTS password_resets (
          user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          token_hash VARCHAR(64) NOT NULL,
          expires_at TIMESTAMP NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
      await db.query(
        `INSERT INTO password_resets (user_id, token_hash, expires_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id) DO UPDATE SET token_hash = $2, expires_at = $3`,
        [user.id, tokenHash, expiresAt]
      );
    });

    // Build reset URL
    const resetUrl = `https://valcrown.com/auth.html?reset_token=${resetToken}`;

    // Send email via Resend API
    const emailBody = {
      from: 'ValCrown <noreply@valcrown.com>',
      to: [user.email],
      subject: 'Reset your ValCrown password',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family:-apple-system,sans-serif;background:#07070f;color:#f0f0ff;padding:40px 20px;margin:0">
          <div style="max-width:480px;margin:0 auto">
            <div style="background:linear-gradient(135deg,#7c6aff,#a89fff);width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;margin-bottom:24px;text-align:center;line-height:48px">V</div>
            <h1 style="font-size:24px;font-weight:800;margin-bottom:8px;letter-spacing:-0.5px">Reset your password</h1>
            <p style="color:#9090c0;margin-bottom:24px;line-height:1.65">
              Hi ${user.full_name || 'there'},<br><br>
              We received a request to reset your ValCrown password. Click the button below to set a new password. This link expires in <strong style="color:#f0f0ff">1 hour</strong>.
            </p>
            <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#7c6aff,#a89fff);color:#fff;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;margin-bottom:24px">
              Reset Password →
            </a>
            <p style="color:#505080;font-size:13px;line-height:1.65">
              If you didn't request this, ignore this email — your password won't change.<br><br>
              Or copy this link:<br>
              <span style="color:#a89fff;word-break:break-all">${resetUrl}</span>
            </p>
            <hr style="border:none;border-top:1px solid rgba(255,255,255,.07);margin:24px 0">
            <p style="color:#505080;font-size:12px">ValCrown · A company of XOGAMESLTD · <a href="mailto:support@valcrown.com" style="color:#a89fff">support@valcrown.com</a></p>
          </div>
        </body>
        </html>
      `
    };

    // Send via Resend
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailBody)
      });
    }

    console.log(`[Auth] Password reset requested for: ${email} | Token: ${resetToken.substring(0,8)}...`);

  } catch (err) {
    console.error('[Auth] Forgot password error:', err.message);
    // Don't expose error to client
  }
});

// ── RESET PASSWORD (with token) ───────────────────────────────────────────────
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'Token and password required' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const { rows } = await db.query(
      `SELECT user_id FROM password_resets WHERE token_hash = $1 AND expires_at > NOW()`,
      [tokenHash]
    );

    if (!rows.length) {
      return res.status(400).json({ error: 'Reset link is invalid or has expired. Please request a new one.' });
    }

    const userId = rows[0].user_id;
    const passwordHash = await require('bcryptjs').hash(password, 12);

    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, userId]);
    await db.query('DELETE FROM password_resets WHERE user_id = $1', [userId]);

    // Revoke all sessions
    await db.query('UPDATE sessions SET is_revoked = TRUE WHERE user_id = $1', [userId]);

    console.log(`[Auth] Password reset completed for user: ${userId}`);
    res.json({ success: true });

  } catch (err) {
    console.error('[Auth] Reset password error:', err.message);
    res.status(500).json({ error: 'Password reset failed' });
  }
});
