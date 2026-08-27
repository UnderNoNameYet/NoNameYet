# RebuttalKit public launch checklist

## Repository and release

- [x] Working local-first product exists.
- [x] Founder-review funnel is implemented on `launch/revenue-v8`.
- [x] Desktop visual QA passed at 1440 px.
- [x] Mobile visual QA passed at 390 px.
- [x] No horizontal overflow, missing resources, or JavaScript exceptions in the reviewed page.
- [x] Pull-request build checks pass.
- [x] No payment secrets, credentials, or customer files are committed.
- [ ] Public configuration is approved.
- [ ] Revenue release is merged to `main`.
- [ ] GitHub Pages deployment succeeds.
- [ ] Public homepage, app, review, privacy, and terms pages are verified on desktop and mobile.

## Public configuration

Edit `public-source/site-config.js` with public, non-secret values only:

```js
window.REBUTTALKIT_CONFIG = {
  businessName: "Approved public operator name",
  contactEmail: "approved-public-address@example.com",
  paymentUrl: "https://hosted-checkout.example/...",
  siteUrl: "https://undernonameyet.github.io/NoNameYet/",
  servicePriceUsd: 69,
  turnaroundHours: 48,
  weeklyCapacity: 3
};
```

Never commit API keys, webhook secrets, bank details, passwords, card data, or private customer information.

## Commercial gate

All boxes must be complete before the payment URL is enabled:

- [ ] Public operator or business identity.
- [ ] Country/region for tax and invoice treatment.
- [ ] Public support/review inbox.
- [ ] Hosted $69 USD checkout page.
- [ ] Checkout description matches one review and one correction round.
- [ ] Refund terms are visible before payment.
- [ ] Customer-controlled secure handoff tested.
- [ ] Seven-day working-copy deletion procedure tested.
- [ ] Capacity of three cases per week is realistic.
- [ ] Forty-eight-hour delivery window is realistic.
- [ ] One fictional end-to-end order has been completed.

## Funnel test

- [ ] Compatibility form blocks missing required fields.
- [ ] Past or dangerously close deadlines are flagged.
- [ ] Form says nothing is sent automatically.
- [ ] Request contains no customer name, transaction ID, files, credentials, or private messages.
- [ ] Public email opens with the correct request.
- [ ] Payment link appears only through the accepted-customer route.
- [ ] Checkout total and currency are correct.
- [ ] Receipt/invoice is delivered.
- [ ] Refund can be issued without delay.

## Launch assets

- [ ] 45–60 second fictional-data demo.
- [ ] Three screenshots: evidence checklist, timeline, packet.
- [ ] One fictional before/after response example.
- [ ] One helpful public checklist with no sales pitch.
- [ ] Ten warm introduction requests prepared.
- [ ] Current community rules checked before every public post.

## Daily operating check

- [ ] New requests answered within 12 hours.
- [ ] Accepted cases recorded by anonymous review ID.
- [ ] Deadline and complete-file timestamp confirmed.
- [ ] Delivery time recorded.
- [ ] Correction round recorded.
- [ ] Working-copy deletion confirmed.
- [ ] Objections and refunds logged.

## Stop conditions

Pause checkout immediately if secure handoff fails, capacity is exceeded, a delivery promise is at risk, private data is exposed, or the operator cannot state the service boundary clearly.
