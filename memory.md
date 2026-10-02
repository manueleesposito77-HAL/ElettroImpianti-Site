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
│   └── style.css               # Design system: Navy (#0a0e17), Antracite (#111827), Accento Ambra (#ffbe0b)
│                               # + Sfondo fisso con gradiente (site-bg.jpg)
├── js/
│   └── main.js                 # Logica ES6+, IntersectionObserver, demo domotica, form AJAX, cookie consent
├── favicon/
│   └── favicon.svg             # Favicon vettoriale brand
└── assets/
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
        ├── site-bg.jpg         # Immagine di sfondo fissa (circuito tecnologico elegante su pietra scura)
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

## Componenti & Funzionalità Chiave
1. **Sfondo Fisso con Gradiente (`site-bg.jpg`)**:
   - `background-attachment: fixed`, `background-size: cover` combinato con un triplo gradiente navy/antracite (`rgba(10, 14, 23, 0.94)`) per garantire massima leggibilità dei testi e profondità visiva premium.
2. **Hero con Animazione Tecnica a Tema Impianti Elettrici**:
   - Animazione fluida (60fps) vettoriale di un quadro elettrico industriale certificato: linee di potenza trifase (L1, L2, L3) con impulsi di corrente animati, LED di stato lampeggianti, display multimetro con telemetria a 230V/50Hz e barra di carico dinamica.
3. **Immagini Fotografiche Tematiche Conformi EU AI Act (Regolamento UE 2024/1689)**:
   - 8 Card Servizi + 3 Sezioni Soluzioni (Casa, Commercio, Industria), tutte con tag `alt` chiari e menzione di trasparenza.
4. **Sezione I Nostri Marchi con Loghi in Background (Watermark)**:
   - BTicino, Schneider Electric, ABB, Vimar, Gewiss, Ksenia Security, Dahua Technology, Hikvision con effetto hover luminoso.
5. **Social Ufficiali Integrati nel Footer**:
   - Icone SVG native di Facebook, Instagram e TikTok.
6. **Mobile First & Responsive Design**:
   - Barra fissa inferiore per smartphone (Chiama, WhatsApp, Preventivo).
7. **Form Contatti Sicuro & Antispam**:
   - Validazione client/server, Honeypot e Rate Limiting PHP.
8. **SEO & Dati Strutturati**:
   - JSON-LD Schema.org completo.
