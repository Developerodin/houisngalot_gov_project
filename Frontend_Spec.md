DATA FLOW & PAGE-WISE FRONTEND SPECIFICATION – APPLICANT & ADMIN JOURNEYS
1. HIGH-LEVEL DATA FLOW User → Frontend → Backend Services → Database/Object Storage
→ External Integrations. Key flows: Application, Documents, Payments, Lottery, Notifications,
Allotments.
2. FRONTEND ARCHITECTURE SPA with SSR for public pages; global state management;
chunked uploads; unified error handling; i18n; WCAG compliance.
3. PAGE-WISE FRONTEND (APPLICANT) Landing Page: Scheme overview, eligibility, downloads,
CTA. Eligibility Checker: Multi-step wizard, local caching, validation. Register/Login: OTP flow,
password creation, duplicate detection. Applicant Dashboard: statuses, quick links, notifications.
Application Wizard: identity, residence, family, income, bank, special categories, declarations,
review. Document Upload: drag-drop, OCR preview, validations. Payment Page: gateway redirect,
polling, webhook sync. Application Status: timeline, verifier comments, re-upload. Lottery Results:
searchable winners, masked PII, seed hash. Post-Allotment Pages: demand letter, payments,
possession. Profile Settings: update contact, language, password.
4. PAGE-WISE FRONTEND (ADMIN) Admin Dashboard: KPIs, alerts, shortcuts. Applications List &
Detail: filters, verifier tools, escalation. Document Verification Queue: prioritized, OCR mismatches.
Payment Console: reconciliation, refunds, offline entries. Lottery Module: configure, validate
snapshot, run, publish. Allotment Panel: finalize winners, transfers, possession. Roles & Audit:
manage permissions, view logs. Reports: scheduled exports and analytics.
5. FULL APPLICANT JOURNEY Discovery → Registration → Application → Uploads → Payment
→ Verification → Lottery → Allotment → Possession.
6. FULL ADMIN JOURNEY Login → Scheme setup → Monitoring → Verification → Lottery →
Allotments → Transfers/Refunds → Reporting.
7. APPLICATION STATE MACHINE Draft → Submitted → Paid → Under Verification →
Verified/Rejected/Clarification → Selected → Allotted → Possession.
8. API CONTRACT NOTES Standard JSON envelopes; ETag; idempotency; chunked upload;
consistent error schema.
9. UX & MICRO-INTERACTIONS Autosave, inline validations, progress indicators, modal
confirmations, localized UI.
10. ACCESSIBILITY & LOCALIZATION WCAG 2.1 AA; Hindi/English; screen-reader support;
keyboard-only navigation.
11. ERROR HANDLING & RETRIES Offline banner, retry strategies, payment fallback handling,
escrow for mismatched payments.
12. EDGE CASES Duplicate Aadhaar; OCR mismatch; re-upload deadlines; payment lost callback;
gateway downtime; snapshot mismatch for lottery.
13. FRONTEND LOGGING Sentry-style tracking; anonymized logs; “Report Issue” tool.
14. DELIVERABLES FOR DEV TEAM Component library, wireframes, OpenAPI, state machines,
e2e test plan, accessibility checklist, deployment guide.
END OF DOCUMENT