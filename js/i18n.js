// ValCrown i18n — Multi-language system
// Supports: English, Hindi, Spanish, French, German, Portuguese, Arabic, Chinese

const TRANSLATIONS = {
  en: {
    nav_home: 'Home', nav_pricing: 'Pricing', nav_download: 'Download',
    nav_signin: 'Sign In', nav_getvalcrown: 'Get ValCrown',
    hero_badge: ' Gaming Optimizer',
    hero_title: 'Your Games. Boosted. Automatically.',
    hero_sub: 'ValCrown detects when you launch a game and instantly optimizes your PC — CPU, RAM, network, everything. No clicks needed.',
    hero_download: 'Download Free Trial', hero_pricing: 'View Pricing',
    hero_meta: 'Windows 10/11 · 200+ games supported · Starts from',
    feat_tag: 'Features', feat_title: 'Everything you need to game better',
    feat1_title: 'Auto Game Detection', feat1_desc: 'Detects 200+ games automatically. GTA V, Valorant, Fortnite, CS2 and more.',
    feat2_title: 'Boost Engine', feat2_desc: 'CPU priority, power plan, background app control — instant when your game launches.',
    feat3_title: 'Network Optimizer', feat3_desc: 'DNS flush, TCP optimization, real-time ping monitor and AI diagnostics.',
    feat4_title: 'Smart Optimizer', feat4_desc: 'Analyzes your system in real-time and applies the best performance settings automatically.',
    feat5_title: 'Cloud Gaming Ready', feat5_desc: 'Optimized for GeForce NOW, Xbox Cloud, Boosteroid and all major platforms.',
    feat6_title: 'Discord Presence', feat6_desc: 'Shows friends what you\'re boosting — automatic and free.',
    stat1: 'Games Supported', stat2: 'Avg. Ping Reduction', stat3: 'Auto-Optimized', stat4: 'Setup Time',
    price_tag: 'Simple Pricing', price_title: 'One license. One device. Full access.',
    plan_monthly: 'Monthly', plan_per_month: 'per month',
    plan_yearly: 'Yearly', plan_per_year: 'per year — save 40%',
    plan_lifetime: 'Lifetime', plan_one_time: 'one-time payment',
    most_popular: 'Most Popular', get_started: 'Get Started →', see_all_plans: 'See All Plans →',
    cta_title: 'Ready to boost your gaming?', cta_sub: 'Join gamers who use ValCrown to get the most out of every session.',
    cta_download: 'Download Now', cta_account: 'Create Free Account',
    signin_title: 'Welcome back', signin_sub: 'Sign in to your ValCrown account',
    signup_title: 'Create Account', signup_sub: 'Get started with ValCrown',
    email_lbl: 'Email Address', pass_lbl: 'Password', name_lbl: 'Full Name',
    signin_btn: 'Sign In', signup_btn: 'Create Account',
    no_account: "Don't have an account?", have_account: 'Already have an account?',
    pricing_title: 'Simple, honest pricing', pricing_sub: 'No hidden fees. No subscriptions required.',
    download_title: 'Download ValCrown', download_sub: 'Free trial — no credit card needed.',
    download_btn: 'Download for Windows',
    contact_title: 'Contact Support', contact_sub: 'We reply within 24 hours.',
    contact_name: 'Your Name', contact_email: 'Email', contact_msg: 'Message', contact_btn: 'Send Message',
  },

  hi: {
    nav_home: 'होम', nav_pricing: 'मूल्य निर्धारण', nav_download: 'डाउनलोड',
    nav_signin: 'साइन इन', nav_getvalcrown: 'ValCrown पाएं',
    hero_badge: 'AI-संचालित गेमिंग ऑप्टिमाइज़र',
    hero_title: 'आपके गेम्स। बूस्टेड। अपने आप।',
    hero_sub: 'ValCrown जब आप गेम लॉन्च करते हैं तब स्वचालित रूप से आपके PC को ऑप्टिमाइज़ करता है — CPU, RAM, नेटवर्क, सब कुछ।',
    hero_download: 'मुफ्त ट्रायल डाउनलोड करें', hero_pricing: 'मूल्य देखें',
    hero_meta: 'Windows 10/11 · 200+ गेम्स सपोर्टेड · शुरुआत',
    feat_tag: 'विशेषताएं', feat_title: 'बेहतर गेमिंग के लिए सब कुछ',
    feat1_title: 'ऑटो गेम डिटेक्शन', feat1_desc: '200+ गेम्स ऑटोमैटिक डिटेक्ट करता है। GTA V, Valorant, Fortnite और अधिक।',
    feat2_title: 'बूस्ट इंजन', feat2_desc: 'CPU प्राथमिकता, पावर प्लान, बैकग्राउंड ऐप कंट्रोल — गेम लॉन्च होते ही।',
    feat3_title: 'नेटवर्क ऑप्टिमाइज़र', feat3_desc: 'DNS फ्लश, TCP ऑप्टिमाइज़ेशन, रियल-टाइम पिंग मॉनिटर।',
    feat4_title: 'Smart Optimizer', feat4_desc: 'Claude Sonnet 4.6 द्वारा संचालित — आपके सिस्टम का विश्लेषण करता है।',
    feat5_title: 'क्लाउड गेमिंग तैयार', feat5_desc: 'GeForce NOW, Xbox Cloud, Boosteroid के लिए ऑप्टिमाइज़ड।',
    feat6_title: 'Discord प्रेज़ेंस', feat6_desc: 'दोस्तों को दिखाएं आप क्या बूस्ट कर रहे हैं।',
    stat1: 'गेम्स सपोर्टेड', stat2: 'औसत पिंग कमी', stat3: 'Auto-Optimized', stat4: 'सेटअप समय',
    price_tag: 'सरल मूल्य निर्धारण', price_title: 'एक लाइसेंस। एक डिवाइस। पूर्ण एक्सेस।',
    plan_monthly: 'मासिक', plan_per_month: 'प्रति माह',
    plan_yearly: 'वार्षिक', plan_per_year: 'प्रति वर्ष — 40% बचत',
    plan_lifetime: 'लाइफटाइम', plan_one_time: 'एकमुश्त भुगतान',
    most_popular: 'सबसे लोकप्रिय', get_started: 'शुरू करें →', see_all_plans: 'सभी प्लान देखें →',
    cta_title: 'गेमिंग बूस्ट करने के लिए तैयार?', cta_sub: 'ValCrown से हर गेमिंग सेशन का अधिकतम लाभ उठाएं।',
    cta_download: 'अभी डाउनलोड करें', cta_account: 'मुफ्त खाता बनाएं',
    signin_title: 'वापस स्वागत है', signin_sub: 'अपने ValCrown खाते में साइन इन करें',
    signup_title: 'खाता बनाएं', signup_sub: 'ValCrown के साथ शुरुआत करें',
    email_lbl: 'ईमेल पता', pass_lbl: 'पासवर्ड', name_lbl: 'पूरा नाम',
    signin_btn: 'साइन इन', signup_btn: 'खाता बनाएं',
    no_account: 'खाता नहीं है?', have_account: 'पहले से खाता है?',
    pricing_title: 'सरल, ईमानदार मूल्य निर्धारण', pricing_sub: 'कोई छुपे शुल्क नहीं।',
    download_title: 'ValCrown डाउनलोड करें', download_sub: 'मुफ्त ट्रायल — कोई क्रेडिट कार्ड नहीं।',
    download_btn: 'Windows के लिए डाउनलोड करें',
    contact_title: 'सहायता से संपर्क करें', contact_sub: 'हम 24 घंटे में जवाब देते हैं।',
    contact_name: 'आपका नाम', contact_email: 'ईमेल', contact_msg: 'संदेश', contact_btn: 'संदेश भेजें',
  },

  es: {
    nav_home: 'Inicio', nav_pricing: 'Precios', nav_download: 'Descargar',
    nav_signin: 'Iniciar sesión', nav_getvalcrown: 'Obtener ValCrown',
    hero_badge: 'Optimizador de juegos con IA',
    hero_title: 'Tus juegos. Potenciados. Automáticamente.',
    hero_sub: 'ValCrown detecta cuando lanzas un juego y optimiza tu PC al instante — CPU, RAM, red, todo.',
    hero_download: 'Descargar prueba gratuita', hero_pricing: 'Ver precios',
    hero_meta: 'Windows 10/11 · +200 juegos · Desde',
    feat_tag: 'Características', feat_title: 'Todo para jugar mejor',
    feat1_title: 'Detección automática', feat1_desc: 'Detecta +200 juegos automáticamente. GTA V, Valorant, Fortnite y más.',
    feat2_title: 'Motor de impulso', feat2_desc: 'Prioridad de CPU, plan de energía, control de apps en segundo plano.',
    feat3_title: 'Optimizador de red', feat3_desc: 'Vaciado de DNS, optimización TCP, monitor de ping en tiempo real.',
    feat4_title: 'Asesor Claude AI', feat4_desc: 'Impulsado por Claude Sonnet 4.6 — analiza tu sistema y da soluciones.',
    feat5_title: 'Listo para gaming en nube', feat5_desc: 'Optimizado para GeForce NOW, Xbox Cloud y todas las plataformas.',
    feat6_title: 'Presencia en Discord', feat6_desc: 'Muestra a tus amigos qué estás potenciando — automático y gratis.',
    stat1: 'Juegos compatibles', stat2: 'Reducción media de ping', stat3: 'Auto-Optimized', stat4: 'Tiempo de configuración',
    price_tag: 'Precios simples', price_title: 'Una licencia. Un dispositivo. Acceso total.',
    plan_monthly: 'Mensual', plan_per_month: 'por mes',
    plan_yearly: 'Anual', plan_per_year: 'por año — ahorra 40%',
    plan_lifetime: 'De por vida', plan_one_time: 'pago único',
    most_popular: 'Más popular', get_started: 'Empezar →', see_all_plans: 'Ver todos los planes →',
    cta_title: '¿Listo para potenciar tu juego?', cta_sub: 'Únete a los jugadores que usan ValCrown.',
    cta_download: 'Descargar ahora', cta_account: 'Crear cuenta gratuita',
    signin_btn: 'Iniciar sesión', signup_btn: 'Crear cuenta',
    email_lbl: 'Correo electrónico', pass_lbl: 'Contraseña', name_lbl: 'Nombre completo',
    no_account: '¿No tienes cuenta?', have_account: '¿Ya tienes cuenta?',
    download_btn: 'Descargar para Windows',
    contact_btn: 'Enviar mensaje',
  },

  fr: {
    nav_home: 'Accueil', nav_pricing: 'Tarifs', nav_download: 'Télécharger',
    nav_signin: 'Connexion', nav_getvalcrown: 'Obtenir ValCrown',
    hero_badge: 'Optimiseur de jeux IA',
    hero_title: 'Vos jeux. Boostés. Automatiquement.',
    hero_sub: 'ValCrown détecte quand vous lancez un jeu et optimise votre PC instantanément.',
    hero_download: 'Télécharger l\'essai gratuit', hero_pricing: 'Voir les tarifs',
    hero_meta: 'Windows 10/11 · +200 jeux · À partir de',
    plan_monthly: 'Mensuel', plan_yearly: 'Annuel', plan_lifetime: 'À vie',
    plan_per_month: 'par mois', plan_per_year: 'par an — économisez 40%', plan_one_time: 'paiement unique',
    most_popular: 'Le plus populaire', get_started: 'Commencer →',
    cta_download: 'Télécharger maintenant', signin_btn: 'Se connecter', signup_btn: 'Créer un compte',
    download_btn: 'Télécharger pour Windows', contact_btn: 'Envoyer',
  },

  de: {
    nav_home: 'Start', nav_pricing: 'Preise', nav_download: 'Download',
    nav_signin: 'Anmelden', nav_getvalcrown: 'ValCrown holen',
    hero_badge: 'KI-gestützter Gaming-Optimierer',
    hero_title: 'Deine Spiele. Geboostet. Automatisch.',
    hero_sub: 'ValCrown erkennt, wenn du ein Spiel startest und optimiert sofort deinen PC.',
    hero_download: 'Kostenlos testen', hero_pricing: 'Preise ansehen',
    hero_meta: 'Windows 10/11 · 200+ Spiele · Ab',
    plan_monthly: 'Monatlich', plan_yearly: 'Jährlich', plan_lifetime: 'Lebenslang',
    plan_per_month: 'pro Monat', plan_per_year: 'pro Jahr — 40% sparen', plan_one_time: 'Einmalzahlung',
    most_popular: 'Beliebteste', get_started: 'Loslegen →',
    cta_download: 'Jetzt herunterladen', signin_btn: 'Anmelden', signup_btn: 'Konto erstellen',
    download_btn: 'Für Windows herunterladen', contact_btn: 'Nachricht senden',
  },

  pt: {
    nav_home: 'Início', nav_pricing: 'Preços', nav_download: 'Baixar',
    nav_signin: 'Entrar', nav_getvalcrown: 'Obter ValCrown',
    hero_badge: 'Otimizador de jogos com IA',
    hero_title: 'Seus jogos. Impulsionados. Automaticamente.',
    hero_sub: 'ValCrown detecta quando você inicia um jogo e otimiza seu PC instantaneamente.',
    hero_download: 'Baixar teste grátis', hero_pricing: 'Ver preços',
    plan_monthly: 'Mensal', plan_yearly: 'Anual', plan_lifetime: 'Vitalício',
    plan_per_month: 'por mês', plan_per_year: 'por ano — economize 40%', plan_one_time: 'pagamento único',
    most_popular: 'Mais popular', get_started: 'Começar →',
    cta_download: 'Baixar agora', signin_btn: 'Entrar', signup_btn: 'Criar conta',
    download_btn: 'Baixar para Windows', contact_btn: 'Enviar mensagem',
  },

  ar: {
    nav_home: 'الرئيسية', nav_pricing: 'الأسعار', nav_download: 'تحميل',
    nav_signin: 'تسجيل الدخول', nav_getvalcrown: 'احصل على ValCrown',
    hero_badge: 'محسّن الألعاب بالذكاء الاصطناعي',
    hero_title: 'ألعابك. مُعزَّزة. تلقائياً.',
    hero_sub: 'يكتشف ValCrown عند تشغيل لعبة ويحسّن جهاز الكمبيوتر فوراً.',
    hero_download: 'تحميل النسخة التجريبية المجانية', hero_pricing: 'عرض الأسعار',
    plan_monthly: 'شهري', plan_yearly: 'سنوي', plan_lifetime: 'مدى الحياة',
    plan_per_month: 'شهرياً', plan_per_year: 'سنوياً — وفّر 40%', plan_one_time: 'دفعة واحدة',
    most_popular: 'الأكثر شعبية', get_started: 'ابدأ الآن →',
    cta_download: 'تحميل الآن', signin_btn: 'تسجيل الدخول', signup_btn: 'إنشاء حساب',
    download_btn: 'تحميل لـ Windows', contact_btn: 'إرسال',
  },

  zh: {
    nav_home: '首页', nav_pricing: '价格', nav_download: '下载',
    nav_signin: '登录', nav_getvalcrown: '获取 ValCrown',
    hero_badge: 'AI驱动游戏优化器',
    hero_title: '您的游戏。自动加速。',
    hero_sub: 'ValCrown检测到您启动游戏时，立即优化您的电脑 — CPU、内存、网络，一切。',
    hero_download: '免费试用下载', hero_pricing: '查看价格',
    plan_monthly: '月付', plan_yearly: '年付', plan_lifetime: '终身',
    plan_per_month: '每月', plan_per_year: '每年 — 节省40%', plan_one_time: '一次性付款',
    most_popular: '最受欢迎', get_started: '立即开始 →',
    cta_download: '立即下载', signin_btn: '登录', signup_btn: '创建账户',
    download_btn: '下载 Windows 版', contact_btn: '发送消息',
  },
};

let currentLang = 'en';

function initLanguage() {
  const browserLang = (navigator.language || 'en').split('-')[0];
  const savedLang = localStorage.getItem('vc_lang');
  const lang = savedLang || (TRANSLATIONS[browserLang] ? browserLang : 'en');
  // Apply immediately for already-rendered content
  applyTranslations(lang);
  // Also apply after a short delay to catch nav elements injected by shared.js
  setTimeout(() => applyTranslations(lang), 100);
}

function setLanguage(lang, save = true) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  currentLang = lang;
  if (save) localStorage.setItem('vc_lang', lang);
  applyTranslations(lang);
}

function applyTranslations(lang) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  const t = TRANSLATIONS[lang];

  // Apply to all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Update language selector (may not exist yet)
  const sel = document.getElementById('lang-select');
  if (sel) sel.value = lang;

  // RTL for Arabic
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update html lang attribute
  document.documentElement.lang = lang;
}

function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;
}
