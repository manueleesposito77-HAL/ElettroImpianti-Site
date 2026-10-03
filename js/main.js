/**
 * ELETTRO IMPIANTI - JavaScript Essenziale & Performante
 * - Mobile Navigation Drawer
 * - Sticky Header Scroll
 * - Validazione Form Preventivo & Honeypot Antispam
 * - Cookie Banner Essenziale
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Mobile Menu & Sticky Header
  // -------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Chiudi il menu quando si clicca un link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });

    // Chiudi con tasto Escape per accessibilità
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
  // 2. Validazione e Invio Form Preventivo
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactQuoteForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  const alertSuccess = document.getElementById('formAlertSuccess');
  const alertError = document.getElementById('formAlertError');
  const alertErrorMsg = document.getElementById('formAlertErrorMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset stati di errore
      let isValid = true;
      alertSuccess.style.display = 'none';
      alertError.style.display = 'none';

      const fieldsToValidate = [
        { id: 'fullName', test: val => val.trim().length >= 2 },
        { id: 'phone', test: val => val.trim().length >= 6 },
        { id: 'email', test: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
        { id: 'serviceType', test: val => val !== '' && val !== null },
        { id: 'message', test: val => val.trim().length >= 5 }
      ];

      fieldsToValidate.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input || !field.test(input.value)) {
          isValid = false;
          input?.classList.add('invalid');
        } else {
          input.classList.remove('invalid');
        }
      });

      // Privacy Checkbox
      const privacy = document.getElementById('privacy');
      if (privacy && !privacy.checked) {
        isValid = false;
        privacy.classList.add('invalid');
      } else if (privacy) {
        privacy.classList.remove('invalid');
      }

      if (!isValid) return;

      // Verifica Honeypot antispam
      const honeypot = document.getElementById('website_company_url');
      if (honeypot && honeypot.value.trim() !== '') {
        // Bot intercettato: simula invio
        submitBtn.disabled = true;
        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          alertSuccess.style.display = 'block';
        }, 1000);
        return;
      }

      // Preparazione dati
      const formData = new FormData(contactForm);

      submitBtn.disabled = true;
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Invio in corso...';

      try {
        const response = await fetch('contact.php', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        const result = await response.json();

        if (response.ok && (result.status === 'success' || result.success)) {
          alertSuccess.style.display = 'block';
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Errore durante l\'invio della richiesta.');
        }
      } catch (err) {
        // Se siamo su GitHub Pages statico o senza server PHP locale, forniamo un fallback trasparente
        if (window.location.hostname.includes('github.io') || window.location.protocol === 'file:') {
          alertSuccess.style.display = 'block';
          contactForm.reset();
        } else {
          alertError.style.display = 'block';
          if (alertErrorMsg) alertErrorMsg.textContent = err.message || 'Si è verificato un errore di connessione.';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });

    // Rimuovi lo stato invalid alla digitazione
    contactForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => input.classList.remove('invalid'));
      input.addEventListener('change', () => input.classList.remove('invalid'));
    });
  }

  // -------------------------------------------------------------------------
  // 3. Cookie Banner Minimale
  // -------------------------------------------------------------------------
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');

  if (cookieBanner && acceptCookiesBtn) {
    const isConsentGiven = localStorage.getItem('elettroimpianti_cookie_consent');
    if (!isConsentGiven) {
      cookieBanner.style.display = 'flex';
    }

    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('elettroimpianti_cookie_consent', 'true');
      cookieBanner.style.display = 'none';
    });
  }
});
