# Iterative Sprint Execution Workflow Template

## 1. Workflow Identification

* **Workflow Name:** Iterative Sprint Execution Workflow
* **File Name:** `iterative_sprint_execution_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-23
* **Last Updated:** 2025-05-23
* **Author/Maintainer:** User via AI Assistant

## 2. Description

Defines the activities within a single development sprint or iteration, including task execution by AI agents, adherence to UI/UX specifications, continuous integration, reviews by human overseers, and regular feedback loops including usability testing. This aligns with Phase 2 of the Project Guide[cite: 41].

## 3. Purpose & Goal

To incrementally build, test, and review working software components/features based on a pre-defined sprint backlog, ensuring alignment with UI/UX designs, and gathering feedback for continuous improvement.

## 4. Initiation & Trigger

* Initiated by `management-mode` at the beginning of each new sprint/iteration.
* Triggered by the completion of the `upfront_design_and_planning_workflow.md` (for the first sprint) or the completion of a previous sprint's review and retrospective.
* Requires a planned sprint backlog as input.

## 5. Key AI Roles Typically Involved

* `management-mode` (Sprint oversight, stakeholder communication, review facilitation)
* `development-director-mode` (Oversees development execution)
* `lead-developer-mode` (Manages `coder-mode` team, code reviews, technical guidance)
* `coder-mode`(s) (Implement features and unit/integration tests)
* `qa-director-mode` (Oversees usability testing and quality feedback)
* `lead-qa-engineer-mode` (Manages testing activities)
* `tester-mode` or `usability-tester-mode` (Conducts or supports usability testing)
* CI/CD operational modes (for automated checks, builds)

## 6. Workflow Phases

---

### Phase 1: Sprint Task Assignment & Kick-off

* **Objective(s):**
  * To ensure the AI development team clearly understands the sprint goals and tasks.
  * To assign sprint tasks to relevant AI modes.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `development-director-mode`.
* **Key Activities & Process Steps:**
  1. `management-mode` provides the approved sprint backlog (tasks selected from the main project backlog) to `development-director-mode`.
  2. `development-director-mode` creates a master task for the "Sprint [Number/Name] Execution."
  3. `development-director-mode` breaks down the sprint backlog into high-level tasks and assigns them to `lead-developer-mode`(s).
     * **Todo (for `lead-developer-mode`):** "Review assigned sprint features/tasks."
     * **Todo (for `lead-developer-mode`):** "Decompose features into granular coding sub-tasks for `coder-mode`(s), ensuring each task references relevant UI/UX specifications (mockups, prototypes, style guide) and API details from the `upfront_design_and_planning_workflow.md` outputs[cite: 43]."
     * **Todo (for `lead-developer-mode`):** "Populate sub-tasks with detailed `todos` for implementation, unit testing, and integration testing."
     * **Todo (for `lead-developer-mode`):** "Assign coding sub-tasks to available and skilled `coder-mode`(s)."
  4. `lead-developer-mode` conducts a sprint kick-off with their assigned `coder-mode`(s) to ensure clarity on tasks and objectives.
* **Key Deliverables/Outputs for Phase:**
  * Sprint tasks assigned to `coder-mode`(s) in the `project-task-manager`.
  * Clear understanding of sprint goals by the AI development team.
* **Next Phase Trigger / Completion Criteria:** All sprint tasks are assigned and understood by the executing AI modes.

---

### Phase 2: Feature Development & Unit/Integration Testing

* **Objective(s):**
  * To develop the software components and features as defined in the sprint tasks[cite: 42].
  * To ensure development aligns strictly with the detailed UI/UX specifications, especially the emphasis on fluid data entry[cite: 43].
  * To write and pass all associated unit and integration tests.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `lead-developer-mode`.
* **Key Activities & Process Steps:**
  1. `coder-mode`(s) pick up their assigned tasks.
     * **Todo (for `coder-mode`):** "Thoroughly review task description, `todos`, linked UI/UX mockups/prototypes, style guide, and API specifications."
     * **Todo (for `coder-mode`):** "Implement the feature/component according to all specifications."
     * **Todo (for `coder-mode`):** "Pay special attention to UX requirements for fluid data entry and minimal pop-ups when implementing relevant UI sections[cite: 13, 43]."
     * **Todo (for `coder-mode`):** "Write comprehensive unit tests for all new code."
     * **Todo (for `coder-mode`):** "Perform local integration tests with other related components."
     * **Todo (for `coder-mode`):** "Commit code to feature branches regularly with clear messages[cite: 42]."
     * **Todo (for `coder-mode`):** "Use `addNote` for detailed logging of work, technical decisions, issues encountered, and justifications for any in-scope `todos` added to the task."
     * **Todo (for `coder-mode`):** "Upon completion, update task status to 'requires review' / 'PR ready'."
  2. `lead-developer-mode` provides ongoing technical guidance and support to `coder-mode`(s).
* **Key Deliverables/Outputs for Phase:**
  * Developed software components/features on feature branches.
  * Passing unit and integration tests for developed code[cite: 42].
  * Detailed work logs (notes) from `coder-mode`(s).
* **Next Phase Trigger / Completion Criteria:** Development tasks are completed by `coder-mode`(s) and ready for code review/PR submission.

---

### Phase 3: Continuous Integration & Review (Code & Functionality)

* **Objective(s):**
  * To maintain code quality through reviews and automated checks[cite: 46].
  * To ensure features meet requirements and are correctly implemented.
  * To integrate human overseer review as per Project Guide[cite: 45].
* **Primary AI Mode(s) Responsible for Phase Oversight:** `lead-developer-mode` (for AI review), `management-mode` (for coordinating human overseer review).
* **Key Activities & Process Steps:**
  1. `coder-mode` submits a Pull Request (PR) for completed work.
  2. `lead-developer-mode` is notified and reviews the PR.
     * **Todo (for `lead-developer-mode`):** "Review submitted code for quality, adherence to standards, architectural alignment, and correct implementation of UI/UX specifications."
     * **Todo (for `lead-developer-mode`):** "Provide feedback via PR comments or task notes. If rework is needed, re-assign task to `coder-mode`."
  3. Automated checks (linting, testing, build) run via CI tools (setup based on `04-Project_Management_and_Process.md` and potentially managed by a `ci-cd-automation-mode`)[cite: 45].
     * **Todo (for `lead-developer-mode`):** "Ensure CI checks pass before proceeding."
  4. Once `lead-developer-mode` is satisfied, they prepare the PR for human overseer review.
     * **Todo (for `lead-developer-mode`):** "Add a note to the task: 'PR [link] ready for human overseer review. Summary: [brief summary of changes and functionality]'."
  5. `management-mode` (or a designated human overseer coordinator role) is notified.
     * **Todo (for `management-mode`/coordinator):** "Assign PR review task to designated human overseer(s)."
     * **Todo (for `management-mode`/coordinator):** "Ensure human overseer(s) review the code and functionality as per Project Guide[cite: 45]."
     * **Todo (for `management-mode`/coordinator):** "Collect human overseer feedback/approval and log it as a note in the `coder-mode`'s original task or the `lead-developer-mode`'s managing task."
  6. If approved by human overseers, `lead-developer-mode` merges the PR into the main development branch.
* **Key Deliverables/Outputs for Phase:**
  * Code reviewed by AI Lead and Human Overseers.
  * Approved and merged feature code into the development branch.
  * Documented review feedback.
* **Next Phase Trigger / Completion Criteria:** All developed features for the sprint are successfully code-reviewed, approved by human overseers, and merged.

---

### Phase 4: Regular Feedback & Usability Testing

* **Objective(s):**
  * To gather early feedback on the usability and intuitiveness of newly developed functional pieces, especially key data entry flows[cite: 47, 48].
  * To make adjustments based on feedback.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `qa-director-mode`, facilitated by `management-mode`.
* **Key Activities & Process Steps:**
  1. `management-mode` (or `qa-director-mode`) identifies when sufficient functionality is available for usability testing (potentially using updated clickable prototypes or early development builds deployed to a test environment).
  2. `management-mode` creates a task "Conduct Usability Testing for Sprint [Number/Name] Features" and assigns it to `qa-director-mode`.
  3. `qa-director-mode` assigns this to `lead-qa-engineer-mode` (who may utilize a `usability-tester-mode` or coordinate with human proxy users identified by `management-mode`).
     * **Todo (for `lead-qa-engineer-mode`):** "Define scope and objectives for usability testing based on current sprint features."
     * **Todo (for `lead-qa-engineer-mode`):** "Prepare test scenarios focusing on key data entry flows and interactions as per Project Guide[cite: 47]."
     * **Todo (for `usability-tester-mode`/human tester):** "Execute usability testing sessions."
     * **Todo (for `usability-tester-mode`/human tester):** "Collect and document all feedback, observations, and issues encountered in task notes."
  4. `lead-qa-engineer-mode` compiles a usability feedback report (as a note).
  5. `qa-director-mode` shares this report with `management-mode`, `development-director-mode`, and `requirements-and-design-director-mode`.
  6. `management-mode` ensures critical feedback is translated into new backlog items or adjustments for future sprints.
* **Key Deliverables/Outputs for Phase:**
  * Usability testing feedback report [cite: 48] (as notes).
  * Potential new backlog items or modifications based on feedback.
* **Next Phase Trigger / Completion Criteria:** Usability testing for relevant sprint features is completed and feedback is documented.

---

### Phase 5: Sprint Review & Retrospective

* **Objective(s):**
  * To demonstrate completed work to stakeholders and gather their feedback[cite: 49].
  * To reflect on the sprint process and identify improvements for future sprints, especially for the AI agent + human overseer workflow[cite: 50, 51].
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps:**
  1. `management-mode` creates a task "Sprint [Number/Name] Review and Retrospective" and assigns it to itself.
     * **Todo:** "Schedule and prepare for Sprint Review meeting with stakeholders (User, human overseers)."
     * **Todo:** "Coordinate with `development-director-mode` or `lead-developer-mode` to prepare a demonstration of all completed and approved work from the sprint."
     * **Todo:** "Facilitate the Sprint Review: demonstrate work, gather stakeholder feedback on functionality and UX."
     * **Todo:** "Document stakeholder feedback from Sprint Review in task notes."
     * **Todo:** "Schedule and facilitate a Sprint Retrospective meeting with the AI agent team representatives and human overseers[cite: 50]."
     * **Todo:** "Discuss what went well, what could be improved, and actionable steps for the next sprint, focusing on optimizing the AI + human workflow."
     * **Todo:** "Document retrospective outcomes and action items in task notes."
* **Key Deliverables/Outputs for Phase:**
  * Sprint review meeting summary and stakeholder feedback.
  * Sprint retrospective summary and actionable improvement items[cite: 51].
* **Next Phase Trigger / Completion Criteria:** Sprint Review and Retrospective meetings are completed and documented. The workflow is ready to be re-initiated for the next sprint.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** A potentially shippable increment of software is completed, reviewed, and has incorporated feedback. The team has identified process improvements.
* **Final Reporting/Handoff:** `management-mode` updates overall project status based on sprint outcomes. Approved feedback and improvement items are fed into the project backlog or process documentation. The system is ready for the next sprint planning or, if all MVP features are complete, for the `production_readiness_and_launch_workflow.md`.

## 8. Notes & Considerations

* This workflow is designed to be run repeatedly for each sprint/iteration.
* The effectiveness of this workflow heavily relies on the quality of inputs from the `upfront_design_and_planning_workflow.md` (clear backlog, UI/UX specs).
* Regularity of usability testing (Phase 4) can be adjusted based on project needs but is encouraged for data entry intensive applications[cite: 47].
* `management-mode` plays a crucial role in bridging communication between AI agents and human stakeholders/overseers.
