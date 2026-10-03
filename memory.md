# Memoria Progetto: ElettroImpianti Roma (Landing Page Iper-Professionale)

## Descrizione del Progetto
Landing page moderna, iper-professionale e responsive per **ElettroImpianti**, azienda di riferimento a Roma e provincia per impianti elettrici civili e industriali (abilitazione DM 37/08 lettere A-B), domotica avanzata, automazione cancelli e sistemi di sicurezza certificati Ksenia Security.

## Regola Linguistica
- **Lingua Esclusiva**: Comunicazione, risposte, spiegazioni, pensieri e commenti tassativamente ed esclusivamente in **lingua italiana**.

## Conformità Normativa & EU AI Act (Regolamento UE 2024/1689)
- **Supervisione Umana (Art. 14 Human-in-the-loop)**: Garanzia che ogni diagnosi, preventivo e contatto è elaborato da personale peritale umano abilitato.
- **Trasparenza Canali (Art. 50)**: Nessun chatbot o avatar sintetico ingannevole.
- **Videosorveglianza & AI (Art. 5)**: Algoritmi ottici di bordo limitati al filtraggio volumetrico persone/veicoli anti-falso allarme, con esclusione categorica di identificazione o categorizzazione biometrica di massa non autorizzata.
- **Tutela Dati (Art. 10 & GDPR)**: I dati non alimentano modelli di intelligenza artificiale o LLM di terze parti.
- **Badge e Modale di Trasparenza**: Badge certificativo nel footer e modale interattivo consultabile da qualsiasi utente.

## Canali di Contatto
- **ESCLUSIONE CATEGORICA**: WhatsApp è stato escluso integralmente come da specifica cliente.
- **Canali Ufficiali (Dimostrativi / Demo)**:
  - Telefono Diretto Click-to-call: `tel:+390600000000` (`+39 06 0000 0000`)
  - Email: `info@esempio-dimostrativo.it`
  - Sede Legale/Operativa: `Via Esempio, 123 - 00100 Roma (RM) [Sede Dimostrativa]`
  - P.IVA: `00000000000 (Dati Dimostrativi)` | REA: `RM-000000` | PEC: `pec@esempio-dimostrativo.it`
  - Modulo di contatto strutturato con riscontro entro 24h lavorative e autocompilazione della zona cliccando sulle aree territoriali di Roma.

## Identità Visiva e Brand Assets
- **Immagine di Sfondo Hero**: Fotografia panoramica ufficiale ad alta definizione (`bg_wide.png` / `1536x1024`) del tecnico elettricista con tuta brandizzata ElettroImpianti e multimetro al quadro elettrico, salvata e ottimizzata in `assets/images/hero-bg.jpg`, `assets/images/hero-poster.jpg` e `assets/images/bg_wide.png` (con effetto parallasse GSAP ScrollTrigger e overlay a maglia tecnica).
- **Logo Ufficiale**: Scudo protettivo bicolore (Rosso `#D71920` e Nero Carbone `#121212`), tecnico elettricista con elmetto, tester e utensili, tracce di circuito stampato integrate e fulmine dinamico.
  - Salvato in: `assets/images/logo.png`
  - Favicon ufficiale in: `favicon/favicon.png` e `favicon/favicon.svg`
  - Applicato in: Favicon browser, Apple Touch Icon, Open Graph meta tag, Header Sticky dinamico con ridimensionamento allo scroll, sezione Chi Siamo e Footer Istituzionale.

## Palette Cromatica & Effetti di Bordo
- **Rosso Primario**: `#D71920` (CTA, nodi di circuito attivi, icone e accenti)
- **Nero Carbone**: `#121212` (Top bar, footer, sezioni scure e contrasti)
- **Grigio Tecnico**: `#2B2D2F` (Bordi, sfondi secondari, card scure)
- **Sfondo Neutro Chiaro**: `#F8F9FA` (Sezioni ad alta leggibilità)
- **Bianco Puro**: `#FFFFFF` (Card e navigazione sticky)
- **Flashing Rosso Esclusivamente Laterale (Zero Bordo, Zero Luce in Basso, Continuo 0-100-0-100)**:
  - **Selettori**: `.side-glow-strip`, `.side-glow-left`, `.side-glow-right`.
  - **Bordi**: `border: none !important; outline: none !important; box-shadow: none !important;`.
  - **Altezza e Posizione**: `position: fixed; top: 15vh; bottom: 15vh; height: 70vh; z-index: 99999; pointer-events: none;`.
  - **Larghezza**: `18px` mobile / `28px` desktop (`@media (min-width: 768px)`).
  - **Sfumatura Orizzontale**: `linear-gradient(to right, rgba(215, 25, 32, 0.6) 0%, rgba(215, 25, 32, 0.18) 65%, rgba(215, 25, 32, 0) 100%)`.
  - **Maschera Verticale**: `-webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)`. Nessun contatto visivo con la base o la cima.
  - **Animazione**: `@keyframes continuousSidePulse`: ciclo continuo da 0% (`opacity: 0`) a 50% (`opacity: 1`) a 100% (`opacity: 0`), durata `5.4s ease-in-out infinite` senza pause intermedie.

## Stack Tecnologico & Animazioni GSAP + ScrollTrigger
1. **Navbar Sticky**: Transizione fluida di background, ombra ed effetto scale down del logo ufficiale al superamento della Hero section.
2. **Hero Section**: Reveal graduale temporizzato (kicker, titolo H1, testo, CTA group, trust badges) con GSAP timeline.
3. **Video Background**: Tag `<video>` con fallback poster fotorealistica HD (`assets/images/hero-poster.jpg`), overlay a maglia geometrica tecnica al 70% per la massima leggibilità ed effetto parallax controllato da ScrollTrigger.
4. **Striscia Certificazioni**: Rivelazione a scorrimento dei 4 badge tecnici (DM 37/08, Ksenia Certified, Norme CEI/Di.Co., Garanzia).
5. **Sezione Servizi a 6 Card**: Animazione a cascata (`stagger: 0.15s`) con `gsap.fromTo` e `immediateRender: false` per evitare card invisibili; micro-glow rosso `#D71920` (opacità 15%) al passaggio del mouse.
6. **Tracce Circuito SVG**: Linee vettoriali a circuito stampato animate con `stroke-dasharray` e `stroke-dashoffset` che si disegnano allo scorrimento.
7. **Contatori Numerici**: Conteggio numerico dinamico per anni di esperienza (20+), interventi Roma (3500+), tempo arrivo urgenze (60 min) e soddisfazione (99.4%).
8. **Partner Ksenia Security**: Box con focus sulla centrale `lares 4.0` e fotografia ad alta definizione del display touch (`assets/images/ksenia-panel.jpg`).
9. **Copertura Territoriale Roma & Hinterland**: Pillole interattive dei quartieri e comuni provinciali con sincronizzazione diretta verso il form contatti.
10. **Lead Form & Modale**: Validazione completa, feedback visivo di caricamento e modale di conferma invio.

## Riferimenti Ambiente & Strumenti di Sistema
- **Web Server Locale di Sviluppo**: `python -m http.server 8080` (avviato nella root del progetto).
- **Inno Setup Compiler (ISCC)**: `C:\Users\manue\AppData\Local\Programs\Inno Setup 6\ISCC.exe`
- **Cache-Busting Attivo**: Foglio di stile linkato con parametro di versione `css/style.css?v=2.1`.
