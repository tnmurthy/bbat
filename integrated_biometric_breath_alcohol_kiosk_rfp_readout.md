# Integrated Biometric and Breath Alcohol Testing Kiosk RFP

## Plain-Language Readout

The attached document is an RFP for a complete employee safety and monitoring system for Hyderabad Division ticket-checking staff.

The Railway wants a vendor to provide:

1. **Biometric Breath Alcohol Testing Kiosks**
2. **Centralized Monitoring Software**
3. **HHT GPS Movement Tracking Application**

The system will authenticate staff, conduct breath-alcohol tests, record attendance, generate alerts, monitor kiosk health and calibration, track authorized HHT devices, and provide centralized reports.

> The Railway is not merely buying a kiosk. It is procuring an integrated hardware, software, AI, tracking, reporting, cybersecurity and maintenance solution.

## Main Components

### 1. Biometric Breath Alcohol Kiosk

Staff members will identify themselves using biometrics or facial recognition and complete a breath-alcohol test before duty or lobby entry.

The kiosk is expected to include:

- Touchscreen display.
- Biometric and/or facial recognition.
- RGB and IR cameras.
- Professional breath-alcohol sensor.
- Automatic breath-flow monitoring.
- Invalid-sample detection.
- Auto-purge and zero-check functionality.
- Audio and visual guidance.
- Tamper detection.
- Network connectivity.
- Remote health monitoring.
- Secure storage of test records.

The draft specifies an 8-inch touchscreen, minimum 4 GB RAM, 64 GB storage, minimum 5,000-user capacity, fuel-cell or equivalent professional breath-alcohol sensing, a 0–400 mg/100 ml detection range, 1 mg/100 ml resolution, accuracy of ±2 mg/100 ml or better, response time below 10 seconds, IP54 enclosure and a minimum three-year expected life.

### 2. Centralized Web Dashboard

Railway officials will use a centralized application to manage:

- Employee master data.
- Biometric and facial profiles.
- Breath Alcohol test records.
- Attendance.
- Failed, invalid and confirmatory tests.
- Positive-test alerts.
- Kiosk status and device health.
- Calibration schedules and certificates.
- User roles and permissions.
- Audit trails.
- MIS reports.
- PDF, Excel and CSV exports.
- API integrations.
- Backups and remote configuration.

The dashboard should provide employee-wise, kiosk-wise, location-wise and date/time-wise searches. It should also link the photograph captured during each test to the corresponding test record.

### 3. HHT Movement Tracking

The HHT application will track authorized handheld terminals used by ticket-checking staff.

It should capture:

- HHT device ID.
- Employee ID and name.
- Date and time.
- Latitude and longitude.
- GPS accuracy.
- Network status.
- Battery status.
- Device and application status.
- Login and logout status.
- Location history.

It should support configurable tracking intervals, live maps, historical route playback, offline data storage, automatic synchronization, geofencing and alerts for GPS being disabled, low battery, device offline or application stoppage.

The bidder must ensure that tracking does not adversely affect the existing ticket-checking application or HHT battery performance.

## Operational Workflow

1. Ticket-checking staff member enters or selects the employee ID.
2. The system performs biometric or facial authentication.
3. The staff member completes the Breath Alcohol test.
4. The kiosk captures an image and records the test result.
5. If the sample is invalid or the image is unclear, the staff member repeats the test.
6. If the test passes, the user proceeds to the TTE CRIS Lobby biometric login.
7. If the test fails, the system records the event and sends an alert to designated supervisors.
8. All actions are preserved in the audit trail.

## Optional AI Features

The following features should be treated as optional and priced separately:

- Facial liveness detection.
- Anti-spoofing against photographs, mobile screens, video replay and masks.
- Breath-quality verification.
- Fatigue detection.
- Drowsiness detection.
- Mask detection.
- Voice authentication.
- Predictive maintenance of the breath-alcohol sensor.

AI features should not be accepted only on the basis of marketing claims. Bidders should provide measurable performance data and demonstrate the features through predefined test scenarios.

Fatigue and drowsiness results should be treated as assistive indicators and should not, by themselves, be considered conclusive evidence of an employee’s fitness or unfitness.

## Integration and Infrastructure

The bidder is responsible for integrating the solution with Railway systems such as:

- Travelling Ticket Examiner Lobby.
- Attendance Management System.
- HRMS.
- Other Railway applications specified by the Railway.

The system may be hosted on the bidder’s secure cloud or on Railway/CRIS-designated infrastructure. If required, the bidder must support migration to Railway infrastructure without additional financial implication.

The bidder must provide APIs, middleware, authentication mechanisms, data exchange interfaces and synchronization mechanisms required for integration.

## Security and Data Ownership

The system must provide:

- Role-based access control.
- Encryption of data in transit and at rest.
- Secure communication.
- Secure boot and digitally signed firmware where supported.
- Tamper-resistant audit logs.
- Scheduled backup.
- Disaster recovery and business continuity.
- Secure offline synchronization.
- Controlled access to biometric and GPS records.
- Security updates and vulnerability remediation.

All employee data, biometric information, breath-test records, attendance records, GPS data, AI results, audit records and reports generated under the project will belong to Indian Railways.

The bidder must provide structured data export, database schema, API documentation, configuration files, deployment documents, backup procedures, data dictionary and migration support at the end of the contract or whenever required.

## Warranty and Support

The draft requires:

- Minimum three-year comprehensive on-site warranty.
- Coverage of hardware, software, firmware, sensors, cameras, displays, AI modules and peripherals.
- Free software updates, firmware upgrades, security patches and AI model updates during warranty.
- Periodic sensor calibration and calibration certificates.
- Replacement of defective components.
- Consumables required for normal operation during warranty.
- Spare-parts inventory.
- Replacement of a device that remains non-functional for more than seven consecutive days.
- 24-hour remote technical support and helpdesk service.

## Service-Level Requirements

The draft specifies:

| Service parameter | Requirement |
|---|---:|
| Annual system availability | Minimum 99.5% |
| Critical incident response | Within 2 hours |
| Critical incident resolution | Within 8 hours |
| Major incident resolution | Within 24 hours |
| Minor incident resolution | Within 48 hours |
| Critical cybersecurity vulnerability rectification | Within 48 hours |
| Root Cause Analysis report for major failures | Within 5 working days |

The RFP should add service credits or other consequences for SLA breaches.

## Acceptance Testing

Before final acceptance, the bidder should demonstrate:

- Employee registration and biometric enrollment.
- Successful authentication.
- Failed authentication.
- Valid breath sample.
- Invalid or insufficient breath sample.
- Positive or threshold-exceeding result.
- Repeat and confirmatory tests.
- Image linkage to test records.
- Automatic alerts.
- Authorized manual override and audit logging.
- Calibration-due alerts.
- Device-fault alerts.
- Offline operation and later synchronization.
- HHT live tracking.
- Historical route playback.
- Dashboard reports and exports.
- Role-based access.
- Backup and restoration.
- Secure software or firmware update.
- Tamper detection.

The Railway should retain the right to independently verify Breath Alcohol accuracy through an authorized, competent or NABL-accredited laboratory. Any material deviation should require calibration, rectification or replacement at the bidder’s cost.

## Recommended Evaluation Method

Use Quality-and-Cost Based Selection:

| Component | Marks |
|---|---:|
| Technical evaluation | 70 |
| Commercial evaluation | 30 |
| **Total** | **100** |

### Technical Scoring

| Technical category | Marks |
|---|---:|
| Architecture and understanding | 5 |
| Kiosk hardware | 10 |
| Breath Alcohol testing | 15 |
| Biometric and AI capability | 8 |
| Centralized dashboard | 8 |
| HHT movement tracking | 7 |
| Cybersecurity and data governance | 7 |
| Implementation and project team | 4 |
| Warranty, AMC and SLA | 4 |
| Relevant experience | 2 |
| **Total** | **70** |

A bidder should qualify only if it:

- Meets all mandatory eligibility conditions.
- Complies with mandatory technical requirements.
- Obtains at least 49 out of 70 technical marks.
- Passes the mandatory technical demonstration.
- Passes the acceptance-test requirements.
- Has no material deviation from critical specifications.

### Technical Category Details

#### Architecture and Understanding — 5 Marks

- Completeness of end-to-end architecture: 1.5.
- Understanding of Railway workflows and operational risks: 1.
- Interoperability and API architecture: 1.
- Scalability and maintainability: 0.75.
- Quality of proposal, diagrams and traceability matrix: 0.75.

#### Kiosk Hardware — 10 Marks

- Hardware above minimum specification: 1.
- Display, camera, microphone, speaker and user interface: 1.
- Enclosure, mounting, IP rating and environmental suitability: 1.
- Connectivity, interfaces and power protection: 1.
- Tamper detection and secure boot: 1.
- Device health monitoring and remote management: 1.
- Ease of use, accessibility and multilingual interface: 1.
- Maintainability, modularity and spares: 1.
- Product maturity and production status: 1.
- Live kiosk demonstration: 1.

#### Breath Alcohol Testing — 15 Marks

- Sensor technology and professional suitability: 2.
- Measurement range, resolution and accuracy: 2.
- Calibration and verification capability: 2.
- Repeatability, stability and sensor-drift control: 2.
- Breath-flow monitoring and invalid-sample detection: 1.5.
- Auto-purge, zero check and self-diagnostics: 1.5.
- Anti-tampering and secure result recording: 1.
- Response time and operational throughput: 1.
- Calibration history and reminders: 1.
- Demonstration with approved reference samples or equipment: 2.

#### Biometric and AI — 8 Marks

- Biometric and facial authentication: 1.5.
- Liveness and presentation-attack detection: 1.5.
- Breath-quality or artificial-sample detection: 1.
- Lighting and face-position performance: 1.
- Confidence score and exception handling: 0.75.
- Privacy-preserving biometric templates: 1.
- AI model-update and monitoring process: 0.75.
- Demonstration of test scenarios: 0.5.

#### Centralized Software — 8 Marks

- Employee, biometric and HHT master data: 1.
- Breath Alcohol monitoring and alerts: 1.
- Attendance and exception workflows: 1.
- Device health and calibration: 1.
- Audit trails and tamper-resistant records: 1.
- Reports, filters and exports: 1.
- Role-based access and administration: 1.
- Usability, responsiveness and languages: 1.

#### HHT Movement Tracking — 7 Marks

- Compatibility assessment: 1.
- GPS accuracy and configurable interval: 1.
- Live map and historical routes: 1.
- Offline capture and synchronization: 1.
- Battery and performance optimization: 1.
- Geofencing and alerts: 1.
- Secure device binding and authorized access: 1.

#### Cybersecurity and Data Governance — 7 Marks

- Secure architecture and threat model: 1.
- Encryption: 1.
- Identity and privileged-user management: 1.
- Audit logging, monitoring and incident response: 1.
- Secure development and vulnerability management: 1.
- Backup, disaster recovery and continuity: 1.
- Data ownership, retention, deletion and exit plan: 1.

#### Implementation and Project Team — 4 Marks

- Implementation plan and schedule: 1.
- Site survey, pilot and rollout plan: 0.75.
- Project manager and technical team: 0.75.
- Integration and migration approach: 0.75.
- Training and change-management plan: 0.75.

#### Warranty, AMC and SLA — 4 Marks

- Warranty and spare-parts plan: 1.
- Helpdesk, escalation and field support: 1.
- SLA compliance and service credits: 1.
- Calibration and preventive maintenance: 1.

#### Relevant Experience — 2 Marks

- Comparable completed deployments: 1.
- Quality and relevance of references: 1.

## Commercial Evaluation

The commercial score may be calculated as:

\[
\text{Commercial Score}_i =
\frac{\text{Lowest Evaluated Bid Price}}
{\text{Evaluated Bid Price of Bidder }i}
\times 30
\]

The evaluated price should include:

- Kiosk hardware.
- Installation and commissioning.
- Software development and configuration.
- Integrations and APIs.
- Hosting or infrastructure.
- Licenses and subscriptions.
- Warranty.
- Calibration.
- Consumables.
- Training and documentation.
- Support and AMC.
- Applicable taxes and recurring charges.

## Final Ranking

\[
\text{Final Score}_i = \text{Technical Score}_i + \text{Commercial Score}_i
\]

Example:

| Bidder | Technical / 70 | Commercial / 30 | Final / 100 | Rank |
|---|---:|---:|---:|---:|
| Bidder A | 61 | 25 | 86 | 1 |
| Bidder B | 64 | 20 | 84 | 2 |
| Bidder C | 55 | 27 | 82 | 3 |

### Tie-Breaking

1. Higher Breath Alcohol testing score ranks higher.
2. If still tied, higher cybersecurity score ranks higher.
3. If still tied, higher technical score ranks higher.
4. If still tied, lower evaluated price ranks higher.
5. If still tied, use another transparent method permitted by applicable procurement rules.

## Suggested Price Schedule

| Item | Description | Quantity | Unit price | Total price |
|---:|---|---:|---:|---:|
| 1 | Integrated biometric-cum-breath alcohol kiosk | As required |  |  |
| 2 | Kiosk installation and commissioning | As required |  |  |
| 3 | Centralized application and dashboard | 1 lot |  |  |
| 4 | HHT movement tracking application | 1 lot |  |  |
| 5 | API and Railway-system integration | 1 lot |  |  |
| 6 | Hosting or infrastructure setup | 1 lot |  |  |
| 7 | Training and documentation | 1 lot |  |  |
| 8 | Initial calibration and certification | As required |  |  |
| 9 | Three-year warranty support | 1 lot |  |  |
| 10 | AMC, Year 4 | Optional |  |  |
| 11 | AMC, Year 5 | Optional |  |  |
| 12 | AMC, Year 6 | Optional |  |  |
| 13 | Consumables and mouthpieces | As required |  |  |
| 14 | Optional liveness and anti-spoofing | Optional |  |  |
| 15 | Optional breath-quality verification | Optional |  |  |
| 16 | Optional fatigue or drowsiness detection | Optional |  |  |
| 17 | Optional mask detection | Optional |  |  |
| 18 | Optional voice authentication | Optional |  |  |
| 19 | Additional kiosk for future expansion | Rate contract |  |  |
| 20 | Additional HHT/device license | Rate contract |  |  |

## Bidder Compliance Matrix

Require every bidder to submit a clause-by-clause compliance matrix:

| Clause | Requirement | Bidder response | Complied / Deviated | Evidence reference | Remarks |
|---|---|---|---|---|---|
| H-01 | Minimum 8-inch touchscreen display |  |  |  |  |
| H-02 | Minimum 5,000-user capacity |  |  |  |  |
| BA-01 | Fuel-cell or equivalent professional sensor |  |  |  |  |
| BA-02 | Measurement range 0–400 mg/100 ml |  |  |  |  |
| BA-03 | Accuracy ±2 mg/100 ml or better |  |  |  |  |
| BA-04 | Automatic invalid-sample detection |  |  |  |  |
| SW-01 | Centralized web dashboard |  |  |  |  |
| SW-02 | Role-based access control |  |  |  |  |
| SW-03 | Tamper-resistant audit logs |  |  |  |  |
| HHT-01 | Configurable GPS tracking interval |  |  |  |  |
| HHT-02 | Offline capture and synchronization |  |  |  |  |
| SEC-01 | Encryption in transit and at rest |  |  |  |  |
| SLA-01 | Minimum 99.5% annual uptime |  |  |  |  |
| WAR-01 | Three-year comprehensive warranty |  |  |  |  |

The bidder should provide model numbers, technical values, product literature, certificates and evidence references instead of writing only “Complied.”

## Recommended Improvements Before Issue

The technical foundation is strong, but the document should be completed as a formal RFP by adding:

- Exact number of kiosks and HHT devices.
- Installation locations.
- Bidder eligibility conditions.
- Bid-security and performance-security clauses.
- Detailed price schedule.
- Technical and commercial evaluation rules.
- Acceptance-test protocol.
- Liquidated damages and service credits.
- Data-retention and privacy requirements.
- Cybersecurity audit and vulnerability-testing requirements.
- Cloud-hosting and infrastructure responsibilities.
- Backup, recovery and business-continuity targets.
- Battery-impact limits for HHT tracking.
- Source-code, API and technical-documentation handover.
- Change-control procedure.
- Subcontractor and third-party-service disclosures.
- Termination, dispute-resolution and exit-management clauses.

## Recommended Award Clause

> The contract shall be awarded to the bidder obtaining the highest aggregate score under the Quality-and-Cost Based Selection methodology, subject to meeting all eligibility conditions, mandatory technical requirements, minimum technical qualifying score, demonstration requirements, acceptance tests and applicable procurement rules. The Railway reserves the right to seek clarification, reject materially non-compliant bids, cancel the tender, or negotiate only where permitted by applicable rules.

## Overall Reading

The document is a detailed technical scope and specification for an integrated Railway safety-monitoring solution. It is not yet a fully publication-ready RFP because the formal tender, commercial, evaluation and contractual sections still need to be added.

The most important procurement controls should be:

- Objective Breath Alcohol accuracy verification.
- Mandatory calibration and traceability.
- Independent testing rights for the Railway.
- Secure and tamper-resistant records.
- Strong protection of biometric and GPS data.
- Demonstration-based evaluation.
- Clear acceptance criteria.
- Defined SLA penalties and replacement obligations.
- Complete data and technical handover at exit.

_Source document reviewed: Procurement of Integrated AI-Enabled Biometric-cum-Breath Alcohol Testing Kiosk for Ticket Checking Staff._
