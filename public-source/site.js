(() => {
  const stage = document.querySelector('#assemblyStage');
  const control = document.querySelector('#assembleControl');
  const caption = document.querySelector('#assemblyCaption');
  const captionLabel = document.querySelector('.assembly-caption span');
  const labState = document.querySelector('#labState');

  control?.addEventListener('click', () => {
    const assembled = stage.classList.toggle('assembled');
    control.querySelector('span').textContent = assembled ? 'SCATTER THE RECORDS' : 'ASSEMBLE THE RECORD';
    control.querySelector('kbd').textContent = assembled ? 'RESET' : 'CLICK';
    caption.textContent = assembled ? 'One chronology. Every event connected to a record.' : 'Five records. Three locations. No visible sequence.';
    captionLabel.textContent = assembled ? 'SEQUENCED RECORD' : 'SCATTERED INPUTS';
    labState.textContent = assembled ? '5 RECORDS / SEQUENCED' : '5 RECORDS / UNSEQUENCED';
  });

  const reasons = {
    notReceived: {title:'SERVICE NOT RECEIVED',core:'NOT<br>RECEIVED',count:'8 REQUIRED SIGNALS',items:[['Accepted scope','What was promised'],['Delivery record','When it was fulfilled'],['Customer activity','What happened after'],['Transaction details','Amount and identifier']]},
    notDescribed: {title:'NOT AS DESCRIBED',core:'NOT AS<br>DESCRIBED',count:'8 REQUIRED SIGNALS',items:[['Original description','What the customer saw'],['Delivered item','What was actually supplied'],['Quality evidence','Condition and specification'],['Resolution attempt','How concerns were handled']]},
    duplicate: {title:'DUPLICATE CHARGE',core:'DUPLICATE<br>CHARGE',count:'7 REQUIRED SIGNALS',items:[['Both transactions','Separate identifiers'],['Order mapping','What each charge purchased'],['Usage or delivery','Separate fulfillment'],['Refund status','Any reversal already made']]},
    cancelled: {title:'CANCELLED RECURRING',core:'CANCELLED<br>RECURRING',count:'8 REQUIRED SIGNALS',items:[['Subscription terms','Renewal disclosure'],['Cancellation record','Date and channel'],['Billing chronology','Charges around cancellation'],['Access record','Service availability']]}
  };
  const ids = [['#proofA','#proofAMeta'],['#proofB','#proofBMeta'],['#proofC','#proofCMeta'],['#proofD','#proofDMeta']];
  document.querySelectorAll('.reason-switch button').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.reason-switch button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const data = reasons[button.dataset.reason];
    document.querySelector('#reasonTitle').textContent = data.title;
    document.querySelector('#reasonCore').innerHTML = data.core;
    document.querySelector('#reasonCount').textContent = data.count;
    ids.forEach((pair, index) => {
      document.querySelector(pair[0]).textContent = data.items[index][0];
      document.querySelector(pair[1]).textContent = data.items[index][1];
    });
    document.querySelector('#proofOrbit').animate([{opacity:.45,transform:'scale(.985)'},{opacity:1,transform:'scale(1)'}],{duration:360,easing:'ease-out'});
  }));

  const visual = document.querySelector('#methodVisual');
  const stageCopy = {
    establish:['CASE ESTABLISHED','Exact portal wording recorded','24%'],
    substantiate:['EVIDENCE VERIFIED','Reason-specific records selected','58%'],
    sequence:['CHRONOLOGY RESOLVED','Four dated events connected','82%'],
    assemble:['PACKET READY','Response and evidence index generated','94%']
  };
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.method-steps article').forEach(item => item.classList.remove('active'));
    entry.target.classList.add('active');
    const key = entry.target.dataset.stage;
    const [label,hint,score] = stageCopy[key];
    visual.dataset.stage = key;
    document.querySelector('#visualLabel').textContent = label;
    document.querySelector('#visualHint').textContent = hint;
    document.querySelector('#visualScore').textContent = score;
  }), {rootMargin:'-35% 0px -45% 0px',threshold:0});
  document.querySelectorAll('.method-steps article').forEach(item => observer.observe(item));

  const meter = document.querySelector('#scrollMeter');
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    meter.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', updateScroll, {passive:true});
  updateScroll();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    addEventListener('load', () => navigator.serviceWorker.register('./sw.js', {updateViaCache:'none'}).catch(() => {}));
  }

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const canvas = document.querySelector('.case-lab');
    canvas?.addEventListener('pointermove', event => {
      if (stage.classList.contains('assembled')) return;
      const box = canvas.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      stage.style.setProperty('--mx', `${x * 7}px`);
      stage.style.setProperty('--my', `${y * 5}px`);
    });
    canvas?.addEventListener('pointerleave', () => {
      stage.style.setProperty('--mx','0px');
      stage.style.setProperty('--my','0px');
    });
  }
})();
