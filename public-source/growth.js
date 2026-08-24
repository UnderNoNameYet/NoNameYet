(() => {
  'use strict';

  const evidencePreview = {
    not_received: {
      title: 'Product or service not received',
      hint: 'Connect the agreement to a dated fulfillment record and the customer’s activity after delivery.',
      items: [['Transaction and dispute notice', 'Critical'], ['Agreement or item description', 'Critical'], ['Delivery or completion proof', 'Critical'], ['Customer acknowledgment', 'Strong'], ['Relevant communication', 'Strong']]
    },
    duplicate: {
      title: 'Duplicate charge',
      hint: 'Separate each legitimate charge by order, authorization, date, amount, and purpose.',
      items: [['Charge-by-charge comparison', 'Critical'], ['Separate order records', 'Critical'], ['Transaction receipts', 'Critical'], ['Reversal or refund status', 'Strong'], ['Customer communication', 'Strong']]
    },
    fraud: {
      title: 'Cardholder does not recognize',
      hint: 'Show consistent customer identity, account activity, authentication, and fulfillment.',
      items: [['Transaction record', 'Critical'], ['Customer identity match', 'Critical'], ['Fulfillment record', 'Critical'], ['Device or session record', 'Strong'], ['Prior undisputed history', 'Strong']]
    },
    credit: {
      title: 'Credit not processed',
      hint: 'Document the accepted refund terms, eligibility decision, and any processor refund reference.',
      items: [['Refund policy at purchase', 'Critical'], ['Refund eligibility record', 'Critical'], ['Transaction record', 'Critical'], ['Refund or reversal reference', 'Strong'], ['Request chronology', 'Strong']]
    },
    recurring: {
      title: 'Canceled recurring transaction',
      hint: 'Establish recurring consent, renewal terms, cancellation timing, and service access.',
      items: [['Subscription consent', 'Critical'], ['Renewal and cancellation terms', 'Critical'], ['Cancellation timeline', 'Critical'], ['Account usage', 'Strong'], ['Billing confirmation', 'Strong']]
    },
    not_as_described: {
      title: 'Product or service not as described',
      hint: 'Compare the description accepted at sale with exactly what was delivered and used.',
      items: [['Description at sale', 'Critical'], ['Delivered item comparison', 'Critical'], ['Transaction record', 'Critical'], ['Acceptance or use', 'Strong'], ['Revision or return history', 'Strong']]
    },
    general: {
      title: 'General dispute',
      hint: 'Build a compact transaction-to-fulfillment chronology and include only relevant proof.',
      items: [['Dispute notice', 'Critical'], ['Transaction record', 'Critical'], ['Agreement or terms', 'Critical'], ['Fulfillment record', 'Critical'], ['Resolution communication', 'Strong']]
    }
  };

  function addHeadMetadata() {
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://undernonameyet.github.io/NoNameYet/';
    document.head.appendChild(canonical);

    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = 'manifest.webmanifest';
    document.head.appendChild(manifest);

    const values = [
      ['property', 'og:title', 'RebuttalKit — Chargeback evidence packet builder'],
      ['property', 'og:description', 'Turn existing proof into a reason-specific response packet without uploading case files.'],
      ['property', 'og:type', 'website'],
      ['property', 'og:url', canonical.href],
      ['name', 'twitter:card', 'summary']
    ];
    values.forEach(([attribute, key, content]) => {
      const meta = document.createElement('meta');
      meta.setAttribute(attribute, key);
      meta.content = content;
      document.head.appendChild(meta);
    });

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'RebuttalKit',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'A local-first chargeback evidence packet builder for small merchants.'
    });
    document.head.appendChild(schema);
  }

  function injectConversionSections() {
    const proof = document.querySelector('.proof-strip');
    const workflow = document.querySelector('#workflow');
    const builder = document.querySelector('#builder');
    const privacy = document.querySelector('#privacy');
    if (!proof || !workflow || !builder || !privacy) return;

    proof.insertAdjacentHTML('afterend', `
      <section class="quick-check section" id="quick-check">
        <div class="quick-shell">
          <div class="quick-copy">
            <p class="eyebrow">Value before data entry</p>
            <h2>Preview the proof your case will need.</h2>
            <p>Choose the dispute reason and sale type. RebuttalKit will show the first five evidence categories before you enter customer details.</p>
            <p><b>No account. No upload. No payment.</b></p>
          </div>
          <div class="quick-card">
            <div class="quick-controls">
              <label>Dispute reason<select id="quickReason">
                <option value="not_received">Product or service not received</option><option value="duplicate">Duplicate charge</option><option value="fraud">Cardholder does not recognize</option><option value="credit">Credit not processed</option><option value="recurring">Canceled recurring transaction</option><option value="not_as_described">Not as described</option><option value="general">General</option>
              </select></label>
              <label>Sale type<select id="quickSale"><option value="service">Service</option><option value="digital">Digital product</option><option value="physical">Physical product</option><option value="subscription">Subscription</option></select></label>
            </div>
            <div class="quick-result"><div><div><h3 id="quickTitle"></h3><p id="quickHint"></p></div><span class="pill">First-pass checklist</span></div><ul class="preview-list" id="quickList"></ul><button class="button primary" id="useChecklist" type="button">Use this checklist in the builder</button></div>
          </div>
        </div>
      </section>`);

    workflow.insertAdjacentHTML('afterend', `
      <section class="value-section section" id="sample">
        <div class="section-heading"><p class="eyebrow">See the deliverable first</p><h2>A packet—not another empty dashboard.</h2><p>Open the fictional example before investing time in your own case. It shows the response structure, chronology, evidence index, and final checks.</p></div>
        <div class="value-layout">
          <article class="sample-packet-card"><header><div><b>Sample response · RK-1042</b><span>Fictional service-not-received case</span></div><span class="pill orange">$480 · Stripe</span></header><div class="sample-doc"><div><h4>POSITION</h4><p>The merchant records show that the fixed-scope service was fulfilled as agreed.</p><h4>CHRONOLOGY</h4><ol><li>Scope accepted and invoice paid</li><li>Workshop delivered</li><li>Written brief delivered</li><li>Dispute notice received</li></ol></div><aside><b>94</b><span>packet readiness</span><hr><span>4 critical items ready</span><span>4 dated events</span><span>1 supporting gap</span></aside></div><div class="sample-actions"><a class="button primary" href="sample-packet.html">Open complete sample</a><button class="button ghost" id="sampleToDemo" type="button">Load interactive demo</button></div></article>
          <aside class="review-card"><p class="eyebrow">Optional human review · not yet on sale</p><h3>One clarity pass. No subscription.</h3><div class="review-price"><strong>$59</strong><span>proposed founder price<br>only after beta approval</span></div><ul><li>Evidence order and filename suggestions</li><li>Factual consistency check</li><li>One revised response draft</li><li>One correction round</li></ul><button class="button primary disabled-offer" type="button" disabled>Payment intentionally disabled</button><p class="review-note">No account access, submission service, legal advice, or outcome guarantee.</p></aside>
        </div>
      </section>`);

    privacy.insertAdjacentHTML('beforebegin', `
      <section class="trust-detail section" id="trust">
        <div class="trust-layout"><div><p class="eyebrow">Trust before checkout</p><h2>Know exactly what happens to your case.</h2><p>RebuttalKit is a static browser application. Case details are saved locally; the product does not run a case-data server or analytics tracker.</p><div class="trust-links"><a href="privacy.html">Read privacy details</a><a href="terms.html">Read beta terms</a><a href="sample-packet.html">Inspect sample output</a></div></div><div class="trust-stack"><div class="trust-row"><span>01</span><div><b>Enter records locally</b><small>Your form entries and evidence notes remain in browser storage on this device.</small></div></div><div class="trust-row"><span>02</span><div><b>Export before clearing</b><small>Download a portable JSON backup and response text whenever you choose.</small></div></div><div class="trust-row"><span>03</span><div><b>Submit it yourself</b><small>RebuttalKit never asks for processor passwords and does not submit disputes.</small></div></div><div class="trust-row"><span>04</span><div><b>Keep claims factual</b><small>The tool organizes supplied records; it does not invent evidence or predict outcomes.</small></div></div></div></div>
      </section>`);
  }

  function updateQuickCheck() {
    const reason = document.querySelector('#quickReason')?.value || 'not_received';
    const data = evidencePreview[reason] || evidencePreview.general;
    document.querySelector('#quickTitle').textContent = data.title;
    document.querySelector('#quickHint').textContent = data.hint;
    const list = document.querySelector('#quickList');
    list.textContent = '';
    data.items.forEach(([title, weight], index) => {
      const li = document.createElement('li');
      const number = document.createElement('span');
      number.textContent = index + 1;
      const copy = document.createElement('span');
      copy.textContent = title;
      const badge = document.createElement('small');
      badge.textContent = weight;
      if (weight === 'Strong') badge.className = 'strong';
      li.append(number, copy, badge);
      list.appendChild(li);
    });
  }

  function connectActions() {
    document.querySelector('#quickReason')?.addEventListener('change', updateQuickCheck);
    document.querySelector('#quickSale')?.addEventListener('change', updateQuickCheck);
    document.querySelector('#useChecklist')?.addEventListener('click', () => {
      const reason = document.querySelector('#quickReason').value;
      const sale = document.querySelector('#quickSale').value;
      const reasonField = document.querySelector('#reason');
      const saleField = document.querySelector('#saleType');
      reasonField.value = reason;
      saleField.value = sale;
      reasonField.dispatchEvent(new Event('change', { bubbles: true }));
      saleField.dispatchEvent(new Event('change', { bubbles: true }));
      document.querySelector('[data-step-target="2"]')?.click();
      document.querySelector('#builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    document.querySelector('#sampleToDemo')?.addEventListener('click', () => document.querySelector('#heroDemo')?.click());

    const nav = document.querySelector('.site-header nav');
    if (nav) {
      const sample = document.createElement('a');
      sample.href = '#sample';
      sample.textContent = 'Sample packet';
      nav.insertBefore(sample, nav.lastElementChild);
    }

    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
      const install = document.createElement('button');
      install.id = 'installApp';
      install.className = 'button ghost install-button';
      install.type = 'button';
      install.textContent = 'Install app';
      heroActions.appendChild(install);
    }

    const footer = document.querySelector('footer');
    if (footer) {
      const links = document.createElement('div');
      links.className = 'conversion-footer-links';
      links.innerHTML = '<a href="sample-packet.html">Sample</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a>';
      footer.replaceChild(links, footer.children[1]);
    }
  }

  function setupInstall() {
    document.body.insertAdjacentHTML('beforeend', `<dialog class="install-guide" id="installGuide"><div><header><h3>Install RebuttalKit</h3><button class="close-guide" type="button" aria-label="Close">×</button></header><p>Installation keeps the app one tap away and enables its cached interface after the first visit.</p><ol><li><b>Chrome or Edge:</b> use the install icon in the address bar or browser menu.</li><li><b>iPhone or iPad:</b> tap Share, then “Add to Home Screen.”</li><li><b>Android:</b> open the browser menu and choose “Install app” or “Add to Home screen.”</li></ol><button class="button dark close-guide" type="button">Done</button></div></dialog>`);
    let deferredPrompt = null;
    const button = document.querySelector('#installApp');
    const guide = document.querySelector('#installGuide');
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      deferredPrompt = event;
      if (button) button.textContent = 'Install app';
    });
    button?.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
      } else {
        guide?.showModal();
      }
    });
    guide?.addEventListener('click', event => {
      if (event.target.classList.contains('close-guide')) guide.close();
    });
    if (window.matchMedia('(display-mode: standalone)').matches && button) {
      button.textContent = 'App installed';
      button.disabled = true;
    }
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  addHeadMetadata();
  injectConversionSections();
  updateQuickCheck();
  connectActions();
  setupInstall();
})();
