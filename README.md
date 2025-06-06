# ennwise-ai

Welcome to `ennwise-ai`, a sophisticated, hierarchical AI-powered system designed to manage and execute complex software development projects. This system employs a structured team of specialized AI agents (modes) operating at different levels of responsibility, following predefined processes (workflows) and meticulously tracking all activities and communications through a central `project-task-manager`.

## 1. What is ennwise-ai?

`ennwise-ai` is an AI-driven framework that orchestrates software development by simulating a hierarchical project team. Its core purpose is to:

* **Interpret complex user requirements** for software projects.
* Translate these requirements into **structured and actionable plans**.
* **Manage the entire project lifecycle** by delegating tasks to specialized AI modes.
* Ensure **transparency, accountability, and adherence to defined processes**.

The system is built around the `management-mode` AI, which acts as the primary orchestrator and user interface, coordinating a hierarchy of Director, Lead, and Operational AI modes.

## 2. Core Concepts

Understanding these core concepts is key to leveraging `ennwise-ai` effectively:

### AI Modes

AI Modes are distinct AI agents with specialized roles and responsibilities, defined by markdown files in the `.ennwise/modes/` directory. They operate in a hierarchy:

* **Orchestrator Mode (`management-mode`):**
    * Defined in `.ennwise/management_base.md`.
    * The top-level AI that interacts directly with the user.
    * Interprets project goals, selects appropriate high-level workflow templates, and decomposes the project into major phases/domains.
    * Delegates these high-level tasks to Director Modes.
    * Oversees the entire project, manages resource requests (new workflows/modes), and handles user communication for strategic decisions and approvals.

* **Director Modes (e.g., `development-director-mode`, `qa-director-mode`, `requirements-and-design-director-mode`, `deployment-director-mode`):**
    * Defined in files like `.ennwise/modes/development-director-mode.md`.
    * Manage major project domains or phases (e.g., development, QA, design).
    * Receive high-level tasks from `management-mode`.
    * Develop detailed plans for their domain, breaking down their assigned tasks into more granular sub-tasks for Lead Modes.
    * Oversee the work of their Lead Modes and report summarized progress and blockers to `management-mode`.

* **Lead Modes (e.g., `lead-developer-mode`, `lead-qa-engineer-mode`):**
    * Defined in files like `.ennwise/modes/lead-developer-mode.md`.
    * Manage teams of Operational Modes within a specific area of expertise (e.g., a feature development team, a QA testing team for a module).
    * Receive tasks from Director Modes.
    * Break down these tasks into precise, actionable sub-tasks for Operational Modes.
    * Provide guidance, review work, and consolidate progress for their Director Mode.

* **Operational Modes (e.g., `coder-mode`, `automation-tester-mode`):**
    * Defined in files like `.ennwise/modes/coder-mode.md`.
    * Perform specific, granular tasks (e.g., writing code for a function, executing a test case, designing a UI component).
    * Receive tasks from Lead Modes.
    * Execute tasks according to their detailed mode definition, meticulously logging all actions, code, test results, and issues.

### Workflow Templates (`./.ennwise/management_workflows/`)

Workflows are user-provided markdown templates that define the standard high-level phases and processes for different types of projects or major activities.

* `management-mode` selects the most appropriate workflow based on the user's project request.
* Examples include `bug_fix_workflow.md`, `new_feature_development_workflow.md`, `system_specification_and_design_workflow.md`.
* Each workflow template details phases, objectives, key AI roles involved, and deliverables for each phase.
* **`./.ennwise/management_workflows/000_WORKFLOW_DESCRIPTIONS.md`**: Provides a quick reference to all available workflow templates. This is the first place `management-mode` looks to understand available processes.
* **`./.ennwise/management_workflows/workflow_design_guide_and_template.md`**: A guide and template for users to design new workflow templates if existing ones are not suitable.

### Mode Definitions (`./.ennwise/modes/`)

These markdown files define the behavior, responsibilities, core principles, and tool usage for each AI mode.

* Filenames are in `slug-case` (e.g., `coder-mode.md`, `management-base.md`).
* They specify how modes interact with the `project-task-manager`, handle task intake, perform task refinement (breaking down tasks or adding in-scope `todos`), report progress, and manage resources.
* These definitions are crucial for the consistent and predictable operation of the AI agents.

### `project-task-manager`

This is the central (conceptual) tool that all AI modes use for creating, assigning, tracking tasks, and logging all communication. `ennwise-ai` relies on the following key `project-task-manager` functions (as invoked by AI modes):

* **`addTask(name, description, assignedTo, ...)`:** Creates a new task. Used by `management-mode` for project phases, and by Director/Lead modes for sub-task delegation.
* **`linkTask(sourceTaskId, targetTaskId, relationshipType)`:** Links tasks, typically creating parent-child relationships to show how work is decomposed.
* **`addTodo(taskId, description, ...)`:** Adds a specific, verifiable checklist item (a "todo") to an existing task. Operational modes work through these `todos`.
* **`toggleTodo(taskId, todoId, done)`:** Marks a `todo` as complete or incomplete.
* **`addNote(taskId, noteContent)`:** **This is the most critical function for communication and documentation.** All modes use `addNote` to:
    * Log progress step-by-step.
    * Document technical decisions and rationale.
    * Report issues, errors, and blockers.
    * Ask clarifying questions (to superiors).
    * Justify any in-scope refinements they make to their tasks (like adding a `todo`).
    * Provide completion summaries.
* **`getNotes(taskId)`:** Retrieves all notes for a task, allowing modes to review history, understand context, or see instructions from superiors.
* **`listTasks(filterByStatus, assignedTo, ...)`:** Tracks the status and details of ongoing tasks.
* **`setStatus(taskId, status)`:** Updates a task's current status (e.g., "inprogress", "blocked", "clarification-needed", "inreview", "done").

### The `.ennwise` Directory

This directory is the heart of the `ennwise-ai` system's operational definitions:

* **`management_base.md`:** Defines the top-level `management-mode` orchestrator.
* **`management_workflows/`:** Contains all workflow templates (`*.md` files) that `management-mode` uses to plan projects, along with `000_WORKFLOW_DESCRIPTIONS.md` and the `workflow_design_guide_and_template.md`.
* **`modes/`:** Contains the specific operational definitions for all Director, Lead, and Operational AI modes (e.g., `coder-mode.md`, `development-director-mode.md`).

### The `.roo` Directory

This directory contains system-level "rules" and operational guidelines that influence how the AI modes behave and interpret their tasks.

* **`.roo/rules/`:** Contains general rules:
    * `00-overall.md`: High-level rules concerning file system paths (which users need to configure), context window management for the AI, command execution best practices (preferring Docker, using absolute paths), and guidelines for displaying file content.
    * `01-interative-execution.md`: A policy for all modes to break down large tasks into smaller, iterative steps and report progress frequently.
    * `02-available-modes.md`: A summary list of mode types and their general responsibilities (detailed definitions are in `.ennwise/modes/`).
    * `03-tool-use.md`: Specifies the mandatory XML syntax for invoking any tools.
    * `04-available-workflows.md`: Points to the location of workflow descriptions.
* **`.roo/rules-<mode-name>/rules.md`:** These subdirectories often contain copies or very specific operational instructions derived from the primary mode definitions found in `.ennwise/modes/`. The primary, authoritative definitions used for delegation and core behavior are those in the `.ennwise` directory.

## 3. How ennwise-ai Works: The Project Lifecycle

A typical project in `ennwise-ai` flows through a structured, hierarchical process:

1.  **Project Initiation:**
    * The **User** provides a high-level project goal or requirement to `management-mode`.
    * `management-mode` engages the User with clarifying questions to resolve ambiguities and refine the scope. This interaction is meticulously documented as notes in a master project task created by `management-mode`.

2.  **Strategic Planning & Workflow Selection:**
    * `management-mode` analyzes the project's nature.
    * It selects the most appropriate high-level **workflow template** from `./.ennwise/management_workflows/` (e.g., `new_feature_development_workflow.md`).
    * Based on the chosen workflow, `management-mode` decomposes the project into major phases or domains (e.g., "Requirements Definition," "Development," "QA").

3.  **Hierarchical Task Delegation:**
    * **`management-mode` to Director modes:** For each major phase, `management-mode` creates a high-level task in `project-task-manager`, assigns it to the relevant **Director Mode** (e.g., `requirements-and-design-director-mode`), and provides objectives, deliverables, and initial `todos`. The Director is instructed to develop a detailed plan and further break down the task.
    * **Director modes to Lead modes:** The assigned **Director Mode** analyzes its task, develops a plan for its domain, and breaks it down into more granular sub-tasks. These sub-tasks are created in `project-task-manager`, linked to the Director's main task, populated with detailed `todos`, and assigned to appropriate **Lead Modes** (e.g., `lead-developer-mode`).
    * **Lead modes to Operational modes:** The assigned **Lead Mode** further refines the tasks received from the Director, breaking them into precise, actionable sub-tasks. These are created in `project-task-manager`, linked, filled with very specific `todos`, and assigned to **Operational Modes** (e.g., `coder-mode`, `automation-tester-mode`).

4.  **Task Execution by Operational Modes:**
    * **Operational Modes** execute their assigned tasks and `todos` according to their specific mode definitions (e.g., a `coder-mode` writes code and unit tests).
    * **Clarification Protocol:** If an Operational Mode finds any part of a task unclear or ambiguous, it immediately adds a note to the task detailing the question, sets its status to "blocked" or "clarification-needed," and awaits guidance from its Lead Mode.
    * **Adding In-Scope `todos`:** An Operational Mode may add a necessary micro-step `todo` to its *own assigned task* if it's essential for completing an existing `todo` within the *defined scope*. This addition *must* be immediately documented with a rationale via `addNote`. Major scope changes are escalated.
    * **Meticulous Logging:** All work, code changes (with commit IDs), test results, issues, and decisions are meticulously logged in the task's notes using `addNote()`.

5.  **Progress Monitoring and Reporting:**
    * Each mode reports completion of `todos` and tasks by updating their status and adding summary notes.
    * Lead Modes monitor Operational Modes, review their notes and deliverables, and report aggregated progress to their Director Mode.
    * Director Modes monitor Lead Modes, review their summaries, and report overall domain progress, significant blockers, and phase completion to `management-mode`.
    * `management-mode` tracks high-level progress and provides regular updates to the User.

6.  **Resource Management (Workflows & Modes):**
    * If `management-mode` (or a Director Mode escalating to it) determines that a new type of workflow template or AI mode definition is required for project success:
        1.  The need and justification are documented.
        2.  `management-mode` formulates a clear proposal for the User, outlining the gap, rationale, and specifics of the new resource.
        3.  This proposal is presented to the User for review and explicit approval.
        4.  **Crucially, `management-mode` DOES NOT create these files itself.** The User is responsible for creating the new `.md` file (for a workflow in `./.ennwise/management_workflows/` or for a mode in `./.ennwise/modes/`) according to the system's conventions (e.g., using the `workflow_design_guide_and_template.md`).
        5.  Only after the User confirms creation can the new resource be utilized.

7.  **Project Closure:**
    * Once all Director Modes report successful completion of their domains and all project objectives are met (as confirmed by `management-mode`, and ultimately by the User if required):
        * `management-mode` synthesizes final outcomes and learnings.
        * Project closure is documented in the master project task.
        * The User is informed of project completion.

## 4. Key Features

* **Structured Hierarchical Control:** A clear chain of command and responsibility ensures organized project execution.
* **Process-Driven Execution:** Workflows provide standardized processes for common project types, ensuring consistency.
* **Transparent and Accountable Operations:** The `project-task-manager` and the strict requirement for `addNote()` ensure that all actions, decisions, and progress are documented and auditable.
* **Adaptive Planning and Task Refinement:** The system allows for tasks to be broken down at each level of the hierarchy, adapting to the details as they emerge. Operational modes can make minor in-scope refinements to their `todos` with justification.
* **User-Centric Resource Definition:** Users define and own the core process (workflows) and agent capabilities (modes), allowing customization and evolution of the system.

## 5. Getting Started & Best Usage

1.  **Interacting with `management-mode`:**
    * Start by clearly defining your project goals, high-level requirements, and any known constraints when you communicate with `management-mode`.
    * Be prepared to answer clarifying questions from `management-mode` to refine the project scope.

2.  **Understanding Workflow Templates:**
    * Familiarize yourself with the available workflows by reviewing **`./.ennwise/management_workflows/000_WORKFLOW_DESCRIPTIONS.md`**. This will help you understand how `management-mode` might approach your project.
    * Each workflow `.md` file in that directory details the phases involved.

3.  **Knowing Your AI Team:**
    * Understand the roles of Orchestrator, Director, Lead, and Operational modes.
    * Refer to the specific mode definition files in **`./.ennwise/modes/`** (e.g., `coder-mode.md`, `qa-director-mode.md`) for in-depth details on their capabilities, responsibilities, and how they operate.

4.  **The Importance of `addNote()`:**
    * Recognize that `addNote()` is the primary mechanism for communication, documentation, progress reporting, and issue tracking within the system. Expect to see detailed notes from all AI modes in the `project-task-manager`.

5.  **Creating New Resources (Workflows and Modes):**
    * If your project requires a process or AI capability not currently defined:
        * `management-mode` will identify this gap and propose the creation of a new workflow template or AI mode definition to you (the User).
        * The proposal will outline the purpose, rationale, and suggested structure.
        * **You, the User, are responsible for actually creating the new `.md` definition file** in the appropriate directory (`./.ennwise/management_workflows/` for workflows, or `./.ennwise/modes/` for modes).
        * For workflows, use the **`./.ennwise/management_workflows/workflow_design_guide_and_template.md`** as your guide.
        * For modes, follow the structure of existing mode definitions.
        * Once you have created the file, inform `management-mode` so it can be utilized.

## 6. Example Scenario: New Feature Development

Let's illustrate how `ennwise-ai` might handle a request for a new software feature:

1.  **User Request:** The User tells `management-mode`, "I need to add a User Profile feature to our application. Users should be able to view and edit their profile information."

2.  **`management-mode` Initiation & Planning:**
    * `management-mode` creates a master task for "New Feature: User Profile."
    * It consults its knowledge of available workflows and selects **`new_feature_development_workflow.md`**.
    * It identifies the first phase of this workflow: "Phase 1: Requirements Elicitation, Definition & Design Planning."

3.  **Delegation to Director (Phase 1):**
    * `management-mode` creates a high-level task: "User Profile Feature - Phase 1: Requirements & Design" and assigns it to **`requirements-and-design-director-mode`**. The task includes objectives like "Fully document requirements, create UI/UX designs, and plan development."
    * `requirements-and-design-director-mode` is instructed to break this down further.

4.  **Director to Lead (Phase 1 Sub-tasks):**
    * **`requirements-and-design-director-mode`** breaks down "Phase 1" into sub-tasks such as:
        * "Elicit Detailed Requirements for User Profile" (assigned to `lead-business-analyst-mode`).
        * "Develop UI/UX Wireframes & Prototypes for User Profile" (assigned to `lead-ui-designer-mode`).
    * Each sub-task has detailed `todos` and references to user input.

5.  **Lead to Operational (Phase 1 Execution):**
    * **`lead-business-analyst-mode`** might assign a sub-task "Document User Stories for Profile Editing" to an `business-analyst-mode`.
    * **`lead-ui-designer-mode`** might assign "Create Wireframes for Profile View Screen" to a `ui-designer-mode`.
    * The `business-analyst-mode` and `ui-designer-mode` execute their tasks, adding detailed notes of their analysis, designs, user story details, etc., using `addNote()` and marking `todos` complete. They report back to their respective Lead modes.

6.  **Subsequent Phases:**
    * Once Phase 1 deliverables are approved (facilitated by `management-mode` for User review if needed), the workflow progresses.
    * For "Phase 2: Development & Unit Testing," `management-mode` would assign a task to **`development-director-mode`**.
    * `development-director-mode` would break this into tasks for **`lead-developer-mode`(s)**, who would then create granular coding tasks for **`coder-mode`(s)** (e.g., "Implement User Profile API Endpoint," "Develop ProfileEdit React Component").
    * "Phase 3: Quality Assurance" would involve **`qa-director-mode`**, delegating to **`lead-qa-engineer-mode`(s)**, and then to **`tester-mode`(s)** or **`automation-tester-mode`(s)**.
    * "Phase 4: Deployment & Release" would be managed by **`deployment-director-mode`**.
    * "Phase 5: Post-Release Monitoring & Closure" would be overseen by `management-mode`.

Throughout this entire process, every task, sub-task, `todo`, decision, piece of code, test result, and issue is logged within the `project-task-manager` through the prolific use of `addNote()` by all AI modes, ensuring full traceability.

## 7. Directory Structure Overview

The key directories and files you will interact with or should be aware of are:

* **`README.md`**: This file.
* **`.ennwise/`**: Contains the core operational definitions that drive the `ennwise-ai` system.
    * **`management_base.md`**: The definition for the top-level `management-mode` orchestrator.
    * **`management_workflows/`**: Contains all workflow templates (`.md` files).
        * `000_WORKFLOW_DESCRIPTIONS.md`: Summaries of all available workflows.
        * `workflow_design_guide_and_template.md`: Guide for creating new workflows.
        * Other `*.md` files are specific workflow definitions (e.g., `bug_fix_workflow.md`).
    * **`modes/`**: Contains the detailed definitions for all Director, Lead, and Operational AI modes (e.g., `coder-mode.md`, `development-director-mode.md`).
* **`.roo/`**: Contains system-level rules and mode-specific operational guidelines that further refine AI behavior.
    * **`rules/`**: General operational rules (overall behavior, iterative execution, tool use syntax, lists of available modes/workflows).
        * `00-overall.md`: **Important user-configurable paths for Environment Root and Project Source Code are in this file.**
    * **`rules-<mode-name>/`**: May contain specialized rule sets or duplicates of mode definitions for specific execution contexts. The primary definitions are in `.ennwise/modes/`.

## 8. Advanced: Understanding Mode and Workflow Definitions

The intelligence and processes of `ennwise-ai` are explicitly defined in the markdown files located within the `.ennwise/modes/` and `.ennwise/management_workflows/` directories.

* **Workflow Definitions** (e.g., `new_feature_development_workflow.md`) describe the sequence of phases, objectives for each phase, the primary AI modes responsible for overseeing each phase, key activities, and expected deliverables.
* **Mode Definitions** (e.g., `coder-mode.md`, `lead-developer-mode.md`, `management_base.md`) detail each AI agent's:
    * Overall purpose and area of expertise.
    * Core principles guiding its behavior.
    * Specific responsibilities and its typical workflow (task intake, planning, execution, reporting).
    * How it uses the `project-task-manager` tools (e.g., `addTask`, `addNote`, `addTodo`).
    * Protocols for handling clarifications and task refinements.
    * How it manages resources or requests new ones.

Users can extend and customize the `ennwise-ai` system by:

* **Defining new AI mode types** (Operational, Lead, or Director) by creating new `.md` files in `.ennwise/modes/`, following the structure of existing modes.
* **Creating new workflow templates** by adding `.md` files to `.ennwise/management_workflows/`, using the `workflow_design_guide_and_template.md` and referencing existing workflows for structure.

This user-driven definition of processes and roles allows `ennwise-ai` to be adapted to various project types and organizational needs.


**General Interaction Note:**

When interacting with `management-mode`, be as clear and specific as possible about your project goals, requirements, any existing resources (like documentation or code repositories if applicable to the task), and desired outcomes. `management-mode` is designed to ask clarifying questions if details are missing, but providing comprehensive information upfront will streamline the process. Remember that `management-mode` will use the `project-task-manager` to track all activities, so you can monitor progress there.

---

### Example 1: Starting a Brand New, Complex Application

* **Scenario**: You want `ennwise-ai` to build a completely new web application, "TimeSheet Pro," a tool for employee time tracking and project billing. This project requires UI/UX design, backend development, database setup, iterative feature development, and a formal launch.
* **Suggested Prompt to `management-mode`**:
    ```
    "I need to initiate a new project to develop a web application called 'TimeSheet Pro'. This application will allow employees to track time spent on various projects and enable managers to generate billing reports.

    I have some initial documents:
    - 'TimeSheet_Pro_Concept.md' (general idea, target users, main goals)
    - 'TimeSheet_Pro_Core_Features_List.txt' (high-level list of functionalities like user login, project creation, time entry, report generation)

    This project needs to go through a full lifecycle: initial design and planning (including UI/UX from scratch), iterative development of the core features, rigorous testing, and a planned production launch. Please orchestrate this entire project."
    ```
* **Expected `ennwise-ai` Behavior (Simplified)**:
    1.  `management-mode` will create a master project task for "TimeSheet Pro Application Development."
    2.  It will review your request and likely select the **`guided_project_lifecycle_orchestration_workflow.md`** due to the mention of a "full lifecycle," "UI/UX from scratch," "iterative development," and "formal production launch."
    3.  It will then begin executing this meta-workflow by initiating its first phase: "Execute Upfront Design, Planning, and Setup." This involves `management-mode` creating a task for itself to oversee the **`upfront_design_and_planning_workflow.md`**.
    4.  `management-mode` will delegate the execution of the `upfront_design_and_planning_workflow.md` by assigning a high-level task to **`requirements-and-design-director-mode`**. This director will be responsible for:
        * Stakeholder review of your initial documents.
        * Overseeing the creation of UI/UX artifacts (user flows, wireframes, mockups, prototypes, style guide) via `lead-ui-designer-mode` and `ui-designer-mode`(s).
        * Managing backlog creation and MVP definition via `lead-business-analyst-mode`.
    5.  Simultaneously, as per the `upfront_design_and_planning_workflow.md`, `management-mode` might assign a task to **`development-director-mode`** for development environment setup.
    6.  The project will then proceed through the iterative development sprints and production readiness phases as outlined in the `guided_project_lifecycle_orchestration_workflow.md`, with `management-mode` initiating and overseeing `iterative_sprint_execution_workflow.md` and `production_readiness_and_launch_workflow.md` at the appropriate times.

---

### Example 2: Developing a New Feature for an Existing Project

* **Scenario**: Your "TimeSheet Pro" application is now operational. You want to add a "Client Management Module" where users can add, view, edit, and delete client information.
* **Suggested Prompt to `management-mode`**:
    ```
    "We need to add a new 'Client Management Module' to our existing TimeSheet Pro application.
    Key functionalities for this module include:
    1. Ability to add new clients (Name, Contact Person, Email, Address).
    2. View a list of all clients.
    3. Edit existing client details.
    4. Delete clients (with confirmation).
    I have a basic specification document: 'Client_Module_Specs_v1.doc'.
    Please manage the development and integration of this new feature."
    ```
* **Expected `ennwise-ai` Behavior (Simplified)**:
    1.  `management-mode` creates a task for "New Feature: Client Management Module."
    2.  It will likely select the **`new_feature_development_workflow.md`**.
    3.  **Phase 1 (Requirements & Design):** `management-mode` assigns a task to `requirements-and-design-director-mode` to refine requirements based on your spec, create detailed UI/UX designs for the client management screens, and plan the technical design. This involves its team of Lead and Operational analysts and designers.
    4.  **Phase 2 (Development):** Once designs are approved, `development-director-mode` is tasked to build the module. This director delegates to `lead-developer-mode`(s) who assign coding tasks (e.g., "Create Client API endpoints," "Develop Client List UI Component," "Implement Add/Edit Client Form") to `coder-mode`(s).
    5.  **Phase 3 (QA):** `qa-director-mode` oversees testing, with `lead-qa-engineer-mode` planning tests and `tester-mode`(s) executing them.
    6.  **Phase 4 & 5 (Deployment & Monitoring):** `deployment-director-mode` handles the release, and `management-mode` ensures post-release stability.

---

### Example 3: Fixing a Reported Bug

* **Scenario**: In "TimeSheet Pro," users report that when they try to save a time entry longer than 8 hours, the system throws an error instead of a friendly warning.
* **Suggested Prompt to `management-mode`**:
    ```
    "We have a bug in TimeSheet Pro. When a user tries to save a single time entry exceeding 8 hours, the application shows a generic error page. It should instead display a warning: 'Single time entries cannot exceed 8 hours. Please split if necessary.'
    This is affecting user experience.
    To reproduce:
    1. Go to 'Log Time'.
    2. Select a project.
    3. Enter '9' hours for a single day.
    4. Click 'Save'.
    Expected: Warning message. Actual: Generic error.
    Please manage the bug fix."
    ```
* **Expected `ennwise-ai` Behavior (Simplified)**:
    1.  `management-mode` creates a task for "Bug Fix: Time Entry > 8 Hours Error."
    2.  It will select the **`bug_fix_workflow.md`**.
    3.  **Phase 1 (Verification & Triage):** Assigned to `qa-director-mode` to verify the bug and assess priority.
    4.  **Phase 2 (Root Cause Analysis):** Assigned to `development-director-mode` to find the cause in the code.
    5.  **Phase 3 (Fix Implementation):** A `coder-mode`, under a `lead-developer-mode`, implements the fix (e.g., adds the validation and warning message).
    6.  **Phase 4 (Fix Verification):** `qa-director-mode`'s team re-tests the scenario and performs regression tests.
    7.  **Phase 5 & 6 (Deployment & Closure):** The fix is deployed, and the bug is formally closed.

---

### Example 4: Requesting a Code Quality Review for a Module

* **Scenario**: You want an assessment of the "ReportingEngine" module in TimeSheet Pro, which has grown complex over time.
* **Suggested Prompt to `management-mode`**:
    ```
    "I would like to request a code quality and best practices review for the 'ReportingEngine' module in our TimeSheet Pro application.
    The relevant code is primarily in the 'src/reporting/' directory.
    The review should focus on:
    1. Code complexity and maintainability.
    2. Performance bottlenecks, especially in report generation.
    3. Adherence to our established coding standards.
    4. Test coverage adequacy.
    Please deliver a report summarizing findings and providing actionable recommendations for improvement."
    ```
* **Expected `ennwise-ai` Behavior (Simplified)**:
    1.  `management-mode` creates a task for "Code Review: ReportingEngine Module."
    2.  It will select the **`code_quality_and_best_practices_review_workflow.md`**.
    3.  **Phase 1 (Scoping):** `management-mode` assigns the task to `development-director-mode` to refine the scope and objectives with you.
    4.  **Phase 2-5 (Execution):** `development-director-mode` assigns a `lead-developer-mode` to manage the review. A senior `coder-mode` (or a specialized `code-reviewer-mode` if defined) will conduct the detailed analysis, document findings, and draft the report. The `lead-developer-mode` finalizes it.
    5.  **Phase 6 (Delivery & Planning):** `development-director-mode` provides the report to `management-mode`, who shares it with you. Follow-up actions (e.g., initiating a `technical_improvement_workflow.md`) can then be planned.

---

### Example 5: Breaking Down a Large Epic into Features

* **Scenario**: You have a large upcoming initiative for TimeSheet Pro: "Mobile Application Support." This is too big to tackle as one piece.
* **Suggested Prompt to `management-mode`**:
    ```
    "We have a major new epic for TimeSheet Pro: 'Mobile Application Support'.
    This will involve creating native iOS and Android apps that allow users to log time, view projects, and receive notifications. It will require new APIs and significant UI/UX adaptation.
    Please use the epic decomposition workflow to break this down into smaller, manageable features or distinct work packages. We need a prioritized list to plan our roadmap."
    ```
* **Expected `ennwise-ai` Behavior (Simplified)**:
    1.  `management-mode` creates a task for "Epic Decomposition: Mobile Application Support."
    2.  It will select the **`epic_decomposition_workflow.md`**.
    3.  **Phase 1 (Understanding):** `management-mode` works with you to clarify the epic's goals.
    4.  **Phase 2 (Decomposition):** `management-mode` assigns the breakdown task to `requirements-and-design-director-mode`. This director, potentially with `lead-product-owner-mode` or `lead-business-analyst-mode`, will identify potential features like "Mobile User Authentication," "Offline Time Logging for Mobile," "Mobile Project Viewing UI," "Push Notification Service for Mobile."
    5.  **Phase 3 (Refinement & Prioritization):** `management-mode` facilitates a review of these decomposed items with relevant Directors for sizing, feasibility, and helps you prioritize them.
    6.  **Phase 4 (Planning Next Steps):** For the top-priority mobile features, `management-mode` might then initiate separate `new_feature_development_workflow.md` instances.

---

### Example 6: Deploying an Urgent Hotfix

* **Scenario**: A critical bug in TimeSheet Pro's production environment is preventing any new user registrations. The fix is a single line change in a configuration file.
* **Suggested Prompt to `management-mode`**:
    ```
    "URGENT PRODUCTION ALERT: New user registration is failing in TimeSheet Pro. This is a P0 critical issue.
    The root cause is a typo in the 'production_settings.ini' file, section [UserRegistration], parameter 'EnableNewSignups' is set to 'Fasle' instead of 'True'.
    The fix is to change 'Fasle' to 'True'.
    We need an immediate hotfix deployment to correct this configuration."
    ```
* **Expected `ennwise-ai` Behavior (Simplified)**:
    1.  `management-mode` recognizes the criticality and initiates the **`hotfix_deployment_workflow.md`**.
    2.  **Phase 1 (Confirmation & Authorization):** `management-mode` rapidly coordinates with `development-director-mode`, `qa-director-mode`, and `deployment-director-mode` to confirm the issue and authorize the hotfix.
    3.  **Phase 2 (Rapid Fix):** `development-director-mode` ensures the config change is prepared.
    4.  **Phase 3 (Expedited Verification):** `qa-director-mode` ensures a hyper-focused test confirms registration works with the fix.
    5.  **Phase 4 (Emergency Deployment):** `deployment-director-mode` executes the urgent deployment of the configuration file.
    6.  **Phase 5 (Stabilization):** Intensive monitoring follows.

---

### Example 7: Requesting a New AI Mode Definition

* **Scenario**: You realize your project frequently needs to analyze database performance and suggest schema optimizations, a task currently done manually or by generic `coder-mode`s with guidance. You want a specialized AI mode for this.
* **Suggested Prompt to `management-mode`**:
    ```
    "We often need to perform detailed database performance analysis and schema optimization for our projects. Currently, this requires a lot of specific instruction to general coder modes.
    I propose creating a new specialized Operational AI mode: 'database-performance-analyst-mode'.
    Its key responsibilities would be:
    1. Analyze database query execution plans.
    2. Identify slow queries and suggest indexing strategies.
    3. Review table schemas for normalization and efficiency.
    4. Generate reports on database health and optimization suggestions.
    This would significantly improve our efficiency in database tuning. Can you help formalize a proposal for this new mode?"
    ```
* **Expected `ennwise-ai` Behavior (Simplified)**:
    1.  `management-mode` refers to Section 4 of its definition (`management_base.md`).
    2.  It will **not** create the mode definition file itself.
    3.  It will consolidate your request and prepare a formal proposal for you (the User). This proposal will outline:
        * The identified gap (lack of specialized DB performance analysis mode).
        * The rationale for the new `database-performance-analyst-mode`.
        * Its intended role, primary responsibilities, key skills (as you've outlined).
        * A proposed human-readable name and the derived slug `database-performance-analyst-mode`.
        * How this new mode would benefit projects.
    4.  `management-mode` will present this proposal to you for review and explicit approval.
    5.  If you approve, **you (the User) must then create the actual `database-performance-analyst-mode.md` file** in the `./.ennwise/modes/` directory, detailing its full operational definition (similar to other operational modes like `coder-mode.md`).
    6.  After you confirm the file's creation, `management-mode` and its subordinate Director/Lead modes can then assign tasks to this new mode type when appropriate.
