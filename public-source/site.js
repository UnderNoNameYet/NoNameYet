(() => {
  const data = {
    case: { eyebrow: 'CASE SETUP', title: 'Start with the exact reason.', text: 'Record the processor wording, amount, deadline, sale type, and transaction identifiers before writing a response.', html: '<div class="form-mock"><label>Processor<strong>Stripe</strong></label><label>Dispute reason<strong>Service not received</strong></label><label>Response deadline<strong>Aug 30, 2026</strong></label><label>Amount<strong>USD 480.00</strong></label></div>' },
    evidence: { eyebrow: 'EVIDENCE RULES', title: 'Ask for proof that fits.', text: 'Critical, strong, and supporting items change with the dispute reason and sale type. Missing proof caps readiness.', html: '<div class="e-row done"><span>✓</span><div><b>Transaction record</b><small>Invoice matched</small></div><em>Critical</em></div><div class="e-row done"><span>✓</span><div><b>Service scope</b><small>Proposal accepted</small></div><em>Critical</em></div><div class="e-row active"><span>3</span><div><b>Delivery record</b><small>Needs filename</small></div><em>Critical</em></div>' },
    timeline: { eyebrow: 'CHRONOLOGY', title: 'Resolve the dates first.', text: 'Put transaction, delivery, communication, and dispute events in order before generating the response.', html: '<div class="reason-stack"><button class="selected">Jul 31 · Scope accepted</button><button>Aug 01 · Invoice paid</button><button>Aug 07 · Workshop delivered</button><button>Aug 19 · Dispute received</button></div>' },
    packet: { eyebrow: 'FINAL OUTPUT', title: 'Export one consistent record.', text: 'The response, chronology, evidence index, and final checks are generated from the same local case.', html: '<div class="sample-sheet" style="transform:none;padding:20px"><div class="sheet-top"><span>RK-1042</span><span>94 / 100</span></div><small>POSITION</small><p>Records show the purchased service was fulfilled as agreed.</p><div class="sheet-index">6 evidence records indexed</div></div>' }
  };

  const tabs = document.querySelectorAll('[data-demo]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.toggle('active', item === tab));
    const state = data[tab.dataset.demo];
    document.querySelector('#demoEyebrow').textContent = state.eyebrow;
    document.querySelector('#demoTitle').textContent = state.title;
    document.querySelector('#demoText').textContent = state.text;
    const visual = document.querySelector('#demoVisual');
    visual.dataset.state = tab.dataset.demo;
    visual.innerHTML = state.html;
  }));

  const advance = document.querySelector('#heroAdvance');
  advance?.addEventListener('click', () => {
    const score = document.querySelector('#heroScore');
    const bar = document.querySelector('#scoreBar');
    const row = document.querySelector('.hero-stage .e-row.active');
    if (score.textContent === '82') {
      score.textContent = '94'; bar.style.width = '94%'; advance.textContent = 'Fulfillment marked ready';
      row?.classList.add('done'); row?.classList.remove('active');
      if (row) row.querySelector('span').textContent = '✓';
    }
  });

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  let installPrompt = null;
  const installButton = document.querySelector('#installApp');
  const guide = document.querySelector('#installGuide');
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event; });
  installButton?.addEventListener('click', async () => {
    if (installPrompt) { installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; }
    else guide?.showModal();
  });
  guide?.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => guide.close()));
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
})();
