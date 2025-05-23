# Bug Fix Workflow Template

## 1. Workflow Identification

* **Workflow Name:** Bug Fix Workflow
* **File Name:** `bug_fix_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-21
* **Last Updated:** 2025-05-21
* **Author/Maintainer:** User via AI Assistant

## 2. Description

Defines the standard process for addressing reported software defects, including bug verification, root cause analysis, code correction, comprehensive testing of the fix, and deployment.

## 3. Purpose & Goal

To systematically investigate, resolve, and validate reported software defects in a timely and effective manner, ensuring the fix is correct, does not introduce regressions, and is properly deployed.

## 4. Initiation & Trigger

* A bug report is submitted and logged (e.g., by a User, a `tester-mode` during QA, or production monitoring).
* `management-mode` or `qa-director-mode` initiates this workflow by creating a task to investigate/fix the bug.

## 5. Key AI Roles Typically Involved

* `management-mode` (for critical bug oversight/communication)
* `qa-director-mode` (for verification, triage, and re-testing oversight)
* `development-director-mode` (for fix implementation oversight)
* `lead-qa-engineer-mode` and `tester-mode` (for verification and testing)
* `lead-developer-mode` and `coder-mode` (for root cause analysis and fix implementation)
* `deployment-director-mode` (for deploying the fix)

## 6. Workflow Phases

---

### Phase 1: Bug Reporting, Verification & Triage

* **Objective(s):** To confirm the reported bug is reproducible, gather necessary details, and assess its priority and severity.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `qa-director-mode`.
* **Key Activities & Process Steps:**
    1.  Bug report received. `management-mode` or `qa-director-mode` creates a task in `project-task-manager` for "Bug Verification & Triage" and assigns it to `qa-director-mode` (or `lead-qa-engineer-mode`).
    2.  `lead-qa-engineer-mode` assigns a `tester-mode` to reproduce the bug, gather detailed information (steps, environment, logs, screenshots), and document it thoroughly in the task notes.
    3.  `qa-director-mode` (possibly in consultation with `development-director-mode` and `management-mode` for high-impact issues) triages the bug: confirms validity, sets severity/priority, and determines if it warrants immediate fixing. All decisions and rationale are logged in notes.
* **Key Deliverables/Outputs for Phase:**
    * Verified and detailed bug report in `project-task-manager`.
    * Assigned priority and severity.
* **Next Phase Trigger / Completion Criteria:** Bug verified, detailed, and triaged with a decision to proceed with fixing.

---

### Phase 2: Root Cause Analysis (RCA)

* **Objective(s):** To identify the underlying cause of the bug in the codebase or system.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `development-director-mode`.
* **Key Activities & Process Steps:**
    1.  `qa-director-mode` (or `management-mode`) assigns the triaged bug task (or creates a new linked task for RCA) to `development-director-mode`.
    2.  `development-director-mode` assigns the RCA task to a `lead-developer-mode`.
    3.  `lead-developer-mode` assigns a `coder-mode` (or senior developer) to investigate the codebase, logs, and system behavior to find the root cause.
    4.  The `coder-mode` meticulously documents their investigation steps, findings, and the identified root cause in the task notes. This might involve adding specific `todos` to their RCA task like "Analyze service logs for timeframe X," "Debug module Y."
* **Key Deliverables/Outputs for Phase:**
    * Documented root cause of the bug in the task notes.
    * Proposed fix strategy (optional at this stage, but often identified).
* **Next Phase Trigger / Completion Criteria:** Root cause clearly identified and documented.

---

### Phase 3: Fix Implementation & Unit Testing

* **Objective(s):** To develop, implement, and unit test a code solution that corrects the identified bug.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `development-director-mode`, managed by `lead-developer-mode`.
* **Key Activities & Process Steps:**
    1.  Based on the RCA, `lead-developer-mode` creates or updates a task for a `coder-mode` to implement the fix. The task includes specific `todos` for coding the fix and writing targeted unit tests.
    2.  `coder-mode` implements the code changes, writes new unit tests (or updates existing ones) to cover the fix and prevent regression, and commits the changes to version control. All work, commit IDs, and unit test results are meticulously logged in notes.
    3.  `lead-developer-mode` conducts a code review of the fix.
* **Key Deliverables/Outputs for Phase:**
    * Committed code changes for the bug fix.
    * Passing unit tests verifying the fix and covering the bug scenario.
    * Code review approval.
* **Next Phase Trigger / Completion Criteria:** Fix implemented, unit tested, code reviewed, and ready for QA verification. Build deployed to a QA/testing environment.

---

### Phase 4: Fix Verification & Regression Testing

* **Objective(s):** To verify that the implemented fix effectively resolves the reported bug and does not introduce new issues (regressions) in related areas of the system.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `qa-director-mode`, managed by `lead-qa-engineer-mode`.
* **Key Activities & Process Steps:**
    1.  `development-director-mode` notifies `qa-director-mode` that the fix is ready for verification, providing build details.
    2.  `lead-qa-engineer-mode` assigns a `tester-mode` to:
        * Verify the original bug is resolved using the original reproduction steps.
        * Execute a targeted set of regression tests around the affected module/functionality.
        * Perform exploratory testing if deemed necessary.
    3.  `tester-mode` meticulously documents all test execution steps and results (pass/fail) in notes. Any new issues found are logged as new bug reports.
    4.  If the fix is not verified or regressions are found, the task is returned to `development-director-mode` (Phase 3) with detailed notes.
* **Key Deliverables/Outputs for Phase:**
    * Test results confirming the bug is fixed.
    * Regression test suite execution results.
    * QA sign-off for the fix.
* **Next Phase Trigger / Completion Criteria:** Fix confirmed by QA, and regression testing passed.

---

### Phase 5: Deployment of Fix

* **Objective(s):** To deploy the verified bug fix to the relevant environment(s) (staging, production).
* **Primary AI Mode(s) Responsible for Phase Oversight:** `deployment-director-mode`.
* **Key Activities & Process Steps:**
    1.  `management-mode` (with QA sign-off) authorizes deployment of the fix. A task is created for `deployment-director-mode`.
    2.  `deployment-director-mode` plans the deployment (this might be part of a regular release cycle or an ad-hoc deployment, depending on severity/urgency. For critical fixes, `hotfix-deployment-workflow.md` might be invoked). The plan is broken into sub-tasks for operational modes.
    3.  Deployment operational modes execute the deployment, logging all steps.
    4.  Post-deployment smoke tests and monitoring are performed.
* **Key Deliverables/Outputs for Phase:**
    * Bug fix successfully deployed.
    * Deployment confirmation.
* **Next Phase Trigger / Completion Criteria:** Fix deployed and verified as stable in the target environment.

---

### Phase 6: Closure

* **Objective(s):** To formally close the bug report and communicate resolution.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `qa-director-mode` or `management-mode`.
* **Key Activities & Process Steps:**
    1.  `deployment-director-mode` confirms successful deployment.
    2.  `qa-director-mode` (or `management-mode`) formally closes the bug task in `project-task-manager`.
    3.  Relevant stakeholders (including the original reporter, if applicable) are notified of the resolution by `management-mode`.
* **Key Deliverables/Outputs for Phase:**
    * Closed bug report.
    * Communication of fix to stakeholders.
* **Next Phase Trigger / Completion Criteria:** Bug lifecycle complete.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** The reported software defect is successfully verified, analyzed, fixed, tested, deployed, and the resolution is communicated.
* **Final Reporting/Handoff:** Bug task closed in `project-task-manager` with a full audit trail of notes.

## 8. Notes & Considerations

* The urgency and severity of the bug may influence the speed and resource allocation for this workflow.
* For critical production bugs, the `hotfix-deployment-workflow.md` may supersede or be integrated with Phase 5.