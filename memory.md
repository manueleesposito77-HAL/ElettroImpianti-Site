# Memoria Progetto: Elettro Impianti Landing Page

## Descrizione
Landing page professionale, moderna, conversion-oriented ed elegante per **Elettro Impianti**, azienda italiana operante nel settore impiantistico civile e industriale, domotica smart living, videosorveglianza CCTV, allarmi antintrusione e automazioni.

## Repository Remoto & Anteprima Online
- **URL GitHub**: [https://github.com/manueleesposito77-HAL/ElettroImpianti-Site](https://github.com/manueleesposito77-HAL/ElettroImpianti-Site)
- **Live Demo GitHub Pages**: [https://manueleesposito77-hal.github.io/ElettroImpianti-Site/](https://manueleesposito77-hal.github.io/ElettroImpianti-Site/)
- **Ramo Principale**: `main`
- **Visibilità**: Pubblico

## Palette Colori Ufficiale (Conforme WCAG 2.2 AAA / AA)
- **Primary / Background**: `#07111F` (Deep Electric Navy)
- **Secondary / Card & Superfici**: `#112A42` (Technical Steel Blue)
- **Elevated Surface**: `#163654` (Elevated Steel Blue)
- **Border / Griglie**: `#22364B` (Technical Border Gray)
- **Accent Brand Distintivo**: `#FFD13B` (Electric Amber Yellow)
- **Accent Supporto Energetico**: `#FF8A00` (Kinetic Orange per hover state)
- **Testo Primario**: `#F4F7FA` (Polar Clean White)
- **Testo Secondario & Didascalie**: `#8EA2B4` (Steel Slate Gray)
- **Status Colors**:
  - Success / Attivo: `#00D284`
  - Warning: `#FFA800`
  - Error: `#FF4444`
  - Info / Telemetria: `#38BDF8`

## Architettura e Asset
```
/Site-ElettroImpianti/
├── index.html                  # Landing page HTML5 semantica, SEO, Schema.org, WCAG 2.2
├── contact.php                 # Backend PHP sicuro con sanitizzazione, Honeypot e Rate Limiting
├── robots.txt                  # Regole crawler per motori di ricerca
├── sitemap.xml                 # Mappa XML per indicizzazione
├── memory.md                   # Stato e architettura del progetto (Memoria permanente)
├── README.md                   # Documentazione di progetto
├── css/
│   └── style.css               # Design system basato sulla palette ufficiale
├── js/
│   └── main.js                 # Logica ES6+, IntersectionObserver, demo domotica, form AJAX, cookie consent
├── favicon/
│   └── favicon.svg             # Favicon vettoriale brand
└── assets/
    ├── logos/                  # Loghi vettoriali SVG watermark (BTicino, Schneider, ABB, Vimar, Gewiss, Ksenia, Dahua, Hikvision)
    └── images/
        ├── site-bg.jpg         # Sfondo fisso (circuito tecnologico elegante su pietra scura)
        ├── hero-animated-circuit.svg # Animazione 60fps quadro elettrico, flusso trifase e telemetria
        ├── hero-real.jpg       # Fotografia HD sala quadri industriali
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
