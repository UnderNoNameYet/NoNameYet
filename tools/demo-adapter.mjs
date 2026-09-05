const fixture = {
  'TB-LAB-001': {
    before: ['fail', 'The fictional adapter returned two comparison-tenant rows.', '2 foreign rows · local fixture'],
    after: ['pass', 'The fictional adapter returned no comparison-tenant rows.', '0 foreign rows · local fixture']
  },
  'TB-LAB-002': {
    before: ['fail', 'The fictional adapter accepted a comparison-tenant reassignment.', 'Mutation accepted · local fixture'],
    after: ['pass', 'The fictional adapter rejected the comparison-tenant reassignment.', 'Mutation denied · local fixture']
  },
  'TB-LAB-003': {
    before: ['pass', 'The fictional adapter rejected the foreign archive request.', 'Function denied · local fixture'],
    after: ['pass', 'The fictional adapter continued to reject the foreign archive request.', 'Function denied · local fixture']
  }
};

export async function executeScenario(scenario, phase) {
  const row = fixture[scenario.id]?.[phase];
  if (!row) throw new Error(`No demo fixture for ${scenario.id}/${phase}`);
  return {
    status: row[0],
    observed: row[1],
    evidence: row[2],
    remediation: row[0] === 'fail'
      ? 'Demo remediation: replace the broad rule with a tenant-membership predicate and a proposed-row check.'
      : 'No unresolved demo remediation.'
  };
}
