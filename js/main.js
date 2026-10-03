/**
 * ElettroImpianti Roma - Main Logic & GSAP ScrollTrigger Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Registrazione plugin GSAP
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initGsapAnimations();

    // Ricalcola le posizioni esatte di ScrollTrigger una volta caricate immagini, video e font
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
    // Secondo refresh di sicurezza dopo 500ms
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  } else {
    console.warn('GSAP o ScrollTrigger non disponibili. Fallback statico.');
  }

  // Gestione menu mobile
  initMobileNav();

  // Gestione modulo di contatto
  initContactForm();

  // Gestione pillole geografiche e filtro rapido
  initGeoPills();

  // Gestione modale di conformità EU AI Act (Regolamento UE 2024/1689)
  initAiActModal();
});

/**
 * Gestione Modale Informativo EU AI Act
 */
function initAiActModal() {
  const openBtn = document.getElementById('openAiActModalBtn');
  const modal = document.getElementById('aiActModal');
  const closeBtn1 = document.getElementById('closeAiActModalBtn');
  const closeBtn2 = document.getElementById('closeAiActModalBtn2');

  if (!modal || !openBtn) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn1) closeBtn1.addEventListener('click', closeModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

/**
 * Inizializzazione di tutte le animazioni GSAP e ScrollTrigger
 */
function initGsapAnimations() {
  // 1. Transizione Navbar Header allo scroll
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    ScrollTrigger.create({
      trigger: '#heroSection',
      start: 'top -60px',
      end: 'bottom top',
      onEnter: () => siteHeader.classList.add('scrolled'),
      onLeaveBack: () => siteHeader.classList.remove('scrolled'),
    });
  }

  // 2. Hero Section: Reveal Graduale Temporizzato
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .fromTo(
      '#heroKicker',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.75, delay: 0.1 }
    )
    .fromTo(
      '#heroTitle',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.45'
    )
    .fromTo(
      '#heroDescription',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.45'
    )
    .fromTo(
      '#heroCtaGroup',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.65 },
      '-=0.35'
    )
    .fromTo(
      '#heroTrustBadges',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    );

  // 3. Video Background Parallax Effect
  const heroVideo = document.getElementById('heroVideoWrapper');
  if (heroVideo) {
    gsap.to(heroVideo, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#heroSection',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }

  // 4. Striscia Certificazioni Reveal (fromTo con immediateRender: false per evitare elementi nascosti)
  gsap.fromTo(
    '.cert-badge-item',
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: '#certificationsStrip',
        start: 'top 95%',
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );

  // 5. Sezione Servizi: Animazione a cascata (stagger: 0.15s) per le 6 card
  const serviceCards = document.querySelectorAll('.service-card-item');
  if (serviceCards.length > 0) {
    gsap.fromTo(
      serviceCards,
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '#serviziSection',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );
  }

  // 6. Tracce Circuito (SVG) che si "disegnano" allo scorrimento
  const circuitLines = document.querySelectorAll('.circuit-line');
  circuitLines.forEach((line) => {
    gsap.to(line, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line.closest('section') || line,
        start: 'top 80%',
      },
    });
  });

  // 7. Contatori Numerici Animati
  const counterElements = document.querySelectorAll('.counter-val');
  counterElements.forEach((el) => {
    const targetValue = parseFloat(el.getAttribute('data-target') || '0');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: targetValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (targetValue % 1 === 0) {
              el.innerText = prefix + Math.floor(counterObj.val).toLocaleString('it-IT') + suffix;
            } else {
              el.innerText = prefix + counterObj.val.toFixed(1).replace('.', ',') + suffix;
            }
          },
        });
      },
    });
  });

  // 8. Sezione Ksenia Security Reveal
  gsap.fromTo(
    '#kseniaFeatureCard',
    { opacity: 0, scale: 0.97, y: 30 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: '#kseniaSection',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );

  // 9. Sezione Territorio & SEO Reveal
  gsap.fromTo(
    '#coverageSection .coverage-box',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: '#coverageSection',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function toggleMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    } else {
      mobileMenu.classList.remove('hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    });
  });
}

/**
 * Gestione Modulo Contatti & Lead Generation con Feedback Immediato
 */
function initContactForm() {
  const form = document.getElementById('leadContactForm');
  const feedbackModal = document.getElementById('contactFeedbackModal');
  const closeFeedbackBtn = document.getElementById('closeFeedbackBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.querySelector('[name="nome"]').value.trim();
    const telefono = form.querySelector('[name="telefono"]').value.trim();
    const servizio = form.querySelector('[name="servizio"]').value;

    if (!nome || !telefono || !servizio) {
      alert('Per favore compila tutti i campi obbligatori contrassegnati da asterisco (*).');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Invio richiesta in corso...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      if (feedbackModal) {
        feedbackModal.classList.remove('hidden');
        feedbackModal.classList.add('flex');
      } else {
        alert('Richiesta inviata con successo! Un nostro responsabile tecnico ti ricontatterà entro 24 ore lavorative.');
      }
    }, 1000);
  });

  if (closeFeedbackBtn && feedbackModal) {
    closeFeedbackBtn.addEventListener('click', () => {
      feedbackModal.classList.add('hidden');
      feedbackModal.classList.remove('flex');
    });
  }
}

/**
 * Click su pillola territorio imposta la zona nel modulo contatti
 */
function initGeoPills() {
  const pills = document.querySelectorAll('.city-pill');
  const zonaInput = document.getElementById('inputZona');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const areaName = pill.getAttribute('data-area') || pill.textContent.trim();
      if (zonaInput) {
        zonaInput.value = areaName;
        const contactSection = document.getElementById('contatti');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          zonaInput.focus();
        }
      }
    });
  });
}
