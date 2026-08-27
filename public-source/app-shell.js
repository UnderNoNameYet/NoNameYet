(() => {
  const $ = selector => document.querySelector(selector);
  const updatePulse = () => {
    const score = Number($('#scoreValue')?.textContent || 0);
    if ($('#contextScore')) $('#contextScore').textContent = `${score}%`;
    if ($('#pulseFill')) $('#pulseFill').style.width = `${score}%`;
    const reason = $('#reason');
    if ($('#contextReason') && reason) $('#contextReason').textContent = reason.options[reason.selectedIndex]?.text || 'Not set';
    const deadline = $('#deadline')?.value;
    if ($('#contextDeadline')) $('#contextDeadline').textContent = deadline || 'Not set';
  };
  const observer = new MutationObserver(updatePulse);
  if ($('#scoreValue')) observer.observe($('#scoreValue'), { childList: true, subtree: true });
  ['reason', 'deadline'].forEach(id => $('#' + id)?.addEventListener('change', updatePulse));
  $('#focusMode')?.addEventListener('click', () => { document.body.classList.toggle('focus-mode'); $('#focusMode').textContent = document.body.classList.contains('focus-mode') ? 'Exit focus' : 'Focus'; });
  const help = $('#helpDialog');
  $('#helpButton')?.addEventListener('click', () => help?.showModal());
  help?.querySelector('[data-close]')?.addEventListener('click', () => help.close());
  if (new URLSearchParams(location.search).get('demo') === '1') setTimeout(() => $('#loadDemo')?.click(), 100);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
  const contextLinks = $('.context-links');
  if (contextLinks && !contextLinks.querySelector('[href="premium.html"]')) { const reviewLink = document.createElement('a'); reviewLink.href = 'premium.html'; reviewLink.textContent = 'Founder packet review · $69 ↗'; contextLinks.prepend(reviewLink); }
  updatePulse();
})();
