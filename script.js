/**
 * ElettroImpianti - Script per interattività e gestione interfaccia
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Header background on scroll
  const siteHeader = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.style.borderBottomColor = 'rgba(0, 210, 255, 0.25)';
      siteHeader.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
    } else {
      siteHeader.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
      siteHeader.style.boxShadow = 'none';
    }
  });
});

// Form submission handler
function handleFormSubmit() {
  const form = document.getElementById('quoteForm');
  const feedback = document.getElementById('formSuccessMessage');
  const submitBtn = document.getElementById('submitFormBtn');

  if (!form || !feedback) return;

  // Simulate submission
  submitBtn.disabled = true;
  submitBtn.textContent = 'Invio in corso...';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Invia Richiesta Preventivo';
    feedback.classList.remove('hidden');

    setTimeout(() => {
      feedback.classList.add('hidden');
    }, 6000);
  }, 800);
}
