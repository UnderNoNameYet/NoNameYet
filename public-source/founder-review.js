(() => {
  const config = window.REBUTTALKIT_CONFIG || {};
  const form = document.querySelector('#fitForm');
  const result = document.querySelector('#requestResult');
  const requestText = document.querySelector('#requestText');
  const status = document.querySelector('#formStatus');
  const emailLink = document.querySelector('#emailRequest');
  const configNote = document.querySelector('#configurationNote');
  const deadline = form?.elements.deadline;
  const context = form?.elements.context;
  const contextCount = document.querySelector('#contextCount');
  const price = Number(config.servicePriceUsd || 69);
  const turnaround = Number(config.turnaroundHours || 48);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail || '');
  const validPayment = /^https:\/\//.test(config.paymentUrl || '');
  const identityReady = Boolean((config.businessName || '').trim() && (config.businessCountry || '').trim());
  const applicationsOpen = config.applicationsOpen === true && validEmail && identityReady;
  const acceptedRoute = new URLSearchParams(location.search).get('accepted') === '1';
  document.querySelectorAll('[data-price]').forEach(node => { node.textContent = String(price); });
  document.querySelectorAll('[data-turnaround]').forEach(node => { node.textContent = `Within ${turnaround} hours`; });
  const reviewSampleLink = document.querySelector('.hero-actions .button.secondary');
  if (reviewSampleLink) { reviewSampleLink.href = 'review-sample.html'; reviewSampleLink.textContent = 'See a fictional review ↗'; }
  const closingSampleLink = document.querySelector('.closing div > a:not(.button)');
  if (closingSampleLink) { closingSampleLink.href = 'review-sample.html'; closingSampleLink.textContent = 'See the fictional review →'; }
  const paymentLink = document.querySelector('[data-payment-link]');
  if (paymentLink) { paymentLink.hidden = true; paymentLink.style.display = 'none'; if (applicationsOpen && acceptedRoute && validPayment) { paymentLink.href = config.paymentUrl; paymentLink.hidden = false; paymentLink.style.display = 'block'; } }
  const isoToday = () => { const now = new Date(); const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000); return local.toISOString().slice(0, 10); };
  if (deadline) deadline.min = isoToday();
  context?.addEventListener('input', () => { if (contextCount) contextCount.textContent = String(context.value.length); });
  deadline?.addEventListener('change', () => { const hint = document.querySelector('#deadlineHint'); if (!hint || !deadline.value) return; const end = new Date(`${deadline.value}T23:59:59`); const days = Math.ceil((end - new Date()) / 86400000); hint.textContent = days < 0 ? 'That deadline has passed; this review is not a fit.' : `${days} day${days === 1 ? '' : 's'} remaining. Confirm this against the processor portal.`; hint.style.color = days < 3 ? '#f0b2aa' : ''; });
  const selectedEvidence = () => [...form.querySelectorAll('input[name="evidence"]:checked')].map(input => input.value);
  const buildRequest = data => { const evidence = selectedEvidence(); return ['REBUTTALKIT — COMPATIBILITY CHECK','',`Processor: ${data.get('processor')}`,`Dispute reason: ${data.get('reason')}`,`Sale type: ${data.get('saleType')}`,`Amount range: ${data.get('amountBand')}`,`Evidence deadline: ${data.get('deadline')}`,`Records available: ${evidence.length ? evidence.join('; ') : 'None selected'}`,`What makes the case difficult: ${data.get('context')?.trim() || 'Not provided'}`,'','Privacy confirmation: This request contains no customer names, card data, transaction IDs, evidence files, processor credentials, or private communications.','',`Requested service: One founder packet review at $${price} USD, only if accepted after this compatibility check.`,'I understand this is an organization and clarity service, not legal advice, processor representation, or an outcome guarantee.'].join('\n'); };
  form?.addEventListener('submit', event => { event.preventDefault(); if (!form.reportValidity()) return; const data = new FormData(form); const text = buildRequest(data); requestText.textContent = text; result.hidden = false; result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }); if (applicationsOpen) { const subject = `RebuttalKit compatibility check — ${data.get('processor')} / ${data.get('reason')}`; emailLink.href = `mailto:${config.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`; emailLink.hidden = false; emailLink.style.display = 'inline-flex'; configNote.textContent = `Your email app will address this request to ${config.businessName}. Review it before sending.`; status.textContent = 'Request prepared. Nothing has been sent automatically.'; } else { emailLink.hidden = true; emailLink.style.display = 'none'; configNote.textContent = 'Founder applications are not open yet. Copy this request and keep it; the public review route will appear here when operations are ready.'; status.textContent = 'Request prepared locally. Applications are currently closed.'; } });
  document.querySelector('#copyRequest')?.addEventListener('click', async event => { try { await navigator.clipboard.writeText(requestText.textContent); event.currentTarget.textContent = 'Copied'; setTimeout(() => { event.currentTarget.textContent = 'Copy request'; }, 1800); } catch { const range = document.createRange(); range.selectNodeContents(requestText); const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range); event.currentTarget.textContent = 'Selected — copy now'; } });
})();
