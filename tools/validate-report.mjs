#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const statuses = new Set(['pass', 'fail', 'untested', 'out_of_scope']);

export function validateReport(report) {
  const errors = [];
  if (!report || typeof report !== 'object' || Array.isArray(report)) errors.push('root must be an object');
  if (report?.schemaVersion !== '1.0') errors.push('schemaVersion must equal 1.0');
  if (!report?.reportId || typeof report.reportId !== 'string') errors.push('reportId is required');
  if (!report?.project?.name || !report?.project?.environment) errors.push('project metadata is incomplete');
  if (!report?.scope?.generatedAt || Number.isNaN(Date.parse(report.scope.generatedAt))) errors.push('scope.generatedAt must be an ISO date-time');
  if (!Array.isArray(report?.checks) || report.checks.length === 0) errors.push('checks must be a non-empty array');

  const ids = new Set();
  for (const [index, check] of (report?.checks || []).entries()) {
    const label = check?.id || `check ${index + 1}`;
    for (const key of ['id', 'actor', 'area', 'resource', 'operation', 'expectation', 'before', 'after']) {
      if (!(key in (check || {}))) errors.push(`${label}: missing ${key}`);
    }
    if (ids.has(check?.id)) errors.push(`${label}: duplicate id`);
    ids.add(check?.id);
    if (check?.id && !/^TP-[A-Z0-9-]+$/.test(check.id)) errors.push(`${label}: invalid id format`);
    for (const phase of ['before', 'after']) {
      const state = check?.[phase];
      if (!statuses.has(state?.status)) errors.push(`${label}: invalid ${phase} status`);
      for (const key of ['observed', 'evidence', 'remediation']) {
        if (typeof state?.[key] !== 'string') errors.push(`${label}: ${phase}.${key} must be a string`);
      }
    }
  }
  return errors;
}

if (import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node tools/validate-report.mjs <report.json>');
    process.exit(2);
  }
  try {
    const resolved = path.resolve(file);
    const report = JSON.parse(fs.readFileSync(resolved, 'utf8'));
    const errors = validateReport(report);
    if (errors.length) {
      console.error(`INVALID ${resolved}`);
      errors.forEach(error => console.error(`- ${error}`));
      process.exit(1);
    }
    const counts = report.checks.reduce((acc, check) => {
      acc.before[check.before.status] = (acc.before[check.before.status] || 0) + 1;
      acc.after[check.after.status] = (acc.after[check.after.status] || 0) + 1;
      return acc;
    }, { before: {}, after: {} });
    console.log(JSON.stringify({ valid: true, file: resolved, checks: report.checks.length, counts }, null, 2));
  } catch (error) {
    console.error(`Could not validate report: ${error.message}`);
    process.exit(1);
  }
}
