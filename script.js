/* ============================================================
   FIGHTLAB – SCRIPT v2
   ============================================================ */

// ── LOGO PNG CONVERSION ─────────────────────────────────────
async function processLogo(canvasEl, targetHeight) {
  if (!canvasEl) return;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = 'Fightlab Logo.jpg?' + Date.now();
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

  const dpr = window.devicePixelRatio || 1;
  const ratio = img.width / img.height;
  const h = targetHeight;
  const w = Math.round(h * ratio);

  // CSS size
  canvasEl.style.width  = w + 'px';
  canvasEl.style.height = h + 'px';
  // Physical pixel size (sharp on retina)
  canvasEl.width  = Math.round(w * dpr);
  canvasEl.height = Math.round(h * dpr);

  const ctx = canvasEl.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.drawImage(img, 0, 0, w, h);

  const data = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
  const px = data.data;
  for (let i = 0; i < px.length; i += 4) {
    const brightness = (px[i] * 0.299 + px[i+1] * 0.587 + px[i+2] * 0.114);
    if (brightness > 180) {
      px[i+3] = 0;
    } else {
      px[i] = 255; px[i+1] = 255; px[i+2] = 255;
    }
  }
  ctx.putImageData(data, 0, 0);
}

// ── DATA ──────────────────────────────────────────────────────

const KURSE = [
  { n:'01', icon:'🥊', title:'Boxen',           for:'Alle Levels',           desc:'Technisches Boxen mit Fokus auf Grundlagen, Footwork und Kondition. Schlagtechniken, Verteidigung und Bewegungsabläufe wie ein Profi.', tag:'Anfänger willkommen' },
  { n:'02', icon:'🦵', title:'Kickboxen',        for:'Alle Levels',           desc:'Kombiniere Boxen mit Kick-Techniken für ein kraftvolles Ganzkörper-Training. Mehr Dynamik, mehr Disziplin, mehr Wirkung.', tag:'Anfänger willkommen' },
  { n:'03', icon:'🇹🇭', title:'Muay Thai',        for:'Alle Levels',           desc:'Die 8 Waffen Thailands: Fäuste, Ellbogen, Knie, Schienbeine. Die effektivste Kampfkunst der Welt — und ein brutales Workout.', tag:'Anfänger willkommen' },
  { n:'04', icon:'⚡', title:'Personal Training', for:'Individuelle Betreuung', desc:'1:1 Training direkt mit einem unserer Coaches. Maximale Ergebnisse in kürzester Zeit — zugeschnitten auf deine Ziele.', tag:'Nach Vereinbarung' },
  { n:'05', icon:'👦', title:'Kinderkurse',       for:'Kinder ab 6 Jahren',    desc:'Kampfsport für Kids: Motorik, Disziplin, Selbstvertrauen und Spaß — in einem sicheren und respektvollen Umfeld.', tag:'Altersgerecht' },
  { n:'06', icon:'💪', title:'Frauenkurse',       for:'Nur für Frauen',        desc:'Selbstverteidigung, Kondition und Stärke — in einer Atmosphäre, die ausschließlich für Frauen geschaffen ist.', tag:'Ladies Only' },
  { n:'07', icon:'🎵', title:'Zumba',             for:'Alle',                  desc:'Fitness trifft Rhythmus. Zumba kommt bald ins Fightlab — stay tuned für den Starttermin.', tag:'Coming Soon', soon: true },
];

const FINDER_OPTIONS = [
  { icon:'🔥', label:'Ich will fitter werden',                 title:'Boxen oder Kickboxen', desc:'Kampfsport ist das intensivste Workout das es gibt. Kalorien verbrennen, Ausdauer aufbauen — und dabei wirklich etwas lernen.', courses:['Boxen','Kickboxen','Muay Thai'] },
  { icon:'🥋', label:'Ich will Kampfsport lernen',             title:'Wähle deine Disziplin', desc:'Alle unsere Kurse sind für komplette Anfänger. Du startest bei Null und baust Schritt für Schritt auf.', courses:['Boxen','Kickboxen','Muay Thai'] },
  { icon:'🧠', label:'Ich will Selbstvertrauen aufbauen',      title:'Kampfsport verändert dich', desc:'Nichts baut Selbstvertrauen so schnell auf wie das Beherrschen einer Kampfkunst. Du wirst körperlich und mental stärker.', courses:['Boxen','Kickboxen','Muay Thai'] },
  { icon:'👦', label:'Ich suche Training für mein Kind',       title:'Kinderkurse ab 6 Jahren', desc:'Sicher, strukturiert, Spaß. Unsere Kinderkurse fördern Disziplin, Respekt und ein starkes Körpergefühl.', courses:['Kinderkurse'] },
  { icon:'💪', label:'Ich möchte im Frauenkurs trainieren',    title:'Frauenkurs — nur für euch', desc:'Ein geschützter Raum, um Stärke aufzubauen. Ausschließlich für Frauen. Von erfahrenen Coaches geleitet.', courses:['Frauenkurse'] },
  { icon:'⚡', label:'Ich will 1:1 Personal Training',         title:'Maximale Ergebnisse', desc:'Du arbeitest direkt mit einem Coach. 100% auf dich zugeschnitten. Perfekt wenn du schnelle Fortschritte oder spezifische Ziele hast.', courses:['Personal Training'] },
];

const SCHEDULE = [
  {
    day: 'Mo', label: 'Montag',
    slots: [
      { time:'15:15 – 16:00', name:'Kindertraining', type:'kids', level:'4–6 Jahre' },
      { time:'16:30 – 18:00', name:'Ladies Only', type:'women', level:'Nur für Frauen' },
      { time:'18:15 – 19:45', name:'Mix Adults K1/MT', type:'kick', level:'Alle Levels' },
    ],
  },
  {
    day: 'Di', label: 'Dienstag',
    slots: [
      { time:'15:15 – 16:45', name:'Kindertraining', type:'kids', level:'4–6 Jahre' },
      { time:'16:30 – 17:45', name:'Jugend', type:'kids', level:'Jugendliche' },
      { time:'18:00 – 19:30', name:'Boxen', type:'box', level:'Alle Levels' },
    ],
  },
  {
    day: 'Mi', label: 'Mittwoch',
    slots: [
      { time:'11:30 – 12:45', name:'Mix Adults K1/MT', type:'kick', level:'Alle Levels' },
      { time:'15:15 – 16:00', name:'Kindertraining', type:'kids', level:'4–6 Jahre' },
      { time:'16:30 – 17:45', name:'Jugend', type:'kids', level:'Jugendliche' },
      { time:'18:15 – 19:45', name:'Ladies Only', type:'women', level:'Nur für Frauen' },
    ],
  },
  {
    day: 'Do', label: 'Donnerstag',
    slots: [
      { time:'15:15 – 16:00', name:'Kinder Training', type:'kids', level:'4–6 Jahre' },
      { time:'16:30 – 18:00', name:'Boxen', type:'box', level:'Alle Levels' },
      { time:'18:30 – 19:45', name:'Brazilian Jiu-Jitsu', type:'special', level:'Alle Levels' },
      { time:'19:45 – 21:00', name:'Thaiboxen', type:'muay', level:'Alle Levels' },
    ],
  },
  {
    day: 'Fr', label: 'Freitag',
    slots: [
      { time:'16:30 – 17:45', name:'Jugend', type:'kids', level:'7–12 Jahre' },
    ],
  },
  {
    day: 'Sa', label: 'Samstag',
    slots: [
      { time:'15:30 – 17:00', name:'Mix Adults K1/MT', type:'kick', level:'Alle Levels' },
    ],
  },
];

const APP_FEATS = [
  { icon:'📊', text:'Persönlicher Habit Tracker' },
  { icon:'📅', text:'Kurs-Tracker & Buchungsverlauf' },
  { icon:'✅', text:'Anwesenheits-Tracking' },
  { icon:'🏆', text:'Monats-Challenges' },
  { icon:'🥇', text:'Live Leaderboard' },
  { icon:'🎯', text:'Persönliche Trainingsziele' },
  { icon:'📱', text:'App-Zugang für alle Mitglieder' },
  { icon:'🎁', text:'Belohnungssystem für Champions' },
];

const REWARDS = ['Shaker','Bandagen','Muay Thai Shorts','Handschuhe','Fightlab Merch','Supplements','Exklusives 1:1 Training'];

const MEMBER_FEATS = [
  'Eigenes Mitgliederprofil',
  'Mitgliedschaft einsehen & verwalten',
  'Rechnungen einsehen',
  'Besuchte & gebuchte Kurse',
  'Trainingsfortschritt & Statistiken',
  'Belohnungen & Challenges',
  'App-Verbindung',
];

const TRAINERS = [
  { role:'Head Coach',       name:'Platzhalter', desc:'Langjährige Kampfsporterfahrung und die Leidenschaft, anderen ihre Grenzen zu zeigen.', emoji:'🥊' },
  { role:'Boxing Coach',     name:'Platzhalter', desc:'Spezialist für Boxen, Schlagtechnik und Ringkampf-Strategie.', emoji:'🏆' },
  { role:'Muay Thai Coach',  name:'Platzhalter', desc:'Zertifizierter Muay Thai Trainer mit internationalem Wettkampf­hintergrund.', emoji:'🇹🇭' },
  { role:'Kids Coach',       name:'Platzhalter', desc:'Pädagogisch ausgebildet — macht Kids durch Kampfsport stark und sicher.', emoji:'⭐' },
  { role:'Personal Trainer', name:'Platzhalter', desc:'Individuelles High-Performance Coaching für maximale Ergebnisse.', emoji:'⚡' },
];

const VALUES = [
  { icon:'⚔️', title:'Disziplin',       desc:'Täglich besser werden.' },
  { icon:'🤝', title:'Respekt',          desc:'Im Gym und im Leben.' },
  { icon:'💪', title:'Stärke',           desc:'Körper und Geist.' },
  { icon:'🧠', title:'Selbstvertrauen',  desc:'Ab dem ersten Kurs.' },
  { icon:'🔥', title:'Transformation',   desc:'Du veränderst dich hier.' },
  { icon:'👊', title:'Zusammenhalt',     desc:'Echte Community.' },
];

const PRICING = [
  {
    name:'Basic', price:'59', period:'/ Monat', featured:false,
    feats:['2 Kurse pro Woche','Alle Kampfsportarten','App-Zugang','Stundenplan-Zugang'],
  },
  {
    name:'Unlimited', price:'89', period:'/ Monat', featured:true,
    feats:['Unbegrenzte Kurse','Alle Kampfsportarten','App mit Leaderboard','Priority Booking','Monatliche Challenge'],
  },
  {
    name:'Personal Coaching', price:'149', period:'/ Monat', featured:false,
    feats:['4 PT Sessions / Monat','Unbegrenzte Gruppenkurse','Individueller Plan','App-Zugang','Direkter Coach-Kontakt'],
  },
];

const FAQS = [
  { q:'Ist Fightlab für Anfänger geeignet?', a:'Absolut. Alle unsere Kurse starten bei den Grundlagen. Du brauchst null Vorerfahrung — nur die Bereitschaft anzufangen.' },
  { q:'Muss ich fit sein, bevor ich starte?', a:'Nein. Fitness ist das Ergebnis, nicht die Voraussetzung. Komm wie du bist — du wirst schneller fit, als du denkst.' },
  { q:'Gibt es Frauenkurse?', a:'Ja. Unsere Frauenkurse finden in einem Raum statt, der ausschließlich für Frauen reserviert ist. Dienstags um 20:00 Uhr.' },
  { q:'Gibt es Kinderkurse?', a:'Ja, für Kinder ab 6 Jahren. Die Kurse sind pädagogisch begleitet, sicher und machen Spaß. Eltern beim Probetraining herzlich willkommen.' },
  { q:'Was brauche ich für das erste Training?', a:'Sportkleidung und Motivation. Handschuhe und Bandagen stellen wir für das Probetraining kostenlos zur Verfügung.' },
  { q:'Gibt es Personal Training?', a:'Ja. 1:1 Training mit einem unserer Coaches — direkt auf deine Ziele zugeschnitten. Sprich uns einfach an.' },
  { q:'Wie funktioniert die Fightlab App?', a:'Jedes Mitglied bekommt App-Zugang. Du trackst Kurse, Gewohnheiten und Fortschritte. Das Mitglied mit den meisten Kursen im Monat gewinnt ein Geschenk.' },
  { q:'Gibt es eine Mindestlaufzeit?', a:'Unsere Konditionen erfährst du beim Probetraining. Wir wollen, dass du aus Überzeugung bleibst — nicht wegen eines Vertrags.' },
  { q:'Kann ich erstmal ein Probetraining machen?', a:'Das ist sogar der beste Einstieg. Dein erstes Training ist 100% kostenlos, ohne Verpflichtung. Einfach anmelden und vorbeikommen.' },
];

const AI_QUESTIONS = [
  'Wann ist Muay Thai?',
  'Wann findet der Frauenkurs statt?',
  'Wie buche ich ein Probetraining?',
  'Wo finde ich die App?',
  'Welche Kurse sind für Anfänger?',
  'Was muss ich mitbringen?',
];

const AI_QUICK = ['Muay Thai Zeiten?','Frauenkurs?','Probetraining buchen','Für Anfänger?','App?'];

const AI_ANSWERS = {
  'muay': 'Thaiboxen findet donnerstags von 19:45 – 21:00 Uhr statt. Alle Niveaus willkommen — komm einfach vorbei.',
  'thai': 'Thaiboxen findet donnerstags von 19:45 – 21:00 Uhr statt. Alle Niveaus willkommen — komm einfach vorbei.',
  'frau': 'Ladies Only findet montags (16:30 – 18:00) und mittwochs (18:15 – 19:45) statt — ausschließlich für Frauen, in einer geschützten Atmosphäre.',
  'probe': 'Dein Probetraining ist 100% kostenlos und unverbindlich. Klick auf "Probetraining buchen" und wir melden uns innerhalb von 24 Stunden bei dir.',
  'app': 'Die Fightlab App befindet sich in Entwicklung und kommt bald. Als Mitglied erhältst du dann Zugang zu Kurs-Tracking, Challenges und mehr.',
  'anfäng': 'Absolut. Alle Kurse starten bei den Grundlagen — du brauchst keinerlei Vorerfahrung. Dein kostenloses Probetraining ist der beste Einstieg.',
  'mitbring': 'Nur Sportkleidung. Handschuhe und Bandagen stellen wir für das erste Training kostenlos zur Verfügung.',
  'box': 'Boxen findet dienstags (18:00 – 19:30) und donnerstags (16:30 – 18:00) statt. Alle Levels willkommen.',
  'kick': 'Mix Adults K1/MT (Kickboxen & Muay Thai) ist montags 18:15 – 19:45, mittwochs 11:30 – 12:45 und samstags 15:30 – 17:00 Uhr.',
  'kind': 'Kindertraining (4–6 J.) findet montags, dienstags, mittwochs und donnerstags am Nachmittag statt. Ab 7 Jahren gibt es zusätzlich Jugend-Kurse.',
  'jugend': 'Jugendtraining findet dienstags (16:30 – 17:45), mittwochs (16:30 – 17:45) und freitags (16:30 – 17:45, für 7–12 J.) statt.',
  'bjj': 'Brazilian Jiu-Jitsu findet donnerstags von 18:30 – 19:45 Uhr statt.',
  'preis': 'Unsere Konditionen erfährst du am besten beim persönlichen Probetraining — so können wir die beste Option für dich finden.',
  'default': 'Gerne helfe ich weiter! Am schnellsten geht es per WhatsApp oder beim kostenlosen Probetraining direkt vor Ort.',
};

// ── RENDER ─────────────────────────────────────────────────

function renderKurse() {
  const g = document.getElementById('kurseGrid');
  if (!g) return;
  g.innerHTML = KURSE.map(k => `
    <div class="kurs-card${k.soon ? ' coming-soon' : ''} reveal">
      ${k.soon ? '<div class="kc-badge">Coming Soon</div>' : ''}
      <span class="kc-num">${k.n}</span>
      <span class="kc-icon">${k.icon}</span>
      <h3 class="kc-title">${k.title}</h3>
      <div class="kc-for">${k.for}</div>
      <p class="kc-desc">${k.desc}</p>
      <span class="kc-pill">${k.tag}</span>
    </div>
  `).join('');
}

function renderFinder() {
  const opts = document.getElementById('finderOptions');
  if (!opts) return;
  opts.innerHTML = FINDER_OPTIONS.map((o, i) => `
    <button class="finder-opt" onclick="selectFinder(${i})">
      <span class="fo-num">0${i+1}</span>
      <span class="fo-icon">${o.icon}</span>
      <span class="fo-label">${o.label}</span>
    </button>
  `).join('');
}

function selectFinder(idx) {
  document.querySelectorAll('.finder-opt').forEach((el, i) => el.classList.toggle('active', i === idx));
  const o = FINDER_OPTIONS[idx];
  const panel = document.getElementById('finderResult');
  panel.innerHTML = `
    <div class="frp-tag">Empfehlung für dich</div>
    <div class="frp-title">${o.title}</div>
    <p class="frp-desc">${o.desc}</p>
    <div class="frp-tags">${o.courses.map(c => `<span class="frp-tag-pill">${c}</span>`).join('')}</div>
    <a href="#cta-final" class="cta-primary" onclick="openTrialModal(); return false;">
      <span>Probetraining buchen</span>
      <svg viewBox="0 0 20 12" fill="none"><path d="M13 1l6 5-6 5M1 6h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </a>
  `;
}

function renderSchedule() {
  const c = document.getElementById('scheduleContainer');
  if (!c) return;
  c.innerHTML = SCHEDULE.map(d => `
    <div class="sched-day reveal">
      <div class="sched-day-head">
        <div class="sdh-day">${d.day}</div>
        <div class="sdh-date">${d.label}</div>
      </div>
      ${d.slots.map(s => `
        <div class="sched-slot ${s.type}">
          ${s.time ? `<div class="ss-time">${s.time}</div>` : ''}
          <div class="ss-name">${s.name}</div>
          <div class="ss-level">${s.level}</div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function renderApp() {
  const fl = document.getElementById('appFeatList');
  if (fl) fl.innerHTML = APP_FEATS.map(f => `
    <div class="app-feat"><span class="af-icon">${f.icon}</span><span class="af-text">${f.text}</span></div>
  `).join('');

  const rp = document.getElementById('arbPrizes');
  if (rp) rp.innerHTML = REWARDS.map(r => `<span class="arb-prize">${r}</span>`).join('');
}

function renderMember() {
  const mf = document.getElementById('memberFeats');
  if (!mf) return;
  mf.innerHTML = MEMBER_FEATS.map(f => `<li class="member-feat">${f}</li>`).join('');
}

function renderAI() {
  const chips = document.getElementById('aiChips');
  if (chips) chips.innerHTML = AI_QUESTIONS.map(q => `
    <button class="ai-chip" onclick="askBot('${q}')">
      <span class="ai-chip-arrow">→</span>
      <span class="ai-chip-text">${q}</span>
    </button>
  `).join('');

  const quick = document.getElementById('chatQuick');
  if (quick) quick.innerHTML = AI_QUICK.map(q => `
    <button class="cq-btn" onclick="askBot('${q}')">${q}</button>
  `).join('');
}

function renderTrainers() {
  const g = document.getElementById('trainerGrid');
  if (!g) return;
  g.innerHTML = TRAINERS.map(t => `
    <div class="trainer-card reveal">
      <div class="tc-photo">
        <div class="tc-photo-inner"><div class="tc-emoji">${t.emoji}</div></div>
        <div class="tc-overlay"></div>
      </div>
      <div class="tc-body">
        <div class="tc-role">${t.role}</div>
        <div class="tc-name">${t.name}</div>
        <p class="tc-desc">${t.desc}</p>
        <p class="tc-placeholder">Foto & Name folgen in Kürze</p>
      </div>
    </div>
  `).join('');
}

function renderValues() {
  const g = document.getElementById('valuesGrid');
  if (!g) return;
  g.innerHTML = VALUES.map(v => `
    <div class="value-item">
      <span class="vi-icon">${v.icon}</span>
      <div class="vi-title">${v.title}</div>
      <div class="vi-desc">${v.desc}</div>
    </div>
  `).join('');
}

function renderPricing() {
  const g = document.getElementById('pricingGrid');
  if (!g) return;
  g.innerHTML = PRICING.map(p => `
    <div class="pricing-card${p.featured ? ' featured' : ''} reveal">
      ${p.featured ? '<div class="pc-popular">Beliebteste Wahl</div>' : ''}
      <div class="pc-name">${p.name}</div>
      <div class="pc-price"><sup>€</sup>${p.price}</div>
      <div class="pc-period">${p.period}</div>
      <ul class="pc-feats">${p.feats.map(f => `<li class="pc-feat">${f}</li>`).join('')}</ul>
      <a href="#cta-final" class="cta-primary cta-full" onclick="openTrialModal(); return false;">
        <span>Probetraining buchen</span>
        <svg viewBox="0 0 20 12" fill="none"><path d="M13 1l6 5-6 5M1 6h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </a>
      <p class="pc-note">Preise sind Platzhalter</p>
    </div>
  `).join('');
}

function renderFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" id="fi-${i}">
      <button class="faq-q" onclick="toggleFAQ(${i})">
        <span class="faq-q-text">${f.q}</span>
        <span class="faq-ico">+</span>
      </button>
      <div class="faq-a" id="fa-${i}">
        <div class="faq-a-inner">${f.a}</div>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(i) {
  const item = document.getElementById(`fi-${i}`);
  const ans  = document.getElementById(`fa-${i}`);
  const open = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-a').style.maxHeight = null;
  });
  if (!open) {
    item.classList.add('open');
    ans.style.maxHeight = ans.scrollHeight + 'px';
  }
}

// ── CHATBOT ────────────────────────────────────────────────
function getBotAnswer(text) {
  const t = text.toLowerCase();
  for (const [k, v] of Object.entries(AI_ANSWERS)) {
    if (k !== 'default' && t.includes(k)) return v;
  }
  return AI_ANSWERS.default;
}

function addMsg(text, who) {
  const msgs = document.getElementById('chatMsgs');
  if (!msgs) return;
  const d = document.createElement('div');
  d.className = `chat-msg ${who}`;
  const now = new Date();
  const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
  d.innerHTML = `<div class="cm-bubble">${text}</div><div class="cm-time">${t}</div>`;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function askBot(text) {
  if (!text?.trim()) return;
  addMsg(text, 'user');
  const inp = document.getElementById('chatInput');
  if (inp) inp.value = '';
  setTimeout(() => addMsg(getBotAnswer(text), 'bot'), 500 + Math.random() * 300);
}

// ── MODALS ─────────────────────────────────────────────────
function openTrialModal()  { document.getElementById('trialModal').classList.add('open');  document.body.style.overflow='hidden'; }
function openLoginModal()  { document.getElementById('loginModal').classList.add('open');  document.body.style.overflow='hidden'; }
function closeModal(id)    { document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; }
function handleOverlayClick(e, id) { if (e.target === e.currentTarget) closeModal(id); }

function submitTrial(e) {
  e.preventDefault();
  closeModal('trialModal');
  setTimeout(() => alert('✅ Anfrage gesendet! Wir melden uns innerhalb von 24h. Bis zum Training! 👊'), 200);
}
function submitLogin(e) {
  e.preventDefault();
  closeModal('loginModal');
  setTimeout(() => alert('👋 Das Member Portal ist in Kürze verfügbar. Bald mehr!'), 200);
}

// ── NAV ────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const burger = document.getElementById('hamburger');
const mMenu  = document.getElementById('mobileMenu');
burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  mMenu.classList.toggle('open');
  document.body.style.overflow = mMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mm-link').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  mMenu.classList.remove('open');
  document.body.style.overflow = '';
}));

// ── SMOOTH SCROLL ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' });
    }
  });
});

// ── REVEAL ─────────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

function observeReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

// ── CHAT INPUT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const send = document.getElementById('chatSend');
  const inp  = document.getElementById('chatInput');
  send?.addEventListener('click', () => askBot(inp.value));
  inp?.addEventListener('keypress', e => { if (e.key === 'Enter') askBot(inp.value); });
});

// ── INIT ───────────────────────────────────────────────────
async function init() {
  renderKurse();
  renderFinder();
  renderSchedule();
  renderApp();
  renderMember();
  renderAI();
  renderTrainers();
  renderValues();
  renderPricing();
  renderFAQ();

  // Logo conversion
  try {
    await Promise.all([
      processLogo(document.getElementById('logoCanvas'), 48),
      processLogo(document.getElementById('footerLogoCanvas'), 64),
    ]);
  } catch (err) {
    // Fallback: hide canvas, show text
    ['logoCanvas','footerLogoCanvas'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.style.display = 'none';
        const span = document.createElement('span');
        span.textContent = 'FIGHTLAB';
        span.style.cssText = 'font-family:var(--fh);font-size:24px;font-weight:900;color:#f0f0f0;letter-spacing:2px;text-transform:uppercase;';
        el.parentNode.insertBefore(span, el.nextSibling);
      }
    });
  }

  requestAnimationFrame(() => requestAnimationFrame(observeReveal));
}

init();
