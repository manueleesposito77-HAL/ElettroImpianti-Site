/**
 * ELETTRO IMPIANTI - Main Front-End JavaScript (ES6+)
 * Performance & Conversion Focused:
 * - Intersection Observer for smooth reveal animations
 * - Sticky & dynamic header behavior
 * - Mobile Navigation drawer
 * - Interactive Domotics demo toggles
 * - Client-side form validation, Honeypot check & AJAX submission
 * - GDPR Cookie banner toggle with LocalStorage persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Mobile Navigation & Sticky Header Scroll
  // -------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header background transition
  const handleScroll = () => {
    if (window.scrollY > 30) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile menu toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });

    // Close menu with Esc key for accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        hamburgerBtn.focus();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. Intersection Observer for Scroll Reveal Animations
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-fade-up');

  // Verifica preferenza utente prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Se prefers-reduced-motion o no Observer, mostra direttamente
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // -------------------------------------------------------------------------
  // 3. Interactive Smart Home Controls (Domotica demo)
  // -------------------------------------------------------------------------
  const smartSwitches = document.querySelectorAll('.smart-switch');
  smartSwitches.forEach(sw => {
    sw.addEventListener('click', () => {
      const isOn = sw.getAttribute('data-state') === 'on';
      sw.setAttribute('data-state', isOn ? 'off' : 'on');
      sw.style.background = isOn ? '#334155' : 'var(--color-accent)';
      const indicator = sw.querySelector('span');
      if (indicator) {
        indicator.style.transform = isOn ? 'translateX(-20px)' : 'translateX(0)';
      }
    });
  });

  // -------------------------------------------------------------------------
  // 4. Contact Form Validation & Asynchronous Submission
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactQuoteForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  const alertSuccess = document.getElementById('formAlertSuccess');
  const alertError = document.getElementById('formAlertError');
  const alertErrorMsg = document.getElementById('formAlertErrorMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Nascondi alert precedenti
      alertSuccess.style.display = 'none';
      alertError.style.display = 'none';

      // Honeypot check antispam client-side
      const hpField = document.getElementById('website_company_url');
      if (hpField && hpField.value.trim() !== '') {
        // Bot intercettato: simula risposta positiva
        alertSuccess.style.display = 'flex';
        contactForm.reset();
        return;
      }

      // Validazione campi
      let isValid = true;
      const requiredInputs = contactForm.querySelectorAll('[required]');

      requiredInputs.forEach(input => {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (!input.checkValidity() || input.value.trim() === '') {
          isValid = false;
          input.classList.add('error');
          if (errorEl) errorEl.classList.add('active');
        } else {
          input.classList.remove('error');
          if (errorEl) errorEl.classList.remove('active');
        }

        // Rimozione stato errore all'input
        input.addEventListener('input', () => {
          input.classList.remove('error');
          if (errorEl) errorEl.classList.remove('active');
        }, { once: true });
      });

      // Validazione email specifica
      const emailInput = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        emailInput.classList.add('error');
        const emailErr = document.getElementById('email-error');
        if (emailErr) emailErr.classList.add('active');
      }

      // Validazione checkbox Privacy
      const privacyCheck = document.getElementById('privacy');
      if (privacyCheck && !privacyCheck.checked) {
        isValid = false;
        const privacyErr = document.getElementById('privacy-error');
        if (privacyErr) privacyErr.classList.add('active');
      }

      if (!isValid) {
        if (alertErrorMsg) alertErrorMsg.textContent = 'Verifica i campi evidenziati prima di inviare.';
        alertError.style.display = 'flex';
        return;
      }

      // Preparazione dati
      const formData = new FormData(contactForm);
      const dataObj = Object.fromEntries(formData.entries());

      // Stato loading del pulsante
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-loading-spinner"></span> Invio richiesta...';

      try {
        const response = await fetch('contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(dataObj)
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok && result.status === 'success') {
          contactForm.reset();
          alertSuccess.style.display = 'flex';
          alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          throw new Error(result.message || 'Si è verificato un errore durante l\'invio.');
        }
      } catch (err) {
        // Gestione fallback se il server PHP non è presente in dev locale o fallisce la mail
        if (window.location.protocol === 'file:') {
          // Simulazione locale in caso di apertura diretta del file HTML
          contactForm.reset();
          alertSuccess.style.display = 'flex';
          alertSuccess.innerHTML = '<strong>✅ [Simulazione Locale]:</strong> Richiesta registrata con successo (eseguire con PHP per invio mail effettivo).';
        } else {
          if (alertErrorMsg) alertErrorMsg.textContent = err.message || 'Errore di connessione. Riprova o chiamaci direttamente.';
          alertError.style.display = 'flex';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. GDPR Cookie Consent Banner
  // -------------------------------------------------------------------------
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookieBtn = document.getElementById('acceptCookiesBtn');
  const declineCookieBtn = document.getElementById('declineCookiesBtn');

  if (cookieBanner) {
    const consent = localStorage.getItem('elettro_cookie_consent');
    if (!consent) {
      // Mostra banner dopo breve delay non invasivo
      setTimeout(() => {
        cookieBanner.classList.add('active');
      }, 1200);
    }

    acceptCookieBtn?.addEventListener('click', () => {
      localStorage.setItem('elettro_cookie_consent', 'accepted');
      cookieBanner.classList.remove('active');
    });

    declineCookieBtn?.addEventListener('click', () => {
      localStorage.setItem('elettro_cookie_consent', 'declined');
      cookieBanner.classList.remove('active');
    });
  }
});
