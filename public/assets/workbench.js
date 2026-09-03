(() => {
  'use strict';

  const stageButtons = [...document.querySelectorAll('[data-workbench-stage]')];
  const stagePanels = [...document.querySelectorAll('[data-workbench-panel]')];
  const dock = document.querySelector('[data-evidence-dock]');

  function showStage(name, moveFocus = false) {
    stageButtons.forEach(button => {
      const active = button.dataset.workbenchStage === name;
      button.dataset.active = String(active);
      if (active) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    stagePanels.forEach(panel => {
      panel.hidden = panel.dataset.workbenchPanel !== name;
    });
    if (dock) dock.hidden = true;
    const activePanel = stagePanels.find(panel => panel.dataset.workbenchPanel === name);
    if (moveFocus) activePanel?.querySelector('h2')?.focus({ preventScroll: true });
    document.querySelector('.workbench-stage-wrap')?.scrollTo({ top: 0, behavior: 'auto' });
  }

  stageButtons.forEach(button => {
    button.addEventListener('click', () => showStage(button.dataset.workbenchStage, true));
  });

  const rows = document.querySelector('[data-report-rows]');
  rows?.addEventListener('click', event => {
    if (event.target.closest('[data-check-id]') && dock) dock.hidden = false;
  });
  rows?.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.closest('[data-check-id]') && dock) dock.hidden = false;
  });
  document.querySelector('[data-close-evidence]')?.addEventListener('click', () => {
    if (dock) dock.hidden = true;
  });

  document.querySelectorAll('[data-workbench-print]').forEach(button => {
    button.addEventListener('click', () => window.print());
  });

  showStage('run');
})();
