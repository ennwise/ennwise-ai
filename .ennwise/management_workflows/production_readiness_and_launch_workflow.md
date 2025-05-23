# Production Readiness and Launch Workflow Template

## 1. Workflow Identification

* **Workflow Name:** Production Readiness and Launch Workflow
* **File Name:** `production_readiness_and_launch_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-23
* **Last Updated:** 2025-05-23
* **Author/Maintainer:** User via AI Assistant

## 2. Description

Covers the final stages of preparing an application for production release, including CI/CD pipeline maturation, pre-production hardening (E2E, performance, security, accessibility testing), production launch, and initial post-launch monitoring and maintenance. This aligns with Phase 3 of the Project Guide[cite: 52].

## 3. Purpose & Goal

To ensure the developed application is robust, meets all non-functional requirements, can be reliably deployed, and operates stably in the production environment, culminating in a successful launch to end-users.

## 4. Initiation & Trigger

* Initiated by `management-mode` when the MVP or a significant set of features has been developed, passed all sprint-level QA, and is deemed ready for production consideration.
* Typically follows the completion of several `iterative_sprint_execution_workflow.md` cycles.

## 5. Key AI Roles Typically Involved

* `management-mode` (Overall orchestration, User approval for launch)
* `deployment-director-mode` (Primary owner of deployment and CI/CD maturation)
* `qa-director-mode` (Oversees all pre-production hardening and testing)
* `development-director-mode` (Assists with performance tuning, security fixes identified in hardening)
* Lead Modes (`lead-qa-engineer-mode`, `lead-developer-mode`, `lead-devops-mode` or similar)
* Operational Modes (`tester-mode`, `performance-tester-mode`, `security-scanner-mode`, `accessibility-checker-mode`, `release-execution-mode`, `monitoring-agent-mode`)
* CI/CD automation modes.

## 6. Workflow Phases

---

### Phase 1: CI/CD Pipeline Maturation and Staging Environment Finalization

* **Objective(s):**
  * To fully develop, automate, and validate the CI/CD pipeline for deployments to staging and production environments[cite: 52].
  * To ensure the staging environment accurately mirrors production and is ready for final hardening tests.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `deployment-director-mode`.
* **Key Activities & Process Steps:**
  1. `management-mode` creates a task "Finalize CI/CD Pipeline and Staging Environment" and assigns it to `deployment-director-mode`.
  2. `deployment-director-mode` assigns sub-tasks to `lead-devops-mode` or specialized operational modes.
     * **Todo (for `lead-devops-mode`):** "Review existing CI/CD setup (from `04-Project_Management_and_Process.md`) and identify gaps for full production automation."
     * **Todo (for `lead-devops-mode`):** "Implement and test automated build, Docker image creation, and push to registry for release candidates[cite: 52]."
     * **Todo (for `lead-devops-mode`):** "Automate deployment scripts for staging and production environments."
     * **Todo (for `lead-devops-mode`):** "Ensure staging environment configuration is finalized and mirrors production as closely as possible."
     * **Todo (for `lead-devops-mode`):** "Conduct end-to-end tests of the CI/CD pipeline deploying to staging."
  3. `deployment-director-mode` validates the matured CI/CD pipeline and staging environment readiness.
* **Key Deliverables/Outputs for Phase:**
  * Fully automated CI/CD pipeline capable of deploying to staging and production[cite: 52].
  * Validated and stable staging environment.
  * Documentation for CI/CD processes.
* **Next Phase Trigger / Completion Criteria:** CI/CD pipeline is fully operational and validated for staging deployments; staging environment is ready.

---

### Phase 2: Pre-Production Hardening in Staging

* **Objective(s):**
  * To conduct thorough end-to-end testing, performance testing against NFRs, accessibility reviews, and security checks in the staging environment[cite: 53, 54].
  * To identify and resolve any critical issues before production launch.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `qa-director-mode`.
* **Key Activities & Process Steps:**
  1. `management-mode` creates a task "Execute Pre-Production Hardening" and assigns it to `qa-director-mode`. `deployment-director-mode` deploys the release candidate to staging using the new CI/CD pipeline.
  2. `qa-director-mode` breaks down hardening activities into sub-tasks for `lead-qa-engineer-mode` and specialized testing modes.
     * **Sub-Task (for `lead-qa-engineer-mode`):** "Conduct Thorough End-to-End Testing"
       * **Todo (for `tester-mode`):** "Execute comprehensive E2E test scenarios covering all critical user flows and features."
     * **Sub-Task (for `lead-qa-engineer-mode`):** "Perform Performance Testing"
       * **Todo (for `performance-tester-mode`):** "Execute load, stress, and soak tests against defined NFRs (from `05-Non_Functional_Requirements.md`)[cite: 6, 53]."
     * **Sub-Task (for `lead-qa-engineer-mode`):** "Conduct Accessibility Review"
       * **Todo (for `accessibility-checker-mode` or `tester-mode` with checklist):** "Review application against accessibility standards (e.g., WCAG)."
     * **Sub-Task (for `lead-qa-engineer-mode`):** "Perform Security Checks"
       * **Todo (for `security-scanner-mode` or specialized `coder-mode`):** "Run automated security scans (SAST/DAST if applicable) and conduct manual checks for common vulnerabilities."
  3. All findings and defects are meticulously logged in the `project-task-manager`. Critical issues are escalated immediately.
  4. `qa-director-mode` coordinates with `development-director-mode` for fixing any identified critical defects. This may involve `coder-mode`(s) addressing issues, followed by re-deployment to staging and re-testing.
  5. `qa-director-mode` compiles a "Production Readiness Report" summarizing all hardening activities, findings, status of defects, and overall readiness assessment.
* **Key Deliverables/Outputs for Phase:**
  * End-to-End Test Results.
  * Performance Test Results against NFRs[cite: 53].
  * Accessibility Review Report.
  * Security Check Report.
  * List of all identified defects and their resolution status.
  * Production Readiness Report and QA Sign-off for launch (or clear "no-go" with reasons).
* **Next Phase Trigger / Completion Criteria:** All critical issues identified during hardening are resolved. QA sign-off for production launch is obtained[cite: 54].

---

### Phase 3: Production Launch Approval & Execution

* **Objective(s):**
  * To obtain final User approval for production launch.
  * To deploy the application to the production environment safely and efficiently[cite: 55].
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode` (for approval), `deployment-director-mode` (for execution).
* **Key Activities & Process Steps:**
  1. `qa-director-mode` submits the Production Readiness Report and QA Sign-off to `management-mode`.
  2. `management-mode` reviews the report with the User and obtains formal approval for production launch.
     * **Todo (for `management-mode`):** "Present Production Readiness Report to User."
     * **Todo (for `management-mode`):** "Obtain and document User's go/no-go decision for launch."
  3. If approved, `management-mode` creates a task "Launch Application to Production" and assigns it to `deployment-director-mode`.
  4. `deployment-director-mode` finalizes the production deployment plan (including specific timing, rollback procedures, communication plan).
  5. `deployment-director-mode` assigns sub-tasks to `release-execution-mode` or other operational modes to execute the deployment using the CI/CD pipeline.
     * **Todo (for `release-execution-mode`):** "Execute production deployment plan."
     * **Todo (for `release-execution-mode`):** "Perform post-deployment smoke tests in production."
     * **Todo (for `release-execution-mode`):** "Verify application availability and core functionality."
  6. `deployment-director-mode` closely monitors the deployment process and confirms successful completion or initiates rollback if critical issues occur.
* **Key Deliverables/Outputs for Phase:**
  * User approval for production launch.
  * Application successfully deployed to the production environment[cite: 55, 56].
  * Deployment confirmation report.
* **Next Phase Trigger / Completion Criteria:** Application is live in production and initial smoke tests pass.

---

### Phase 4: Post-Launch Monitoring & Initial Maintenance

* **Objective(s):**
  * To ensure ongoing stability and performance of the application in production[cite: 57].
  * To address any immediate post-launch bugs or issues.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `deployment-director-mode` (for monitoring), `development-director-mode` (for bug fixing). Coordinated by `management-mode`.
* **Key Activities & Process Steps:**
  1. `management-mode` creates a task "Post-Launch Monitoring and Initial Maintenance" and assigns it to `deployment-director-mode`, with `development-director-mode` as a key collaborator.
  2. `deployment-director-mode` (with `monitoring-agent-mode`(s)) implements and oversees monitoring for frontend errors, performance, and user activity[cite: 56].
     * **Todo (for `monitoring-agent-mode`):** "Monitor key application health metrics."
     * **Todo (for `monitoring-agent-mode`):** "Monitor error logs and alert on anomalies."
  3. Any critical issues identified are immediately escalated. `management-mode` may trigger a `hotfix_deployment_workflow.md` or an expedited `bug_fix_workflow.md`.
  4. `development-director-mode` (with `lead-developer-mode` -> `coder-mode`) addresses non-critical bugs found post-launch through a standard or expedited bug-fix process[cite: 57].
  5. `management-mode` communicates application status to the User.
* **Key Deliverables/Outputs for Phase:**
  * Production monitoring dashboards and reports.
  * Resolved critical post-launch issues (if any).
  * Plan for ongoing maintenance and bug fixing[cite: 57].
* **Next Phase Trigger / Completion Criteria:** Application is stable in production for a predefined initial period (e.g., 1-2 weeks), and a process for ongoing support is in place.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** The application is successfully launched to production, is stable, and processes for ongoing monitoring and maintenance are established[cite: 57].
* **Final Reporting/Handoff:** `management-mode` confirms successful launch and stabilization with the User. A "Project Launch Complete" report is generated. The project transitions to an ongoing maintenance and future iterations phase[cite: 58].

## 8. Notes & Considerations

* This workflow assumes a successful MVP or feature set has been completed through one or more `iterative_sprint_execution_workflow.md` cycles.
* Rollback plans must be well-defined and tested before attempting production launch.
* Clear communication channels and roles are critical during the launch and immediate post-launch period.
