# Google Stitch Frontend Design and Build Prompt
## Railway Biometric and Breath Alcohol Monitoring Portal

**Purpose:** Use this document as a master prompt for Google Antigravity or an equivalent AI development environment that can invoke Google Stitch to design and build the frontend for the centralized web portal and dashboard described in the RFP.

**Scope:** Frontend design, screen generation, interaction design, workflow prototypes and frontend implementation for the web portal only.

**Do not build:** Kiosk hardware, kiosk firmware, biometric algorithms, HHT mobile application or live Railway integrations.

---

# 1. Master Prompt

You are a senior product designer, UX architect and frontend engineer building an enterprise Railway operations portal.

Use Google Stitch to generate a coherent, production-oriented frontend design system and screen set for a centralized web portal that monitors biometric authentication, Breath Alcohol tests, attendance, kiosk health, calibration, alerts and HHT movement data for authorized Railway officials.

The design must be suitable for a safety-sensitive government and transport environment. It must prioritize clarity, auditability, operational speed, accessibility, role-based visibility and low cognitive load over decorative visual effects.

Create the design in a consistent desktop-first responsive system that also works on tablets. Use realistic mock data. Generate all required screens, states, navigation, forms, tables, charts, drawers, dialogs and workflow transitions listed in this document.

Do not invent unrelated modules. If a requirement is ambiguous, represent it as configurable UI and mark it as a product decision rather than silently assuming a final policy.

The design must support future API integration. Use stable identifiers, explicit status labels and data structures that can map cleanly to the backend specification.

---

# 2. Product Context

The portal is the central administration and monitoring application for an integrated Railway employee safety system.

It receives data from:

- Biometric and Breath Alcohol Testing kiosks.
- HHT tracking services.
- Existing Railway applications such as TTE Lobby, attendance and HRMS systems.
- Authorized administrative users.

The portal must help users:

- Monitor operational activity.
- Identify failed, positive and invalid Breath Alcohol tests.
- Review alerts and assign follow-up actions.
- Monitor kiosk and HHT health.
- Track calibration due dates.
- Search employee and historical records.
- Generate reports.
- Maintain an auditable record of administrative actions.

The portal is not an automated disciplinary or medical-decision system. Use human-review states wherever an operational decision may affect an employee.

---

# 3. Design Goals

1. Make urgent safety events visible immediately.
2. Make routine operations fast and predictable.
3. Prevent accidental modification of historical records.
4. Make filters, status meanings and ownership clear.
5. Allow a supervisor to move from alert to supporting evidence in one or two actions.
6. Show data freshness and source status.
7. Avoid excessive use of red; reserve it for critical or failed conditions.
8. Show text labels with colors so status is not color-dependent.
9. Make sensitive-data visibility obvious.
10. Provide responsive layouts for desktop and tablet.

---

# 4. Visual Direction

Create a calm, high-trust enterprise interface.

## 4.1 Recommended Style

- Light neutral background.
- White or near-white content surfaces.
- Deep navy or charcoal primary navigation.
- Blue primary action color.
- Teal or green for healthy/pass states.
- Amber for due, pending or warning states.
- Red only for failed, critical or security conditions.
- Moderate border radius: 8–12px.
- Subtle borders and shadows.
- Dense but readable tables.
- Clear typography hierarchy.
- Strong alignment and consistent spacing.

## 4.2 Avoid

- Neon gradients.
- Glassmorphism.
- Excessive animations.
- Gaming-style dashboards.
- Decorative illustrations that compete with operational data.
- Tiny text.
- Color-only status indicators.
- Unexplained AI labels.
- Auto-playing media.

## 4.3 Typography

Use a highly legible sans-serif font such as Inter, Roboto or an available equivalent.

Suggested scale:

- Page title: 24–28px.
- Section title: 18–20px.
- Card metric: 24–32px.
- Body text: 14–16px.
- Table text: 13–14px.
- Supporting label: 12–13px.

## 4.4 Layout

- Fixed left navigation on desktop.
- Collapsible navigation on tablet.
- Top header with page title, scope, notifications, user menu and environment indicator.
- Maximum content width suitable for large dashboards.
- Use 12-column grid where appropriate.
- Preserve generous spacing around critical alerts.

---

# 5. Navigation Structure

Create the following navigation:

1. Dashboard
2. Breath Alcohol Tests
3. Attendance
4. Alerts
5. Employees
6. Kiosks
7. HHT Tracking
8. Calibration
9. Reports
10. Audit Log
11. Administration
12. Help or Documentation

Administration should contain:

- Users.
- Roles and permissions.
- Divisions and locations.
- System configuration.
- Integration settings placeholder.

The visible menu must be role-dependent. Users must not see navigation items for which they have no permission.

---

# 6. Design System Components

Generate reusable components rather than one-off screens.

## 6.1 Required Components

- App shell.
- Sidebar navigation.
- Top header.
- Breadcrumbs.
- Page title block.
- Scope selector.
- Date-range selector.
- KPI card.
- Status badge.
- Severity badge.
- Data table.
- Pagination.
- Search input.
- Filter drawer.
- Filter chips.
- Empty state.
- Loading skeleton.
- Error state.
- Confirmation dialog.
- Destructive-action dialog.
- Detail drawer.
- Detail page.
- Timeline.
- Toast notification.
- Tabs.
- Chart card.
- Map card.
- File-upload field.
- Activity/audit row.
- Permission-gated action button.

## 6.2 Status Labels

Use explicit text labels:

- Pass.
- Failed.
- Invalid sample.
- Insufficient sample.
- Pending review.
- Confirmatory test.
- Online.
- Offline.
- Maintenance.
- Fault.
- Calibration due.
- Calibration expired.
- New.
- Acknowledged.
- Assigned.
- In progress.
- Resolved.
- Closed.

## 6.3 Severity Labels

- Critical.
- High.
- Medium.
- Low.

Each severity must include icon, text and color.

---

# 7. Screen Requirements

## 7.1 Login Screen

Create:

- Product name and short description.
- User ID/email field.
- Password field.
- Sign-in button.
- Validation messages.
- Forgot-password placeholder.
- Support contact placeholder.
- Environment label for development or staging.

States:

- Empty.
- Invalid credentials.
- Locked or inactive account.
- Loading.
- Successful redirect.

## 7.2 Dashboard

Create a configurable operations dashboard with:

### Header Controls

- Date range.
- Division.
- Station or unit.
- Refresh timestamp.
- Manual refresh button.
- Export summary action if permitted.

### KPI Cards

- Total tests.
- Pass tests.
- Failed or positive tests.
- Invalid tests.
- Employees tested.
- Attendance exceptions.
- Online kiosks.
- Offline kiosks.
- Calibration due.
- Open critical alerts.
- Active HHTs.
- Stale HHT locations.

### Charts

- Breath Alcohol tests by day.
- Pass/fail trend.
- Tests by station.
- Alert severity distribution.
- Kiosk availability.
- Calibration status.
- HHT activity summary.

### Operational Panels

- Critical alerts requiring action.
- Recent failed tests.
- Kiosks requiring attention.
- Calibration due soon.
- Stale HHT devices.
- Recent activity.

### Dashboard Behaviour

- Clicking a KPI navigates to the filtered underlying list.
- Clicking an alert opens alert detail.
- Clicking a failed test opens test detail.
- Charts support hover details and keyboard-accessible alternatives.
- Show “data as of” timestamp.
- Show empty states when no data exists.

## 7.3 Breath Alcohol Test List

Create a dense but readable data table.

### Filters

- Date range.
- Employee.
- Employee ID.
- Result.
- Test status.
- Kiosk.
- Station or unit.
- Location.
- Confirmatory-test status.
- Calibration status.

### Columns

- Test ID.
- Employee.
- Date/time.
- Kiosk.
- Location.
- Measured value.
- Unit.
- Threshold.
- Result.
- Test status.
- Authentication result.
- Image availability.
- Alert status.
- Review status.

### Interactions

- Open test detail.
- Apply filters.
- Clear filters.
- Save filter view placeholder.
- Export filtered records.
- Sort by permitted columns.
- Paginate.

### States

- Loading.
- No results.
- API error.
- Unauthorized.
- Large result set.

## 7.4 Breath Alcohol Test Detail

Create a detail page with:

- Test identity and status header.
- Employee summary.
- Kiosk and location summary.
- Test measurement and unit.
- Threshold used.
- Authentication outcome.
- Test sequence.
- Calibration validity.
- Linked image placeholder or image preview.
- Confirmatory-test relationship.
- Linked alerts.
- Source event metadata.
- Review notes.
- Immutable event timeline.
- Audit history.

Actions:

- Open employee.
- Open kiosk.
- Open linked alert.
- Add review note if authorized.
- Initiate allowed confirmatory-test workflow placeholder.
- Export detail if authorized.

Do not show an edit button for the original measurement or result.

## 7.5 Attendance

Create an attendance summary page with:

- Date selector.
- Employee filter.
- Station/unit filter.
- Attendance status filter.
- Breath-test status filter.
- First authentication time.
- Last authentication time.
- Exception reason.
- Review status.

Actions:

- Open employee history.
- Review exception.
- Add authorized override.
- Export report.

Override dialog must require:

- Exception type.
- Reason.
- Confirmation.
- Optional supporting reference.

Show a warning that the original event remains unchanged.

## 7.6 Alerts

Create an alert operations screen.

### List Filters

- Severity.
- Status.
- Alert type.
- Date range.
- Station/unit.
- Assignee.
- Source device.

### Table Columns

- Alert ID.
- Severity.
- Type.
- Source.
- Employee, if applicable.
- Location.
- Created time.
- Assignee.
- Status.
- Last update.

### Alert Detail

Show:

- Severity and status.
- Event summary.
- Source record.
- Employee and location.
- Created time.
- Assignment.
- Timeline.
- Related test or device.
- Notes.
- Audit history.

Actions:

- Acknowledge.
- Assign.
- Change status.
- Resolve.
- Close.

Resolution must require a note. Destructive or closing actions require confirmation.

## 7.7 Employees

Create:

- Employee list.
- Employee creation form.
- Employee edit form.
- Employee detail page.
- Employee test history.
- Employee attendance history.
- HHT assignment history.

### Employee List Columns

- Employee ID.
- HRMS ID.
- Name.
- Designation.
- Division.
- Station/unit.
- HHT ID.
- Authentication-profile status.
- Employment status.
- Last test.
- Actions.

### Employee Form

Fields:

- Employee code.
- HRMS ID.
- Full name.
- Designation.
- Division.
- Station/unit.
- HHT ID.
- Employment status.
- Authentication profile status.
- Effective dates.

Add CSV import with:

- Download template.
- Upload file.
- Validation preview.
- Row-level errors.
- Import summary.
- Confirm import.

## 7.8 Kiosks

Create a kiosk registry and monitoring screen.

### Kiosk List Columns

- Kiosk ID.
- Serial number.
- OEM/model.
- Location.
- Online/offline status.
- Last seen.
- Firmware version.
- Sensor status.
- Calibration status.
- Open alerts.

### Kiosk Detail

Show:

- Device identity.
- Location.
- Installation and warranty details.
- Current health.
- Health timeline.
- Sensor state.
- Calibration history.
- Recent tests.
- Open alerts.
- Firmware/application version.

## 7.9 HHT Tracking

Create a map-centered screen.

### Controls

- Date/time range.
- Division.
- Station/unit.
- Employee.
- HHT device.
- Status.
- Stale-location filter.

### Map

- Show latest location markers.
- Marker status must include text or accessible alternative.
- Selected device displays a route line.
- Display last update time and GPS accuracy.

### Side Panel or Table

- HHT ID.
- Employee.
- Last location time.
- Battery.
- GPS status.
- Network status.
- Device status.
- Application status.

### HHT Detail

- Latest location.
- Historical location table.
- Route playback placeholder or ordered route view.
- Battery and network trend placeholder.
- Device and application status.
- Assignment history.

Do not expose location data to users without `hht.view` permission.

## 7.10 Calibration

Create:

- Calibration dashboard.
- Calibration list.
- Calibration form.
- Calibration detail.

### Calibration List Columns

- Kiosk.
- Sensor serial number.
- Last calibration date.
- Due date.
- Status.
- Certificate number.
- Agency/technician.
- Open alerts.

### Calibration Form

Fields:

- Kiosk.
- Sensor serial number.
- Calibration date.
- Due date.
- Agency.
- Technician.
- Certificate number.
- Result.
- Certificate upload.
- Remarks.

Show a warning when adding a new calibration record that historical records remain preserved.

## 7.11 Reports

Create a report catalogue with cards or rows for:

- Daily Breath Alcohol tests.
- Failed and positive tests.
- Invalid and repeated tests.
- Employee-wise history.
- Kiosk-wise report.
- Station-wise summary.
- Attendance exceptions.
- Calibration due/expired.
- Device health.
- Alert and resolution.
- HHT location history.
- Audit activity.

Each report page should provide:

- Filters.
- Preview table.
- Record count.
- Export CSV.
- Export job status.
- Export history.

## 7.12 Audit Log

Create an audit-log table.

Columns:

- Event ID.
- Actor.
- Event type.
- Entity.
- Entity ID.
- Timestamp.
- IP address.
- Correlation ID.
- Summary.

Filters:

- Date range.
- Actor.
- Event type.
- Entity type.
- Entity ID.
- Severity or security flag.

Audit records must appear read-only.

## 7.13 Administration

Create administration screens for:

- Users.
- Roles and permissions.
- Divisions and locations.
- System configuration.
- Integration settings placeholder.

System configuration should include:

- Breath Alcohol threshold.
- Measurement unit.
- Calibration reminder period.
- Device-offline duration.
- HHT stale-location duration.
- Dashboard refresh interval.
- Alert severity mapping.
- Data-retention placeholder.

Show configuration version and last updated by.

---

# 8. Required Workflows

## Workflow 1: Failed Breath Alcohol Test

1. Mock or API event creates a failed test.
2. Dashboard KPI updates.
3. Failed-test list shows the new transaction.
4. Alert is generated.
5. Alert appears in the critical/high alert panel.
6. Supervisor opens the alert.
7. Supervisor opens the linked test detail.
8. Supervisor acknowledges the alert.
9. Supervisor assigns it to an authorized officer.
10. Supervisor adds a review note.
11. Supervisor resolves the alert.
12. Resolution note and actor appear in the audit timeline.
13. Original test result remains unchanged.

## Workflow 2: Invalid Breath Sample

1. Invalid or insufficient sample event is ingested.
2. Test status is shown as invalid or insufficient.
3. The system displays retry or repeat-test information.
4. Repeated attempts are grouped through sequence or parent-test references.
5. The supervisor can view the full test sequence.
6. The event is not silently converted to pass or fail.

## Workflow 3: Calibration Due

1. Scheduler identifies an approaching due date.
2. Calibration-due alert is created.
3. Dashboard calibration card updates.
4. Maintenance Officer opens the kiosk detail.
5. Maintenance Officer creates a new calibration record.
6. Certificate is uploaded.
7. Authorized user verifies the record.
8. Alert is resolved.
9. Calibration history remains available.

## Workflow 4: Kiosk Offline

1. Device-health event shows a kiosk offline.
2. Kiosk status changes to Offline.
3. An alert is created after the configured duration.
4. Supervisor opens the kiosk detail.
5. Health timeline shows last-seen time.
6. Maintenance Officer is assigned.
7. Resolution details are recorded.

## Workflow 5: HHT Stale Location

1. HHT stops sending location updates.
2. The device becomes stale after the configured duration.
3. Dashboard shows the stale indicator.
4. Supervisor filters the HHT screen for stale devices.
5. Supervisor opens device detail and sees last location, battery and network state.
6. An alert may be acknowledged or assigned.

## Workflow 6: Employee CSV Import

1. Administrator downloads the template.
2. Administrator uploads a CSV.
3. System validates file structure and rows.
4. System shows valid rows and errors.
5. Administrator confirms import.
6. Valid records are created or updated according to policy.
7. Invalid rows remain excluded.
8. Import summary is shown.
9. Audit event is created.

## Workflow 7: Authorized Attendance Override

1. Supervisor opens an attendance exception.
2. Supervisor selects an allowed exception reason.
3. Supervisor enters a mandatory explanation.
4. System asks for confirmation.
5. System records the override as a new event.
6. The original authentication and test records remain unchanged.
7. Audit history shows who performed the override and why.

## Workflow 8: Report Export

1. User chooses a report.
2. User applies filters.
3. System shows record count.
4. User selects export.
5. System verifies permission and data scope.
6. Export job is created.
7. Progress or queued status is shown.
8. Completed file becomes available.
9. Export action is recorded in the audit log.

---

# 9. UX Rules for Sensitive Operations

- Failed or positive tests must be visible but not sensationalized.
- Use neutral wording such as “Review required” where a human decision is pending.
- Never label an AI indicator as a final medical or disciplinary conclusion.
- Require confirmation before closing or resolving critical alerts.
- Require notes for overrides, resolutions and administrative corrections.
- Keep original events immutable.
- Show the source, timestamp and freshness of data.
- Do not expose full sensitive information to users who do not need it.
- Disable actions that the current role cannot perform.
- Explain disabled actions through tooltips or supporting text.

---

# 10. Responsive and Accessibility Requirements

- Desktop-first, tablet-compatible.
- Minimum touch target around 44px where practical.
- Keyboard navigation for all interactive controls.
- Visible focus states.
- Labels associated with form controls.
- Do not rely on color alone.
- Sufficient contrast.
- Accessible chart summaries in table or text form.
- Responsive tables with column prioritization.
- Modal dialogs must trap focus and support Escape to close.
- Error messages must identify the field and correction needed.

---

# 11. Mock Data Requirements

Generate realistic development data:

- 1 division: Hyderabad Division.
- At least 5 stations or units.
- At least 30 employees.
- At least 5 kiosks.
- At least 20 HHT devices.
- At least 500 Breath Alcohol test records.
- Pass, fail, invalid, insufficient and confirmatory examples.
- At least 20 alerts across all severity levels.
- Calibration due and expired examples.
- Online, offline, maintenance and fault devices.
- At least 1,000 HHT location events.
- Audit events for every major workflow.

Use realistic but clearly fictional names and IDs. Do not use real personal data.

Suggested demo IDs:

- Division: `HYD-DIV`.
- Kiosks: `KIOSK-001` to `KIOSK-005`.
- HHTs: `HHT-0001` to `HHT-0020`.
- Employees: `TTE-1001` to `TTE-1030`.

---

# 12. Role-Based Screen Variations

## System Administrator

Show all navigation and configuration functions.

## Divisional Administrator

Show operational and divisional master-data screens. Hide platform-level settings unless permission is granted.

## Supervisor

Show dashboard, tests, attendance, alerts, employees, devices, tracking and reports. Hide user and role administration.

## Maintenance Officer

Emphasize devices, health, calibration and assigned alerts. Minimize unnecessary employee and test details.

## Auditor

Show historical records, reports and audit logs. Hide create, update, resolve and configuration actions.

---

# 13. Stitch Output Requirements

Use Google Stitch to produce:

1. Design system and visual tokens.
2. App-shell design.
3. Navigation states.
4. High-fidelity dashboard.
5. Test list and detail screens.
6. Attendance screens.
7. Alert screens.
8. Employee screens and import flow.
9. Kiosk and device screens.
10. HHT tracking screens.
11. Calibration screens.
12. Reports screens.
13. Audit and administration screens.
14. Empty, loading, error and permission-denied states.
15. Desktop and tablet responsive variants.
16. Clickable workflow prototypes.
17. Frontend-ready component specifications.

For each screen, document:

- Screen name.
- Purpose.
- User roles.
- Data fields.
- Actions.
- Validation rules.
- Navigation targets.
- Loading state.
- Empty state.
- Error state.
- Permission behaviour.

---

# 14. Frontend Implementation Requirements

After generating the design, implement the frontend with:

- React and TypeScript or an equivalent maintainable framework.
- Reusable components.
- Typed API models.
- Mock service layer that can later be replaced by REST APIs.
- Route-level permission guards.
- Table filtering and pagination.
- Form validation.
- Consistent toast and error handling.
- Responsive CSS.
- Accessible components.
- Seed data and mock event controls.
- Environment configuration.

Do not place business authorization only in the frontend. The backend must enforce it, but the frontend should also hide unavailable actions for usability.

---

# 15. Frontend Data Contracts

Use these conceptual frontend types:

```typescript
export type TestResult = 'PASS' | 'FAIL' | 'INVALID' | 'PENDING_REVIEW';

export type TestStatus =
  | 'VALID'
  | 'INVALID_SAMPLE'
  | 'INSUFFICIENT_SAMPLE'
  | 'CONFIRMATORY'
  | 'CANCELLED'
  | 'DEVICE_ERROR';

export interface BreathTest {
  id: string;
  externalTestId: string;
  employeeId: string;
  employeeName: string;
  kioskId: string;
  locationName: string;
  testedAt: string;
  measuredValue: number | null;
  measurementUnit: string;
  thresholdValue: number | null;
  result: TestResult;
  testStatus: TestStatus;
  authenticationResult: 'SUCCESS' | 'FAILED' | 'NOT_AVAILABLE';
  imageAvailable: boolean;
  calibrationStatus: 'VALID' | 'DUE' | 'EXPIRED' | 'UNKNOWN';
  alertId?: string;
}

export interface Alert {
  id: string;
  type: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'NEW' | 'ACKNOWLEDGED' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  sourceType: 'TEST' | 'KIOSK' | 'HHT' | 'CALIBRATION' | 'SECURITY';
  sourceId: string;
  employeeName?: string;
  locationName?: string;
  createdAt: string;
  assignedTo?: string;
  resolutionNote?: string;
}

export interface KioskSummary {
  id: string;
  serialNumber: string;
  locationName: string;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'FAULT';
  lastSeenAt: string;
  sensorStatus: string;
  calibrationStatus: 'VALID' | 'DUE' | 'EXPIRED' | 'UNKNOWN';
  openAlertCount: number;
}

export interface HhtLocationEvent {
  id: string;
  hhtId: string;
  employeeId?: string;
  employeeName?: string;
  recordedAt: string;
  latitude: number;
  longitude: number;
  gpsAccuracy?: number;
  batteryPercentage?: number;
  networkStatus: string;
  deviceStatus: string;
  applicationStatus: string;
}
```

---

# 16. Suggested Routes

- `/login`
- `/dashboard`
- `/tests`
- `/tests/:id`
- `/attendance`
- `/alerts`
- `/alerts/:id`
- `/employees`
- `/employees/new`
- `/employees/:id`
- `/kiosks`
- `/kiosks/:id`
- `/hht-tracking`
- `/hhts/:id`
- `/calibration`
- `/calibration/new`
- `/reports`
- `/reports/:type`
- `/audit-log`
- `/admin/users`
- `/admin/roles`
- `/admin/locations`
- `/admin/configuration`

---

# 17. Quality Gates

The generated frontend is acceptable only if:

- Every required screen exists.
- Every required workflow is clickable or demonstrable.
- Role-based navigation variations are shown.
- Loading, empty, error and permission-denied states exist.
- Tables support filters and pagination.
- Critical records show source and timestamp.
- Original test results cannot be edited from the UI.
- Alert resolution requires a note.
- Attendance override requires a reason.
- Exports respect user scope.
- Sensitive data is not shown to unauthorized roles.
- Mock data includes both normal and exception scenarios.
- UI is responsive on desktop and tablet.
- No critical action depends on color alone.
- Frontend components map to the API data contracts.

---

# 18. Final Antigravity Instruction

Invoke Google Stitch to create the visual system, screen designs and clickable prototypes from this specification. Then implement the frontend MVP using the generated design as the visual source of truth.

Build the dashboard first, followed by Breath Alcohol tests, alerts, employees, devices, HHT tracking, calibration, reports and administration.

Use mock APIs and seed data until live integrations are available. Keep all integration points replaceable. Do not claim production readiness until the security, authorization, audit, data-scope and acceptance requirements have been tested.

At the end, provide:

- Working frontend.
- Design system.
- Screen inventory.
- Route inventory.
- Component inventory.
- Mock data documentation.
- API integration notes.
- Role matrix.
- Test report.
- Local run instructions.
- Deployment instructions.
- List of deferred production decisions.
