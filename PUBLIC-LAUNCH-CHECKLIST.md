# Public launch checklist

## Repository and deployment

- [x] Product and marketing site merged to `main`.
- [x] GitHub Pages workflow added.
- [x] Desktop and mobile browser checks passed.
- [x] No personal contact address, active payment credential, or private key published.
- [ ] In **Settings → Pages**, select **GitHub Actions** as the deployment source.
- [ ] Confirm the Pages workflow succeeds.
- [ ] Open the public URL on desktop and mobile.
- [ ] Test the free audit, calculator, privacy page, terms page, and pilot request.

GitHub's standard workflow token cannot enable Pages on a new repository by itself. An administrator must enable GitHub Actions as the Pages source once.

## Public configuration

Edit the root `site-config.js` file before promotion:

```js
window.SETTLESIFT_CONFIG = {
  contactEmail: "approved-public-address@example.com",
  paymentUrl: "",
  siteUrl: "https://approved-public-url.example",
  pilotPrice: 1499
};
```

The deployment workflow copies this root configuration over the bundled default. This means contact and site details can be changed without rebuilding the product bundle.

Leave `paymentUrl` blank until all of the following are approved:

- [ ] Hosted payment provider and payment-page URL.
- [ ] Operator or business identity displayed to the buyer.
- [ ] Support route.
- [ ] Invoice and tax treatment.
- [ ] Refund/cancellation policy.
- [ ] Secure file-transfer procedure.

Never put payment secrets, private API keys, bank credentials, or card details in `site-config.js`.

## Commercial readiness

- [ ] Three anonymized seller datasets reviewed.
- [ ] One marketplace report preset verified end to end.
- [ ] High-severity precision at or above 90%.
- [ ] At least one valid previously missed issue confirmed.
- [ ] Delivery time measured and acceptable at ₹1,499.
- [ ] Retention/deletion process communicated to each pilot customer.

## Promotion readiness

- [ ] One platform-specific checklist published.
- [ ] Seller and accountant prospect lists contain only relevant, manually qualified contacts.
- [ ] Outreach copy is personalized and avoids guaranteed-recovery claims.
- [ ] A process exists for recording valid, invalid, already-known, and unclear findings.
- [ ] Case-study permission is requested separately from service delivery.

## Launch decision

Do not scale paid promotion yet. First prove that targeted outreach can generate compatible datasets and that the audit finds defensible issues. If ten compatible audits produce no valid previously missed issue, stop and reconsider the product rather than increasing traffic.
