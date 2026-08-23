# SettleSift validation playbook

## Purpose

Determine whether SettleSift finds previously missed, defensible settlement exceptions faster than a seller's current process. The objective is not to maximize the displayed recovery number.

## Minimum validation set

Before scaling promotion, complete:

- At least three anonymized seller datasets.
- At least one fully mapped marketplace report preset.
- At least 30 manually reviewed high-severity findings across the datasets, when available.
- At least one valid issue the seller had not already recorded.

## Audit protocol

1. Agree on the marketplace, closed period, row limit, retention period, and secure transfer method.
2. Request column headers or a blank sample before transaction data whenever possible.
3. Record the mapping and rules used for the audit.
4. Run the data-quality gate before interpreting exceptions.
5. Review each high-severity finding against the source reports.
6. Ask the seller or accountant to classify each finding:
   - Valid
   - Invalid / false positive
   - Already known
   - Unclear / needs marketplace evidence
7. Record investigation time and the final disposition.
8. Delete or return source files according to the agreed retention period.

## Required metrics

| Metric | Definition | Initial threshold |
| --- | --- | ---: |
| Compatibility rate | Compatible datasets ÷ datasets assessed | Track, no target yet |
| Time to first result | File receipt to first useful exception | Under 15 minutes for a known preset |
| Mapping time | Time to configure an unfamiliar export | Under 30 minutes for pilot work |
| High-severity precision | Valid findings ÷ reviewed high-severity findings | At least 90% |
| Previously missed issue rate | Datasets with at least one valid unknown issue | At least 1 of the first 3 |
| Reviewed-audit time | Operator time per paid pilot | Under 90 minutes |
| Paid conversion | Paid compatible pilots ÷ compatible prospects offered the pilot | Track after 10 offers |

Do not count “potential recovery” as validated revenue until the underlying issue is confirmed and the marketplace accepts or resolves it.

## Finding review record

For every reviewed exception, capture:

- Anonymous audit ID
- Marketplace
- Statement period
- Exception type
- Severity
- Displayed amount
- Seller classification
- Evidence used
- Final action
- Time to verify
- Notes for rule improvement

## Continue criteria

Continue investing when all are true:

- A common report format can be mapped reliably.
- High-severity precision remains at or above 90%.
- At least one seller confirms a previously missed valid issue.
- At least two customers pay for the reviewed workflow or request another period.
- Delivery time leaves a credible margin at the pilot price.

## Pause or pivot criteria

Pause promotion when any are true:

- Ten compatible real audits produce no valid previously missed issue.
- High-severity precision remains below 90% after rule corrections.
- Common exports routinely require more than 30 minutes of manual mapping.
- The reviewed audit requires more than 90 minutes at ₹1,499 with no evidence customers will pay more.
- Sellers consistently value bookkeeping cleanup but not exception evidence; in that case, reposition toward accountants rather than sellers.

## Privacy and evidence rules

- Do not request credentials or direct marketplace login access.
- Prefer anonymized headers and samples during compatibility checks.
- Use an agreed secure transfer method for actual exports.
- Do not place seller files in GitHub, public cloud links, analytics, or support chat.
- Obtain separate permission before publishing any case study, even when anonymized.
