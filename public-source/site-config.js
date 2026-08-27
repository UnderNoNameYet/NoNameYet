// Public, non-secret deployment settings. Never place credentials in this file.
window.REBUTTALKIT_CONFIG = {
  businessName: "",
  businessCountry: "",
  contactEmail: "",
  paymentUrl: "",
  siteUrl: "https://undernonameyet.github.io/NoNameYet/",
  servicePriceUsd: 69,
  turnaroundHours: 48,
  weeklyCapacity: 3,
  retentionDays: 7,
  applicationsOpen: false
};

// Kept temporarily so older cached pages do not fail while the v8 service worker rolls out.
window.SETTLESIFT_CONFIG = window.REBUTTALKIT_CONFIG;
