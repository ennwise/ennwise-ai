# Epic Decomposition Workflow Template

## 1. Workflow Identification

* **Workflow Name:** Epic Decomposition Workflow
* **File Name:** `epic_decomposition_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-21
* **Last Updated:** 2025-05-21
* **Author/Maintainer:** User via AI Assistant

## 2. Description

Structures the breakdown of a large-scale user request, product epic, or substantial project initiative into smaller, more manageable features, user stories, or distinct work packages, each of which may then initiate other workflows (like `new_feature_development_workflow.md`).

## 3. Purpose & Goal

To take a large, often vaguely defined "epic" or major initiative and decompose it into a set of well-defined, smaller, and more manageable work items (e.g., features, user stories) that can be independently planned, estimated, developed, and tracked. This provides clarity and enables incremental delivery.

## 4. Initiation & Trigger

* A large epic or initiative is identified by the User and presented to `management-mode`.
* Following the completion of a `system_specification_and_design_workflow.md` for a very large system, where the overall system needs to be broken into manageable implementation epics/features.

## 5. Key AI Roles Typically Involved

* `management-mode` (Primary owner and facilitator)
* `requirements-and-design-director-mode` (Key contributor for requirements understanding and feature definition)
* `development-director-mode` (For technical feasibility assessment of decomposed items)
* `qa-director-mode` (For input on testability of decomposed items)
* Lead Modes (e.g., `lead-product-owner-mode` or `lead-business-analyst-mode`, if such exist, otherwise Director-level involvement)
* Operational Modes (e.g., `business-analyst-mode`, `system-analyst-mode` for detailed analysis of sub-components)

## 6. Workflow Phases

---

### Phase 1: Epic Understanding & Initial Scope Definition

* **Objective(s):** To thoroughly understand the input epic, its goals, business value, and high-level scope.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps:**
    1.  `management-mode` receives the epic from the User. A master task for "Epic Decomposition" is created.
    2.  `management-mode` conducts initial discussions with the User to clarify the epic's intent, key objectives, and any known constraints or assumptions. All discussions are logged in notes.
    3.  `management-mode` may assign a sub-task to `requirements-and-design-director-mode` for a preliminary analysis of the epic and documentation of its core themes and goals.
* **Key Deliverables/Outputs for Phase:**
    * Documented understanding of the Epic (goals, scope, context).
    * Initial list of questions/clarifications for stakeholders.
* **Next Phase Trigger / Completion Criteria:** Clear understanding of the epic's overall intent by `management-mode`.

---

### Phase 2: Decomposition into Potential Features/Work Packages

* **Objective(s):** To break the epic down into a candidate list of smaller, logical features, user stories, or work packages.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`, with heavy involvement from `requirements-and-design-director-mode`.
* **Key Activities & Process Steps:**
    1.  `management-mode` creates a sub-task for "Epic Breakdown & Feature Identification" and assigns it to `requirements-and-design-director-mode`.
    2.  `requirements-and-design-director-mode` (potentially delegating detailed analysis sub-tasks to `lead-business-analyst-mode` or `business-analyst-mode`) facilitates workshops or performs analysis to identify distinct functional areas or user journeys within the epic.
    3.  Each potential feature/work package is described at a high level (e.g., a short name and a one-sentence description).
    4.  Dependencies between these potential features/work packages are identified.
    5.  `development-director-mode` may be consulted for a very high-level technical feasibility check on the proposed breakdown.
* **Key Deliverables/Outputs for Phase:**
    * A candidate list of features/user stories/work packages derived from the epic.
    * Initial dependency map.
* **Next Phase Trigger / Completion Criteria:** A comprehensive list of potential smaller work items is generated and documented.

---

### Phase 3: Refinement, Prioritization & Sizing of Decomposed Items

* **Objective(s):** To refine the descriptions of the decomposed items, estimate their relative size/complexity, and prioritize them based on business value and dependencies.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`, with input from all Director modes.
* **Key Activities & Process Steps:**
    1.  `management-mode` facilitates a review of the decomposed items with `requirements-and-design-director-mode` (for value/scope), `development-director-mode` (for effort/complexity/risk), and `qa-director-mode` (for testability).
    2.  Sub-tasks may be created for `requirements-and-design-director-mode` to further flesh out each decomposed item with more detailed descriptions, acceptance criteria at a high level, and business value.
    3.  Sub-tasks may be created for `development-director-mode` to provide high-level effort estimates (e.g., T-shirt sizing, story points) for each item.
    4.  `management-mode`, in consultation with the User and other Directors, prioritizes the list of features/work packages.
* **Key Deliverables/Outputs for Phase:**
    * Refined list of features/user stories/work packages with descriptions, high-level acceptance criteria, and relative size estimates.
    * Prioritized backlog of these items.
* **Next Phase Trigger / Completion Criteria:** Prioritized and sized backlog of decomposed items approved by `management-mode` and User.

---

### Phase 4: Planning Next Steps & Initiating Subsequent Workflows

* **Objective(s):** To decide how the prioritized items will be implemented, typically by initiating other workflows for each.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps:**
    1.  For each high-priority feature/work package from the decomposed backlog, `management-mode` determines the appropriate next step.
    2.  Typically, this involves `management-mode` initiating a `new_feature_development_workflow.md` (or a `system_specification_and_design_workflow.md` if further detailed design is needed for a large piece) for that specific item.
    3.  A new master task is created in `project-task-manager` for each initiated workflow, linking back to the original epic decomposition task.
    4.  The original epic decomposition task is updated to reflect which items have moved into active development/design.
* **Key Deliverables/Outputs for Phase:**
    * Initiation of subsequent workflows for individual features/work packages.
    * Updated status of the parent epic.
* **Next Phase Trigger / Completion Criteria:** Top-priority items from the decomposed backlog have their respective follow-on workflows initiated.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** The large epic/initiative is successfully broken down into a prioritized backlog of manageable and actionable features or work packages, with the highest priority items moved into their respective execution workflows.
* **Final Reporting/Handoff:** `management-mode` communicates the decomposed backlog and the plan for tackling it to the User. The epic decomposition task is marked as complete (or ongoing if items are still being fed into execution over time).

## 8. Notes & Considerations

* This workflow is primarily a planning and structuring activity. Its outputs are inputs to other execution-focused workflows.
* Iteration is expected, especially in Phase 2 and 3, as understanding evolves.
* User involvement is critical for prioritization and for clarifying the epic's intent.