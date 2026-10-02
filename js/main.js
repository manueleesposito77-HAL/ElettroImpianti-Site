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
  // 3. Interactive Smart Home Controls (Domotica demo & Telemetria)
  // -------------------------------------------------------------------------
  const smartSwitches = document.querySelectorAll('.smart-switch');
  const lightDesc = document.getElementById('lightScenarioDesc');
  const climateDesc = document.getElementById('climateDesc');
  const blindsDesc = document.getElementById('blindsDesc');
  const powerLoadDesc = document.getElementById('powerLoadDesc');
  const powerBadge = document.getElementById('powerLoadBadge');

  const updatePowerTelemetry = () => {
    let baseLoad = 0.4; // Standby elettrodomestici
    const lightOn = document.getElementById('switchLight')?.getAttribute('data-state') === 'on';
    const climateOn = document.getElementById('switchClimate')?.getAttribute('data-state') === 'on';
    const blindsOn = document.getElementById('switchBlinds')?.getAttribute('data-state') === 'on';

    if (lightOn) baseLoad += 0.3;
    if (climateOn) baseLoad += 0.7;
    if (blindsOn) baseLoad += 0.1;

    const formattedLoad = baseLoad.toFixed(1);
    if (powerLoadDesc) {
      powerLoadDesc.textContent = `Carico attuale: ${formattedLoad} kW / 3.3 kW (${baseLoad > 1.2 ? 'Normale' : 'Basso consumo'})`;
    }
  };

  smartSwitches.forEach(sw => {
    sw.addEventListener('click', (e) => {
      e.preventDefault();
      const currentState = sw.getAttribute('data-state');
      const isCurrentlyOn = currentState === 'on';
      const newState = isCurrentlyOn ? 'off' : 'on';
      sw.setAttribute('data-state', newState);

      // Aggiornamento descrizioni contestuali
      if (sw.id === 'switchLight' && lightDesc) {
        lightDesc.textContent = newState === 'on' ? 'Luci calde al 40% (Attivo)' : 'Luci spente (Standby)';
      } else if (sw.id === 'switchClimate' && climateDesc) {
        climateDesc.textContent = newState === 'on' ? 'Climatizzazione costante a 20.5°C' : 'Termostato spento';
      } else if (sw.id === 'switchBlinds' && blindsDesc) {
        blindsDesc.textContent = newState === 'on' ? 'Chiusura programmata al tramonto' : 'Controllo manuale';
      }

      updatePowerTelemetry();
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
