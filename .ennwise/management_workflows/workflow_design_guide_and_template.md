# AI Workflow Design Guide and Generic Template

## Part 1: Workflow Design Guide

### 1. Introduction

This guide provides principles and a template for designing new workflow templates to be used within the AI-driven software development system. A well-designed workflow ensures that projects are executed consistently, efficiently, and transparently, leveraging the defined AI mode hierarchy and the `project-task-manager`. These workflow templates are primarily consumed by `management-mode` to orchestrate project execution.

### 2. Core Principles of Workflow Design

When designing a new workflow template, adhere to the following principles derived from the overall AI Conceptual Framework:

* **Clear Purpose & Scope:** Each workflow must have a well-defined objective and clearly state what it covers and what it does not.
* **Phased Approach:** Break down the workflow into logical, sequential (or sometimes parallel) phases. Each phase should represent a significant stage of work with clear entry and exit criteria.
* **Defined Roles & Responsibilities:**
    * Assign primary responsibility for overseeing each phase to a specific AI mode type (e.g., `management-mode`, a specific Director-level mode like `development-director-mode`, etc.).
    * Indicate which other AI modes (Director, Lead, Operational) are typically involved in executing the activities within each phase.
    * Reflect the established hierarchy: `management-mode` -> Director Modes -> Lead Modes -> Operational Modes.
* **Integration with `project-task-manager`:**
    * Every phase and significant activity should translate into one or more tasks within the `project-task-manager`.
    * Emphasize the creation of detailed `todos` for each task.
    * Stress the critical importance of `addNote` for all communication: progress, issues, justifications for decisions (including task refinements), and completion summaries.
* **Adaptive Task Refinement:**
    * Acknowledge that tasks are not static. Managerial modes (Orchestrator, Directors, Leads) are expected to break down tasks received from superiors into more granular sub-tasks for their subordinates. This decomposition is a key part of their planning and must be documented in notes.
    * Operational modes can add minor, in-scope `todos` to their *own assigned task* if essential for completion, immediately documenting the addition and rationale via `addNote` for their superior's awareness.
    * Significant scope changes or complexities identified by Operational modes must be proposed to their superior via `addNote`, not implemented unilaterally by creating new sub-tasks.
* **Clear Deliverables & Outputs:** Each phase should result in identifiable and verifiable deliverables or outcomes.
* **User Involvement Points:** Clearly mark phases or decision points where `management-mode` needs to consult with or get approval from the User (e.g., initial requirements, major scope changes, final acceptance, new resource proposals).
* **Modularity & Inter-Workflow Connectivity:** Consider if the workflow might be initiated by another workflow or if it might trigger subsequent workflows upon completion of certain phases or the entire process.
* **Error Handling & Escalation:** Briefly consider how blockages or critical issues are handled or escalated up the AI mode hierarchy.
* **Slug-Case Naming:** Workflow file names should be in `slug-case-workflow-name.md`.

### 3. How to Use the Generic Workflow Template (Part 2)

1.  **Copy the Template:** Make a copy of the "Generic Workflow Template" section below into a new `.md` file. Name the file appropriately using slug-case (e.g., `new-data-pipeline-workflow.md`) and place it in the `./.ennwise/management_workflows/` directory.
2.  **Fill in Placeholders:** Systematically replace all placeholders (e.g., `[Workflow_Name]`, `[Phase_#_Name]`, etc.) with information specific to your new workflow.
3.  **Define Phases:** Add or remove phase blocks as needed. For each phase, detail its objectives, responsible modes, key activities, and deliverables.
    * When describing "Key Activities," be explicit about task creation, the AI modes involved in execution, how notes are used for communication and documenting refinements, and how reviews are conducted.
4.  **Review Against Principles:** Once drafted, review your new workflow template against the "Core Principles of Workflow Design" above to ensure alignment and completeness.
5.  **Version Control:** Treat workflow templates as important project assets and manage them under version control if possible.

---

## Part 2: Generic Workflow Template

\```markdown
# [Workflow_Name] Workflow Template

## 1. Workflow Identification

* **Workflow Name:** `[Workflow_Name]`
* **File Name:** `[workflow_name_slug].md`
* **Version:** 1.0
* **Date Created:** YYYY-MM-DD
* **Last Updated:** YYYY-MM-DD
* **Author/Maintainer:** [User/Team Name]

## 2. Description

`[Provide a concise, 1-2 sentence description of what this workflow is for, similar to the user-provided descriptions for the initial six workflows.]`

## 3. Purpose & Goal

`[Describe the overall purpose of this workflow in more detail. What primary business or technical goal does it help achieve? What are the expected primary outcomes upon successful completion? E.g., "To guide the systematic development and release of a new, self-contained software feature from initial concept to production deployment."]`

## 4. Initiation & Trigger

`[Describe how this workflow is typically initiated. Examples:
    * "User request submitted to `management-mode`."
    * "Output of the `epic-decomposition-workflow.md`, where a work package is identified as needing this workflow."
    * "Scheduled system maintenance trigger."
    * "Critical production incident reported."]`

## 5. Key AI Roles Typically Involved

`[List the primary AI mode *types* or specific mode slugs that are central to this workflow. This helps `management-mode` understand resource allocation. Examples:
    * `management-mode` (Orchestrator)
    * `requirements-and-design-director-mode`
    * `development-director-mode`
    * `qa-director-mode`
    * `deployment-director-mode`
    * Various Lead Modes (e.g., `lead-developer-mode`, `lead-qa-engineer-mode`)
    * Various Operational Modes (e.g., `coder-mode`, `tester-mode`, `technical-writer-mode`)]`

## 6. Workflow Phases

---

### Phase {{PhaseNumber}}: [Phase_Name]

* **Objective(s):**
    * `[Clearly state the primary goal(s) of this phase. What must be achieved before moving to the next phase?]`
    * `[E.g., "To elicit, analyze, document, and obtain user approval for the detailed requirements of the new feature."]`
* **Primary AI Mode(s) Responsible for Phase Oversight:**
    * `[Specify the AI Mode slug primarily responsible for ensuring this phase's objectives are met. E.g., `management-mode` for initial setup, then `requirements-and-design-director-mode` for detailed work.]`
* **Key Activities & Process Steps:**
    * `[Detail the sequence of major activities. For each, consider:
        * Who initiates the activity (e.g., `management-mode` creates initial task)?
        * Which AI mode type/slug executes it?
        * How are tasks, todos, and notes used in `project-task-manager`?
        * How is adaptive task refinement handled (e.g., Directors/Leads breaking down tasks, Operational modes adding in-scope todos with justification)?
        * What are the key review points or collaborations?
        * Example:
            1.  `management-mode` creates a high-level task for `[Responsible_Director_Mode_Slug]` based on the workflow initiation. Initial objectives and user inputs are logged in the task notes.
            2.  `[Responsible_Director_Mode_Slug]` analyzes the task, and as part of its planning, breaks it down into several more detailed sub-tasks using `addTask` and `linkTask`. Each sub-task is assigned to appropriate Lead Modes (e.g., `[Example_Lead_Mode_Slug]`) or specialized Operational Modes. Rationale for breakdown is documented via `addNote`.
            3.  Lead Modes further decompose their assigned tasks into granular sub-tasks for Operational Modes (e.g., `[Example_Operational_Mode_Slug]`), creating specific `todos` and documenting the plan in notes.
            4.  Operational Modes execute their assigned tasks and `todos`. They add detailed notes for all work, issues, and justifications for any in-scope `todos` they add to their own tasks. For major scope concerns, they propose changes to their Lead via notes.
            5.  Lead Modes review deliverables and notes from Operational Modes, provide feedback, and aggregate progress.
            6.  `[Responsible_Director_Mode_Slug]` reviews aggregated progress and key deliverables from Lead Modes, ensuring phase objectives are met.
            7.  (If applicable) `management-mode` consults with User for review/approval of key deliverables from this phase.]`
* **Key Deliverables/Outputs for Phase:**
    * `[List the tangible outputs or outcomes of this phase. E.g., "Approved Requirements Specification Document," "UI/UX Wireframes and Mockups," "Code committed to repository and unit tested."]`
* **Next Phase Trigger / Completion Criteria:**
    * `[What signifies that this phase is complete and the next phase can begin? E.g., "User approval of requirements document," "All code units pass review and testing," "Successful deployment to staging environment."]`

---

### Phase {{PhaseNumber + 1}}: [Phase_Name]

* **Objective(s):**
    * `[...]`
* **Primary AI Mode(s) Responsible for Phase Oversight:**
    * `[...]`
* **Key Activities & Process Steps:**
    * `[...]`
* **Key Deliverables/Outputs for Phase:**
    * `[...]`
* **Next Phase Trigger / Completion Criteria:**
    * `[...]`

---
`[Add more phases as needed by copying the Phase block structure.]`

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:**
    * `[Describe the state when the entire workflow is successfully completed. E.g., "New feature is live in production and stable," "Bug is confirmed fixed in production," "System performance meets new NFRs."]`
* **Final Reporting/Handoff:**
    * `[Describe any final reporting activities, e.g., `management-mode` reports project completion to the User, documentation is archived, etc.]`

## 8. Notes & Considerations

* `[Include any general notes, assumptions, or special considerations relevant to this entire workflow. E.g., "This workflow assumes standard CI/CD practices are in place," "For critical issues, the `hotfix-deployment-workflow.md` should be considered."]`
\```