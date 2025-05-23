# Hotfix Deployment Workflow Template

## 1. Workflow Identification

* **Workflow Name:** Hotfix Deployment Workflow
* **File Name:** `hotfix_deployment_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-21
* **Last Updated:** 2025-05-21
* **Author/Maintainer:** User via AI Assistant

## 2. Description

Defines an expedited and focused process for urgently addressing critical, production-impacting issues, emphasizing rapid diagnosis, a minimal effective fix, streamlined but essential testing, and immediate deployment to restore service.

## 3. Purpose & Goal

To rapidly deploy a targeted fix for a critical production issue to restore system stability or core functionality with minimal delay, while mitigating the risk of introducing further problems. This workflow prioritizes speed and precision.

## 4. Initiation & Trigger

* A critical, production-impacting incident is identified (e.g., P0/P1 bug causing system outage, data corruption, or severe functional impairment).
* `management-mode`, often alerted by monitoring systems or escalated user reports, makes the decision to initiate a hotfix.

## 5. Key AI Roles Typically Involved

* `management-mode` (Overall crisis coordinator, decision-maker, User/stakeholder communicator)
* `development-director-mode` (Oversees rapid fix development and technical assessment)
* `qa-director-mode` (Oversees expedited, targeted testing)
* `deployment-director-mode` (Oversees emergency deployment)
* Senior `lead-developer-mode`(s) and `coder-mode`(s) (For rapid diagnosis and fix implementation)
* Senior `lead-qa-engineer-mode`(s) and `tester-mode`(s) (For focused verification)
* Operational modes for deployment (e.g., `release-engineer-mode`, `cloud-ops-engineer-mode`)

## 6. Workflow Phases

---

### Phase 1: Incident Confirmation, Initial Diagnosis & Hotfix Authorization

* **Objective(s):** To quickly confirm the critical impact of the incident, perform an initial rapid diagnosis to understand the likely area of the issue, and obtain authorization for a hotfix procedure.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`, with urgent input from all Director modes.
* **Key Activities & Process Steps:**
    1.  Critical incident reported/detected. `management-mode` immediately creates a P0/P1 task in `project-task-manager` and assembles a "Hotfix Team" (key contacts from Development, QA, Deployment Directors).
    2.  `development-director-mode` (assigning a senior `lead-developer-mode` or `coder-mode`) performs an emergency investigation/RCA to quickly identify the probable cause and assess if a targeted hotfix is feasible. This is time-critical; notes are logged rapidly.
    3.  `qa-director-mode` gathers impact data and verifies customer impact.
    4.  `management-mode`, based on initial findings and impact, makes the go/no-go decision for a hotfix (vs. rollback or other mitigation). Decision and rationale logged. Communication to stakeholders initiated.
* **Key Deliverables/Outputs for Phase:**
    * Confirmed critical incident with initial impact assessment.
    * Preliminary root cause hypothesis.
    * Authorization for hotfix procedure.
* **Next Phase Trigger / Completion Criteria:** Go decision for hotfix from `management-mode`.

---

### Phase 2: Rapid Fix Development & Targeted Unit Testing

* **Objective(s):** To develop the minimal, effective code change to resolve the critical issue and perform essential unit tests.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `development-director-mode`, managed by a senior `lead-developer-mode`.
* **Key Activities & Process Steps:**
    1.  `development-director-mode` assigns a task to a senior `lead-developer-mode` or directly to a highly skilled `coder-mode` to implement the precise, minimal fix. Task `todos` are hyper-focused.
    2.  The `coder-mode` implements the fix on a dedicated hotfix branch, focusing on stability and minimal change. All changes and rationale are logged in notes with extreme prejudice.
    3.  Targeted unit tests are written/updated to cover the fix specifically.
    4.  An expedited code review is performed by another senior developer/lead.
* **Key Deliverables/Outputs for Phase:**
    * Committed hotfix code.
    * Passing targeted unit tests.
    * Expedited code review approval.
    * Hotfix build artifact.
* **Next Phase Trigger / Completion Criteria:** Hotfix code implemented, unit tested, reviewed, and built, ready for emergency QA.

---

### Phase 3: Expedited Fix Verification & Risk Assessment

* **Objective(s):** To quickly verify the hotfix resolves the critical issue in a test environment and to perform a rapid risk assessment of deploying it.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `qa-director-mode`, managed by a senior `lead-qa-engineer-mode`.
* **Key Activities & Process Steps:**
    1.  `development-director-mode` provides the hotfix build to `qa-director-mode`.
    2.  `qa-director-mode` (assigning a senior `lead-qa-engineer-mode` -> `tester-mode`) executes a highly focused set of tests:
        * Verification that the original critical issue is resolved.
        * Minimal, critical-path regression tests directly related to the changed code area. Full regression is usually deferred.
    3.  Test results are documented immediately in notes.
    4.  `qa-director-mode`, `development-director-mode`, and `management-mode` conduct a rapid risk assessment of deploying the hotfix versus the ongoing risk of the production issue.
* **Key Deliverables/Outputs for Phase:**
    * Hotfix verification test results.
    * Documented risk assessment for emergency deployment.
    * Go/No-Go decision for production hotfix deployment from `management-mode`.
* **Next Phase Trigger / Completion Criteria:** Hotfix verified, risks assessed, and approval to deploy to production given by `management-mode`.

---

### Phase 4: Emergency Production Deployment & Monitoring

* **Objective(s):** To deploy the hotfix to production as quickly and safely as possible and to intensively monitor its impact.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `deployment-director-mode`, with close monitoring by `management-mode`.
* **Key Activities & Process Steps:**
    1.  `deployment-director-mode` executes an expedited deployment plan (which should be pre-defined for hotfix scenarios if possible). This is broken into critical path sub-tasks for operational modes.
    2.  The hotfix is deployed to production. All steps are logged meticulously.
    3.  Intensive monitoring of key system metrics, error logs, and the specific area affected by the fix is immediately initiated by operational modes under `deployment-director-mode` and `development-director-mode`.
    4.  A rollback plan is on standby and ready for immediate execution if the hotfix causes new critical issues.
    5.  `management-mode` coordinates communication to stakeholders about the deployment.
* **Key Deliverables/Outputs for Phase:**
    * Hotfix deployed to production.
    * Intensive monitoring initiated.
    * Stakeholder communications sent.
* **Next Phase Trigger / Completion Criteria:** Hotfix deployed; initial monitoring shows the critical issue is resolved and no new immediate critical issues have arisen.

---

### Phase 5: Post-Hotfix Stabilization & Follow-up Actions

* **Objective(s):** To ensure the hotfix remains stable, to formally document the incident and resolution, and to plan any necessary follow-up (e.g., full regression testing, merging hotfix to main development branch, addressing root cause more permanently).
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`, with actions by all involved Directors.
* **Key Activities & Process Steps:**
    1.  Continued monitoring of production for a defined stabilization period.
    2.  `development-director-mode` ensures the hotfix code is properly merged back into the main development branch and that any related technical debt is logged. A task is created for a more permanent fix if the hotfix was a temporary patch.
    3.  `qa-director-mode` schedules and executes a full regression test suite in a non-production environment as soon as feasible to ensure no latent issues were introduced.
    4.  `management-mode` oversees the creation of a post-incident report (PIR) or root cause analysis (RCA) document, with contributions from all involved Directors. This includes lessons learned.
    5.  The original critical incident task is formally closed.
* **Key Deliverables/Outputs for Phase:**
    * Confirmation of production stability post-hotfix.
    * Hotfix code merged to main branch.
    * Full regression test results (post-hotfix).
    * Post-Incident Report / Root Cause Analysis document.
* **Next Phase Trigger / Completion Criteria:** System stable, hotfix integrated, PIR completed, and all immediate follow-up actions planned or completed.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** Critical production issue is resolved, service is restored and stable, the hotfix is integrated into the main codebase, and the incident is fully documented with lessons learned.
* **Final Reporting/Handoff:** `management-mode` confirms final resolution and shares PIR with relevant stakeholders.

## 8. Notes & Considerations

* **SPEED and PRECISION are paramount.** This workflow bypasses some standard checks for expediency but must include critical verification steps.
* A pre-defined communication plan for critical incidents is essential.
* Rollback procedures must be well-defined and tested *before* a hotfix is needed.
* A hotfix is often a tactical solution; a more permanent, robust solution for the root cause should be planned via the standard `bug-fix-workflow.md` or `technical-improvement-workflow.md` if necessary.