#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function arg(name, fallback) {
  const prefix = `--${name}=`;
  const inline = process.argv.find(value => value.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const root = path.resolve(import.meta.dirname, '..');
const privateConfigPath = path.join(root, 'config/pilot-readiness.json');
const exampleConfigPath = path.join(root, 'config/pilot-readiness.example.json');
const configPath = path.resolve(arg('config', fs.existsSync(privateConfigPath) ? privateConfigPath : exampleConfigPath));
const selectedStage = arg('stage', 'firstPilot');
const strict = process.argv.includes('--strict');

const gateDefinitions = {
  contractingIdentity: 'Verified contracting identity',
  jurisdictionAndTax: 'Jurisdiction and tax position',
  businessContact: 'Owned business contact',
  httpsIntakeAndDeletion: 'Owned HTTPS intake and deletion route',
  launchLegalCopy: 'Launch-state privacy and terms',
  evidenceRetention: 'Approved evidence-retention policy',
  securityContact: 'Monitored security contact',
  deliveryCapacity: 'Capacity reserved for one pilot',
  sowAndAuthorizationReviewed: 'Reviewed SOW and authorization templates',
  secureAccessExchange: 'Approved secure access exchange',
  processorAndRefunds: 'Processor, invoicing, tax, and refund workflow',
  approvedAcquisitionChannel: 'Authenticated approved acquisition channel'
};

const stages = {
  outreach: [
    'contractingIdentity', 'businessContact', 'httpsIntakeAndDeletion',
    'launchLegalCopy', 'deliveryCapacity', 'approvedAcquisitionChannel'
  ],
  intake: [
    'contractingIdentity', 'jurisdictionAndTax', 'businessContact',
    'httpsIntakeAndDeletion', 'launchLegalCopy', 'evidenceRetention',
    'securityContact', 'deliveryCapacity'
  ],
  payment: [
    'contractingIdentity', 'jurisdictionAndTax', 'businessContact',
    'httpsIntakeAndDeletion', 'launchLegalCopy', 'evidenceRetention',
    'securityContact', 'deliveryCapacity', 'sowAndAuthorizationReviewed',
    'processorAndRefunds'
  ],
  firstPilot: [
    'contractingIdentity', 'jurisdictionAndTax', 'businessContact',
    'httpsIntakeAndDeletion', 'launchLegalCopy', 'evidenceRetention',
    'securityContact', 'deliveryCapacity', 'sowAndAuthorizationReviewed',
    'secureAccessExchange', 'processorAndRefunds'
  ],
  launchExperiment: Object.keys(gateDefinitions)
};

const errors = [];
const warnings = [];
let config = null;
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  errors.push(`Readiness configuration could not be loaded: ${error.message}`);
}

if (!Object.hasOwn(stages, selectedStage)) {
  errors.push(`Unknown stage: ${selectedStage}`);
}

const gateStates = {};
if (config) {
  if (config.schemaVersion !== 1) errors.push('schemaVersion must be 1');
  if (!config.gates || typeof config.gates !== 'object' || Array.isArray(config.gates)) {
    errors.push('gates must be an object');
  }

  const suppliedKeys = Object.keys(config.gates || {});
  for (const key of suppliedKeys) {
    if (!Object.hasOwn(gateDefinitions, key)) errors.push(`Unknown readiness gate: ${key}`);
  }

  for (const [key, label] of Object.entries(gateDefinitions)) {
    const item = config.gates?.[key];
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      errors.push(`Missing readiness gate: ${key}`);
      gateStates[key] = { label, status: 'invalid' };
      continue;
    }
    if (!['blocked', 'verified'].includes(item.status)) {
      errors.push(`${key}.status must be blocked or verified`);
    }
    const status = item.status === 'verified' ? 'verified' : 'blocked';
    if (status === 'verified' && !String(item.evidenceReference || '').trim()) {
      errors.push(`${key} is verified without an evidenceReference`);
    }
    gateStates[key] = { label, status };
  }

  const anyVerified = Object.values(gateStates).some(item => item.status === 'verified');
  if (anyVerified) {
    if (!String(config.reviewedBy || '').trim()) errors.push('reviewedBy is required when any gate is verified');
    if (config.attestation !== true) errors.push('attestation must be true when any gate is verified');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(config.reviewedAt || '')) {
      errors.push('reviewedAt must be a YYYY-MM-DD date when any gate is verified');
    } else {
      const reviewedAt = Date.parse(`${config.reviewedAt}T00:00:00Z`);
      const ageDays = (Date.now() - reviewedAt) / 86_400_000;
      if (!Number.isFinite(reviewedAt) || ageDays < -1 || ageDays > 30) {
        errors.push('reviewedAt must be current within the last 30 days');
      }
    }
  } else {
    warnings.push('No commercial readiness gate is verified');
  }
}

const usingTemplate = path.normalize(configPath) === path.normalize(exampleConfigPath);
if (usingTemplate) warnings.push('Using the committed blocked template; copy it to the ignored private configuration before verification');
warnings.push('Global readiness never replaces customer-specific written authorization, scope, target verification, or stop conditions');

const stageResults = {};
for (const [stage, requiredGates] of Object.entries(stages)) {
  const blockers = requiredGates.filter(key => gateStates[key]?.status !== 'verified');
  stageResults[stage] = {
    ready: errors.length === 0 && blockers.length === 0,
    blockers
  };
}

const selectedResult = stageResults[selectedStage] || { ready: false, blockers: [] };
const report = {
  generatedAt: new Date().toISOString(),
  source: path.relative(root, configPath).replaceAll(path.sep, '/'),
  usingTemplate,
  strict,
  selectedStage,
  valid: errors.length === 0,
  ready: selectedResult.ready,
  verifiedGates: Object.values(gateStates).filter(item => item.status === 'verified').length,
  requiredGates: Object.keys(gateDefinitions).length,
  stages: stageResults,
  gates: gateStates,
  warnings,
  errors
};

fs.mkdirSync(path.join(root, 'build'), { recursive: true });
fs.writeFileSync(path.join(root, 'build/pilot-readiness.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

if (errors.length || (strict && !selectedResult.ready)) process.exit(1);
