(() => {
  'use strict';

  const STORAGE_KEY = 'rebuttalkit.case.v1';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const reasonInfo = {
    not_received: {
      label: 'Product or service not received',
      hint: 'Prove what was promised, when it was delivered, and what the customer did after delivery.',
      position: 'The merchant records show that the purchased item or service was fulfilled as agreed.'
    },
    duplicate: {
      label: 'Duplicate charge',
      hint: 'Show that each charge maps to a separate order, invoice, date, or authorization—or identify the actual reversal.',
      position: 'The records distinguish the disputed transaction from any other charge and show its separate purpose.'
    },
    fraud: {
      label: 'Fraudulent / cardholder does not recognize',
      hint: 'Connect the customer to the order using consistent identity, device, communication, and fulfillment records.',
      position: 'The transaction and fulfillment records consistently connect the customer to the purchase.'
    },
    credit: {
      label: 'Credit not processed',
      hint: 'Document the refund policy, whether a refund was due, and any refund or reversal reference already issued.',
      position: 'The merchant records show the applicable refund terms and the actual status of any credit.'
    },
    recurring: {
      label: 'Canceled recurring transaction',
      hint: 'Establish consent, renewal terms, cancellation timing, and whether service continued after the charge.',
      position: 'The subscription records show the authorization, renewal terms, and cancellation timeline for this charge.'
    },
    not_as_described: {
      label: 'Product unacceptable / not as described',
      hint: 'Compare the promised scope with what was delivered, including acceptance, use, revisions, or return handling.',
      position: 'The supplied records compare the agreed description with the item or service actually delivered.'
    },
    general: {
      label: 'General',
      hint: 'Build a short transaction-to-fulfillment chronology and attach only evidence relevant to the portal reason.',
      position: 'The merchant records support the transaction and the fulfillment described below.'
    }
  };

  const commonEvidence = [
    { id: 'dispute_notice', title: 'Dispute notice and deadline', description: 'The processor notice, exact reason wording, amount, and response deadline.', weight: 'critical' },
    { id: 'transaction_record', title: 'Transaction record', description: 'Charge, order, invoice, or receipt showing date, amount, customer, and identifier.', weight: 'critical' },
    { id: 'customer_communication', title: 'Customer communication', description: 'Relevant messages before and after purchase, kept in chronological order.', weight: 'strong' }
  ];

  const reasonEvidence = {
    not_received: [
      { id: 'promise_record', title: 'Agreement or item description', description: 'What was promised, including scope, delivery method, and timing.', weight: 'critical' },
      { id: 'fulfillment_proof', title: 'Fulfillment or delivery proof', description: 'Tracking, delivery confirmation, access log, handoff record, or completed work.', weight: 'critical' },
      { id: 'delivery_ack', title: 'Customer acknowledgment', description: 'A message, login, download, approval, or other action after delivery.', weight: 'strong' }
    ],
    duplicate: [
      { id: 'charge_comparison', title: 'Charge-by-charge comparison', description: 'Separate IDs, dates, amounts, invoices, and purposes for each charge.', weight: 'critical' },
      { id: 'separate_orders', title: 'Separate order or authorization records', description: 'Proof that each valid charge arose from a distinct purchase.', weight: 'critical' },
      { id: 'reversal_record', title: 'Reversal or refund status', description: 'Any void, reversal, or refund reference tied to the alleged duplicate.', weight: 'strong' }
    ],
    fraud: [
      { id: 'identity_match', title: 'Customer identity match', description: 'Consistent name, email, address, account, and billing details.', weight: 'critical' },
      { id: 'device_record', title: 'Device or session record', description: 'IP, device, login, authentication, or prior trusted-session evidence.', weight: 'strong' },
      { id: 'prior_history', title: 'Prior undisputed history', description: 'Earlier successful orders or communications with the same customer details.', weight: 'strong' }
    ],
    credit: [
      { id: 'refund_policy', title: 'Refund policy accepted at purchase', description: 'The policy version and evidence it was visible or accepted.', weight: 'critical' },
      { id: 'refund_eligibility', title: 'Refund eligibility record', description: 'Facts showing whether the request met the stated terms.', weight: 'critical' },
      { id: 'refund_reference', title: 'Refund or reversal reference', description: 'Processor reference, date, amount, and destination when a credit was issued.', weight: 'strong' }
    ],
    recurring: [
      { id: 'subscription_consent', title: 'Subscription consent', description: 'The checkout, contract, or confirmation showing recurring authorization.', weight: 'critical' },
      { id: 'renewal_terms', title: 'Renewal and cancellation terms', description: 'Terms presented to the customer, including notice and timing.', weight: 'critical' },
      { id: 'cancellation_timeline', title: 'Cancellation timeline', description: 'When cancellation was requested, processed, and became effective.', weight: 'strong' }
    ],
    not_as_described: [
      { id: 'description_at_sale', title: 'Description at the time of sale', description: 'Listing, proposal, scope, specifications, or contract accepted at purchase.', weight: 'critical' },
      { id: 'delivered_comparison', title: 'Delivered item or work comparison', description: 'Photos, files, specs, or work product mapped to the agreed description.', weight: 'critical' },
      { id: 'acceptance_use', title: 'Acceptance, use, or revision history', description: 'Customer approval, use, feedback, revisions, or return handling.', weight: 'strong' }
    ],
    general: [
      { id: 'agreement', title: 'Agreement or purchase terms', description: 'The terms, listing, proposal, or invoice accepted by the customer.', weight: 'critical' },
      { id: 'fulfillment', title: 'Fulfillment record', description: 'Evidence that the product, service, access, or subscription was delivered.', weight: 'critical' },
      { id: 'support_record', title: 'Support and resolution record', description: 'Relevant attempts to address the customer concern.', weight: 'strong' }
    ]
  };

  const saleEvidence = {
    service: [
      { id: 'service_scope', title: 'Service scope and acceptance', description: 'Proposal, contract, booking, or written scope accepted by the customer.', weight: 'critical' },
      { id: 'work_product', title: 'Work product or completion record', description: 'Deliverables, session log, completion email, approval, or revision history.', weight: 'strong' }
    ],
    digital: [
      { id: 'digital_access', title: 'Download or access log', description: 'Timestamped delivery, download, login, license, or activation record.', weight: 'critical' },
      { id: 'digital_terms', title: 'Digital delivery and refund terms', description: 'Terms visible at purchase for immediate or licensed digital access.', weight: 'strong' }
    ],
    physical: [
      { id: 'carrier_tracking', title: 'Carrier tracking and destination', description: 'Tracking events, delivered status, address match, and delivery date.', weight: 'critical' },
      { id: 'item_record', title: 'Item and package record', description: 'SKU, serial number, packing record, weight, or delivery photo.', weight: 'strong' }
    ],
    subscription: [
      { id: 'account_usage', title: 'Account access or usage', description: 'Login, session, consumption, or service-availability records for the billed period.', weight: 'critical' },
      { id: 'billing_notice', title: 'Billing confirmation or renewal notice', description: 'Receipt, reminder, account page, or notice tied to the renewal.', weight: 'strong' }
    ]
  };

  const blankState = () => ({
    version: 1,
    processor: 'Stripe',
    reason: 'not_received',
    saleType: 'service',
    deadline: '',
    caseId: '',
    currency: 'USD',
    amount: '',
    merchant: '',
    customer: '',
    transactionDate: '',
    transactionId: '',
    description: '',
    reasonText: '',
    evidence: {},
    timeline: [],
    updatedAt: new Date().toISOString()
  });

  let state = loadState();
  let activeStep = 1;

  const fieldIds = ['processor', 'reason', 'saleType', 'deadline', 'caseId', 'currency', 'amount', 'merchant', 'customer', 'transactionDate', 'transactionId', 'description', 'reasonText'];
  const requiredIds = ['processor', 'reason', 'saleType', 'deadline', 'caseId', 'amount', 'merchant', 'transactionDate', 'description'];

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved && saved.version === 1 ? { ...blankState(), ...saved, evidence: saved.evidence || {}, timeline: saved.timeline || [] } : blankState();
    } catch (_) {
      return blankState();
    }
  }

  function saveState() {
    state.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      toast('Browser storage is full. Export a JSON backup.');
    }
  }

  function currentEvidence() {
    const merged = [...commonEvidence, ...(reasonEvidence[state.reason] || reasonEvidence.general), ...(saleEvidence[state.saleType] || [])];
    const seen = new Set();
    return merged.filter(item => !seen.has(item.id) && seen.add(item.id));
  }

  function hydrateForm() {
    fieldIds.forEach(id => {
      const element = $('#' + id);
      if (element) element.value = state[id] ?? '';
    });
  }

  function readForm() {
    fieldIds.forEach(id => {
      const element = $('#' + id);
      if (element) state[id] = element.value;
    });
  }

  function showStep(step, scroll = false) {
    activeStep = Number(step);
    $$('.app-step').forEach(section => section.classList.toggle('active', Number(section.dataset.step) === activeStep));
    $$('.step-link').forEach(button => button.classList.toggle('active', Number(button.dataset.stepTarget) === activeStep));
    if (activeStep === 4) buildOutputs();
    if (scroll) $('#builder').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderEvidence() {
    const info = reasonInfo[state.reason] || reasonInfo.general;
    $('#reasonTitle').textContent = info.label;
    $('#reasonHint').textContent = info.hint;
    const list = $('#evidenceList');
    list.textContent = '';

    currentEvidence().forEach(item => {
      if (!state.evidence[item.id]) state.evidence[item.id] = { status: 'missing', note: '' };
      const saved = state.evidence[item.id];
      const article = document.createElement('article');
      article.className = 'evidence-item';
      article.dataset.id = item.id;
      article.dataset.weight = item.weight;
      article.innerHTML = `
        <div class="evidence-top">
          <span class="weight-bar" aria-hidden="true"></span>
          <div class="evidence-copy"><b>${item.title}</b><small>${item.description}</small></div>
          <div class="status-group" aria-label="Evidence status">
            <button type="button" data-status="have">Have</button>
            <button type="button" data-status="missing">Missing</button>
            <button type="button" data-status="na">N/A</button>
          </div>
        </div>
        <input class="evidence-note" maxlength="240" aria-label="Note for ${item.title}" placeholder="Record name, page, filename, or factual note">
      `;
      $('.evidence-note', article).value = saved.note || '';
      $$('[data-status]', article).forEach(button => button.classList.toggle('active', button.dataset.status === saved.status));
      list.appendChild(article);
    });
    updateAll();
  }

  function renderTimeline() {
    const list = $('#timelineList');
    list.textContent = '';
    const events = [...state.timeline].sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    if (!events.length) {
      list.className = 'timeline-list empty-state';
      const p = document.createElement('p');
      p.textContent = 'No events yet. Add the transaction, fulfillment, customer contact, and dispute dates.';
      list.appendChild(p);
    } else {
      list.className = 'timeline-list';
      events.forEach(event => {
        const row = document.createElement('article');
        row.className = 'timeline-event';
        const time = document.createElement('time');
        time.dateTime = event.date;
        time.textContent = formatDate(event.date);
        const dot = document.createElement('span');
        dot.className = 'event-dot';
        const copy = document.createElement('div');
        const title = document.createElement('b');
        title.textContent = event.title;
        const detail = document.createElement('small');
        detail.textContent = event.detail || 'No additional note.';
        copy.append(title, detail);
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'remove-event';
        remove.dataset.removeEvent = event.id;
        remove.setAttribute('aria-label', `Remove ${event.title}`);
        remove.textContent = 'Remove';
        row.append(time, dot, copy, remove);
        list.appendChild(row);
      });
    }
    $('#timelineCount').textContent = `${state.timeline.length} event${state.timeline.length === 1 ? '' : 's'}`;
  }

  function scoreCase() {
    const requiredComplete = requiredIds.filter(id => String(state[id] || '').trim()).length;
    const requiredScore = Math.round((requiredComplete / requiredIds.length) * 30);
    const items = currentEvidence();
    const weights = { critical: 3, strong: 2, supporting: 1 };
    let earned = 0;
    let possible = 0;
    let criticalMissing = 0;
    let have = 0;

    items.forEach(item => {
      const status = state.evidence[item.id]?.status || 'missing';
      if (status === 'na') return;
      const weight = weights[item.weight] || 1;
      possible += weight;
      if (status === 'have') {
        earned += weight;
        have += 1;
      } else if (item.weight === 'critical') {
        criticalMissing += 1;
      }
    });

    const evidenceScore = possible ? Math.round((earned / possible) * 55) : 0;
    const timelineScore = Math.min(state.timeline.length, 3) / 3 * 10;
    const deadlineScore = state.deadline ? 5 : 0;
    let score = Math.round(requiredScore + evidenceScore + timelineScore + deadlineScore);
    if (requiredComplete < requiredIds.length) score = Math.min(score, 40);
    if (criticalMissing) score = Math.min(score, 69);
    return { score, requiredComplete, criticalMissing, have, total: items.length };
  }

  function updateAll() {
    const result = scoreCase();
    $('#scoreValue').textContent = result.score;
    $('#scoreRing').style.setProperty('--score', `${result.score}%`);
    $('#scoreMessage').textContent = result.criticalMissing ? `${result.criticalMissing} critical gap${result.criticalMissing === 1 ? '' : 's'} remain.` : result.score >= 80 ? 'Strong organization. Run final checks.' : 'Keep building the record.';
    $('#evidenceCount').textContent = `${result.have} of ${result.total} marked have`;
    $('#caseToolbarName').textContent = state.caseId || state.merchant || 'Untitled dispute';
    updateDeadline();
    if (activeStep === 4) buildOutputs();
  }

  function updateDeadline() {
    const chip = $('#deadlineChip');
    chip.classList.remove('urgent');
    if (!state.deadline) {
      chip.textContent = 'No deadline set';
      return;
    }
    const due = new Date(`${state.deadline}T23:59:59`);
    const days = Math.ceil((due - new Date()) / 86400000);
    if (days < 0) {
      chip.textContent = `Deadline passed ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} ago`;
      chip.classList.add('urgent');
    } else if (days === 0) {
      chip.textContent = 'Due today';
      chip.classList.add('urgent');
    } else {
      chip.textContent = `${days} day${days === 1 ? '' : 's'} remaining`;
      if (days <= 3) chip.classList.add('urgent');
    }
  }

  function buildOutputs() {
    const result = scoreCase();
    const info = reasonInfo[state.reason] || reasonInfo.general;
    const amount = formatMoney(state.amount, state.currency);
    const timeline = [...state.timeline].sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    const haveItems = currentEvidence().filter(item => state.evidence[item.id]?.status === 'have');
    const missingCritical = currentEvidence().filter(item => item.weight === 'critical' && state.evidence[item.id]?.status === 'missing');

    const chronology = timeline.length
      ? timeline.map(event => `- ${formatDate(event.date)} — ${event.title}${event.detail ? `: ${event.detail}` : ''}`).join('\n')
      : '- No chronology has been entered yet.';
    const evidenceLines = haveItems.length
      ? haveItems.map((item, index) => `${index + 1}. ${item.title}${state.evidence[item.id]?.note ? ` — ${state.evidence[item.id].note}` : ''}`).join('\n')
      : 'No evidence has been marked as available.';

    const response = [
      `SUBJECT: Response to ${info.label} dispute${state.caseId ? ` — ${state.caseId}` : ''}`,
      '',
      `Merchant: ${state.merchant || '[merchant not entered]'}`,
      `Processor: ${state.processor || '[processor not entered]'}`,
      `Disputed amount: ${amount}`,
      `Transaction date: ${formatDate(state.transactionDate)}`,
      `Transaction / order ID: ${state.transactionId || '[not entered]'}`,
      `Customer: ${state.customer || '[not entered]'}`,
      '',
      'POSITION',
      info.position,
      state.description ? `The transaction was for: ${state.description}` : 'The product or service description has not been entered.',
      state.reasonText ? `Processor notice context: ${state.reasonText}` : '',
      '',
      'CHRONOLOGY',
      chronology,
      '',
      'EVIDENCE INDEX',
      evidenceLines,
      '',
      'REQUESTED REVIEW',
      'Please review the transaction, chronology, and referenced evidence together. This response is limited to the merchant records listed above.'
    ].filter(line => line !== null).join('\n');

    $('#responseDraft').textContent = response;
    const index = $('#evidenceIndex');
    index.textContent = '';
    if (!haveItems.length) {
      const li = document.createElement('li');
      li.textContent = 'No evidence marked “Have.”';
      index.appendChild(li);
    } else {
      haveItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title}${state.evidence[item.id]?.note ? ` — ${state.evidence[item.id].note}` : ''}`;
        index.appendChild(li);
      });
    }

    const checks = [
      { ok: requiredIds.every(id => String(state[id] || '').trim()), text: 'All required case fields are complete.' },
      { ok: !missingCritical.length, text: missingCritical.length ? `${missingCritical.length} critical evidence item${missingCritical.length === 1 ? '' : 's'} still missing.` : 'No critical checklist gaps remain.' },
      { ok: timeline.length >= 3, text: timeline.length >= 3 ? 'Chronology contains at least three dated events.' : 'Add transaction, fulfillment, and dispute/contact events.' },
      { ok: Boolean(state.deadline), text: state.deadline ? `Deadline recorded as ${formatDate(state.deadline)}.` : 'Confirm the portal deadline.' },
      { ok: haveItems.some(item => item.weight === 'critical'), text: 'Verify every referenced file opens and matches the index.' },
      { ok: false, text: 'Confirm portal size, format, and evidence limits before submission.' }
    ];
    const checkList = $('#finalChecks');
    checkList.textContent = '';
    checks.forEach(check => {
      const li = document.createElement('li');
      li.className = check.ok ? 'ok' : 'warn';
      li.textContent = check.text;
      checkList.appendChild(li);
    });

    $('#bannerScore').textContent = result.score;
    $('#readinessBanner').classList.toggle('ready', result.score >= 80 && !result.criticalMissing);
    $('#bannerText').textContent = result.criticalMissing
      ? `Resolve ${result.criticalMissing} critical gap${result.criticalMissing === 1 ? '' : 's'} or clearly mark a truly inapplicable item N/A.`
      : result.score >= 80
        ? 'The packet is well organized. Verify each fact and portal requirement before submission.'
        : 'Complete the case, evidence, and chronology before exporting.';
  }

  function formatDate(value) {
    if (!value) return '[not entered]';
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
  }

  function formatMoney(value, currency = 'USD') {
    const number = Number(value);
    if (!Number.isFinite(number)) return '[amount not entered]';
    try {
      return new Intl.NumberFormat('en', { style: 'currency', currency }).format(number);
    } catch (_) {
      return `${currency} ${number.toFixed(2)}`;
    }
  }

  function download(name, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function toast(message) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove('show'), 2400);
  }

  function isoOffset(days) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function loadDemo(openResponse = false) {
    state = {
      ...blankState(),
      processor: 'Stripe',
      reason: 'not_received',
      saleType: 'service',
      deadline: isoOffset(6),
      caseId: 'RK-1042',
      currency: 'USD',
      amount: '480',
      merchant: 'Northline Studio',
      customer: 'Alex Customer',
      transactionDate: isoOffset(-24),
      transactionId: 'INV-2087',
      description: 'A fixed-scope brand strategy workshop and written positioning brief delivered remotely.',
      reasonText: 'Customer states the service was not received.',
      timeline: [
        { id: cryptoId(), date: isoOffset(-25), title: 'Scope accepted and invoice paid', detail: 'Signed proposal and paid invoice INV-2087.' },
        { id: cryptoId(), date: isoOffset(-18), title: 'Workshop delivered', detail: 'Video-session attendance record and calendar confirmation.' },
        { id: cryptoId(), date: isoOffset(-16), title: 'Written brief delivered', detail: 'Delivery email and document access record.' },
        { id: cryptoId(), date: isoOffset(-5), title: 'Dispute notice received', detail: 'Stripe notice lists service not received.' }
      ]
    };
    currentEvidence().forEach((item, index) => {
      state.evidence[item.id] = {
        status: index === currentEvidence().length - 1 ? 'missing' : 'have',
        note: index === 0 ? 'Stripe dispute notice.pdf' : index === 1 ? 'Invoice INV-2087.pdf' : item.title
      };
    });
    hydrateForm();
    renderEvidence();
    renderTimeline();
    saveState();
    updateAll();
    showStep(openResponse ? 4 : 1, true);
    toast('Fictional demo loaded. No real customer data is included.');
  }

  function cryptoId() {
    return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  fieldIds.forEach(id => {
    const element = $('#' + id);
    if (!element) return;
    const handler = () => {
      const previousReason = state.reason;
      const previousSale = state.saleType;
      readForm();
      saveState();
      if (state.reason !== previousReason || state.saleType !== previousSale) renderEvidence();
      updateAll();
    };
    element.addEventListener('input', handler);
    element.addEventListener('change', handler);
  });

  $$('.step-link').forEach(button => button.addEventListener('click', () => showStep(button.dataset.stepTarget)));
  $$('.next-step').forEach(button => button.addEventListener('click', () => showStep(button.dataset.next)));
  $$('.prev-step').forEach(button => button.addEventListener('click', () => showStep(button.dataset.prev)));

  $('#evidenceList').addEventListener('click', event => {
    const button = event.target.closest('[data-status]');
    if (!button) return;
    const item = button.closest('.evidence-item');
    state.evidence[item.dataset.id] = state.evidence[item.dataset.id] || { status: 'missing', note: '' };
    state.evidence[item.dataset.id].status = button.dataset.status;
    $$('[data-status]', item).forEach(candidate => candidate.classList.toggle('active', candidate === button));
    saveState();
    updateAll();
  });

  $('#evidenceList').addEventListener('input', event => {
    if (!event.target.classList.contains('evidence-note')) return;
    const item = event.target.closest('.evidence-item');
    state.evidence[item.dataset.id] = state.evidence[item.dataset.id] || { status: 'missing', note: '' };
    state.evidence[item.dataset.id].note = event.target.value;
    saveState();
    updateAll();
  });

  $('#timelineForm').addEventListener('submit', event => {
    event.preventDefault();
    const date = $('#eventDate').value;
    const title = $('#eventTitle').value.trim();
    const detail = $('#eventDetail').value.trim();
    if (!date || !title) return toast('Add an event date and title.');
    state.timeline.push({ id: cryptoId(), date, title, detail });
    event.currentTarget.reset();
    saveState();
    renderTimeline();
    updateAll();
    toast('Timeline event added.');
  });

  $('#timelineList').addEventListener('click', event => {
    const button = event.target.closest('[data-remove-event]');
    if (!button) return;
    state.timeline = state.timeline.filter(item => item.id !== button.dataset.removeEvent);
    saveState();
    renderTimeline();
    updateAll();
  });

  $('#loadDemo').addEventListener('click', () => loadDemo(false));
  $('#heroDemo').addEventListener('click', () => loadDemo(true));
  $('#regenerate').addEventListener('click', () => { buildOutputs(); toast('Response regenerated from current records.'); });
  $('#printPacket').addEventListener('click', () => { buildOutputs(); window.print(); });
  $('#exportCase').addEventListener('click', () => {
    download(`rebuttalkit-${state.caseId || 'case'}.json`, JSON.stringify(state, null, 2), 'application/json');
    toast('Portable case backup exported.');
  });
  $('#downloadResponse').addEventListener('click', () => {
    buildOutputs();
    download(`rebuttalkit-${state.caseId || 'response'}.txt`, $('#responseDraft').textContent, 'text/plain');
  });
  $('#copyResponse').addEventListener('click', async () => {
    buildOutputs();
    try {
      await navigator.clipboard.writeText($('#responseDraft').textContent);
      toast('Response copied to clipboard.');
    } catch (_) {
      toast('Clipboard access was blocked. Use the text export instead.');
    }
  });
  $('#importCase').addEventListener('change', async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed || typeof parsed !== 'object') throw new Error('Invalid file');
      state = { ...blankState(), ...parsed, version: 1, evidence: parsed.evidence || {}, timeline: Array.isArray(parsed.timeline) ? parsed.timeline : [] };
      hydrateForm();
      renderEvidence();
      renderTimeline();
      saveState();
      updateAll();
      showStep(1);
      toast('Case imported locally.');
    } catch (_) {
      toast('That file is not a valid RebuttalKit case.');
    } finally {
      event.target.value = '';
    }
  });
  $('#resetCase').addEventListener('click', () => {
    if (!confirm('Delete this locally stored case and start again?')) return;
    state = blankState();
    localStorage.removeItem(STORAGE_KEY);
    hydrateForm();
    renderEvidence();
    renderTimeline();
    updateAll();
    showStep(1);
    toast('Local case cleared.');
  });

  hydrateForm();
  renderEvidence();
  renderTimeline();
  updateAll();
  showStep(1);
})();
