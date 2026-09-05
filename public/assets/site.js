(() => {
  'use strict';

  const menuButton = document.querySelector('[data-menu-button]');
  const navLinks = document.querySelector('[data-nav-links]');
  if (menuButton && navLinks) {
    const closeMenu = () => {
      navLinks.dataset.open = 'false';
      menuButton.setAttribute('aria-expanded', 'false');
    };
    menuButton.addEventListener('click', () => {
      const open = navLinks.dataset.open !== 'true';
      navLinks.dataset.open = String(open);
      menuButton.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  document.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = [...document.querySelectorAll('.reveal')];
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(node => node.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13 });
    reveals.forEach(node => observer.observe(node));
  }

  const config = window.TENANTBOUNDARY_CONFIG || {};
  const contactLink = document.querySelector('[data-contact-link]');
  if (contactLink && config.state === 'ready' && /^https:\/\//.test(config.contactUrl || '')) {
    contactLink.href = config.contactUrl;
    contactLink.hidden = false;
  }
  document.querySelectorAll('[data-launch-state]').forEach(node => {
    node.textContent = config.state === 'ready' ? 'Public service.' : 'Pre-launch preview.';
  });

  const form = document.querySelector('[data-scope-form]');
  if (!form) return;

  const packageParam = new URLSearchParams(window.location.search).get('package');
  if (packageParam === 'repair') {
    const repairChoice = form.querySelector('input[name="package"][value="repair"]');
    if (repairChoice) repairChoice.checked = true;
  }

  form.addEventListener('submit', event => event.preventDefault());

  const steps = [...form.querySelectorAll('[data-form-step]')];
  const indicators = [...document.querySelectorAll('[data-step-indicator]')];
  const status = form.querySelector('[data-form-status]');
  let activeStep = 0;

  function showStep(index) {
    activeStep = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, idx) => { step.hidden = idx !== activeStep; });
    indicators.forEach((item, idx) => { item.dataset.active = String(idx === activeStep); });
    const heading = steps[activeStep].querySelector('h2');
    if (heading && activeStep > 0) heading.focus({ preventScroll: true });
    if (status) status.textContent = `Step ${activeStep + 1} of ${steps.length}`;
  }

  function validateCurrentStep() {
    const fields = [...steps[activeStep].querySelectorAll('input, select, textarea')]
      .filter(field => !field.disabled && field.type !== 'hidden');
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }
    return true;
  }

  form.addEventListener('click', event => {
    const next = event.target.closest('[data-next-step]');
    const previous = event.target.closest('[data-prev-step]');
    if (next) {
      if (!validateCurrentStep()) return;
      if (activeStep === steps.length - 2) renderSummary();
      showStep(activeStep + 1);
    }
    if (previous) showStep(activeStep - 1);
  });

  function value(name) {
    const field = form.elements.namedItem(name);
    if (!field) return '';
    if (field instanceof RadioNodeList) return field.value;
    if (field.type === 'checkbox') return field.checked ? 'Yes' : 'No';
    return String(field.value || '').trim();
  }

  function selectedText(name) {
    const field = form.elements.namedItem(name);
    if (field instanceof HTMLSelectElement) return field.options[field.selectedIndex]?.text || '';
    return value(name);
  }

  function buildBrief() {
    const packageName = value('package') === 'repair'
      ? 'Verification + Repair — $649 published scope'
      : 'Boundary Verification — $349 published scope';
    const tables = Number(value('tables') || 0);
    const roles = Number(value('roles') || 0);
    const custom = (value('package') === 'repair' && tables > 25) ||
      (value('package') !== 'repair' && tables > 12) || roles > 3;
    const lines = [
      'TENANTBOUNDARY REVIEW BRIEF',
      '========================',
      '',
      `Package: ${packageName}${custom ? ' (manual quote required)' : ''}`,
      `Application: ${value('appName') || 'Not provided'}`,
      `Stack: ${selectedText('stack') || 'Not provided'}`,
      `Environment: ${selectedText('environment') || 'Not provided'}`,
      `Approximate tables: ${tables || 'Not provided'}`,
      `Application roles: ${roles || 'Not provided'}`,
      `Uses database functions/RPC: ${value('rpc') || 'Not provided'}`,
      `Uses Supabase Storage: ${value('storage') || 'Not provided'}`,
      '',
      'Boundary concern',
      value('concern') || 'Not provided',
      '',
      'Contact',
      `Name: ${value('contactName') || 'Not provided'}`,
      `Work email: ${value('contactEmail') || 'Not provided'}`,
      '',
      'Handling preference',
      'Staging or dedicated test project; synthetic identities; no secrets submitted through the public website.',
      '',
      'This brief is generated locally. It does not authorize testing and has not been transmitted.'
    ];
    return lines.join('\n');
  }

  function renderSummary() {
    const output = form.querySelector('[data-brief-output]');
    const quote = form.querySelector('[data-quote-note]');
    const brief = buildBrief();
    if (output) output.textContent = brief;
    if (quote) {
      const tables = Number(value('tables') || 0);
      const roles = Number(value('roles') || 0);
      const custom = (value('package') === 'repair' && tables > 25) ||
        (value('package') !== 'repair' && tables > 12) || roles > 3;
      quote.textContent = custom
        ? 'This scope exceeds the published package limits and requires a manual quote.'
        : 'This scope appears to fit the selected published package. Final scope is confirmed before any payment or access.';
    }
  }

  form.addEventListener('input', () => {
    if (activeStep === steps.length - 1) renderSummary();
  });
  form.addEventListener('change', () => {
    if (activeStep === steps.length - 1) renderSummary();
  });

  const copyButton = form.querySelector('[data-copy-brief]');
  copyButton?.addEventListener('click', async () => {
    const brief = buildBrief();
    try {
      await navigator.clipboard.writeText(brief);
      copyButton.textContent = 'Copied';
      setTimeout(() => { copyButton.textContent = 'Copy brief'; }, 1600);
    } catch {
      const output = form.querySelector('[data-brief-output]');
      if (output) {
        const range = document.createRange();
        range.selectNodeContents(output);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  });

  const downloadButton = form.querySelector('[data-download-brief]');
  downloadButton?.addEventListener('click', () => {
    const blob = new Blob([buildBrief()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tenantboundary-review-brief.txt';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  });

  showStep(0);
})();
