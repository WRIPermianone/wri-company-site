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

  // Contact form: composes an email in the visitor's mail client.
  // No data is sent anywhere until the visitor sends the email themselves.
  const forms = document.querySelectorAll('[data-contact-form]');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.setAttribute('aria-invalid', 'true');
        } else {
          field.removeAttribute('aria-invalid');
        }
      });

      if (!valid) {
        if (status) {
          status.textContent = 'Please complete the required fields before continuing.';
          status.style.background = 'var(--danger)';
          status.classList.add('is-visible');
        }
        return;
      }

      const get = (name) => {
        const field = form.querySelector('[name="' + name + '"]');
        return field ? field.value.trim() : '';
      };

      const subject = 'Investor inquiry from warriorraceinvestments.com' + (get('topic') ? ' — ' + get('topic') : '');
      const message =
        'Name: ' + get('name') +
        '\nEmail: ' + get('email') +
        (get('phone') ? '\nPhone: ' + get('phone') : '') +
        (get('accredited') ? '\nAccredited investor: ' + get('accredited') : '') +
        '\n\n' + get('message');

      window.location.href =
        'mailto:info@warriorraceinvestments.com?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(message);

      if (status) {
        status.textContent = 'Your email application should now be open with your message prepared. If it did not open, email info@warriorraceinvestments.com directly.';
        status.style.background = 'var(--success)';
        status.classList.add('is-visible');
      }
      form.reset();
    });
  });
})();
