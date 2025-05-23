# Guided Project Lifecycle Orchestration Workflow Template

## 1. Workflow Identification

* **Workflow Name:** Guided Project Lifecycle Orchestration Workflow
* **File Name:** `guided_project_lifecycle_orchestration_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-23
* **Last Updated:** 2025-05-23
* **Author/Maintainer:** User via AI Assistant

## 2. Description

A high-level meta-workflow designed to guide `management-mode` in orchestrating an entire project lifecycle, particularly one that requires significant upfront UI/UX design and planning, followed by iterative development and a formal launch. It achieves this by instructing `management-mode` to initiate and manage a sequence of more granular, specialized workflows. This aligns with the overall phased approach of the Project Guide[cite: 1, 41, 52].

## 3. Purpose & Goal

To provide `management-mode` with a structured, top-level plan for executing a complex project by leveraging modular sub-workflows. The goal is to ensure all critical phases from initial design through to production launch and beyond are addressed in a manner consistent with the Project Guide's methodology.

## 4. Initiation & Trigger

* Initiated by the User assigning a new, complex project to `management-mode` that matches the profile described in the Project Guide (i.e., requires significant upfront design, iterative development, and a formal launch).
* `management-mode` selects this workflow when the project characteristics align with its structure.

## 5. Key AI Roles Typically Involved

* `management-mode` (Primary orchestrator of this meta-workflow and all sub-workflows)
* All Director, Lead, and Operational modes will be involved as dictated by the sub-workflows (`upfront_design_and_planning_workflow.md`, `iterative_sprint_execution_workflow.md`, `production_readiness_and_launch_workflow.md`).

## 6. Workflow Phases (Instructions for `management-mode`)

---

### Phase 1: Execute Upfront Design, Planning, and Setup

* **Objective(s):** To complete all initial design, documentation, backlog creation, MVP definition, and environment setup activities as detailed in the `upfront_design_and_planning_workflow.md`. This corresponds to Project Guide Phase 1[cite: 1].
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps (for `management-mode`):**
    1.  Create a master task for the overall project: "[Project Name] - Guided Lifecycle Execution."
    2.  Create a high-level task: "Phase 1: Execute Upfront Design and Planning for [Project Name]" and assign it to yourself (`management-mode`).
        * **Todo:** "Formally initiate the `upfront_design_and_planning_workflow.md` by creating a top-level task for it, providing all necessary inputs (e.g., initial project documents, user requirements, references to Project Guide Phase 1 [cite: 1])."
        * **Todo:** "Oversee the execution of the `upfront_design_and_planning_workflow.md`, ensuring each of its phases (Stakeholder Review & Doc Update, Core UI/UX Design, Backlog Creation & MVP, Dev Env Setup, Project Kick-off & First Sprint Planning) are completed."
        * **Todo:** "Ensure all stakeholder reviews specified in the Project Guide (e.g., for initial docs[cite: 1], for UI/UX artifacts [cite: 30]) are facilitated and feedback is incorporated."
        * **Todo:** "Verify that all deliverables from the `upfront_design_and_planning_workflow.md` (updated docs, approved UI/UX artifacts, prioritized backlog with MVP, validated dev environment, first sprint plan) are completed and approved by the User."
* **Key Deliverables/Outputs for Phase:**
    * Successful completion of all phases and deliverables defined in `upfront_design_and_planning_workflow.md`.
    * Project ready to move into iterative development.
* **Next Phase Trigger / Completion Criteria:** All deliverables from `upfront_design_and_planning_workflow.md` are finalized and approved by the User. The first sprint backlog is defined.

---

### Phase 2: Manage Iterative Development Sprints

* **Objective(s):** To manage the iterative development of features through multiple sprint cycles, ensuring alignment with the defined MVP and evolving backlog, and incorporating feedback. This corresponds to Project Guide Phase 2[cite: 41].
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps (for `management-mode`):**
    1.  Create a high-level task: "Phase 2: Oversee Iterative Development Sprints for [Project Name]" and assign it to yourself (`management-mode`).
        * **Todo:** "Based on the first sprint plan from the previous phase, formally initiate the first `iterative_sprint_execution_workflow.md` by creating a top-level task for 'Sprint 1 Execution'."
        * **Todo:** "Provide the sprint backlog and relevant UI/UX specifications as input to this workflow."
        * **Todo:** "Oversee the execution of the `iterative_sprint_execution_workflow.md`, ensuring its phases (Task Assignment, Development, CI & Review including human overseer input[cite: 45], Usability Testing[cite: 47, 48], Sprint Review & Retrospective [cite: 49, 50]) are completed."
        * **Todo:** "At the end of each sprint, review outcomes, stakeholder feedback, and retrospective action items."
        * **Todo:** "Update the main project backlog based on sprint outcomes and feedback."
        * **Todo:** "Plan subsequent sprints: Define scope for Sprint [N+1] based on the updated backlog and project priorities."
        * **Todo:** "Repeat the initiation and oversight of `iterative_sprint_execution_workflow.md` for each subsequent sprint until MVP is complete or a decision is made to move to production readiness."
* **Key Deliverables/Outputs for Phase:**
    * Completion of multiple `iterative_sprint_execution_workflow.md` cycles.
    * A developed and tested set of features constituting the MVP or a significant project increment.
    * Documented feedback and process improvements from each sprint.
* **Next Phase Trigger / Completion Criteria:** MVP scope is developed and approved, or a strategic decision is made by the User (via `management-mode`) to proceed to launch.

---

### Phase 3: Manage Production Readiness and Launch

* **Objective(s):** To prepare the application for production, execute the launch, and ensure initial stability, by initiating and overseeing the `production_readiness_and_launch_workflow.md`. This corresponds to Project Guide Phase 3[cite: 52].
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps (for `management-mode`):**
    1.  Create a high-level task: "Phase 3: Manage Production Readiness and Launch for [Project Name]" and assign it to yourself (`management-mode`).
        * **Todo:** "Once development of the launch scope is complete and approved, formally initiate the `production_readiness_and_launch_workflow.md` by creating a top-level task for it."
        * **Todo:** "Provide the release candidate build and relevant documentation as input."
        * **Todo:** "Oversee the execution of the `production_readiness_and_launch_workflow.md`, ensuring its phases (CI/CD Maturation[cite: 52], Pre-Production Hardening[cite: 53, 54], Launch Approval & Execution[cite: 55], Post-Launch Monitoring [cite: 56, 57]) are completed."
        * **Todo:** "Facilitate User approval for production launch based on QA sign-off from the hardening phase."
* **Key Deliverables/Outputs for Phase:**
    * Successful completion of all phases and deliverables defined in `production_readiness_and_launch_workflow.md`.
    * Application launched to production and confirmed stable.
* **Next Phase Trigger / Completion Criteria:** Application is successfully launched, stable, and initial post-launch monitoring is satisfactory.

---

### Phase 4: Oversee Post-Launch Operations & Future Iterations

* **Objective(s):** To ensure the project transitions smoothly into ongoing maintenance, monitoring, and planning for future enhancements. This covers elements from the end of Project Guide Phase 3 and ongoing activities[cite: 57, 58].
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps (for `management-mode`):**
    1.  Create a high-level task: "Phase 4: Oversee Post-Launch Operations & Future Iterations for [Project Name]" and assign it to yourself (`management-mode`).
        * **Todo:** "Ensure processes for ongoing monitoring, maintenance, and bug fixing are established and assigned to relevant Director modes (e.g., `deployment-director-mode`, `development-director-mode`)[cite: 57]."
        * **Todo:** "Manage the project backlog for future iterations and feature enhancements based on evolving user needs and stakeholder feedback[cite: 58, 59]."
        * **Todo:** "Periodically review project health, user satisfaction, and alignment with business goals."
        * **Todo:** "If significant new features or changes are required, initiate appropriate workflows (e.g., `epic_decomposition_workflow.md`, `new_feature_development_workflow.md`, or re-initiate this `guided_project_lifecycle_orchestration_workflow.md` for a major new version)."
* **Key Deliverables/Outputs for Phase:**
    * Established ongoing maintenance and support process.
    * Prioritized backlog for future enhancements.
    * Regular project status and health reports to the User.
* **Next Phase Trigger / Completion Criteria:** This phase is ongoing for the life of the project. Milestones may include quarterly reviews or planning for major new versions.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** The project is successfully delivered through its initial lifecycle, is operational, and has a framework for ongoing support and evolution. `management-mode` has effectively utilized modular sub-workflows to achieve this.
* **Final Reporting/Handoff:** `management-mode` provides comprehensive project completion reports for major lifecycle stages (e.g., initial launch) to the User. Ongoing status reporting continues as per User requirements.

## 8. Notes & Considerations

* This meta-workflow provides a high-level structure. `management-mode` must use its judgment to adapt the initiation and inputs for each sub-workflow based on the specific project context and outputs from previous phases.
* The success of this orchestration relies on the successful execution of the detailed sub-workflows (`upfront_design_and_planning_workflow.md`, `iterative_sprint_execution_workflow.md`, `production_readiness_and_launch_workflow.md`).
* `management-mode` is responsible for ensuring seamless transitions and information flow between these sub-workflows.
* All decisions, rationale for initiating sub-workflows, and high-level progress should be meticulously documented by `management-mode` in its assigned tasks using `addNote`.