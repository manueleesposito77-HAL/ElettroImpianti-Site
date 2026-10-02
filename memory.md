# Memoria Progetto: Elettro Impianti Landing Page

## Descrizione
Landing page professionale, moderna, conversion-oriented ed elegante per **Elettro Impianti**, azienda italiana operante nel settore impiantistico civile e industriale, domotica smart living, videosorveglianza CCTV, allarmi antintrusione e automazioni.

## Repository Remoto
- **URL GitHub**: [https://github.com/manueleesposito77-HAL/ElettroImpianti-Site](https://github.com/manueleesposito77-HAL/ElettroImpianti-Site)
- **Account**: `manueleesposito77-HAL`
- **Ramo Principale**: `main`
- **Visibilità**: Pubblico

## Architettura e Struttura File
```
/Site-ElettroImpianti/
├── index.html                  # Landing page HTML5 semantica, SEO, Schema.org, WCAG 2.1
├── contact.php                 # Backend PHP sicuro con sanitizzazione, Honeypot e Rate Limiting
├── robots.txt                  # Regole crawler per motori di ricerca
├── sitemap.xml                 # Mappa XML per indicizzazione
├── memory.md                   # Stato e architettura del progetto (Memoria permanente)
├── README.md                   # Documentazione di progetto
├── css/
│   └── style.css               # Design system: Navy (#0a0e17), Antracite (#111827) e Accento Ambra (#ffbe0b)
├── js/
│   └── main.js                 # Logica ES6+, IntersectionObserver, demo domotica, form AJAX, cookie consent
├── favicon/
│   └── favicon.svg             # Favicon vettoriale brand
└── assets/
    ├── videos/
    │   └── hero-electrical-tech.mp4 # Video MP4 loop per l'Hero visual
    ├── logos/                  # Loghi vettoriali SVG watermark per background card marchi
    │   ├── bticino.svg
    │   ├── schneider.svg
    │   ├── abb.svg
    │   ├── vimar.svg
    │   ├── gewiss.svg
    │   ├── ksenia.svg
    │   ├── dahua.svg
    │   └── hikvision.svg
    └── images/
        ├── hero-real.jpg       # Fotografia HD / Poster fallback Hero
        ├── solution-casa.jpg   # Foto Soluzione Casa / Residenziale
        ├── solution-commercial.jpg # Foto Soluzione Attività Commerciali
        ├── solution-industria.jpg  # Foto Soluzione Industria & Stabilimenti
        ├── card-civile.jpg     # Card Impianti Civili
        ├── card-industriale.jpg # Card Impianti Industriali
        ├── card-domotica.jpg   # Card Domotica Smart Home
        ├── card-allarme.jpg    # Card Impianti di Allarme
        ├── card-cctv.jpg       # Card Videosorveglianza CCTV
        ├── card-automazione.jpg # Card Automazione Cancelli
        ├── card-manutenzione.jpg # Card Manutenzione e Diagnosi
        └── card-adeguamento.jpg # Card Adeguamento e Messa a Norma
```

## Componenti & Funzionalità Chiave
1. **Hero con Video Tecnologico Loop**:
   - Tag `<video autoplay muted loop playsinline>` con fallback poster fotografico e overlay scuro.
2. **Immagini Fotografiche Tematiche Conformi EU AI Act (Regolamento UE 2024/1689)**:
   - 8 Card Servizi + 3 Sezioni Soluzioni (Casa, Commercio, Industria) + Hero, tutte con tag `alt` chiari e menzione di trasparenza.
3. **Sezione I Nostri Marchi con Loghi in Background (Watermark)**:
   - BTicino, Schneider Electric, ABB, Vimar, Gewiss, Ksenia Security, Dahua Technology, Hikvision.
   - Loghi SVG dinamici che si illuminano e scalano all'hover della card.
4. **Social Ufficiali Integrati nel Footer**:
   - Icone SVG native di Facebook, Instagram e TikTok con effetti hover ed etichette `aria-label`.
5. **Mobile First & Responsive Design**:
   - Barra fissa inferiore (`.mobile-sticky-bar`) visibile solo su smartphone (Chiama, WhatsApp, Preventivo).
   - Menu drawer con supporto accessibilità tastiera.
6. **Form Contatti Sicuro & Antispam**:
   - Validazione client e server-side, protezione Honeypot, Rate Limiting in sessione PHP.
7. **SEO & Dati Strutturati**:
   - JSON-LD con `Electrician`, `LocalBusiness`, `Service` e `WebSite`.

## Placeholder Configurabili
- Informazioni aziendali: `CITY`, `PROVINCE`, `REGION`, `ADDRESS`, `SERVICE_AREA`
- Contatti: `CONTACT_PHONE`, `CONTACT_EMAIL`, `CONTACT_WHATSAPP`
- Social: `PAGINA_FACEBOOK`, `PROFILO_INSTAGRAM`, `PROFILO_TIKTOK`
- Dati legali e web: `DOMINIO.IT`, `[INSERIRE_PARTITA_IVA]`, metriche `[XX]+`
