// ValCrown Currency System v2
// 5 plans: 3-day free trial, 14-day trial, monthly, yearly, lifetime
// Auto-detects country and shows local currency

// ── BASE PRICES (INR) ─────────────────────────────────────────────────────────
const BASE_PRICES_INR = {
  trial3:    0,      // 3-day free trial
  trial14:   99,     // 14-day paid trial
  monthly:   349,    // monthly
  yearly:    2499,   // yearly
  lifetime:  5999,   // lifetime
};

// ── EXCHANGE RATES (relative to INR) ─────────────────────────────────────────
const EXCHANGE_RATES = {
  INR: 1,       USD: 0.012,  EUR: 0.011,  GBP: 0.0095,
  AED: 0.044,   SGD: 0.016,  AUD: 0.018,  CAD: 0.016,
  BRL: 0.061,   MXN: 0.20,   JPY: 1.80,   KRW: 15.8,
  THB: 0.41,    IDR: 185,    PHP: 0.67,   VND: 297,
  NGN: 19.5,    ZAR: 0.22,   EGP: 0.59,   PKR: 3.37,   BDT: 1.32,
  SAR: 0.045,   QAR: 0.044,  KWD: 0.0037, TRY: 0.39,   CHF: 0.011,
  SEK: 0.13,    NOK: 0.13,   DKK: 0.082,  PLN: 0.048,  CZK: 0.28,
  HUF: 4.4,     RON: 0.055,  BGN: 0.021,  HRK: 0.083,  RSD: 1.29,
  UAH: 0.49,    ILS: 0.044,  MYR: 0.055,  TWD: 0.39,
};

// ── CURRENCY SYMBOLS ─────────────────────────────────────────────────────────
const CURRENCY_SYMBOLS = {
  INR: '₹',   USD: '$',    EUR: '€',    GBP: '£',    AED: 'AED ',
  SGD: 'S$',  AUD: 'A$',   CAD: 'C$',   BRL: 'R$',   MXN: 'MX$',
  JPY: '¥',   KRW: '₩',    THB: '฿',    IDR: 'Rp ',  PHP: '₱',
  VND: '₫',   NGN: '₦',    ZAR: 'R',    EGP: 'E£',   PKR: '₨',
  BDT: '৳',   SAR: 'SAR ', QAR: 'QAR ', KWD: 'KD ',  TRY: '₺',
  CHF: 'Fr',  SEK: 'kr',   NOK: 'kr',   DKK: 'kr',   PLN: 'zł',
  CZK: 'Kč',  HUF: 'Ft',   RON: 'lei',  ILS: '₪',    MYR: 'RM ',
  TWD: 'NT$',
};

// ── COUNTRY → CURRENCY ───────────────────────────────────────────────────────
const COUNTRY_CURRENCY = {
  IN: 'INR', US: 'USD', GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR',
  ES: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', PT: 'EUR', IE: 'EUR',
  FI: 'EUR', GR: 'EUR', SK: 'EUR', SI: 'EUR', EE: 'EUR', LV: 'EUR',
  LT: 'EUR', LU: 'EUR', MT: 'EUR', CY: 'EUR', AE: 'AED', SA: 'SAR',
  QA: 'QAR', KW: 'KWD', SG: 'SGD', AU: 'AUD', CA: 'CAD', BR: 'BRL',
  MX: 'MXN', JP: 'JPY', KR: 'KRW', TH: 'THB', ID: 'IDR', PH: 'PHP',
  VN: 'VND', NG: 'NGN', ZA: 'ZAR', EG: 'EGP', PK: 'PKR', BD: 'BDT',
  TR: 'TRY', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN',
  CZ: 'CZK', HU: 'HUF', RO: 'RON', IL: 'ILS', MY: 'MYR', TW: 'TWD',
  NZ: 'AUD', HK: 'USD', SG: 'SGD', RU: 'USD',
};

let currentCurrency = 'USD';
let currentCountry = 'US';
let PRICES = {};

// ── INIT ─────────────────────────────────────────────────────────────────────
async function initCurrency() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    currentCountry = data.country_code || 'US';
    currentCurrency = COUNTRY_CURRENCY[currentCountry] || 'USD';
  } catch (err) {
    currentCurrency = 'USD';
  }
  calculatePrices();
  updatePriceElements();
}

function calculatePrices() {
  const rate = EXCHANGE_RATES[currentCurrency] || EXCHANGE_RATES.USD;
  PRICES = {
    trial3:   0,
    trial14:  BASE_PRICES_INR.trial14  === 0 ? 0 : Math.ceil(BASE_PRICES_INR.trial14  * rate),
    monthly:  Math.ceil(BASE_PRICES_INR.monthly  * rate),
    yearly:   Math.ceil(BASE_PRICES_INR.yearly   * rate),
    lifetime: Math.ceil(BASE_PRICES_INR.lifetime * rate),
  };
}

function formatPrice(amount, currency) {
  const cur = currency || currentCurrency;
  const sym = CURRENCY_SYMBOLS[cur] || '$';
  if (amount === 0) return 'Free';
  if (amount >= 1000) return sym + amount.toLocaleString();
  return sym + amount;
}

function updatePriceElements() {
  const map = {
    'price-trial3':   formatPrice(PRICES.trial3),
    'price-trial14':  formatPrice(PRICES.trial14),
    'price-monthly':  formatPrice(PRICES.monthly),
    'price-yearly':   formatPrice(PRICES.yearly),
    'price-lifetime': formatPrice(PRICES.lifetime),
    'hero-price':     formatPrice(PRICES.monthly),
    'p-trial3':       formatPrice(PRICES.trial3),
    'p-trial14':      formatPrice(PRICES.trial14),
    'p-monthly':      formatPrice(PRICES.monthly),
    'p-yearly':       formatPrice(PRICES.yearly),
    'p-lifetime':     formatPrice(PRICES.lifetime),
  };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
  // Update currency label
  const cl = document.getElementById('currency-label');
  if (cl) cl.textContent = `Prices in ${currentCurrency}`;
}

function setCurrency(code) {
  currentCurrency = code;
  calculatePrices();
  updatePriceElements();
}
