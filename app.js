// ===== Mobile menu toggle (fixed & consistent) =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  // Always hidden by default (no need for hidden attribute)
  mobileMenu.classList.remove('active');

  menuToggle.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    menuToggle.textContent = isActive ? 'Close' : 'Menu';
  });
}

// Footer year
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// Simple contact form handler (now posts to /api/contact)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
if (form && statusEl) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = Object.fromEntries(new FormData(form).entries());

    // Basic validation
    const required = ['name', 'email', 'game', 'rank', 'message'];
    const missing = required.filter(k => !payload[k] || String(payload[k]).trim() === '');
    if (missing.length) {
      statusEl.textContent = 'Please fill in all fields.';
      statusEl.style.color = '#fb7185';
      return;
    }
    if (!form.querySelector('input[name="consent"]') || !form.querySelector('input[name="consent"]').checked) {
      statusEl.textContent = 'Please agree to be contacted.';
      statusEl.style.color = '#fb7185';
      return;
    }

    try {
      statusEl.textContent = 'Sending…';
      statusEl.style.color = '';

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const ok = res.ok;
      let msg = 'Thanks! I\'ll get back to you within 24 hours.';
      try {
        const data = await res.json();
        if (!ok) throw new Error(data.error || 'Request failed');
        if (data && data.message) msg = data.message;
      } catch (_) {
        if (!ok) throw _;
      }

      statusEl.textContent = msg;
      statusEl.style.color = '#34d399';
      form.reset();
    } catch (err) {
      console.error(err);
      statusEl.textContent = 'Something went wrong. Please try again later.';
      statusEl.style.color = '#fb7185';
    }
  });
}

// Enhance details/summary for accordion (optional)
const acc = document.querySelector('[data-accordion]');
if (acc) {
  acc.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'summary') {
      const details = e.target.parentElement;
      acc.querySelectorAll('details[open]').forEach(d => {
        if (d !== details) d.removeAttribute('open');
      });
    }
  });
}
