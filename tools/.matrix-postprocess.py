from pathlib import Path


def replace_once(relative_path: str, old: str, new: str) -> None:
    path = Path(relative_path)
    source = path.read_text(encoding="utf-8")
    count = source.count(old)
    if count != 1:
        raise RuntimeError(f"{relative_path}: expected one post-patch match, found {count}")
    path.write_text(source.replace(old, new, 1), encoding="utf-8")


replace_once(
    "public/sample-matrix.html",
    """          <tr><td><code>projects</code></td><td>member · Tenant A</td><td>Tenant B</td><td>UPDATE</td><td>Deny reassignment</td></tr>
          <tr><td><code>customer_notes</code></td><td>manager · Tenant A</td><td>Tenant A</td><td>INSERT</td><td>Allow valid note</td></tr>""",
    """          <tr><td><code>projects</code></td><td>member · Tenant A</td><td>Tenant B</td><td>UPDATE</td><td>Deny reassignment</td></tr>
          <tr><td><code>customer_notes</code></td><td>manager · Tenant A</td><td>Tenant A</td><td>DELETE</td><td>Allow own-tenant delete</td></tr>
          <tr><td><code>customer_notes</code></td><td>manager · Tenant A</td><td>Tenant B</td><td>DELETE</td><td>Deny foreign delete</td></tr>
          <tr><td><code>customer_notes</code></td><td>manager · Tenant A</td><td>Tenant A</td><td>INSERT</td><td>Allow valid note</td></tr>""",
)
replace_once(
    "public/sample-matrix.html",
    """    <div class="button-row"><a class="button" href="assets/sample-boundary-matrix.csv" download>Download the fictional matrix</a><a class="button button-secondary" href="request.html">Build a private scope brief</a></div>""",
    """    <div class="button-row"><a class="button button-secondary" href="report.html">See the evidence format</a><a class="button button-secondary" href="request.html">Build a private scope brief</a></div>""",
)
replace_once(
    "public/assets/sample-boundary-matrix.csv",
    """TP-MATRIX-003,table,projects,member,Tenant A,Tenant B,UPDATE,Deny tenant reassignment,negative,untested,Fictional starter; confirm row remains unchanged
TP-MATRIX-004,table,customer_notes,manager,Tenant A,Tenant A,INSERT,Allow valid own-tenant note,positive,untested,Fictional starter; use synthetic data
TP-MATRIX-005,table,customer_notes,manager,Tenant A,Tenant B,INSERT,Deny foreign tenant assignment,negative,untested,Fictional starter; test proposed-row checks
TP-MATRIX-006,function,archive_project(),manager,Tenant A,Tenant B,RPC,Deny foreign mutation,negative,untested,Fictional starter; confirm no side effect
TP-MATRIX-007,storage,customer-files,member,Tenant A,Tenant A,DOWNLOAD,Allow own-tenant file,positive,untested,Fictional starter; use synthetic file
TP-MATRIX-008,storage,customer-files,member,Tenant A,Tenant B,LIST,Deny foreign metadata,negative,untested,Fictional starter; do not include secrets""",
    """TP-MATRIX-003,table,projects,member,Tenant A,Tenant B,UPDATE,Deny tenant reassignment,negative,untested,Fictional starter; confirm row remains unchanged
TP-MATRIX-004,table,customer_notes,manager,Tenant A,Tenant A,DELETE,Allow own-tenant delete,positive,untested,Fictional starter; use synthetic data and confirm intended cascades
TP-MATRIX-005,table,customer_notes,manager,Tenant A,Tenant B,DELETE,Deny foreign delete,negative,untested,Fictional starter; confirm row and related records remain unchanged
TP-MATRIX-006,table,customer_notes,manager,Tenant A,Tenant A,INSERT,Allow valid own-tenant note,positive,untested,Fictional starter; use synthetic data
TP-MATRIX-007,table,customer_notes,manager,Tenant A,Tenant B,INSERT,Deny foreign tenant assignment,negative,untested,Fictional starter; test proposed-row checks
TP-MATRIX-008,function,archive_project(),manager,Tenant A,Tenant B,RPC,Deny foreign mutation,negative,untested,Fictional starter; confirm no side effect
TP-MATRIX-009,storage,customer-files,member,Tenant A,Tenant A,DOWNLOAD,Allow own-tenant file,positive,untested,Fictional starter; use synthetic file
TP-MATRIX-010,storage,customer-files,member,Tenant A,Tenant B,LIST,Deny foreign metadata,negative,untested,Fictional starter; do not include secrets""",
)
replace_once(
    "tools/capture-previews.mjs",
    """  await mobilePage.goto(`${base}/request.html?package=repair`, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(out, 'tenantproof-request-mobile.png'), fullPage: true });
  await mobile.close();""",
    """  await mobilePage.goto(`${base}/request.html?package=repair`, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(out, 'tenantproof-request-mobile.png'), fullPage: true });
  await mobilePage.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(out, 'tenantproof-mobile.png'), fullPage: true });
  await mobile.close();""",
)
replace_once(
    "tools/capture-previews.mjs",
    "['tenantproof-hero-desktop.png', 'tenantproof-report-desktop.png', 'tenantproof-matrix-desktop.png', 'tenantproof-request-mobile.png']",
    "['tenantproof-hero-desktop.png', 'tenantproof-report-desktop.png', 'tenantproof-matrix-desktop.png', 'tenantproof-request-mobile.png', 'tenantproof-mobile.png']",
)

print("Applied DELETE controls, CTA hierarchy, and complete capture set")
