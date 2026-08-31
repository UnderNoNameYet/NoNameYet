(() => {
  'use strict';

  const STATUS_LABELS = {
    pass: 'Pass',
    fail: 'Fail',
    untested: 'Untested',
    out_of_scope: 'Out of scope'
  };

  function safeText(value) {
    return value == null ? '' : String(value);
  }

  function validateReport(report) {
    if (!report || typeof report !== 'object') throw new Error('The file is not a report object.');
    if (report.schemaVersion !== '1.0') throw new Error('Unsupported report schema. Expected version 1.0.');
    if (!report.project || typeof report.project.name !== 'string') throw new Error('Project metadata is missing.');
    if (!Array.isArray(report.checks) || report.checks.length === 0) throw new Error('The report has no checks.');
    const ids = new Set();
    report.checks.forEach((check, index) => {
      const required = ['id', 'actor', 'area', 'resource', 'operation', 'expectation', 'before', 'after'];
      required.forEach(key => {
        if (!(key in check)) throw new Error(`Check ${index + 1} is missing ${key}.`);
      });
      if (ids.has(check.id)) throw new Error(`Duplicate check ID: ${check.id}`);
      ids.add(check.id);
      ['before', 'after'].forEach(phase => {
        if (!STATUS_LABELS[check[phase]?.status]) throw new Error(`Invalid ${phase} status in ${check.id}.`);
      });
    });
    return report;
  }

  class ReportViewer {
    constructor(root) {
      this.root = root;
      this.phase = 'before';
      this.report = null;
      this.activeId = null;
      this.filters = { query: '', actor: '', area: '', operation: '', status: '' };
      this.bind();
      this.loadSample();
    }

    bind() {
      this.root.querySelectorAll('[data-phase]').forEach(button => {
        button.addEventListener('click', () => {
          this.phase = button.dataset.phase;
          this.root.querySelectorAll('[data-phase]').forEach(item => {
            item.setAttribute('aria-pressed', String(item === button));
          });
          this.render();
        });
      });

      this.root.querySelectorAll('[data-filter]').forEach(control => {
        const eventName = control.tagName === 'INPUT' ? 'input' : 'change';
        control.addEventListener(eventName, () => {
          this.filters[control.dataset.filter] = control.value;
          this.renderTable();
        });
      });

      const tbody = this.root.querySelector('[data-report-rows]');
      tbody?.addEventListener('click', event => {
        const row = event.target.closest('[data-check-id]');
        if (row) this.select(row.dataset.checkId);
      });
      tbody?.addEventListener('keydown', event => {
        const row = event.target.closest('[data-check-id]');
        if (row && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          this.select(row.dataset.checkId);
        }
      });

      this.root.querySelector('[data-print-report]')?.addEventListener('click', () => window.print());

      const input = this.root.querySelector('[data-report-file]') || document.querySelector('[data-report-file]');
      const zone = this.root.querySelector('[data-import-zone]') || document.querySelector('[data-import-zone]');
      const choose = this.root.querySelector('[data-choose-report]') || document.querySelector('[data-choose-report]');
      choose?.addEventListener('click', () => input?.click());
      input?.addEventListener('change', () => {
        const file = input.files?.[0];
        if (file) this.importFile(file);
      });
      if (zone && input) {
        ['dragenter', 'dragover'].forEach(name => zone.addEventListener(name, event => {
          event.preventDefault();
          zone.dataset.dragging = 'true';
        }));
        ['dragleave', 'drop'].forEach(name => zone.addEventListener(name, event => {
          event.preventDefault();
          zone.dataset.dragging = 'false';
        }));
        zone.addEventListener('drop', event => {
          const file = event.dataTransfer?.files?.[0];
          if (file) this.importFile(file);
        });
      }
    }

    async loadSample() {
      try {
        const response = await fetch('assets/sample-report.json', { cache: 'no-store' });
        if (!response.ok) throw new Error(`Sample report returned ${response.status}.`);
        this.setReport(validateReport(await response.json()), true);
      } catch (error) {
        this.showNotice(error.message, true);
      }
    }

    async importFile(file) {
      if (file.size > 2_000_000) {
        this.showNotice('The report is larger than the 2 MB local-viewer limit.', true);
        return;
      }
      try {
        const text = await file.text();
        const report = validateReport(JSON.parse(text));
        this.setReport(report, false);
        this.showNotice(`Opened ${file.name} locally. Nothing was uploaded.`, false);
      } catch (error) {
        this.showNotice(`Could not open report: ${error.message}`, true);
      }
    }

    showNotice(message, error) {
      const notice = this.root.querySelector('[data-report-notice]');
      if (!notice) return;
      notice.hidden = false;
      notice.textContent = message;
      notice.classList.toggle('notice-error', Boolean(error));
    }

    setReport(report, sample) {
      this.report = report;
      this.activeId = report.checks[0]?.id || null;
      this.root.dataset.sample = String(sample);
      const label = this.root.querySelector('[data-demo-label]');
      if (label) label.hidden = !sample;
      const name = this.root.querySelector('[data-project-name]');
      const reportId = this.root.querySelector('[data-report-id]');
      if (name) name.textContent = report.project.name;
      if (reportId) reportId.textContent = `${report.reportId} · ${report.project.environment}`;
      this.populateFilters();
      this.render();
    }

    populateFilters() {
      const definitions = {
        actor: [...new Set(this.report.checks.map(item => item.actor))].sort(),
        area: [...new Set(this.report.checks.map(item => item.area))].sort(),
        operation: [...new Set(this.report.checks.map(item => item.operation))].sort(),
        status: Object.keys(STATUS_LABELS)
      };
      Object.entries(definitions).forEach(([name, values]) => {
        const select = this.root.querySelector(`[data-filter="${name}"]`);
        if (!select) return;
        const first = select.options[0];
        select.replaceChildren(first);
        values.forEach(value => {
          const option = document.createElement('option');
          option.value = value;
          option.textContent = name === 'status' ? STATUS_LABELS[value] : value;
          select.appendChild(option);
        });
      });
    }

    visibleChecks() {
      const query = this.filters.query.toLowerCase().trim();
      return this.report.checks.filter(check => {
        const state = check[this.phase];
        if (this.filters.actor && check.actor !== this.filters.actor) return false;
        if (this.filters.area && check.area !== this.filters.area) return false;
        if (this.filters.operation && check.operation !== this.filters.operation) return false;
        if (this.filters.status && state.status !== this.filters.status) return false;
        if (query) {
          const haystack = [check.id, check.actor, check.area, check.resource, check.operation, check.expectation]
            .join(' ').toLowerCase();
          if (!haystack.includes(query)) return false;
        }
        return true;
      });
    }

    render() {
      if (!this.report) return;
      this.renderMetrics();
      this.renderTable();
      this.renderEvidence();
      const meta = this.root.querySelector('[data-report-meta]');
      if (meta) {
        const generated = new Date(this.report.scope.generatedAt);
        meta.textContent = `${this.report.checks.length} checks · ${generated.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}`;
      }
    }

    renderMetrics() {
      const counts = { pass: 0, fail: 0, untested: 0, out_of_scope: 0 };
      this.report.checks.forEach(check => { counts[check[this.phase].status] += 1; });
      const values = {
        total: this.report.checks.length,
        pass: counts.pass,
        fail: counts.fail,
        unknown: counts.untested + counts.out_of_scope
      };
      Object.entries(values).forEach(([key, value]) => {
        const node = this.root.querySelector(`[data-metric="${key}"]`);
        if (node) node.textContent = String(value);
      });
    }

    renderTable() {
      if (!this.report) return;
      const rows = this.root.querySelector('[data-report-rows]');
      const empty = this.root.querySelector('[data-report-empty]');
      if (!rows) return;
      rows.replaceChildren();
      const visible = this.visibleChecks();
      if (empty) empty.hidden = visible.length !== 0;
      visible.forEach(check => {
        const state = check[this.phase];
        const row = document.createElement('tr');
        row.tabIndex = 0;
        row.dataset.checkId = check.id;
        row.setAttribute('aria-selected', String(check.id === this.activeId));
        const values = [
          `<span class="resource">${this.escape(check.resource)}</span><span class="operation">${this.escape(check.area)}</span>`,
          this.escape(check.actor),
          this.escape(check.operation),
          `<span class="status-pill status-${this.escape(state.status)}">${this.escape(STATUS_LABELS[state.status])}</span>`
        ];
        values.forEach((value, index) => {
          const cell = document.createElement('td');
          if (index === 0 || index === 3) cell.innerHTML = value;
          else cell.textContent = value;
          row.appendChild(cell);
        });
        rows.appendChild(row);
      });
      const count = this.root.querySelector('[data-visible-count]');
      if (count) count.textContent = `${visible.length} shown`;
      if (!visible.some(check => check.id === this.activeId)) {
        this.activeId = visible[0]?.id || null;
        this.renderEvidence();
      }
    }

    select(id) {
      this.activeId = id;
      this.root.querySelectorAll('[data-check-id]').forEach(row => {
        row.setAttribute('aria-selected', String(row.dataset.checkId === id));
      });
      this.renderEvidence();
    }

    renderEvidence() {
      const panel = this.root.querySelector('[data-evidence-panel]');
      if (!panel || !this.report) return;
      const check = this.report.checks.find(item => item.id === this.activeId);
      if (!check) {
        panel.innerHTML = '<p class="evidence-empty">Select a visible check to inspect its evidence.</p>';
        return;
      }
      const state = check[this.phase];
      panel.innerHTML = `
        <span class="evidence-id">${this.escape(check.id)} · ${this.escape(this.phase)}</span>
        <h3>${this.escape(check.expectation)}</h3>
        <div class="evidence-block">
          <span class="evidence-label">Result</span>
          <span class="status-pill status-${this.escape(state.status)}">${this.escape(STATUS_LABELS[state.status])}</span>
        </div>
        <div class="evidence-block">
          <span class="evidence-label">Observed</span>
          <div class="evidence-code">${this.escape(state.observed)}</div>
        </div>
        <div class="evidence-block">
          <span class="evidence-label">Redacted evidence</span>
          <div class="evidence-code">${this.escape(state.evidence)}</div>
        </div>
        <div class="evidence-block">
          <span class="evidence-label">Remediation</span>
          <p>${this.escape(state.remediation || 'No remediation recorded.')}</p>
        </div>`;
    }

    escape(value) {
      const node = document.createElement('span');
      node.textContent = safeText(value);
      return node.innerHTML;
    }
  }

  document.querySelectorAll('[data-report-root]').forEach(root => new ReportViewer(root));
})();
