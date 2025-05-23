# System Specification and Design Workflow Template

## 1. Workflow Identification

* **Workflow Name:** System Specification and Design Workflow
* **File Name:** `system_specification_and_design_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-21
* **Last Updated:** 2025-05-21
* **Author/Maintainer:** User via AI Assistant

## 2. Description

Details the comprehensive process for defining a new application, a major new system module, or a significant architectural revision, covering in-depth requirements analysis, architectural planning, detailed design of components, and data modeling, culminating in a complete specification document.

## 3. Purpose & Goal

To produce a comprehensive, clear, and actionable set of documents (including functional specifications, architectural blueprints, detailed component designs, data models, and UI/UX designs) that fully define a new system or major system enhancement, serving as the definitive guide for its subsequent development and testing.

## 4. Initiation & Trigger

* User request for a new system or a major new module, submitted to `management-mode`.
* Output of strategic business planning identifying a need for a new technological solution.
* As a precursor to a large `epic_decomposition_workflow.md` or multiple `new_feature_development_workflow.md` instances for a brand-new product.

## 5. Key AI Roles Typically Involved

* `management-mode` (Orchestrator, initial setup and User liaison)
* `requirements-and-design-director-mode` (Primary owner of this workflow)
* `development-director-mode` (For technical feasibility, architectural input, and eventual handoff)
* `qa-director-mode` (For input on testability and non-functional requirements)
* Various Lead Modes (e.g., `lead_business_analyst-mode`, `lead-ui-designer-mode`, `lead-architect-mode`)
* Various Operational Modes (e.g., `business-analyst-mode`, `system-analyst-mode`, `ui-designer-mode`, `data-architect-mode`, `technical-writer-mode`)

## 6. Workflow Phases

---

### Phase 1: Project Vision, Scope, & High-Level Requirements Definition

* **Objective(s):** To establish a clear vision for the new system/module, define its scope and boundaries, identify key stakeholders, and elicit high-level business and user requirements.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode` (initial task creation), then `requirements-and-design-director-mode`.
* **Key Activities & Process Steps:**
    1.  `management-mode` receives the request, consults with the User to understand the vision, goals, and initial scope. A master task for the "System Specification & Design" is created.
    2.  `management-mode` assigns a high-level task to `requirements-and-design-director-mode` to lead the specification effort.
    3.  `requirements-and-design-director-mode` breaks this down into sub-tasks for `lead-business-analyst-mode` and other relevant roles (e.g., "Stakeholder Identification & Interviews," "Elicit High-Level Business Requirements," "Define Project Scope & Exclusions"). Rationale for breakdown and detailed instructions are logged in notes.
    4.  Operational modes (e.g., `business-analyst-mode`) conduct stakeholder interviews, workshops, and market research (if applicable), documenting findings meticulously in notes.
    5.  `requirements-and-design-director-mode` consolidates findings into a Project Vision & Scope document and a High-Level Requirements list.
    6.  `management-mode` facilitates User review and approval of these initial documents.
* **Key Deliverables/Outputs for Phase:**
    * Approved Project Vision and Scope Document.
    * High-Level Business and User Requirements.
    * Stakeholder Register.
* **Next Phase Trigger / Completion Criteria:** User approval of project vision, scope, and high-level requirements.

---

### Phase 2: Detailed Requirements Analysis & Functional Specification

* **Objective(s):** To perform an in-depth analysis of requirements, define detailed functional specifications, use cases (or user stories with acceptance criteria), and non-functional requirements.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `requirements-and-design-director-mode`.
* **Key Activities & Process Steps:**
    1.  `requirements-and-design-director-mode` creates and assigns sub-tasks to `lead-business-analyst-mode` and `system-analyst-mode`(s) for detailed analysis. This includes tasks like "Develop Detailed User Stories & Acceptance Criteria," "Define Non-Functional Requirements (Performance, Security, etc.)," "Create Process Flow Diagrams."
    2.  Operational modes conduct detailed analysis, further stakeholder consultations, and document detailed specifications. They add in-scope `todos` to their tasks with justification in notes as needed for thoroughness.
    3.  Collaboration with `qa-director-mode` to ensure requirements are testable and NFRs are well-defined.
    4.  Collaboration with `development-director-mode` for early feasibility feedback on requirements.
    5.  `requirements-and-design-director-mode` reviews and consolidates all detailed requirements into a Functional Specification Document.
* **Key Deliverables/Outputs for Phase:**
    * Detailed Functional Specification Document (including use cases/user stories).
    * Comprehensive list of Non-Functional Requirements.
    * Process Models / Data Flow Diagrams.
* **Next Phase Trigger / Completion Criteria:** Functional Specification Document reviewed and approved by relevant stakeholders (including `development-director-mode` for feasibility and `qa-director-mode` for testability).

---

### Phase 3: System Architecture & Technical Design

* **Objective(s):** To define the overall system architecture, select technologies, design major components and their interactions, and create detailed technical specifications.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `requirements-and-design-director-mode` (for overall design consistency) and `development-director-mode` (for technical architecture).
* **Key Activities & Process Steps:**
    1.  Based on approved functional specifications, `requirements-and-design-director-mode` and `development-director-mode` collaborate to create tasks for defining the system architecture.
    2.  `development-director-mode` may assign sub-tasks to `lead-architect-mode` or senior `coder-mode`(s) with architectural skills for "High-Level System Architecture Design," "Technology Stack Selection," "Major Component Design," "API Design," and "Database Design/Data Modeling."
    3.  `requirements-and-design-director-mode` ensures UI/UX detailed design tasks are created and assigned to `lead-ui-designer-mode` -> `ui-designer-mode`.
    4.  Operational modes produce architectural diagrams, component specifications, API contracts, database schemas, and detailed UI designs, logging all design decisions and rationale in notes.
    5.  Extensive reviews are conducted by both Directors and relevant Leads involving technical feasibility, scalability, security, maintainability, and alignment with requirements.
* **Key Deliverables/Outputs for Phase:**
    * System Architecture Document.
    * Detailed Design Specifications for major components.
    * API Specification / Service Contracts.
    * Database Schema / Data Model.
    * Final UI/UX Design Specifications and Style Guides.
* **Next Phase Trigger / Completion Criteria:** All design and architectural documents completed, reviewed, and approved by relevant Directors and potentially `management-mode`.

---

### Phase 4: Specification Package Compilation & Final Review

* **Objective(s):** To compile all documentation into a final, coherent System Specification Package and obtain final stakeholder approval.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `requirements-and-design-director-mode`, supported by `technical-writer-mode`(s).
* **Key Activities & Process Steps:**
    1.  `requirements-and-design-director-mode` creates tasks for compiling and formatting all previously created documents (Functional Specs, Architectural Design, Detailed Designs, Data Models, UI/UX Specs) into a unified package. This may be assigned to `technical-writer-mode`(s) or `system-analyst-mode`(s).
    2.  A final review of the complete package is conducted by all involved Director modes and `management-mode`.
    3.  `management-mode` facilitates a final review and approval session with the User.
* **Key Deliverables/Outputs for Phase:**
    * Comprehensive System Specification Package (approved).
* **Next Phase Trigger / Completion Criteria:** User approval of the complete System Specification Package.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** A complete, approved, and actionable set of specification and design documents is produced, ready to guide the development, testing, and deployment of the new system or module.
* **Final Reporting/Handoff:** The System Specification Package is formally handed off to `development-director-mode` to initiate development (likely via `epic-decomposition-workflow.md` or `new-feature-development-workflow.md` for constituent parts). `management-mode` confirms completion with the User.

## 8. Notes & Considerations

* This workflow is foundational for large, new initiatives. Its output directly feeds into subsequent development workflows.
* Significant iteration may occur between phases, especially between Detailed Requirements and System Architecture.
* Strong collaboration between `requirements-and-design-director-mode` and `development-director-mode` is essential throughout.