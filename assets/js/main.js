(function () {
  const body = document.body;
  const toggle = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelectorAll('.main-nav a');
  const year = document.querySelector('[data-year]');

  if (year) year.textContent = new Date().getFullYear();

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      body.classList.remove('menu-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Contact form: validates client-side, then submits natively to
  // /api/contact, which creates the GoHighLevel contact, tags it
  // "WRI Website Inquiry", emails the team, and redirects to thank-you.html.
  const forms = document.querySelectorAll('[data-contact-form]');

  function buildContactAutoresponse(firstName) {
    return [
      'Hello ' + (firstName || 'there') + ',',
      '',
      'Thank you for reaching out to Warrior Race Investments. We have received your message and a member of our team will reply personally, typically within one business day.',
      '',
      'If your question is time-sensitive, you are welcome to call the office directly.',
      '',
      'Best regards,',
      '',
      'DALTON ORTIZ | Founder / Managing Partner',
      'Office: 214-427-5197',
      'Email: dalton@warriorraceinvestments.com',
      'Website: https://warriorraceinvestments.com',
      '',
      '--------------------------------------------------',
      'CONFIDENTIALITY AND RISK NOTICE',
      '--------------------------------------------------',
      'Accredited investors only. Confidential. Educational material only, not an offer to sell or a solicitation to buy any security. Oil and gas investments involve a high degree of risk, including potential loss of the entire investment. WRI is not a registered investment advisor, broker-dealer, or tax advisor. Consult your own legal, tax, and financial advisors before investing.'
    ].join('\r\n');
  }

  forms.forEach((form) => {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (event) => {
      const status = form.querySelector('[data-form-status]');
      const required = form.querySelectorAll('[required]');
      let valid = true;
      let firstInvalid = null;

      required.forEach((field) => {
        const filled = field.value.trim().length > 0;
        const typeOk = !(field.type === 'email') || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        if (!filled || !typeOk) {
          valid = false;
          field.setAttribute('aria-invalid', 'true');
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.removeAttribute('aria-invalid');
        }
      });

      if (!valid) {
        event.preventDefault();
        if (status) {
          status.textContent = 'Please complete the required fields with a valid email before continuing.';
          status.style.background = 'var(--danger)';
          status.classList.add('is-visible');
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Personalise the confirmation email the sender receives.
      const autoresponse = form.querySelector('#contactAutoresponse');
      if (autoresponse) {
        const nameField = form.querySelector('[name="name"]');
        const first = nameField ? nameField.value.trim().split(/\s+/)[0] : '';
        autoresponse.value = buildContactAutoresponse(first);
      }

      // Let the browser POST the form. Guard against double submission.
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending\u2026';
      }
      if (status) {
        status.textContent = 'Sending your message\u2026';
        status.style.background = 'var(--success)';
        status.classList.add('is-visible');
      }
    });
  });
})();
