(() => {
  const config = window.REBUTTALKIT_CONFIG || {};
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail || '');
  const identityReady = Boolean((config.businessName || '').trim() && (config.businessCountry || '').trim());
  const open = config.applicationsOpen === true && validEmail && identityReady;
  document.querySelectorAll('[data-operator-status]').forEach(node => {
    node.textContent = open
      ? `Service operator: ${config.businessName} · ${config.businessCountry} · ${config.contactEmail}`
      : 'Commercial applications are closed. Public operator contact is not configured on this version.';
    node.dataset.state = open ? 'open' : 'closed';
  });
})();
