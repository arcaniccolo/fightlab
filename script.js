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
  { n:'05', icon:'👦', title:'Kinderkurse',       for:'Kinder ab 4 Jahren',    desc:'Kampfsport für Kids: Motorik, Disziplin, Selbstvertrauen und Spaß — in einem sicheren und respektvollen Umfeld.', tag:'Altersgerecht' },
  { n:'06', icon:'💪', title:'Frauenkurse',       for:'Nur für Frauen',        desc:'Selbstverteidigung, Kondition und Stärke — in einer Atmosphäre, die ausschließlich für Frauen geschaffen ist.', tag:'Ladies Only' },
  { n:'07', icon:'🎵', title:'Zumba',             for:'Alle',                  desc:'Fitness trifft Rhythmus. Zumba kommt bald ins Fightlab — stay tuned für den Starttermin.', tag:'Coming Soon', soon: true },
];

const FINDER_OPTIONS = [
  { icon:'🔥', label:'Ich will fitter werden',                 title:'Boxen oder Kickboxen', desc:'Kampfsport ist das intensivste Workout das es gibt. Kalorien verbrennen, Ausdauer aufbauen — und dabei wirklich etwas lernen.', courses:['Boxen','Kickboxen','Muay Thai'] },
  { icon:'🥋', label:'Ich will Kampfsport lernen',             title:'Wähle deine Disziplin', desc:'Alle unsere Kurse sind für komplette Anfänger. Du startest bei Null und baust Schritt für Schritt auf.', courses:['Boxen','Kickboxen','Muay Thai'] },
  { icon:'🧠', label:'Ich will Selbstvertrauen aufbauen',      title:'Kampfsport verändert dich', desc:'Nichts baut Selbstvertrauen so schnell auf wie das Beherrschen einer Kampfkunst. Du wirst körperlich und mental stärker.', courses:['Boxen','Kickboxen','Muay Thai'] },
  { icon:'👦', label:'Ich suche Training für mein Kind',       title:'Kinderkurse ab 4 Jahren', desc:'Sicher, strukturiert, Spaß. Unsere Kinderkurse fördern Disziplin, Respekt und ein starkes Körpergefühl.', courses:['Kinderkurse'] },
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
  { q:'Gibt es Kinderkurse?', a:'Ja, für Kinder ab 4 Jahren. Die Kurse sind pädagogisch begleitet, sicher und machen Spaß. Eltern beim Probetraining herzlich willkommen.' },
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

// ── TRANSLATED DYNAMIC DATA ────────────────────────────────

const KURSE_TRANS = {
  en: [
    { title:'Boxing',           for:'All levels',              desc:'Technical boxing focused on fundamentals, footwork and conditioning. Punching techniques, defense and movement like a pro.', tag:'Beginners welcome' },
    { title:'Kickboxing',       for:'All levels',              desc:'Combine boxing with kick techniques for a powerful full-body workout. More dynamics, more discipline, more impact.', tag:'Beginners welcome' },
    { title:'Muay Thai',        for:'All levels',              desc:'The 8 weapons of Thailand: fists, elbows, knees, shins. The most effective martial art in the world — and a brutal workout.', tag:'Beginners welcome' },
    { title:'Personal Training',for:'Individual coaching',     desc:'1:1 training directly with one of our coaches. Maximum results in minimum time — tailored to your goals.', tag:'By appointment' },
    { title:'Kids Classes',     for:'Children from 4 years',   desc:'Martial arts for kids: motor skills, discipline, self-confidence and fun — in a safe and respectful environment.', tag:'Age-appropriate' },
    { title:'Women\'s Classes', for:'Women only',              desc:'Self-defense, fitness and strength — in an environment created exclusively for women.', tag:'Ladies Only' },
    { title:'Zumba',            for:'Everyone',                desc:'Fitness meets rhythm. Zumba is coming soon to Fightlab — stay tuned for the start date.', tag:'Coming Soon', soon:true },
  ],
  tr: [
    { title:'Boks',             for:'Tüm seviyeler',           desc:'Temeller, ayak işleri ve kondisyona odaklanan teknik boks. Profesyonel gibi vuruş teknikleri, savunma ve hareket.', tag:'Yeni başlayanlar için' },
    { title:'Kickboks',         for:'Tüm seviyeler',           desc:'Güçlü bir tam vücut antrenmanı için boksu kick teknikleriyle birleştir. Daha fazla dinamizm, disiplin ve etki.', tag:'Yeni başlayanlar için' },
    { title:'Muay Thai',        for:'Tüm seviyeler',           desc:'Tayland\'ın 8 silahı: yumruklar, dirsekler, dizler, incikler. Dünyanın en etkili dövüş sanatı — ve zorlu bir antrenman.', tag:'Yeni başlayanlar için' },
    { title:'Kişisel Antrenman',for:'Bireysel koçluk',         desc:'Koçlarımızdan biriyle birebir antrenman. En kısa sürede maksimum sonuç — hedeflerinize özel.', tag:'Randevuyla' },
    { title:'Çocuk Kursları',   for:'4 yaşından itibaren',     desc:'Çocuklar için dövüş sporu: motor beceriler, disiplin, özgüven ve eğlence — güvenli ve saygılı bir ortamda.', tag:'Yaşa uygun' },
    { title:'Kadın Kursları',   for:'Sadece kadınlar',         desc:'Öz savunma, kondisyon ve güç — yalnızca kadınlar için oluşturulmuş bir ortamda.', tag:'Sadece Bayanlar' },
    { title:'Zumba',            for:'Herkes',                  desc:'Fitness ritimle buluşuyor. Zumba yakında Fightlab\'a geliyor — başlangıç tarihi için takipte kalın.', tag:'Yakında', soon:true },
  ]
};

const FINDER_TRANS = {
  en: [
    { icon:'🔥', label:'I want to get fitter',                title:'Boxing or Kickboxing', desc:'Martial arts is the most intense workout there is. Burn calories, build endurance — and actually learn something.', courses:['Boxing','Kickboxing','Muay Thai'] },
    { icon:'🥋', label:'I want to learn martial arts',        title:'Choose your discipline', desc:'All our classes are for complete beginners. You start from zero and build step by step.', courses:['Boxing','Kickboxing','Muay Thai'] },
    { icon:'🧠', label:'I want to build self-confidence',     title:'Martial arts changes you', desc:'Nothing builds confidence as fast as mastering a martial art. You become physically and mentally stronger.', courses:['Boxing','Kickboxing','Muay Thai'] },
    { icon:'👦', label:'I\'m looking for training for my child', title:'Kids classes from age 4', desc:'Safe, structured, fun. Our kids classes promote discipline, respect and a strong body awareness.', courses:['Kids Classes'] },
    { icon:'💪', label:'I want to train in the women\'s class', title:'Women\'s class — just for you', desc:'A safe space to build strength. Women only. Led by experienced coaches.', courses:['Women\'s Classes'] },
    { icon:'⚡', label:'I want 1:1 personal training',        title:'Maximum results', desc:'You work directly with a coach. 100% tailored to you. Perfect if you want fast progress or specific goals.', courses:['Personal Training'] },
  ],
  tr: [
    { icon:'🔥', label:'Daha fit olmak istiyorum',            title:'Boks veya Kickboks', desc:'Dövüş sporu, var olan en yoğun antrenmandır. Kalori yak, dayanıklılık kazan — ve gerçekten bir şeyler öğren.', courses:['Boks','Kickboks','Muay Thai'] },
    { icon:'🥋', label:'Dövüş sporu öğrenmek istiyorum',      title:'Disiplinini seç', desc:'Tüm kurslarımız tam yeni başlayanlar için. Sıfırdan başlayıp adım adım gelişirsin.', courses:['Boks','Kickboks','Muay Thai'] },
    { icon:'🧠', label:'Özgüven kazanmak istiyorum',          title:'Dövüş sporu seni değiştirir', desc:'Hiçbir şey bir dövüş sanatında ustalaşmak kadar hızlı özgüven oluşturmaz. Fiziksel ve zihinsel olarak güçlenirsin.', courses:['Boks','Kickboks','Muay Thai'] },
    { icon:'👦', label:'Çocuğum için antrenman arıyorum',     title:'4 yaşından itibaren çocuk kursları', desc:'Güvenli, yapılandırılmış, eğlenceli. Çocuk kurslarımız disiplin, saygı ve güçlü bir beden farkındalığı geliştirir.', courses:['Çocuk Kursları'] },
    { icon:'💪', label:'Kadın kursunda antrenman yapmak istiyorum', title:'Kadın kursu — yalnızca sizin için', desc:'Güç kazanmak için güvenli bir alan. Yalnızca kadınlar. Deneyimli koçlar tarafından yönetilir.', courses:['Kadın Kursları'] },
    { icon:'⚡', label:'1:1 kişisel antrenman istiyorum',     title:'Maksimum sonuçlar', desc:'Doğrudan bir koçla çalışırsın. %100 sana özel. Hızlı ilerleme veya özel hedefler istiyorsan mükemmel.', courses:['Kişisel Antrenman'] },
  ]
};

const SCHED_LABELS = {
  en: { Mo:'Mon',Di:'Tue',Mi:'Wed',Do:'Thu',Fr:'Fri',Sa:'Sat', Montag:'Monday',Dienstag:'Tuesday',Mittwoch:'Wednesday',Donnerstag:'Thursday',Freitag:'Friday',Samstag:'Saturday', 'Alle Levels':'All levels','Nur für Frauen':'Women only','Jugendliche':'Youth','4–6 Jahre':'4–6 yrs','7–12 Jahre':'7–12 yrs' },
  tr: { Mo:'Pzt',Di:'Sal',Mi:'Çar',Do:'Per',Fr:'Cum',Sa:'Cmt', Montag:'Pazartesi',Dienstag:'Salı',Mittwoch:'Çarşamba',Donnerstag:'Perşembe',Freitag:'Cuma',Samstag:'Cumartesi', 'Alle Levels':'Tüm seviyeler','Nur für Frauen':'Sadece kadınlar','Jugendliche':'Gençler','4–6 Jahre':'4–6 yaş','7–12 Jahre':'7–12 yaş' },
};

const VALUES_TRANS = {
  en: [
    { icon:'⚔️', title:'Discipline',    desc:'Get better every day.' },
    { icon:'🤝', title:'Respect',        desc:'In the gym and in life.' },
    { icon:'💪', title:'Strength',       desc:'Body and mind.' },
    { icon:'🧠', title:'Self-confidence',desc:'From the very first class.' },
    { icon:'🔥', title:'Transformation', desc:'You change here.' },
    { icon:'👊', title:'Community',      desc:'Real togetherness.' },
  ],
  tr: [
    { icon:'⚔️', title:'Disiplin',       desc:'Her gün daha iyiye.' },
    { icon:'🤝', title:'Saygı',           desc:'Salonda ve hayatta.' },
    { icon:'💪', title:'Güç',             desc:'Beden ve zihin.' },
    { icon:'🧠', title:'Özgüven',         desc:'İlk kurstan itibaren.' },
    { icon:'🔥', title:'Dönüşüm',         desc:'Burada değişirsin.' },
    { icon:'👊', title:'Dayanışma',       desc:'Gerçek topluluk.' },
  ]
};

const AI_QUESTIONS_TRANS = {
  en: ['When is Muay Thai?','When is the women\'s class?','How do I book a trial?','Where do I find the app?','Which classes are for beginners?','What do I need to bring?'],
  tr: ['Muay Thai ne zaman?','Kadın kursu ne zaman?','Deneme antrenmanı nasıl rezerve edilir?','Uygulamayı nerede bulabilirim?','Hangi kurslar yeni başlayanlar için?','Ne getirmem gerekiyor?'],
};
const AI_QUICK_TRANS = {
  en: ['Trial training','Schedule','Boxing','Muay Thai','Kids','Women'],
  tr: ['Deneme antrenmanı','Program','Boks','Muay Thai','Çocuk','Kadın'],
};

const FAQ_TRANS = {
  en: [
    { q:'Do I need previous experience?', a:'No. All our classes are designed for complete beginners. You start from zero — no experience necessary.' },
    { q:'What should I bring?', a:'Comfortable sportswear and training shoes. For boxing we have beginner gloves to borrow. Just bring yourself.' },
    { q:'How much does it cost?', a:'Memberships start from €59/month. The best way to find out your options is at a free trial training session.' },
    { q:'Can children train here?', a:'Yes, from age 4. Our kids classes are pedagogically supervised, safe and fun. Parents are welcome to watch.' },
    { q:'Is there a women-only class?', a:'Yes. Our women\'s class takes place on Mondays and Wednesdays. Only women, experienced coaches.' },
    { q:'How do I book a trial?', a:'Click "Book Trial Training" and fill in the form — we\'ll get back to you within 24 hours. Or just come by directly.' },
  ],
  tr: [
    { q:'Önceden deneyim gerekli mi?', a:'Hayır. Tüm kurslarımız tam yeni başlayanlar için tasarlanmıştır. Sıfırdan başlarsın — deneyim gerekli değil.' },
    { q:'Ne getirmem gerekiyor?', a:'Rahat spor kıyafeti ve antrenman ayakkabısı. Boks için başlangıç eldiveni ödünç alabilirsin. Sadece kendin gel.' },
    { q:'Ne kadar tutuyor?', a:'Üyelikler aylık 59€\'dan başlıyor. Seçeneklerini öğrenmek için ücretsiz deneme antrenmanına gelmen en iyisi.' },
    { q:'Çocuklar burada antrenman yapabilir mi?', a:'Evet, 4 yaşından itibaren. Çocuk kurslarımız pedagojik olarak denetlenir, güvenlidir ve eğlencelidir. Ebeveynler izlemeye hoş geldiniz.' },
    { q:'Sadece kadınlar için kurs var mı?', a:'Evet. Kadın kursumuz pazartesi ve çarşamba günleri yapılır. Sadece kadınlar, deneyimli koçlar.' },
    { q:'Deneme antrenmanını nasıl rezerve edebilirim?', a:'"Deneme Antrenmanı Yap"a tıkla ve formu doldur — 24 saat içinde sana geri döneceğiz. Ya da doğrudan gel.' },
  ]
};

function getKurseData()   { return KURSE_TRANS[LANG] || KURSE; }
function getFinderData()  { return FINDER_TRANS[LANG] || FINDER_OPTIONS; }
function getValuesData()  { return VALUES_TRANS[LANG] || VALUES; }
function getAIQuestions() { return AI_QUESTIONS_TRANS[LANG] || AI_QUESTIONS; }
function getAIQuick()     { return AI_QUICK_TRANS[LANG] || AI_QUICK; }
function getFAQData()     { return FAQ_TRANS[LANG] || FAQS; }

function schedLabel(key) {
  const m = SCHED_LABELS[LANG];
  return (m && m[key]) || key;
}

// ── RENDER ─────────────────────────────────────────────────

function renderKurse() {
  const g = document.getElementById('kurseGrid');
  if (!g) return;
  const data = getKurseData();
  g.innerHTML = data.map((k, i) => {
    const base = KURSE[i];
    return `
    <div class="kurs-card${k.soon||base.soon ? ' coming-soon' : ''} reveal">
      ${k.soon||base.soon ? `<div class="kc-badge">${t('app.badge')}</div>` : ''}
      <span class="kc-num">${base.n}</span>
      <span class="kc-icon">${base.icon}</span>
      <h3 class="kc-title">${k.title}</h3>
      <div class="kc-for">${k.for}</div>
      <p class="kc-desc">${k.desc}</p>
      <span class="kc-pill">${k.tag}</span>
    </div>`;
  }).join('');
}

function renderFinder() {
  const opts = document.getElementById('finderOptions');
  if (!opts) return;
  const data = getFinderData();
  opts.innerHTML = data.map((o, i) => `
    <button class="finder-opt" onclick="selectFinder(${i})">
      <span class="fo-num">0${i+1}</span>
      <span class="fo-icon">${o.icon}</span>
      <span class="fo-label">${o.label}</span>
    </button>
  `).join('');
}

function selectFinder(idx) {
  document.querySelectorAll('.finder-opt').forEach((el, i) => el.classList.toggle('active', i === idx));
  const data = getFinderData();
  const o = data[idx];
  const recLabel = LANG==='en' ? 'Our recommendation for you' : LANG==='tr' ? 'Senin için önerimiz' : 'Empfehlung für dich';
  const btnLabel = LANG==='en' ? 'Book trial training' : LANG==='tr' ? 'Deneme antrenmanı yap' : 'Probetraining buchen';
  const panel = document.getElementById('finderResult');
  panel.innerHTML = `
    <div class="frp-tag">${recLabel}</div>
    <div class="frp-title">${o.title}</div>
    <p class="frp-desc">${o.desc}</p>
    <div class="frp-tags">${o.courses.map(c => `<span class="frp-tag-pill">${c}</span>`).join('')}</div>
    <a href="#cta-final" class="cta-primary" onclick="openTrialModal(); return false;">
      <span>${btnLabel}</span>
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
        <div class="sdh-day">${schedLabel(d.day)}</div>
        <div class="sdh-date">${schedLabel(d.label)}</div>
      </div>
      ${d.slots.map(s => `
        <div class="sched-slot ${s.type}">
          ${s.time ? `<div class="ss-time">${s.time}</div>` : ''}
          <div class="ss-name">${s.name}</div>
          <div class="ss-level">${schedLabel(s.level)}</div>
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
  if (chips) chips.innerHTML = getAIQuestions().map(q => `
    <button class="ai-chip" onclick="askBot('${q}')">
      <span class="ai-chip-arrow">→</span>
      <span class="ai-chip-text">${q}</span>
    </button>
  `).join('');

  const quick = document.getElementById('chatQuick');
  if (quick) quick.innerHTML = getAIQuick().map(q => `
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
  g.innerHTML = getValuesData().map(v => `
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
  list.innerHTML = getFAQData().map((f, i) => `
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

  // Init language
  const savedLang = localStorage.getItem('fl_lang') || 'de';
  setLang(savedLang);
}

// ── i18n ───────────────────────────────────────────────────
const TRANSLATIONS = {
  de: {
    'nav.kurse': 'Kurse',
    'nav.stundenplan': 'Stundenplan',
    'nav.cta': 'Probetraining',
    'nav.cta_book': 'Probetraining buchen',
    'hero.eyebrow': 'Kampfsport auf höchstem Niveau',
    'hero.h1_0': 'Trainiere',
    'hero.h1_1': 'Wie ein',
    'hero.h1_2': 'Kämpfer.',
    'hero.sub': 'Boxen · Kickboxen · Muay Thai<br>Personal Training · Kinder- & Frauenkurse',
    'hero.cta1': 'Kostenloses Probetraining',
    'hero.cta2': 'Stundenplan ansehen',
    'hero.stat1': 'Disziplinen',
    'hero.stat2': 'Anfänger willkommen',
    'hero.stat3': 'AI Assistent',
    'hero.scroll': 'Scroll',
    'kurse.tag': 'Das Training',
    'kurse.title': 'Unsere <em>Disziplinen</em>',
    'kurse.sub': 'Jede Kampfsportart hat ihre eigene Energie. Find deine.',
    'finder.tag': 'Kursfinder',
    'finder.title': 'Welcher Kurs<br><em>passt zu dir?</em>',
    'finder.default': 'Wähle eine Option — wir zeigen dir deine Kurse.',
    'sched.tag': 'Stundenplan',
    'sched.title': 'Wöchentlicher <em>Trainingsplan</em>',
    'sched.sub': 'Aktuelle Trainingszeiten',
    'app.badge': 'Demnächst',
    'app.title': 'Dein Training.<br>Immer dabei.<br><em>Die Fightlab App.</em>',
    'app.desc': 'Als Mitglied erhältst du Zugang zur Fightlab App — tracke deine Kurse, verfolge deine Fortschritte, nimm an Monats-Challenges teil und sieh, wo du im Leaderboard stehst.',
    'app.cta': 'Jetzt Mitglied werden',
    'member.badge': 'In Kürze verfügbar',
    'member.title': 'Dein persönlicher<br><em>Mitgliederbereich</em>',
    'member.desc': 'In Zukunft wird es auch einen Member Login geben — damit kannst du deine Mitgliedschaft verwalten, Kurse buchen, Rechnungen einsehen und deine Fortschritte tracken. Alles an einem Ort.',
    'member.cta': 'Probetraining buchen →',
    'ai.tag': '24/7 Support',
    'ai.title': 'Dein digitaler<br><em>Fightlab Assistent</em>',
    'ai.desc': 'Rund um die Uhr Antworten auf alle wichtigen Fragen — kein Telefon, keine Wartezeit.',
    'ai.status': 'Online · Antwortet sofort',
    'ai.greeting': 'Hey! Wie kann ich dir helfen? 👊',
    'ai.now': 'Jetzt',
    'ai.placeholder': 'Schreib eine Frage…',
    'comm.tag': 'Die Bewegung',
    'comm.title': 'Kein normales<br>Gym.<br><em>Eine Bewegung.</em>',
    'comm.desc': 'Bei Fightlab geht es nicht nur darum, fit zu werden. Es geht darum, wer du wirst — durch Disziplin, Respekt und echten Zusammenhalt.',
    'comm.quote': 'Ich bin als totaler Anfänger gekommen. Heute bin ich Teil einer Familie, die mich täglich besser macht.',
    'comm.author': '— Fightlab Mitglied, Stadtallendorf',
    'comm.note': 'Anfänger sind nicht nur willkommen.<br>Sie sind der Kern von allem.',
    'faq.title': 'Häufige<br><em>Fragen</em>',
    'faq.sub': 'Alles was du wissen musst, bevor du anfängst.',
    'faq.cta': 'Direkt Probetraining buchen →',
    'ctaf.tag': 'Dein erster Schritt',
    'ctaf.title': 'Der erste Schritt<br>ist dein <em>Probetraining.</em>',
    'ctaf.sub': 'Kein Druck. Keine Ausreden.<br>Komm vorbei und erlebe Fightlab selbst.',
    'ctaf.cta': 'Jetzt kostenloses Probetraining buchen',
    'ctaf.micro': '100% kostenlos · Keine Verpflichtung · Anfänger ausdrücklich willkommen',
    'insta.social_tag': 'Social Media',
    'insta.title': 'Folge uns<br>auf <em>Instagram</em>',
    'insta.desc': 'Aktuelle News, Trainingseinblicke, Kurse und Community-Momente — direkt auf deinem Feed.',
    'insta.followers': 'Follower',
    'insta.posts': 'Beiträge',
    'insta.cta': '@fightlaballendorf folgen',
    'footer.tagline': 'Trainiere wie ein Kämpfer.<br>Lebe mit Disziplin.',
    'footer.nav': 'Navigation',
    'footer.location': 'Standort',
    'footer.hours': 'Öffnungszeiten',
    'footer.sunday': 'So · Nach Vereinbarung',
    'footer.trial_h': 'Probetraining',
    'footer.trial_text': 'Dein erstes Training ist kostenlos. Kein Vertrag. Kein Risiko.',
    'footer.trial_btn': 'Jetzt buchen',
    'footer.bottom_right': 'Premium Kampfsport · Made with precision',
    'modal.tag': 'Kostenlos & unverbindlich',
    'modal.title': 'Probetraining buchen',
    'modal.sub': 'Wähle einen Kurs — wir melden uns innerhalb von 24 Stunden bei dir.',
    'modal.name': 'Name',
    'modal.name_ph': 'Dein Name',
    'modal.contact': 'E-Mail oder WhatsApp',
    'modal.course': 'Welcher Kurs?',
    'modal.boxing': 'Boxen',
    'modal.kickboxing': 'Kickboxen',
    'modal.kids': 'Kinderkurs',
    'modal.women': 'Frauenkurs',
    'modal.unsure': 'Noch nicht sicher',
    'modal.msg': 'Nachricht (optional)',
    'modal.msg_ph': 'Vorerfahrung, Wunschtermin, Fragen…',
    'modal.submit': 'Probetraining anfragen',
    'login.sub': 'Dein persönlicher Mitgliederbereich.',
    'login.pw': 'Passwort',
    'login.btn': 'Einloggen',
    'login.hint': 'Noch kein Mitglied? <a href="#cta-final" onclick="closeModal(\'loginModal\')">Probetraining buchen</a>',
    'wa.label': 'Schreib uns',
  },
  en: {
    'nav.kurse': 'Classes',
    'nav.stundenplan': 'Schedule',
    'nav.cta': 'Trial Training',
    'nav.cta_book': 'Book Trial Training',
    'hero.eyebrow': 'Martial arts at the highest level',
    'hero.h1_0': 'Train',
    'hero.h1_1': 'Like a',
    'hero.h1_2': 'Fighter.',
    'hero.sub': 'Boxing · Kickboxing · Muay Thai<br>Personal Training · Kids & Women\'s Classes',
    'hero.cta1': 'Free Trial Training',
    'hero.cta2': 'View Schedule',
    'hero.stat1': 'Disciplines',
    'hero.stat2': 'Beginners welcome',
    'hero.stat3': 'AI Assistant',
    'hero.scroll': 'Scroll',
    'kurse.tag': 'Training',
    'kurse.title': 'Our <em>Disciplines</em>',
    'kurse.sub': 'Every martial art has its own energy. Find yours.',
    'finder.tag': 'Course Finder',
    'finder.title': 'Which class<br><em>is right for you?</em>',
    'finder.default': 'Choose an option — we\'ll show you your classes.',
    'sched.tag': 'Schedule',
    'sched.title': 'Weekly <em>Training Schedule</em>',
    'sched.sub': 'Current training times',
    'app.badge': 'Coming Soon',
    'app.title': 'Your training.<br>Always with you.<br><em>The Fightlab App.</em>',
    'app.desc': 'As a member you get access to the Fightlab App — track your classes, follow your progress, join monthly challenges and see where you stand on the leaderboard.',
    'app.cta': 'Become a member now',
    'member.badge': 'Coming Soon',
    'member.title': 'Your personal<br><em>Member Area</em>',
    'member.desc': 'In the future there will also be a Member Login — manage your membership, book classes, view invoices and track your progress. All in one place.',
    'member.cta': 'Book trial training →',
    'ai.tag': '24/7 Support',
    'ai.title': 'Your digital<br><em>Fightlab Assistant</em>',
    'ai.desc': 'Answers to all important questions around the clock — no phone call, no waiting.',
    'ai.status': 'Online · Responds instantly',
    'ai.greeting': 'Hey! How can I help you? 👊',
    'ai.now': 'Now',
    'ai.placeholder': 'Write a question…',
    'comm.tag': 'The Movement',
    'comm.title': 'Not just a<br>Gym.<br><em>A movement.</em>',
    'comm.desc': 'At Fightlab it\'s not just about getting fit. It\'s about who you become — through discipline, respect and real community.',
    'comm.quote': 'I came as a complete beginner. Today I\'m part of a family that makes me better every day.',
    'comm.author': '— Fightlab Member, Stadtallendorf',
    'comm.note': 'Beginners aren\'t just welcome.<br>They are the heart of everything.',
    'faq.title': 'Frequently<br><em>Asked Questions</em>',
    'faq.sub': 'Everything you need to know before you start.',
    'faq.cta': 'Book trial training directly →',
    'ctaf.tag': 'Your first step',
    'ctaf.title': 'The first step<br>is your <em>trial training.</em>',
    'ctaf.sub': 'No pressure. No excuses.<br>Come by and experience Fightlab yourself.',
    'ctaf.cta': 'Book free trial training now',
    'ctaf.micro': '100% free · No obligation · Beginners explicitly welcome',
    'insta.social_tag': 'Social Media',
    'insta.title': 'Follow us<br>on <em>Instagram</em>',
    'insta.desc': 'Current news, training insights, classes and community moments — straight to your feed.',
    'insta.followers': 'Followers',
    'insta.posts': 'Posts',
    'insta.cta': 'Follow @fightlaballendorf',
    'footer.tagline': 'Train like a fighter.<br>Live with discipline.',
    'footer.nav': 'Navigation',
    'footer.location': 'Location',
    'footer.hours': 'Opening Hours',
    'footer.sunday': 'Sun · By appointment',
    'footer.trial_h': 'Trial Training',
    'footer.trial_text': 'Your first training is free. No contract. No risk.',
    'footer.trial_btn': 'Book now',
    'footer.bottom_right': 'Premium Martial Arts · Made with precision',
    'modal.tag': 'Free & no obligation',
    'modal.title': 'Book trial training',
    'modal.sub': 'Choose a class — we\'ll get back to you within 24 hours.',
    'modal.name': 'Name',
    'modal.name_ph': 'Your name',
    'modal.contact': 'Email or WhatsApp',
    'modal.course': 'Which class?',
    'modal.boxing': 'Boxing',
    'modal.kickboxing': 'Kickboxing',
    'modal.kids': 'Kids class',
    'modal.women': 'Women\'s class',
    'modal.unsure': 'Not sure yet',
    'modal.msg': 'Message (optional)',
    'modal.msg_ph': 'Previous experience, preferred time, questions…',
    'modal.submit': 'Request trial training',
    'login.sub': 'Your personal member area.',
    'login.pw': 'Password',
    'login.btn': 'Log in',
    'login.hint': 'Not a member yet? <a href="#cta-final" onclick="closeModal(\'loginModal\')">Book trial training</a>',
    'wa.label': 'Write to us',
  },
  tr: {
    'nav.kurse': 'Kurslar',
    'nav.stundenplan': 'Program',
    'nav.cta': 'Deneme Antrenmanı',
    'nav.cta_book': 'Deneme Antrenmanı Yap',
    'hero.eyebrow': 'En yüksek seviyede dövüş sporu',
    'hero.h1_0': 'Antrenman Yap',
    'hero.h1_1': 'Bir',
    'hero.h1_2': 'Dövüşçü Gibi.',
    'hero.sub': 'Boks · Kickboks · Muay Thai<br>Kişisel Antrenman · Çocuk & Kadın Kursları',
    'hero.cta1': 'Ücretsiz Deneme Antrenmanı',
    'hero.cta2': 'Programı Gör',
    'hero.stat1': 'Disiplinler',
    'hero.stat2': 'Yeni başlayanlar için',
    'hero.stat3': 'AI Asistan',
    'hero.scroll': 'Kaydır',
    'kurse.tag': 'Antrenman',
    'kurse.title': '<em>Disiplinlerimiz</em>',
    'kurse.sub': 'Her dövüş sporunun kendine özgü enerjisi var. Seninki hangisi?',
    'finder.tag': 'Kurs Bulucu',
    'finder.title': 'Hangi kurs<br><em>sana uygun?</em>',
    'finder.default': 'Bir seçenek seçin — kurslarınızı gösterelim.',
    'sched.tag': 'Program',
    'sched.title': 'Haftalık <em>Antrenman Programı</em>',
    'sched.sub': 'Güncel antrenman saatleri',
    'app.badge': 'Yakında',
    'app.title': 'Antrenmanın.<br>Her zaman yanında.<br><em>Fightlab Uygulaması.</em>',
    'app.desc': 'Üye olarak Fightlab Uygulamasına erişim kazanırsın — kurslarını takip et, ilerlemeni gör, aylık yarışmalara katıl ve sıralamanda nerede olduğunu öğren.',
    'app.cta': 'Şimdi üye ol',
    'member.badge': 'Yakında',
    'member.title': 'Kişisel<br><em>Üye Alanın</em>',
    'member.desc': 'İleride bir Üye Girişi de olacak — üyeliğini yönet, kurs rezervasyonu yap, faturaları görüntüle ve gelişimini takip et. Hepsi tek bir yerde.',
    'member.cta': 'Deneme antrenmanı yap →',
    'ai.tag': '24/7 Destek',
    'ai.title': 'Dijital<br><em>Fightlab Asistanın</em>',
    'ai.desc': 'Tüm önemli sorulara gün boyu yanıt — telefon yok, bekleme yok.',
    'ai.status': 'Çevrimiçi · Anında yanıtlar',
    'ai.greeting': 'Hey! Nasıl yardımcı olabilirim? 👊',
    'ai.now': 'Şimdi',
    'ai.placeholder': 'Bir soru yazın…',
    'comm.tag': 'Hareket',
    'comm.title': 'Sıradan bir<br>spor salonu değil.<br><em>Bir hareket.</em>',
    'comm.desc': 'Fightlab\'da sadece fit olmak değil, kim olduğun önemli — disiplin, saygı ve gerçek dayanışmayla.',
    'comm.quote': 'Tamamen acemi olarak geldim. Bugün beni her gün daha iyi yapan bir ailenin parçasıyım.',
    'comm.author': '— Fightlab Üyesi, Stadtallendorf',
    'comm.note': 'Yeni başlayanlar sadece hoş karşılanmaz.<br>Onlar her şeyin özüdür.',
    'faq.title': 'Sık Sorulan<br><em>Sorular</em>',
    'faq.sub': 'Başlamadan önce bilmen gereken her şey.',
    'faq.cta': 'Doğrudan deneme antrenmanı yap →',
    'ctaf.tag': 'İlk adımın',
    'ctaf.title': 'İlk adım<br>senin <em>deneme antrenmanın.</em>',
    'ctaf.sub': 'Baskı yok. Bahane yok.<br>Gel ve Fightlab\'ı kendin deneyimle.',
    'ctaf.cta': 'Şimdi ücretsiz deneme antrenmanı yap',
    'ctaf.micro': '100% ücretsiz · Yükümlülük yok · Yeni başlayanlar özellikle hoş karşılanır',
    'insta.social_tag': 'Sosyal Medya',
    'insta.title': 'Bizi takip et<br><em>Instagram</em>\'da',
    'insta.desc': 'Güncel haberler, antrenman görünümleri, kurslar ve topluluk anları — doğrudan akışında.',
    'insta.followers': 'Takipçi',
    'insta.posts': 'Gönderi',
    'insta.cta': '@fightlaballendorf\'u takip et',
    'footer.tagline': 'Bir dövüşçü gibi antren yap.<br>Disiplinle yaşa.',
    'footer.nav': 'Navigasyon',
    'footer.location': 'Konum',
    'footer.hours': 'Çalışma Saatleri',
    'footer.sunday': 'Paz · Randevu ile',
    'footer.trial_h': 'Deneme Antrenmanı',
    'footer.trial_text': 'İlk antrenmanın ücretsiz. Sözleşme yok. Risk yok.',
    'footer.trial_btn': 'Şimdi yap',
    'footer.bottom_right': 'Premium Dövüş Sporları · Özenle yapıldı',
    'modal.tag': 'Ücretsiz & yükümlülüksüz',
    'modal.title': 'Deneme antrenmanı yap',
    'modal.sub': 'Bir kurs seçin — 24 saat içinde size geri döneceğiz.',
    'modal.name': 'Ad',
    'modal.name_ph': 'Adınız',
    'modal.contact': 'E-posta veya WhatsApp',
    'modal.course': 'Hangi kurs?',
    'modal.boxing': 'Boks',
    'modal.kickboxing': 'Kickboks',
    'modal.kids': 'Çocuk kursu',
    'modal.women': 'Kadın kursu',
    'modal.unsure': 'Henüz emin değilim',
    'modal.msg': 'Mesaj (isteğe bağlı)',
    'modal.msg_ph': 'Önceki deneyim, tercih edilen zaman, sorular…',
    'modal.submit': 'Deneme antrenmanı talep et',
    'login.sub': 'Kişisel üye alanın.',
    'login.pw': 'Şifre',
    'login.btn': 'Giriş yap',
    'login.hint': 'Henüz üye değil misin? <a href="#cta-final" onclick="closeModal(\'loginModal\')">Deneme antrenmanı yap</a>',
    'wa.label': 'Bize yaz',
  }
};

let LANG = 'de';

function t(key) {
  return (TRANSLATIONS[LANG] && TRANSLATIONS[LANG][key]) || (TRANSLATIONS.de[key]) || key;
}

function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  LANG = lang;
  localStorage.setItem('fl_lang', lang);
  document.documentElement.lang = lang;

  // Update static elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });

  // Active button state
  document.querySelectorAll('.ls-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Re-render dynamic sections
  renderKurse();
  renderFinder();
  renderSchedule();
  renderAI();
  renderValues();
  renderFAQ();
}

init();
