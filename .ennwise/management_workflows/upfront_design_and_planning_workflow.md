# Upfront Design and Planning Workflow Template

## 1. Workflow Identification

* **Workflow Name:** Upfront Design and Planning Workflow
* **File Name:** `upfront_design_and_planning_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-23
* **Last Updated:** 2025-05-23
* **Author/Maintainer:** User via AI Assistant

## 2. Description

Defines the initial comprehensive phase of a project, focusing on stakeholder validation of existing documentation, creation of detailed UI/UX design artifacts, full backlog creation (including MVP definition), and development environment setup, as outlined in the Project Guide's Phase 1.

## 3. Purpose & Goal

To establish a solid foundation for development by ensuring all necessary design, planning, and setup tasks are completed, resulting in agreed-upon specifications, a clear development backlog, and a functional development environment. This phase aims to translate initial project concepts and user requirements into a buildable plan.

## 4. Initiation & Trigger

* Initiated by `management-mode` at the beginning of a new project, often following an overarching project setup or as the first major step in a `guided_project_lifecycle_orchestration_workflow.md`.
* Triggered by the need to fully define UI/UX specifics and prepare for iterative development when initial high-level plans exist.

## 5. Key AI Roles Typically Involved

* `management-mode` (Orchestrator, User/Stakeholder liaison)
* `requirements-and-design-director-mode` (Oversees UI/UX design, backlog creation)
* `development-director-mode` (Oversees development environment setup)
* `lead-ui-designer-mode` (Leads UI/UX design execution)
* `ui-designer-mode` (Executes specific UI/UX design tasks)
* `lead-business-analyst-mode` (Leads backlog creation from specifications)
* `business-analyst-mode` (Assists in task definition)
* `lead-developer-mode` (For dev environment setup oversight)
* Operational Modes for dev environment setup (e.g., `docker-setup-mode`, `react-env-setup-mode`)

## 6. Workflow Phases

---

### Phase 1: Stakeholder Review, Feedback Collection & Documentation Update

* **Objective(s):**
  * To validate all existing project documentation (Overview, Planning & Design, Technical Foundation, etc.) with key stakeholders including human overseers and AI agent development team representatives.
  * To gather feedback, confirm assumptions (e.g., technical stack), and fill in placeholders (e.g., specific NFR targets).
  * To produce an updated and agreed-upon baseline documentation set (Version 1.1 or 2.0).
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode` (for stakeholder liaison), `requirements-and-design-director-mode` (for documentation updates).
* **Key Activities & Process Steps:**
  1. `management-mode` creates a task "Stakeholder Review of Initial Documentation" and assigns it to itself.
     * **Todo:** "Identify key stakeholders (human overseers, AI dev team reps) for document review."
     * **Todo:** "Distribute `01-Planning_and_Design.md`, `02-Technical_Foundation.md`, `05-Non_Functional_Requirements.md` and other relevant documents to stakeholders."
     * **Todo:** "Schedule and facilitate review meetings or feedback collection channels."
     * **Todo:** "Collect and consolidate all feedback using `addNote` associated with this task."
     * **Todo:** "Ensure feedback on technical stack (React, Docker, Vite, Zustand, Tailwind CSS) is captured."
     * **Todo:** "Ensure user stories and initial flows are validated."
     * **Todo:** "Ensure specific NFR targets and browser support details are confirmed/defined."
  2. `management-mode` creates a follow-up task "Update Documentation Set Post-Review" and assigns it to `requirements-and-design-director-mode`.
     * **Todo:** "Receive consolidated feedback notes from `management-mode`."
     * **Todo:** (`requirements-and-design-director-mode` to assign to `technical-writer-mode` or similar) "Incorporate all feedback and decisions into the documentation set."
     * **Todo:** "Version the updated documentation set appropriately (e.g., v1.1 or v2.0)."
     * **Todo:** "Store updated documents in the central repository and notify `management-mode`."
  3. `management-mode` confirms with User/stakeholders that the updated baseline is agreed upon.
* **Key Deliverables/Outputs for Phase:**
  * Consolidated stakeholder feedback report (as notes).
  * Updated and versioned project documentation set.
  * Documented agreement on the refined baseline.
* **Next Phase Trigger / Completion Criteria:** Updated documentation set is approved by stakeholders (facilitated by `management-mode`).

---

### Phase 2: Core UI/UX Design Artifact Creation

* **Objective(s):**
  * To create the initial visual and interactive blueprint for the application, as no prior design or wireframes are contemplated.
  * To translate user stories, flows, and specific UX requirements for data entry into tangible design artifacts.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `requirements-and-design-director-mode`.
* **Key Activities & Process Steps:**
  1. `management-mode` creates a high-level task "Develop Core UI/UX Design Artifacts" and assigns it to `requirements-and-design-director-mode`.
     * **Todo:** "Receive key input documents: `QuoteWise_Design_Summary_Rationale_v2.txt`, refined `01-Planning_and_Design.md`, explicit UX requirements for data entry, and `03-API_Specification_Summary.md`." (These are to be provided by `management-mode` as notes/linked resources to this task).
  2. `requirements-and-design-director-mode` analyzes the inputs and breaks down the design process into sub-tasks for `lead-ui-designer-mode`. This lead will further delegate to `ui-designer-mode`(s). Rationale for breakdown documented in notes.
     * **Sub-Task Example 1 (for `lead-ui-designer-mode`):** "Create Visualized User Flow Diagrams"
       * **Todo (for `ui-designer-mode`):** "Based on `QuoteWise_Design_Summary_Rationale_v2.txt` and `01-Planning_and_Design.md`, create visual diagrams for each key user flow (Master Data, Template Creation, Project Data Entry, etc.)."
       * **Todo (for `ui-designer-mode`):** "Ensure 'v2 revisions' for Master Data entry guide relevant flow diagrams."
       * **Todo (for `ui-designer-mode`):** "Document diagrams and add to project repository."
     * **Sub-Task Example 2 (for `lead-ui-designer-mode`):** "Develop Wireframes for Key Screens"
       * **Todo (for `ui-designer-mode`):** "Create low-fidelity wireframes for all key screens and user flows (Master Data views/forms, Template creation/editing, Price List management, Project creation wizard, Project data entry grid, Report views)."
       * **Todo (for `ui-designer-mode`):** "Visually translate described flows and interaction models (inline editing for Master Headings, side panel for Master Items, two-panel builder for templates, spreadsheet-like grid for project data entry)."
       * **Todo (for `ui-designer-mode`):** "Incorporate specific data entry UX requirements: quick flow, smooth up/down movement, direct row click to edit, move handles, minimal pop-ups/forced entry."
       * **Todo (for `ui-designer-mode`):** "Focus on structure, information hierarchy, and basic component placement."
     * **Sub-Task Example 3 (for `lead-ui-designer-mode`):** "Develop Low-Fidelity Mockups"
       * **Todo (for `ui-designer-mode`):** "Evolve wireframes into low-fidelity mockups, adding detail on component placement, approximate sizing, and basic interaction logic for key screens."
     * **Sub-Task Example 4 (for `lead-ui-designer-mode`):** "Develop High-Fidelity Mockups"
       * **Todo (for `ui-designer-mode`):** "Develop high-fidelity mockups defining visual styling based on 'modern, clean, professional blue primary color' and 'Inter' typography."
       * **Todo (for `ui-designer-mode`):** "Detail specific UI elements, color palette, and refined interaction details. These will serve as primary visual guides for AI development agents."
     * **Sub-Task Example 5 (for `lead-ui-designer-mode`):** "Create Clickable Prototype (Iterative)"
       * **Todo (for `ui-designer-mode`):** "Develop a clickable prototype for critical user flows, especially Master Data entry (inline and side panel) and project data entry grid, based on key mockups."
       * **Todo (for `ui-designer-mode`):** "Ensure prototype allows for early usability testing and feedback."
     * **Sub-Task Example 6 (for `lead-ui-designer-mode`):** "Draft Visual Style Guide & Component Library Specification"
       * **Todo (for `ui-designer-mode`):** "Begin documenting common UI components (buttons, forms, navigation, grids, data displays, side panels) and their styles/states based on mockups."
       * **Todo (for `ui-designer-mode`):** "Align with 'Next Step' from design summary regarding component library."
  3. `requirements-and-design-director-mode` oversees the completion of these sub-tasks, ensuring quality and consistency.
  4. `management-mode` facilitates stakeholder review (PM role from Project Guide) of the UI/UX artifacts. Feedback is logged and iterated upon by the design team.
     * **Todo (for `management-mode`):** "Organize stakeholder review sessions for key UI/UX deliverables (wireframes, mockups, prototype)."
     * **Todo (for `management-mode`):** "Consolidate feedback and provide to `requirements-and-design-director-mode` for iteration."
* **Key Deliverables/Outputs for Phase:**
  * Approved User Flow Diagrams.
  * Approved Low-fidelity Wireframes.
  * Approved Low-Fidelity Mockups.
  * Approved High-Fidelity Mockups.
  * Clickable Prototype for key flows.
  * Initial Draft of Visual Style Guide & Component Library Specification.
* **Next Phase Trigger / Completion Criteria:** All UI/UX artifacts are completed, reviewed, and formally approved by stakeholders/User (facilitated by `management-mode`).

---

### Phase 3: Backlog Creation, Grooming & MVP Definition

* **Objective(s):**
  * To translate refined User Stories and UI/UX artifacts into a detailed, actionable, and prioritized development backlog.
  * To define the scope of the Minimum Viable Product (MVP).
* **Primary AI Mode(s) Responsible for Phase Oversight:** `requirements-and-design-director-mode` (overall), with `lead-business-analyst-mode`.
* **Key Activities & Process Steps:**
  1. `management-mode` creates a task "Create and Groom Development Backlog" and assigns to `requirements-and-design-director-mode`.
  2. `requirements-and-design-director-mode` assigns this to `lead-business-analyst-mode` to lead the effort, possibly with `business-analyst-mode`(s).
     * **Todo (for `lead-business-analyst-mode`):** "Review refined User Stories from `01-Planning_and_Design.md` (updated in Phase 1 of this workflow) and all approved UI/UX artifacts (from Phase 2 of this workflow)."
     * **Todo (for `lead-business-analyst-mode`):** "Decompose User Stories into specific, actionable development tasks for the task management system."
     * **Todo (for `business-analyst-mode`):** "For each task, define clear acceptance criteria, referencing relevant UI mockups/prototypes and API endpoints."
     * **Todo (for `lead-business-analyst-mode`):** "Collaborate with `development-director-mode` for technical feasibility checks on tasks and high-level effort estimates."
     * **Todo (for `lead-business-analyst-mode`):** "Prioritize the backlog items in consultation with `management-mode` and User."
     * **Todo (for `lead-business-analyst-mode`):** "Clearly define and document the scope of the Minimum Viable Product (MVP) with `management-mode` and User."
  3. `management-mode` facilitates User approval of the MVP scope and initial prioritized backlog.
* **Key Deliverables/Outputs for Phase:**
  * Prioritized development backlog in the task management system.
  * Clearly defined and approved MVP scope.
* **Next Phase Trigger / Completion Criteria:** MVP scope and initial prioritized backlog are approved by `management-mode` and User.

---

### Phase 4: Development Environment Setup and Validation

* **Objective(s):**
  * To set up and validate the Dockerized React development environment as per `02-Technical_Foundation.md`.
  * To ensure a consistent, reproducible, and functional development environment for the AI agent team and any human developers.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `development-director-mode`.
* **Key Activities & Process Steps:**
  1. `management-mode` creates a task "Setup and Validate Development Environment" and assigns to `development-director-mode`.
  2. `development-director-mode` assigns this to `lead-developer-mode` (or a specialized `devops-mode` if available).
     * **Todo (for `lead-developer-mode`/`devops-mode`):** "Review `02-Technical_Foundation.md` for environment specifications."
     * **Todo (for `lead-developer-mode`/`devops-mode`):** "Create and test the initial `Dockerfile` for development."
     * **Todo (for `lead-developer-mode`/`devops-mode`):** "Create and test `docker-compose.yml` for local development."
     * **Todo (for `lead-developer-mode`/`devops-mode`):** "Develop and test essential helper scripts (e.g., for running dev server, tests, updating dependencies within Docker)."
     * **Todo (for `lead-developer-mode`/`devops-mode`):** "Document the setup process and provide instructions for use."
     * **Todo (for `lead-developer-mode`/`devops-mode`):** "Validate that a basic 'hello world' React application can be run successfully within the Dockerized environment."
  3. `development-director-mode` confirms the environment is functional and ready.
* **Key Deliverables/Outputs for Phase:**
  * Functional and validated Dockerized React development environment.
  * Dockerfile, docker-compose.yml, and helper scripts.
  * Setup documentation.
* **Next Phase Trigger / Completion Criteria:** Development environment is validated and ready for use.

---

### Phase 5: Project Kick-off and First Sprint/Iteration Planning

* **Objective(s):**
  * To formally kick off the development phase with all key parties.
  * To plan the first sprint/iteration based on the prioritized backlog and MVP scope.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps:**
  1. `management-mode` creates a task "Conduct Project Kick-off and First Sprint Planning" and assigns it to itself.
     * **Todo:** "Organize and conduct a formal project kick-off meeting with human overseers and representatives of the AI agent team."
     * **Todo:** "Review project goals, MVP scope, development processes (Agile, version control from `04-Project_Management_and_Process.md`), communication channels, and roles."
     * **Todo:** "Present the newly created UI/UX design artifacts and the prioritized backlog."
     * **Todo:** "Collaborate with `development-director-mode` (and potentially `lead-developer-mode`) to select the first set of prioritized tasks from the backlog for the first sprint/iteration."
     * **Todo:** "Ensure selected tasks align with MVP goals and leverage available design specifications."
     * **Todo:** "Document the plan for the first sprint/iteration."
* **Key Deliverables/Outputs for Phase:**
  * Documented project kick-off meeting summary.
  * Agreed-upon scope and tasks for the first development sprint/iteration.
* **Next Phase Trigger / Completion Criteria:** First sprint is planned and ready to commence.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** The project has a validated and refined documentation baseline, a complete set of UI/UX design artifacts, a groomed and prioritized backlog with a defined MVP, a functional development environment, and a plan for the first development iteration. The project is fully prepared to enter the iterative development phase.
* **Final Reporting/Handoff:** `management-mode` confirms completion of this upfront phase with the User. All artifacts are stored centrally. The backlog for the first sprint is ready for the `iterative_sprint_execution_workflow.md`.

## 8. Notes & Considerations

* This workflow is intensive and front-loads critical design and planning work, aligning with the Project Guide's emphasis.
* User and stakeholder involvement is critical throughout this workflow for reviews and approvals. `management-mode` is responsible for facilitating this.
* The outputs of this workflow (especially UI/UX artifacts and the backlog) are crucial inputs for subsequent development sprints.
* The emphasis on "Efficiency First" and fluid data entry must be a guiding principle during UI/UX design and backlog task definition.
