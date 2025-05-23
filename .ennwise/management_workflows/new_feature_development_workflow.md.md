# New Feature Development Workflow Template

## 1. Workflow Identification

* **Workflow Name:** New Feature Development Workflow
* **File Name:** `new_feature_development_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-21
* **Last Updated:** 2025-05-21
* **Author/Maintainer:** User via AI Assistant

## 2. Description

Outlines the end-to-end phases for conceptualizing, designing, developing, testing, and deploying a new software feature, ensuring all necessary steps from requirements gathering to release are covered.

## 3. Purpose & Goal

To systematically guide the entire lifecycle of a new software feature, from initial idea or user request through to successful deployment and operation in the production environment, ensuring quality, adherence to requirements, and stakeholder alignment.

## 4. Initiation & Trigger

* User request for a new feature submitted to `management-mode`.
* Output of an `epic-decomposition_workflow.md` identifying a specific feature to be implemented.

## 5. Key AI Roles Typically Involved

* `management-mode` (Orchestrator)
* `requirements-and-design-director-mode`
* `development-director-mode`
* `qa-director-mode`
* `deployment-director-mode`
* Various Lead Modes (e.g., `lead-business-analyst-mode`, `lead-ui-designer-mode`, `lead-developer-mode`, `lead-qa-engineer-mode`)
* Various Operational Modes (e.g., `business-analyst-mode`, `ui-designer-mode`, `coder-mode`, `tester-mode`, `technical-writer-mode`)

## 6. Workflow Phases

---

### Phase 1: Requirements Elicitation, Definition & Design Planning

* **Objective(s):**
    * To fully understand, document, and get approval for the new feature's requirements (functional and non-functional).
    * To create initial UI/UX designs and high-level technical design considerations.
    * To plan the subsequent development, QA, and deployment phases at a high level.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode` (initial task creation), then `requirements-and-design-director-mode`.
* **Key Activities & Process Steps:**
    1.  `management-mode` receives/clarifies the feature request with the User. A master task for the feature is created.
    2.  `management-mode` creates a high-level task for "Feature Definition & Design" and assigns it to `requirements-and-design-director-mode`. Task notes include User request details.
    3.  `requirements-and-design-director-mode` breaks this down into sub-tasks (e.g., "Elicit Detailed Requirements," "Develop UI/UX Wireframes & Prototypes," "Draft Technical Feasibility & High-Level Design") for relevant Lead/Operational modes (e.g., `lead-business-analyst-mode`, `ui-designer-mode`). Rationale for breakdown and all detailed instructions are logged in notes.
    4.  Operational modes execute analysis and design tasks, adding detailed notes for all work, research, user interview summaries, design iterations, and justifications for any in-scope `todos` they add to their tasks. For major scope concerns, they propose changes to their Lead via notes.
    5.  `requirements-and-design-director-mode` reviews and consolidates all requirements (e.g., user stories, acceptance criteria) and design documents (e.g., mockups, prototypes, system interaction diagrams).
    6.  `management-mode` facilitates User review and approval of the finalized requirements and key design artifacts. User feedback and approvals are meticulously logged in notes.
* **Key Deliverables/Outputs for Phase:**
    * Approved Detailed Requirements Document / User Stories & Acceptance Criteria.
    * Approved UI/UX Wireframes, Mockups, and Prototypes.
    * Initial Technical Design Document / Feasibility Study.
    * High-level plan for development and testing.
* **Next Phase Trigger / Completion Criteria:** User approval of requirements and core design concepts.

---

### Phase 2: Development & Unit Testing

* **Objective(s):** To build the feature according to the approved specifications, ensuring code quality and thorough unit/integration testing by developers.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `development-director-mode`.
* **Key Activities & Process Steps:**
    1.  `management-mode` (or `requirements-and-design-director-mode`) hands off approved specifications to `development-director-mode` by creating/assigning a high-level development task.
    2.  `development-director-mode` creates a detailed development plan, breaking the feature down into logical coding sub-tasks (epics, stories, technical tasks) for `lead-developer-mode`(s). Plan includes sprints/iterations if applicable. All breakdown rationale and planning documented in notes.
    3.  `lead-developer-mode`(s) further decompose these into granular coding tasks for `coder-mode`(s), defining specific `todos`, technical approaches, and unit test expectations.
    4.  `coder-mode`(s) implement the code, write unit tests, perform local integration tests, adhere to version control practices, and meticulously log all work, issues, commit IDs, and test results in notes. In-scope `todos` can be added by coders with note-based justification.
    5.  `lead-developer-mode`(s) conduct code reviews, provide technical guidance, and ensure adherence to standards.
    6.  Regular builds and integrations are performed (potentially by CI/CD pipeline triggered by an operational mode).
* **Key Deliverables/Outputs for Phase:**
    * Completed, reviewed, and version-controlled source code for the feature.
    * Passing unit and developer integration tests.
    * Build artifacts ready for QA.
    * Updated technical documentation (if applicable).
* **Next Phase Trigger / Completion Criteria:** All development tasks completed, code reviewed and merged, all developer tests passing, and feature build deployed to a QA environment.

---

### Phase 3: Quality Assurance (QA)

* **Objective(s):** To independently verify that the developed feature meets all specified requirements, is free of critical defects, and integrates correctly with the existing system.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `qa-director-mode`.
* **Key Activities & Process Steps:**
    1.  `development-director-mode` (or `management-mode`) notifies `qa-director-mode` of feature readiness for QA, providing build access and links to specifications. `management-mode` creates the QA task for `qa-director-mode`.
    2.  `qa-director-mode` develops/finalizes the test plan (based on early input from Phase 1), and breaks it down into sub-tasks (test case execution, exploratory testing, performance testing if applicable, etc.) for `lead-qa-engineer-mode`(s). Rationale documented in notes.
    3.  `lead-qa-engineer-mode`(s) assign specific testing tasks and `todos` to `tester-mode`(s).
    4.  `tester-mode`(s) execute tests, meticulously log results (pass/fail), document defects with detailed steps to reproduce in the `project-task-manager` (or a linked bug tracker), and update task notes.
    5.  Defects are triaged by `qa-director-mode` / `lead-qa-engineer-mode` and assigned back to `development-director-mode` for fixing.
    6.  `development-director-mode` manages the bug-fixing process (delegating to leads/coders). Fixes are re-deployed to QA.
    7.  `tester-mode`(s) perform re-testing and regression testing.
    8.  This cycle (test-log_defect-fix-retest) continues until exit criteria are met.
* **Key Deliverables/Outputs for Phase:**
    * Executed Test Cases and detailed Test Results.
    * Defect Reports and their resolution status.
    * QA Summary Report and Sign-off (or list of outstanding critical issues).
* **Next Phase Trigger / Completion Criteria:** QA sign-off achieved, meaning all critical/major defects are resolved and the feature meets defined quality standards.

---

### Phase 4: Deployment & Release

* **Objective(s):** To deploy the approved and QA-verified feature to the production environment safely and efficiently, and to make it available to end-users.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `deployment-director-mode`.
* **Key Activities & Process Steps:**
    1.  `management-mode` (with QA sign-off) authorizes deployment and creates a high-level deployment task for `deployment-director-mode`.
    2.  `deployment-director-mode` finalizes the deployment plan (including rollback strategy, communication plan, and schedule), and breaks it down into sub-tasks (e.g., "Prepare Production Environment," "Deploy Feature Build," "Post-Deployment Smoke Tests," "Initial Monitoring") for specialized operational modes (e.g., `release-engineer-mode`, `cloud-ops-engineer-mode`).
    3.  Operational modes execute deployment steps according to the plan, runbooks, and checklists, logging all actions and system responses in notes.
    4.  `deployment-director-mode` oversees the deployment process, manages any incidents, and executes rollback if necessary.
    5.  Post-deployment verification and monitoring are conducted.
* **Key Deliverables/Outputs for Phase:**
    * Feature successfully deployed to production.
    * Deployment confirmation and report.
    * Initial monitoring data showing stability.
* **Next Phase Trigger / Completion Criteria:** Feature live in production, stable, and confirmed working as expected by `deployment-director-mode` and potentially `management-mode`/User.

---

### Phase 5: Post-Release Monitoring & Closure

* **Objective(s):** To monitor the new feature in production for a defined period, address any immediate post-release issues, and formally close the feature development lifecycle.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`, with input from `deployment-director-mode` and `qa-director-mode`.
* **Key Activities & Process Steps:**
    1.  `deployment-director-mode` (or assigned operational modes) monitors system health and feature performance for a predefined period.
    2.  Any urgent issues are addressed (potentially triggering `bug-fix-workflow.md` or `hotfix-deployment-workflow.md`).
    3.  `management-mode` gathers feedback, confirms stability, and formally closes the master feature task.
    4.  Lessons learned might be documented by `management-mode` or relevant Directors.
* **Key Deliverables/Outputs for Phase:**
    * Feature confirmed stable in production.
    * Post-release monitoring report.
    * Project/Feature closure documentation.
* **Next Phase Trigger / Completion Criteria:** Feature stable, monitoring period complete, project closed.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** New software feature is successfully conceptualized, designed, developed, tested, and deployed to production, and is operating stably.
* **Final Reporting/Handoff:** `management-mode` confirms completion with the User. All relevant tasks in `project-task-manager` are closed with comprehensive notes and links to deliverables.

## 8. Notes & Considerations

* This workflow is iterative; phases like Development and QA may cycle multiple times for complex features or if significant issues are found.
* Communication between Director modes is crucial at phase handoffs.
* User involvement is key for approvals in Phase 1 and potentially for final acceptance before Phase 5 closure.