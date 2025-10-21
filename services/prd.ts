// Fix: Replaced non-standard unicode characters (en-dashes, non-breaking hyphens, curly quotes, etc.) with their ASCII equivalents to prevent Typescript parser errors.
export const PRD_TEXT = `
# Spectral PRD - The Trust Passport for Healthcare AI

**Doc owner:** Shane Fitch
**Version:** 1.0
**Last updated:** Oct 21, 2025
**Status:** Draft for engineering kickoff

---

## 0) One-page Summary (TL;DR)

**Problem.** Health systems need proof that AI apps are safe, compliant, and controllable. Vendors can't produce credible, healthcare-specific evidence quickly. Procurement stalls.

**Vision.** Spectral is the neutral verification layer that turns black-box AI into portable trust. Vendors get a **Trust Passport** they can share; buyers get a mapped, defensible record against healthcare standards.

**Product line.**

*   **Beacon (v1)** - pre-deployment verification & attestations -> *"Is it safe to deploy?"*
*   **Sentinel (v2)** - continuous runtime monitoring & drift detection -> *"Is it staying safe?"*
*   **Watchtower (v3)** - portfolio-level oversight for a health system -> *"Are all our AI safe?"*
*   **Constellation (v4)** - federated policy & attestations across enterprises -> *"How do we run this as standard?"*

**Commercial path to $100M ARR (illustrative).**

*   Year 1-2: Beacon bottoms-up ($299/mo) + mid-market Deep Assurance ($35k/yr).
*   Year 2-3: Sentinel expansion (per-model or per-env fees).
*   Year 3-4: Watchtower (health system platform contracts).
*   Year 4-5: Constellation (multi-entity, payer/EHR partnerships).

**Success KPI (lighthouse):** # of *Verified* models live in market and # of *RFPs requiring Spectral-style verification*.

---

## 1) Objectives & Non-Goals

### 1.1 Objectives (12-18 months)

1.  **Launch Beacon GA**: Self-serve verification with healthcare-native evaluations and a public **Trust Page** + **Verified badge**.
2.  **Ship Deep Assurance**: Auditable 20-40 page packet mapped to HIPAA, NIST AI RMF, ISO/IEC 42001, FDA guidances; includes PHI-leak tests, hallucination, bias, reliability.
3.  **Establish Schema**: A machine-readable **Trust Passport schema** (JSON) with signed attestations and evidence references.
4.  **RFP Pull-through**: Win 5+ health systems whose procurement templates explicitly accept Spectral verification.
5.  **Partner Integrations**: 1+ major EHR marketplace listing or integration (read-only), and 3+ eval tool adapters (Promptfoo/Giskard/Custom).

### 1.2 Non-Goals (for v1)

*   Building an EHR or owning PHI datasets.
*   Becoming a general GRC platform (no SOC 2/HITRUST auditor replacement).
*   Model hosting/inference (we integrate, don't compete).
*   Automated legal advice.

---

## 2) Personas & Jobs-to-Be-Done (JTBD)

**AI Vendor Founder/PM (buyer for $299-$2k/mo)**

*   *JTBD*: "Get a credible, affordable 'yes' from healthcare buyers."
*   *Pain*: Doesn't know how to translate tech metrics into compliance; long cycles.

**AI Vendor Head of Security/Compliance (buyer for $35k/yr)**

*   *JTBD*: "Produce an auditable packet mapped to healthcare standards."
*   *Pain*: Horizontal tools don't test model behavior; can't talk PHI leakage.

**Health System CISO/Privacy Officer (influencer for Watchtower)**

*   *JTBD*: "Know which AI apps are safe, and prove it to the board."
*   *Pain*: Fragmented frameworks; no objective, ongoing visibility.

**Procurement/Legal (approver)**

*   *JTBD*: "Check the box with confidence."
*   *Pain*: Vague claims, no independent evidence.

---

## 3) Use Cases

1.  **Pre-Sales Proof** (Vendor) - Run Spectral Beacon, publish Trust Page link in RFPs, win faster.
2.  **Renewal Defense** (Vendor) - Show quarterly re-verification deltas, risk trends, and mitigations.
3.  **System Onboarding** (Health System) - Require Spectral Trust Passport for marketplace listing/access.
4.  **Portfolio Oversight** (CISO) - Monitor all vendor AI apps; flag drift, non-conformance, stale attestations.

---

## 4) Product Scope & Requirements

### 4.1 Beacon (v1) - Pre-Deployment Verification

**Core outcomes:**

*   Evidence package that maps behavior tests -> healthcare frameworks.
*   Shareable **Trust Page** with a **Verified** badge + signed JSON Passport.

**Functional requirements**

1.  **Project setup**

    *   Create product -> model(s) -> environment(s) (dev/stage/prod).
    *   Define use case (free text + taxonomy: clinical decision support, intake, rev cycle, etc.).
2.  **Adapters & Evidence ingestion**

    *   **Adapters**: Promptfoo, Giskard, "Custom HTTP runner" (generic) at GA.
    *   **Inputs**: test suite configs; artifacts (YAML/JSON); CSV of prompts; red-team prompts; outputs.
    *   **Evidence store**: immutable, versioned; linkable to runs; hashed and time-stamped.
3.  **Spectral test packs (built-ins)**

    *   **PHI leakage check** (regex+ML heuristics; configurable severity).
    *   **Hallucination** (reference-based scoring on provided ground truth).
    *   **Bias/Fairness** (protected classes per use case; basic parity metrics).
    *   **Clinical reliability** (task-specific scoring; plug-in rubric system).
    *   **Prompt injection resilience** (canned attack set; score).
    *   **Safety red teaming** (scenario bank; opt-in custom cases).
    *   All tests must support **deterministic runs** (seed/control) where possible and emit run metadata.
4.  **Mapping engine**

    *   Rule engine maps **test results -> controls/requirements** (HIPAA section, NIST AI RMF functions, ISO/IEC 42001 clauses, FDA draft guidance sections).
    *   Export **Coverage Matrix**: which requirements are satisfied, partially met, or missing; include rationale.
5.  **Trust Page**

    *   Public/Private toggle; shareable URL; embeds badge w/ status (Verified, Under Review, Expired).
    *   Summaries: model identity, scope, environment, last verification, key risks, mitigations, change log.
    *   Download **Trust Passport (JSON)** and **Audit Packet (PDF)**.
6.  **Signatures & Integrity**

    *   Vendor attestation (who ran what, when).
    *   Spectral signing of the Passport (ed25519) + checksum of evidence bundle.
    *   Optional: hash on public ledger (Phase 2) for tamper-evidence.
7.  **Governance**

    *   **RBAC** (Owner, Admin, Contributor, Viewer).
    *   **Audit log** (who accessed, generated, exported).
    *   **Data handling**: default redact outputs; PHI handling opt-in with BAA gates.

**UX/Docs deliverables**

*   Setup wizard, adapter gallery, test pack catalog, Trust Page themes.
*   "How we map to HIPAA/NIST/ISO/FDA" explainer with examples.

**Performance/SLAs**

*   Evidence uploads up to 2GB per run (multipart).
*   99.9% Trust Page availability.
*   Passport generation < 90s for 10k-case suite.

### 4.2 Deep Assurance (v1.1) - Enterprise Audit Packet

**Adds:**

*   Reviewer workflow (assign, annotate, approve).
*   **20-40 page packet generator** with executive summary, coverage matrix, risk register, mitigation plan, and appendices (evidence links).
*   **Custom frameworks**: allow health system to upload requirement sets and map (JSON/YAML).
*   Unlimited evaluations per year; priority support.

### 4.3 Sentinel (v2) - Continuous Monitoring

**Trigger:** Customer installs Sentinel agent or configures webhook endpoints.
**Scope:** Runtime signals + scheduled re-tests.

**Functional requirements**

1.  **Signals ingestion**

    *   Webhooks/SDK to emit prompts/responses (metadata only by default, redact content; PHI handling gated).
    *   Extract drift indicators: response length, refusal rate, risk scores from spot checks.
2.  **Scheduled checks**

    *   Nightly/weekly synthetic probes (prompt injections, bias sentinel set, leakage canaries).
3.  **Anomaly & drift detection**

    *   Baseline from Beacon; alert thresholds; suppressions & escalations.
4.  **Runtime Passport updates**

    *   Trust Page shows *"Active Monitoring"*, last anomalies, MTTR, and change log.
5.  **Remediation workflow**

    *   Open a **Risk Ticket** with suggested tests/mitigations; link to next verification run.

### 4.4 Watchtower (v3) - Portfolio Oversight (Health Systems)

*   **Inventory** of all vendor AI with Trust Passports.
*   **Policy templates** (e.g., "CDS apps must pass X/Y/Z").
*   **Exceptions workflow** and **Quarterly Certification** requests.
*   **Reporting**: Board-ready dashboards; export to PDF/CSV/JSON; evidence call-outs.

### 4.5 Constellation (v4) - Federated Standards

*   **Multi-org policies** (payer/provider groups).
*   **Delegated attestation** (sub-entity maintains its own evidence; parent reads status only).
*   **Interoperable Passport exchange** (verifiable credentials, DID option).

---

## 5) Information Architecture & Data Model (high level)

### 5.1 Key objects

*   **Organization** {id, name, type: vendor|health_system|payer}
*   **User** {id, org_id, role, email}
*   **Product** {id, org_id, name, description}
*   **Model** {id, product_id, vendor_model_name, version, provider, notes}
*   **Environment** {id, model_id, type: dev|stage|prod, metadata}
*   **TestSuite** {id, name, adapter, config, owner}
*   **Run** {id, testsuite_id, model_id, env_id, started_at, finished_at, status, artifacts_uri, seed, runner_meta}
*   **Result** {id, run_id, test_id, metric_key, value, threshold, outcome, evidence_uri}
*   **Mapping** {id, framework_id, control_id, rule_expr, created_by}
*   **Passport** {id, model_id, env_id, run_id, json_blob, signature, checksum, public_url, visibility}
*   **AuditPacket** {id, passport_id, pdf_uri, created_at}
*   **Signal** (Sentinel) {id, model_id, env_id, ts, signal_type, payload_uri, risk_score}
*   **Policy** (Watchtower) {id, org_id, json_yaml, status}
*   **Exception** {id, policy_id, model_ref, owner, due_date, status}

### 5.2 Evidence storage

*   Object store (S3/GCS/Azure) per tenant bucket with server-side encryption; signed URLs.
*   Artifact manifest per run; content-addressable (hash).
*   Retention policy configurable by plan.

---

## 6) APIs (first class)

> All endpoints are versioned ('/v1') and REST; GraphQL read replica for dashboards is optional.

### 6.1 Ingestion & Runs

*   'POST /v1/adapters/{adapter}/runs' - start run (payload: modelRef, env, config, seed).
*   'PUT /v1/runs/{id}/artifact' - multipart upload (chunked).
*   'POST /v1/runs/{id}/finalize' - compute metrics, store result manifest.

### 6.2 Passport

*   'POST /v1/passports' - generate from run (params: frameworks[], mappingProfile).
*   'GET /v1/passports/{id}' - fetch JSON.
*   'POST /v1/passports/{id}/publish' - set visibility/public URL; sign & return badge embed.

### 6.3 Sentinel

*   'POST /v1/signals' - append runtime signal (payload schema enforced).
*   'POST /v1/probes/schedule' - schedule synthetic checks (cron-like).
*   'GET /v1/models/{id}/drift' - drift report.

### 6.4 Watchtower

*   'POST /v1/policies' - create/update policy (YAML).
*   'GET /v1/policies/{id}/compliance' - per-portfolio compliance heatmap.
*   'POST /v1/exceptions' - request/create exception with expiry.

### 6.5 Webhooks

*   'verification.completed', 'passport.published', 'passport.expiring', 'sentinel.alert', 'policy.violation'.

**Auth**: OAuth2 client creds + PATs; SCIM optional for SSO.
**Rate limits**: per plan.
**BAA gating**: PHI-capable endpoints require BAA activation.

---

## 7) Trust Passport Schema (draft)
` +
"```json" +
`
{
  "passport_version": "1.0",
  "issued_at": "2025-10-21T12:00:00Z",
  "spectral_signature": "base64-ed25519",
  "vendor_attestation": {
    "signer": "name@email.com",
    "role": "CISO",
    "timestamp": "2025-10-21T11:55:00Z"
  },
  "subject": {
    "org": "AcmeAI",
    "product": "Acme Triage",
    "model": {
      "provider": "openai:gpt-4o-mini",
      "version": "2025-09-15",
      "customizations": ["system-prompts", "tooling"]
    },
    "environment": "prod",
    "use_case": "intake triage"
  },
  "verification": {
    "frameworks": ["HIPAA","NIST AI RMF","ISO/IEC 42001","FDA-DG"],
    "runs": [{
      "run_id": "run_123",
      "started_at": "2025-10-20T09:00:00Z",
      "finished_at": "2025-10-20T09:03:00Z",
      "evidence": ["s3://..."],
      "metrics": {
        "phi_leakage_rate": 0.1,
        "hallucination_rate": 1.8,
        "bias_parity_gap": 0.04,
        "prompt_injection_resilience": 0.82,
        "reliability_score": 0.91
      }
    }]
  },
  "coverage_matrix": [
    {"control": "HIPAA-164.312(a)(2)(i)", "status": "met", "evidence": ["run_123:phi"]},
    {"control": "NIST-AI-RMF-MAP-2", "status": "partial", "gap": "data lineage docs"}
  ],
  "risk_register": [
    {"id":"R-017","title":"Prompt injection susceptibility","severity":"medium","mitigation":"system prompt hardening"}
  ],
  "expiration": "2026-01-20T00:00:00Z",
  "status": "verified"
}
` +
"```" +
`

---

## 8) Security, Privacy & Compliance

*   **Data minimization**: default to metadata-only; PHI ingestion is opt-in + BAA + encryption at rest (KMS) and in transit (TLS 1.2+).
*   **Tenant isolation**: row-level security + per-tenant KMS keys for object storage.
*   **Auditability**: immutable logs; admin export; retention policies per plan.
*   **Assurance**: pursue SOC 2 Type I (H1 2026) then Type II; map internal controls to ISO/IEC 42001.
*   **Regionality**: US-only storage at launch; plan for regional shards.

---

## 9) Pricing, Packaging, Entitlements (initial)

*   **Verified ($299/mo)**: 1 product; up to 2 models; 20 evals/mo; Trust Page; 1 custom mapping profile; API read; email support.
*   **Verified+ ($999/mo)**: 3 products; 10 models; 200 evals/mo; API R/W; webhook; custom badge; SSO; priority support.
*   **Deep Assurance ($35k/yr)**: unlimited evals; packet generator; reviewer workflow; custom frameworks; dedicated CSM; BAA included.
*   **Sentinel add-on ($12k/yr/model)**: runtime monitoring, probes, alerts.
*   **Watchtower (from $150k/yr/system)**: portfolio oversight, policies, exceptions, reporting.

**Metering sources**: runs, models under watch, Trust Pages published, signals ingested, storage.

---

## 10) Success Metrics & Guardrails

*   **Activation**: Time-to-first Passport < 1 day (self-serve), < 7 days (Deep Assurance).
*   **Adoption**: MAU of vendor projects; # of public Trust Pages; # evals per account.
*   **Quality**: False-positive rate on PHI leakage < 2%; packet NPS > 40.
*   **Market**: # of RFPs citing Spectral; # of health systems in Watchtower.
*   **Reliability**: 99.9% uptime; P1 < 1/mo; P95 API latency < 300ms (control plane).

---

## 11) Release Plan & Milestones

### M0 - Tech Spike (Weeks 0-4)

*   Adapter POC (Promptfoo + Custom HTTP).
*   Evidence store + manifest + hashing.
*   Minimal mapping engine (HIPAA/NIST small subset).
*   Trust Page MVP (private).

**Exit criteria**: Generate v0 Passport JSON from a synthetic suite; publish private Trust Page; unit test coverage >= 60% core.

### M1 - Beacon Beta (Weeks 5-12)

*   PHI leakage, hallucination, injection packs.
*   Coverage matrix v1 (HIPAA/NIST/ISO minimal).
*   Public Trust Page with signed badge; RBAC; audit log.
*   Billing & plans; email support tooling.

**Exit criteria**: 5 design partners live; 20+ vendor runs; first public Trust Page.

### M2 - GA + Deep Assurance (Weeks 13-24)

*   Packet generator; reviewer workflow; custom frameworks upload.
*   API hardening; webhook events; SSO; BAA flow.

**Exit criteria**: 20 paying accounts; 3 Deep Assurance; first RFP win citing Spectral.

### M3 - Sentinel Beta (Weeks 25-36)

*   Signals SDK/webhooks; probes; drift alerts; runtime badge.
*   Risk tickets + remediation workflow.

**Exit criteria**: 5 Sentinel logos; MTTR reporting on Trust Pages.

### M4 - Watchtower Design-Partner (Weeks 37-52)

*   Portfolio inventory; policy templates; exceptions; board reports.

**Exit criteria**: 1 health system paid pilot; portfolio dashboard in production.

---

## 12) Tech Architecture (proposed)

*   **Frontend**: React + Tailwind, Next.js app router; shadcn/ui; client auth via OAuth2/PKCE; feature flags (LaunchDarkly or OSS).
*   **Backend**: Node/TypeScript (NestJS) or Go for control plane; REST; background workers (BullMQ) for runs; webhooks.
*   **Data**: Postgres (RLS, pgcrypto); Redis for queues/cache; S3 for artifacts; OpenSearch for evidence search.
*   **Security**: OPA/Rego for policy checks; ed25519 signatures; KMS.
*   **Observability**: OpenTelemetry; logs/metrics/traces; alerting (PagerDuty).
*   **Docs**: Docusaurus + MDX for mapping explainers; API Swagger/OpenAPI.
*   **Infra**: Terraform; AWS primary; multi-AZ; WAF; CloudFront for Trust Pages.

**Scalability considerations**: stateless APIs; back-pressure on large uploads; chunked processing; idempotent run finalization.

---

## 13) UX Flows (key)

1.  **Create Product -> Add Model -> Connect Adapter -> Upload Suite -> Run -> Review Results -> Generate Passport -> Publish Trust Page**.
2.  **Deep Assurance**: Reviewer assigns sections -> comments -> approve -> packet PDF -> share link.
3.  **Sentinel**: Install SDK -> set probes -> alerts -> Risk Ticket -> mitigation run -> auto-update Trust Page.

---

## 14) Requirements Traceability Matrix (RTM)

| Req ID | Requirement                                    | Priority | Acceptance Criteria                                        | Release |
| ------ | ---------------------------------------------- | -------: | ---------------------------------------------------------- | ------- |
| B-01   | Upload evidence artifacts to store with hashes |       P0 | Upload 1GB file; manifest shows sha256; signed URL expires | M1      |
| B-02   | PHI leakage test pack                          |       P0 | 95% recall on seeded PHI strings; FP < 2% on clean corpus  | M1      |
| B-03   | Mapping to HIPAA/NIST/ISO minimal              |       P0 | Coverage matrix renders; 1:many result->control             | M1      |
| B-04   | Trust Page publish with badge                  |       P0 | Public URL; signed JSON; status=Verified/Expired           | M1      |
| DA-01  | Packet generator                               |       P0 | 20-40p PDF with sections & evidence refs                   | M2      |
| S-01   | Signals ingestion API                          |       P0 | 1k events/min sustained; 99.9% delivery                    | M3      |
| W-01   | Policy template & exceptions                   |       P1 | Create policy YAML; view compliance heatmap                | M4      |

---

## 15) Risks & Mitigations

*   **Regulatory drift** -> Keep mapping engine rule-based + versioned; publish change notes; backward-compatible Passports.
*   **Vendor gaming (overfitting to tests)** -> Rotate red-team probes; allow custom, private tests; Sentinel validation.
*   **Data sensitivity** -> Metadata-only defaults; PHI redaction; strict BAAs; encryption & tenant isolation.
*   **Standards competition** -> Open the Passport schema; cultivate advisory board; early RFP references.
*   **Comparative claims liability** -> Avoid "certified safe" language; use "verified against defined criteria with evidence."

---

## 16) Content & Collateral (to produce)

*   Trust Page component library & embed script.
*   Mapping whitepaper (HIPAA/NIST/ISO/FDA) with examples.
*   Adapter quickstarts (Promptfoo, Giskard, Custom HTTP).
*   RFP boilerplate language for buyers.
*   Sales one-pager; security overview; sample Passport & Packet.

---

## 17) Analytics & Instrumentation

*   Event taxonomy: 'project.created', 'run.finalized', 'passport.published', 'trustpage.viewed', 'signal.ingested', 'alert.fired', 'policy.violation'.
*   Funnels: setup -> first run -> first passport -> publish -> share -> conversion.
*   Cohorts: plan, org type, use case.
*   Revenue hooks to billing for unit metering.

---

## 18) Team & RACI (initial)

*   **PM/Founder (Shane)** - Strategy, schema, partners (A).
*   **Tech Lead/CTO** - Architecture, security, code quality (A/R).
*   **Backend Eng** - APIs, runs, mapping engine (R).
*   **Frontend Eng** - Trust Page, console, packet builder (R).
*   **Data/ML Eng** - Test packs, scoring, drift (R).
*   **Compliance Lead** - Framework mapping, packet content (R).
*   **Design** - IA/UX, components (R).
*   **GTM** - Docs, RFP language, pricing ops (R).

---

## 19) Open Questions (trackers)

*   Which 3 frameworks/sections are absolute must-haves in v1 mapping (finalize exact clauses)?
*   Which EHR marketplace to target first for listing?
*   Ledger hashing (public vs private) - is this a GA or later feature?
*   What minimum corpus do we ship for hallucination/clinical reliability by use case (we will rely on vendor-provided ground truth)?

---

## 20) Appendix - Example Coverage Matrix (excerpt)

| Framework              | Control/Clause             | Evidence              | Status  | Notes                          |
| ---------------------- | -------------------------- | --------------------- | ------- | ------------------------------ |
| HIPAA 164.312(a)(2)(i) | Unique User Identification | Run: auth-evidence-01 | Met     | Console & API PATs validated   |
| NIST AI RMF MAP-2      | Measure & manage risks     | Run: probe-set-02     | Partial | Needs bias probe expansion     |
| ISO/IEC 42001 8.5      | AI system records          | Packet section3.2, logs     | Met     | Logs include versioned prompts |

---

**Definition of Done for Beacon GA**

*   Any vendor can self-serve to produce a signed JSON Passport + public Trust Page mapped to a minimally viable set of HIPAA/NIST/ISO/FDA controls, including PHI leakage, hallucination, and prompt-injection results, with a downloadable packet. Billing, RBAC, audit logs, and support are live.

---

## 21) Commercial Model & Price Book (v1)

**Goal:** Clear packaging, price fences, and a realistic path to **$100M ARR** in 4-5 years.

### 21.1 SKUs & Pricing

| SKU                   | Who it’s for          | What’s included                                                                |                      List Price | Notes                                                               |
| --------------------- | --------------------- | ------------------------------------------------------------------------------ | ------------------------------: | ------------------------------------------------------------------- |
| **Verified**          | Early startups        | Trust Page, 1 product, <=2 models, 20 evals/mo, 1 mapping profile, API read     |                     **$299/mo** | Usage overage: $0.50/eval beyond quota; storage overage $0.10/GB-mo |
| **Verified+**         | Scaling vendors       | 3 products, <=10 models, 200 evals/mo, API R/W, webhooks, SSO, priority support |                     **$999/mo** | Extra models $50/mo each; extra mapping profiles $100/mo each       |
| **Deep Assurance**    | Enterprise vendors    | Unlimited evals, packet generator, reviewer workflow, custom frameworks, BAA   |                  **$35,000/yr** | Expedited packet (5-biz-day) +$7,500 one-time                       |
| **Sentinel (add-on)** | Vendors w/ prod usage | Runtime monitoring, probes, drift alerts, runtime badge                        |        **$12,000/yr per model** | Volume tier: 10-49 models $10k; 50+ models $8k                      |
| **Watchtower**        | Health systems        | Portfolio inventory, policies, exceptions, board reporting                     | **from $150,000/yr per system** | Tiered on # of vendors/models; typical ACV $150-300k                |
| **Constellation**     | Multi-entity groups   | Federated standards, delegated attestations, VC/DID option                     |            **from $600,000/yr** | Includes 1 parent + 5 subsidiaries; add’l child orgs +$50k each     |

**Add-ons & Fees**

*   **BAA for non-enterprise plans**: $2,000 one-time (waived for Deep Assurance).
*   **Custom framework pack**: $5,000 per uploaded framework set (DA+).
*   **Professional Services** (optional): $300/hr; fixed-fee packets, migrations, mapping workshops.
*   **Marketplace Listing** (optional co-marketing): $15,000/yr; includes review and badge syndication.

### 21.2 Price Fences & Discount Policy

*   **Fences**: Verified limited to vendors < $5M ARR and <=2 models under monitoring; move to Verified+ or DA beyond limits.
*   **Standard discounts**: up to **20%** on software; **10%** multi-year prepay; **founders/startup program**: 50% off first year for incubators (fenced).
*   **Floor**: No deals below 60% GM.
*   **Co-terming**: Allowed; proration at list minus contracted discount.
*   **Overage billing**: monthly, metered on evaluations, storage, and Sentinel model count.

### 21.3 Channels & OEM

*   **Direct PLG -> Sales-assist -> Enterprise** flow.
*   **OEM/White-label** for EHRs/marketplaces/RCM vendors: **$200k/yr platform fee + 20% rev share**, annual commit, co-brand "Verified by Spectral."
*   **Resellers/VARs**: margin 15% on first year, 10% thereafter.

### 21.4 Land-and-Expand Motions

1.  **Model expansion** (Beacon -> Sentinel per model).
2.  **Product expansion** (add more vendor products/models).
3.  **Framework expansion** (custom frameworks, DA).
4.  **Org expansion** (Watchtower in the health system; Constellation across networks).
5.  **Runtime expansion** (Sentinel everywhere -> Watchtower policy enforcement).

### 21.5 KPIs by SKU

*   **Verified/Verified+**: TTFP (time-to-first-Passport), Trust Pages published, evals/mo, conversion to DA.
*   **Deep Assurance**: packet NPS, time-to-packet, RFP wins with Spectral citation.
*   **Sentinel**: models monitored, alert precision/recall, MTTR.
*   **Watchtower**: % vendor coverage, policy compliance rate, exception backlog age.
*   **Constellation**: member org adoption, credential exchanges/month.

### 21.6 Path to $100M ARR (illustrative mix, Year 5)

Assumes blended **15%** discount/reseller impact across the book.

| Line                    |        Units | Unit Price (list) |   ARR (list) |
| ----------------------- | -----------: | ----------------: | -----------: |
| Verified                |  4,000 accts |           $299/mo |      $14.35M |
| Verified+               |  1,000 accts |           $999/mo |       $12.0M |
| Deep Assurance          |    700 accts |        $35,000/yr |       $24.5M |
| Sentinel                | 2,000 models |        $12,000/yr |       $24.0M |
| Watchtower              |  120 systems | $250,000/yr (avg) |       $30.0M |
| Constellation           |    25 groups |       $600,000/yr |       $15.0M |
| **Subtotal (list)**     |              |                   | **$119.85M** |
| **Net after 15% blend** |              |                   |  **$101.9M** |

**Key assumptions:**

*   10-15% of Beacon logos adopt Sentinel on >=1 model within 12 months.
*   10-20 large systems adopt Watchtower by end of Year 3; network effects drive Constellation by Year 4-5.
*   OEM brings 10-15% of Verified logos via marketplace syndication.

### 21.7 Unit Economics Targets

*   **Gross Margin**: 85%+ software; PS <= 10% of ARR and >= 40% GM.
*   **CAC Payback**: < 9 months for DA; < 3 months for PLG tiers.
*   **Net Revenue Retention**: 120%+ (Sentinel & Watchtower expansion).
*   **Churn**: < 8% PLG; < 4% DA; < 2% platform (Watchtower/Constellation).

### 21.8 Risks to Model & Mitigations

*   **Price compression** -> enforce fences, add value to DA, rotate test packs, differentiate via mappings & network acceptance.
*   **Complexity creep** -> keep SKUs tight; meter by evaluations/models; sunset under-used add-ons.
*   **Partner channel conflict** -> clear rules of engagement; named-account protection; OEM minimums.

---

## 22) Optional Future Modules (not required for $100M)

*   **Auditor Network**: curated third-party assessors who can co-sign Passports.
*   **Community Benchmarks**: de-identified industry baselines per use case.
*   **Verification Credentials**: W3C VC/DID issuance and verification APIs.
*   **Red-Team Marketplace**: paid scenario packs from experts (rev share).
*   **Insurance Tie-ins**: data sharing with cyber/medmal underwriters (opt-in).

---

## 23) GTM Acceptance Playbook (solves the cold-start)

**Objective:** Make it easier for buyers to *require* Spectral than to invent their own evals.

### 23.1 Buyer Advisory Council (BAC)

*   **Members (target 8-10):** 3 CISOs, 2 Compliance/Privacy leaders, 2 CMIO/Clinical Safety, 1 payer risk lead, 1 malpractice underwriter.
*   **Charter:** Endorse the **Open Trust Passport Schema**, co-author buyer **RFP boilerplate**, and define **Minimum Controls List**.
*   **Output artifacts:**

    1.  *RFP Insert* (copy/paste) requiring a Spectral Passport or equivalent.
    2.  *Acceptance Memo* for Legal/Board explaining Passport defensibility.
    3.  *Controls Addendum* (top 12-18 controls, v1) with examples.

### 23.2 Design-Partner Program (Buy-Side)

*   **Cohort-1 (3 systems)**: commit to accept Spectral Passports in at least 3 vendor evaluations each.
*   **Commercials:** $0 in Year 1 license for Watchtower-lite (inventory + reporting) in exchange for public acceptance & logos; converts to standard Watchtower Yr2 if KPIs hit.
*   **KPIs:** 9+ accepted vendor Passports; 1 board report; 1 public case study.

### 23.3 Vendor Co-Marketing & OEM

*   **"Verified by Spectral"** embed with UTM tracking; vendor directory listing; gated PR template.
*   **OEM listing:** one EHR marketplace + one RCM/clearinghouse within 6 months (co-listing fee + rev share).

### 23.4 SLO: Time-to-Yes

*   **Deep Assurance SLO:** 10 business days to packet or 25% credit; *expedite* in 5 days (+$7.5k one-time).

---

## 24) Test Pack Governance & Research Ops (credibility engine)

**Goal:** Maintain neutral, defensible, *living* test packs.

### 24.1 Rubric Council

*   **Owners:** Clinical QA Editor (chair), Security Research Lead, Compliance Lead.
*   **Meeting:** Bi-weekly to approve thresholds, publish change logs, and mark versions.

### 24.2 Versioning & Rotation

*   **Semantic versions** for each pack (e.g., 'phi-1.2.0', 'inj-0.9.4').
*   **Rotation cadence:** High-risk packs (injection/leakage) rotate monthly; others quarterly.
*   **Changelogs:** Public, signed; Trust Pages show active pack versions.

### 24.3 Anti-Gaming Controls

*   **Proctored re-run** option (Spectral-hosted runner with screen capture + hash attestations).
*   **Hidden probes** mixed with declared tests; **canary prompts** in Sentinel.

### 24.4 Evidence Quality SOP

*   **Ground-truth requirements** for hallucination & clinical reliability; template for dataset provenance.
*   **Acceptance thresholds** documented with rationale (stats notes + clinical references).

**KPIs:** Reviewer disagreement rate < 5%; FP on PHI leakage < 2%; pack adoption in >80% of Passports.

---

## 25) PLG -> Enterprise Bridge Strategy

**Problem:** Different buyers & motions. **Solution:** Contractual & product hand-offs.

### 25.1 Contractual Hooks

*   **Health-System Rider** in vendor contracts allowing the buyer to view Passport + Sentinel status.
*   **Buyer Auto-Invite**: When 3+ vendors list the same health system, Watchtower-lite trial is auto-offered.

### 25.2 Product Hooks

*   **Org-level Inventory** (free to buyers): read-only list of all vendor Trust Pages referencing that system; enables upsell to Watchtower.
*   **Policy Templates**: "CDS apps must pass X/Y/Z" -> one-click enforcement if Watchtower activated.

### 25.3 Enterprise Sales Play

*   **Territory model:** Strategic AEs work the top 200 IDNs; SE (Compliance) paired.
*   **Primary deal catalyst:** consolidate 5-10 vendor verifications into system-wide policy + reporting.

**KPIs:** # of systems with >=5 vendors verified; Watchtower POC conversion rate; cycle time from invite -> POC (<60 days).

---

## 26) Mapping Engine Assurance & Liability Controls

**Goal:** Translate results to controls without overreaching legally.

### 26.1 Interpretability Framework

*   **Three-tier statuses:** *Met*, *Partially Met*, *Unmet* + **Confidence band** (High/Med/Low).
*   Each mapping rule stores **justification text** and **evidence links**.

### 26.2 Auditor-in-the-Loop (optional)

*   **Certified reviewer** (Spectral or third-party) co-signs the Packet sections touching regulatory interpretations.
*   **Fee:** +$5,000 per packet; directory of approved auditors.

### 26.3 Legal Language

*   Replace "compliant" with **"verified against defined criteria"**; include **scope boundaries**; vendor **attestation** captured & signed.

### 26.4 QA & Appeals

*   **Second-reader policy** for borderline results; **vendor appeal** workflow with time-boxed re-test.

**KPIs:** Post-deployment incident rate on "Met" controls; # of appeals upheld; external audit findings = 0 critical.

---

## 27) Year-3 ARR Scenarios & Leading Indicators

**Purpose:** Bring clarity to the next 24-36 months and align to your target.

### 27.1 Scenarios (Net ARR, end of Year 3)

| Scenario     |         ARR | Key Delimiters                                                                                                      |
| ------------ | ----------: | ------------------------------------------------------------------------------------------------------------------- |
| **Base**     | **$18-22M** | Matches cohort & adoption in PRD; 3 buyer systems accepting Passports; 200 DA; 300 Sentinel models; 8-12-mo cycles. |
| **Upside**   | **$28-35M** | OEM distribution lands early; 6+ buyer systems mandate Passport; 350 DA; 600 Sentinel models; 2 Watchtower paid.    |
| **Downside** | **$10-14M** | Buyer acceptance lags; DA throughput bottlenecks; Sentinel slips; PLG churn >10%.                                   |

### 27.2 Early-Warning Dashboard (Quarterly)

*   **Buyer acceptance**: # of RFPs using our boilerplate; # of accepted Passports per system.
*   **DA ops**: median TTP (time-to-packet), backlog days, reviewer utilization.
*   **PLG health**: Trust Pages published, evals/org/mo, 90-day logo retention.
*   **Bridge metric**: health systems with >=3 distinct vendors verified.
*   **Sentinel attach**: % of DA accounts adding >=1 model within 90 days.

---

## 28) 12-Week Readiness Plan (handoff gating)

**Exit of 12 weeks = org is hand-off ready and GTM-synced.**

**Week 1-2**

*   Convene BAC; ratify **Minimum Controls (v1)**; publish *Passport Schema v1.0*.
*   Draft **RFP Insert** & **Board memo**; legal review complete.

**Week 3-4**

*   Launch **Beacon Beta** with PHI, hallucination, injection packs + signed Trust Page.
*   Stand up **Review Ops** (2 FTE + 2 contractors); publish SLOs.

**Week 5-6**

*   Secure **3 buyer design partners** (acceptance commitments signed).
*   Close **OEM LOI** for first marketplace listing.

**Week 7-8**

*   Deliver **first 5 DA packets** (<=10 biz days).
*   Release **Policy Templates v1**; enable buyer inventory view (read-only).

**Week 9-10**

*   Ship **Sentinel signals webhook** beta to 3 logos; activate canaries.
*   Publish **Test Pack changelog site**; rotate injection pack v0.9 -> v1.0.

**Week 11-12**

*   20 public Trust Pages; 2 buyer systems with >=3 verified vendors each.
*   Freeze **Pricing Playbook** & **Discount fences**; train AEs/SEs.

**Go/No-Go Gate**

*   If <2 buyer systems accepting and <10 DA packets delivered, **extend Beta** and add 3 contractor reviewers; if met/exceeded, **enter GA** and open paid tiers.
`;