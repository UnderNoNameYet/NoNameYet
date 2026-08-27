(() => {
  const body = document.body;
  const header = document.querySelector('.global-header');
  const menu = document.querySelector('.menu-toggle');
  const current = body.dataset.page;
  document.querySelector(`[data-nav="${current}"]`)?.classList.add('active');
  document.querySelectorAll('a[href="premium.html"]').forEach(link => { link.textContent = 'Founder review'; });
  const paymentLabel = [...document.querySelectorAll('dt')].find(node => node.textContent.trim() === 'PAYMENTS');
  if (paymentLabel?.nextElementSibling) paymentLabel.nextElementSibling.textContent = 'After case acceptance';
  const premiumFaq = [...document.querySelectorAll('.faq-list details')].find(item => item.querySelector('summary')?.textContent.includes('premium support'));
  if (premiumFaq) {
    premiumFaq.querySelector('summary').innerHTML = 'How does the founder review work?<span>+</span>';
    premiumFaq.querySelector('p').textContent = 'A non-sensitive compatibility check comes first. If the case fits and applications are open, the published review address confirms scope, secure handoff, turnaround, price, refund boundary, and deletion date before payment.';
  }
  const footerStatus = document.querySelector('.footer-status');
  if (footerStatus) {
    const label = footerStatus.querySelector('b');
    const detail = footerStatus.querySelector('small');
    if (label) label.textContent = 'FREE WORKSPACE';
    if (detail) detail.textContent = 'Optional founder review · No outcome guarantee';
  }
  menu?.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); menu.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('#siteNav a').forEach(link => link.addEventListener('click', () => { header?.classList.remove('menu-open'); menu?.setAttribute('aria-expanded', 'false'); }));
  const meter = document.querySelector('#pageMeter');
  const updateMeter = () => { const max = document.documentElement.scrollHeight - innerHeight; if (meter) meter.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; };
  addEventListener('scroll', updateMeter, {passive: true}); updateMeter();
  const walkButtons = [...document.querySelectorAll('[data-walk]')];
  const walkPanels = [...document.querySelectorAll('[data-panel]')];
  const walkPrev = document.querySelector('#walkPrev'); const walkNext = document.querySelector('#walkNext'); const walkProgress = document.querySelector('#walkProgress'); const walkIndex = document.querySelector('#walkIndex'); const walkStatus = document.querySelector('#walkStatus');
  const walkMeta = {prepare:['PASS 00 / PREPARE','NO CASE DATA YET'],case:['PASS 01 / CASE','CASE ESTABLISHED / 24%'],evidence:['PASS 02 / EVIDENCE','3 OF 4 SIGNALS LOCATED'],timeline:['PASS 03 / TIMELINE','4 DATED EVENTS CONNECTED'],packet:['PASS 04 / PACKET','DRAFT READY FOR REVIEW'],submit:['PASS 05 / VERIFY','USER SUBMISSION REQUIRED']};
  let walkPosition = 0;
  const showWalk = position => {
    if (!walkButtons.length) return;
    walkPosition = Math.max(0, Math.min(position, walkButtons.length - 1));
    const key = walkButtons[walkPosition].dataset.walk;
    walkButtons.forEach((button,index) => { const active=index===walkPosition; button.classList.toggle('active',active); button.setAttribute('aria-selected',String(active)); });
    walkPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === key));
    const [indexText,statusText] = walkMeta[key]; if(walkIndex) walkIndex.textContent=indexText; if(walkStatus) walkStatus.textContent=statusText; if(walkProgress) walkProgress.textContent=`${walkPosition+1} / ${walkButtons.length}`;
    if(walkPrev) walkPrev.disabled=walkPosition===0;
    if(walkNext){walkNext.disabled=walkPosition===walkButtons.length-1;walkNext.textContent=walkPosition===walkButtons.length-1?'WALKTHROUGH COMPLETE':'NEXT PASS →';}
  };
  walkButtons.forEach((button,index)=>button.addEventListener('click',()=>showWalk(index))); walkPrev?.addEventListener('click',()=>showWalk(walkPosition-1)); walkNext?.addEventListener('click',()=>showWalk(walkPosition+1)); showWalk(0);
  const platformButtons=[...document.querySelectorAll('[data-platform]')]; const platformPanels=[...document.querySelectorAll('[data-platform-panel]')]; const deviceReadout=document.querySelector('#deviceReadout');
  const showPlatform=key=>{platformButtons.forEach(button=>{const active=button.dataset.platform===key;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));});platformPanels.forEach(panel=>panel.classList.toggle('active',panel.dataset.platformPanel===key));};
  if(platformButtons.length){const source=`${navigator.userAgent} ${navigator.platform}`.toLowerCase();const detected=source.includes('mac')?'mac':source.includes('linux')&&!source.includes('android')?'linux':'windows';const labels={windows:'WINDOWS-LIKE DEVICE DETECTED',mac:'MACOS-LIKE DEVICE DETECTED',linux:'LINUX-LIKE DEVICE DETECTED'};if(deviceReadout)deviceReadout.textContent=`${labels[detected]} / INSTALLERS NOT RELEASED`;platformButtons.forEach(button=>button.addEventListener('click',()=>showPlatform(button.dataset.platform)));showPlatform(detected);}
  const feedbackForm=document.querySelector('#feedbackForm');const feedbackStatus=document.querySelector('#feedbackStatus');const feedbackFallback=document.querySelector('#feedbackFallback');
  feedbackForm?.addEventListener('submit',event=>{event.preventDefault();const type=document.querySelector('#feedbackType').value.trim();const title=document.querySelector('#feedbackTitle').value.trim();const details=document.querySelector('#feedbackDetails').value.trim();const environment=document.querySelector('#feedbackEnvironment').value.trim()||'Not provided';const safe=document.querySelector('#feedbackSafe').checked;if(!title||!details||!safe){feedbackStatus.textContent='Complete the required fields and confirm that private case data was removed.';return;}const issueTitle=`[${type}] ${title}`;const issueBody=`## Type\n${type}\n\n## What happened / what should happen\n${details}\n\n## Device and browser\n${environment}\n\n## Privacy check\nI confirm this report contains no private customer, transaction, credential, or evidence data.`;const issueBase=['https:','','github.com','UnderNoNameYet','NoNameYet','issues','new'].join('/');const url=`${issueBase}?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;feedbackFallback.href=url;feedbackFallback.classList.add('visible');feedbackStatus.textContent='Prepared. Review the new public GitHub issue before posting.';const opened=window.open(url,'_blank','noopener');if(!opened)feedbackStatus.textContent='Your browser blocked the new tab. Use the manual link below.';});
})();
