(() => {
  const detail = document.querySelector('#traceDetail');
  const score = document.querySelector('#traceScore');
  const progress = document.querySelector('#traceProgress');
  const copy = {
    scope: ['EVIDENCE 01', 'Scope accepted.', 'The signed proposal defines the purchased service, delivery method, and expected timing.'],
    payment: ['EVIDENCE 02', 'Invoice paid.', 'The processor transaction and invoice connect the amount, date, customer, and case identifier.'],
    delivery: ['EVIDENCE 03', 'Workshop delivered.', 'Calendar confirmation and attendance record connect the accepted scope to dated fulfillment.'],
    brief: ['EVIDENCE 04', 'Written brief delivered.', 'Delivery email and document-access record show the final work was made available.']
  };

  document.querySelectorAll('.event').forEach((event, index) => event.addEventListener('click', () => {
    document.querySelectorAll('.event').forEach(item => item.classList.remove('active'));
    event.classList.add('active');
    const [label, title, text] = copy[event.dataset.event];
    detail.querySelector('.detail-index').textContent = label;
    detail.querySelector('p').innerHTML = `<b>${title}</b> ${text}`;
    progress.style.strokeDashoffset = String(680 - index * 180);
  }));

  document.querySelector('#markReady')?.addEventListener('click', event => {
    const active = document.querySelector('.event.active');
    active?.classList.add('complete');
    score.textContent = '94%';
    progress.style.strokeDashoffset = '0';
    event.currentTarget.textContent = 'Record verified ✓';
  });

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.animate([{opacity: 0, transform: 'translateY(18px)'}, {opacity: 1, transform: 'none'}], {duration: 520, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both'});
      observer.unobserve(entry.target);
    }), {threshold: .1});
    document.querySelectorAll('.workflow-steps article,.app-frame,.packet-page,.privacy-grid article').forEach(element => observer.observe(element));
  }

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    addEventListener('load', () => navigator.serviceWorker.register('./sw.js', {updateViaCache: 'none'}).catch(() => {}));
  }
})();
