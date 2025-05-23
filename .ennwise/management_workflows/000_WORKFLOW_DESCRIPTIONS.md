# 

This document provides a quick reference to available workflow templates within the `./.ennwise/management_workflows/` directory. `management-mode` can use these descriptions to select the appropriate workflow for a given user request or project phase.

---

### Bug Fix Workflow

**File Name:** `bug_fix_workflow.md`
**Description:** Defines the standard process for addressing reported software defects, including bug verification, root cause analysis, code correction, comprehensive testing of the fix, and deployment.
**Key High-Level Actions:**

* Investigates, verifies, and triages reported software defects.
* Manages root cause analysis, fix implementation, and unit testing.
* Oversees fix verification, regression testing, and deployment of the corrected code.

---

### Code Quality and Best Practices Review Workflow

**File Name:** `code_quality_and_best_practices_review_workflow.md`
**Description:** Defines a structured process for conducting a detailed review of a specific codebase segment (e.g., module, service, feature) to assess its quality, adherence to coding standards and best practices, identify potential issues, and provide actionable suggestions for improvement.
**Key High-Level Actions:**

* Defines the scope and objectives for a code review.
* Manages detailed code analysis against defined criteria.
* Consolidates findings and delivers a report with actionable recommendations.

---

### Epic Decomposition Workflow

**File Name:** `epic_decomposition_workflow.md`
**Description:** Structures the breakdown of a large-scale user request, product epic, or substantial project initiative into smaller, more manageable features, user stories, or distinct work packages, each of which may then initiate other workflows.
**Key High-Level Actions:**

* Understands and defines the scope of a large epic or initiative.
* Breaks down the epic into smaller, logical features or work packages.
* Refines, prioritizes, and plans next steps for the decomposed items.

---

### Guided Project Lifecycle Orchestration Workflow

**File Name:** `guided_project_lifecycle_orchestration_workflow.md`
**Description:** A high-level meta-workflow designed to guide `management-mode` in orchestrating an entire project lifecycle, particularly one that requires significant upfront UI/UX design and planning, followed by iterative development and a formal launch. It achieves this by instructing `management-mode` to initiate and manage a sequence of more granular, specialized workflows.
**Key High-Level Actions:**

* Orchestrates a full project lifecycle by initiating and managing a sequence of more granular sub-workflows (Upfront Design & Planning, Iterative Sprints, Production Readiness & Launch).
* Guides `management-mode` in executing projects that require detailed initial UI/UX design and iterative development.
* Manages transitions between major project phases and oversees post-launch operations.

---

### Hotfix Deployment Workflow

**File Name:** `hotfix_deployment_workflow.md`
**Description:** Defines an expedited and focused process for urgently addressing critical, production-impacting issues, emphasizing rapid diagnosis, a minimal effective fix, streamlined but essential testing, and immediate deployment to restore service.
**Key High-Level Actions:**

* Manages rapid diagnosis and authorization for a hotfix.
* Oversees quick development, targeted testing, and risk assessment of the minimal fix.
* Executes emergency production deployment and post-hotfix stabilization.

---

### Iterative Sprint Execution Workflow

**File Name:** `iterative_sprint_execution_workflow.md`
**Description:** Defines the activities within a single development sprint or iteration, including task execution by AI agents, adherence to UI/UX specifications, continuous integration, reviews by human overseers, and regular feedback loops including usability testing.
**Key High-Level Actions:**

* Manages the execution of a single development sprint, from task assignment to review.
* Ensures feature development aligns with UI/UX specifications and includes unit/integration testing.
* Incorporates continuous integration, code reviews (AI and human), usability testing, and sprint retrospectives.

---

### New Feature Development Workflow

**File Name:** `new_feature_development_workflow.md`
**Description:** Outlines the end-to-end phases for conceptualizing, designing, developing, testing, and deploying a new software feature, ensuring all necessary steps from requirements gathering to release are covered.
**Key High-Level Actions:**

* Manages requirements elicitation, definition, and design planning for a new feature.
* Oversees development, unit testing, and comprehensive quality assurance.
* Manages deployment, release, and post-release monitoring of the new feature.

---

### Production Readiness and Launch Workflow

**File Name:** `production_readiness_and_launch_workflow.md`
**Description:** Covers the final stages of preparing an application for production release, including CI/CD pipeline maturation, pre-production hardening (E2E, performance, security, accessibility testing), production launch, and initial post-launch monitoring and maintenance.
**Key High-Level Actions:**

* Manages the maturation of CI/CD pipelines and finalization of the staging environment.
* Oversees comprehensive pre-production hardening activities (E2E, performance, security, accessibility testing).
* Manages production launch approval, execution, and initial post-launch monitoring.

---

### Project Health and Architectural Assessment Workflow

**File Name:** `project_health_and_architectural_assessment_workflow.md`
**Description:** Provides a comprehensive framework for assessing the overall health, technical status, architectural soundness, and process efficiency of an existing software project, culminating in a detailed report with findings and strategic recommendations.
**Key High-Level Actions:**

* Defines scope and objectives for a project health or architectural assessment.
* Manages multi-domain data collection and synthesizes findings to assess overall state.
* Develops recommendations and delivers a final assessment report to stakeholders.

---

### System Specification and Design Workflow

**File Name:** `system_specification_and_design_workflow.md`
**Description:** Details the comprehensive process for defining a new application, a major new system module, or a significant architectural revision, covering in-depth requirements analysis, architectural planning, detailed design of components, and data modeling, culminating in a complete specification document.
**Key High-Level Actions:**

* Defines project vision, scope, and high-level requirements for a new system or major module.
* Manages detailed requirements analysis, functional specification, system architecture, and technical design.
* Compiles and obtains approval for a comprehensive System Specification Package.

---

### Technical Improvement Workflow

**File Name:** `technical_improvement_workflow.md`
**Description:** Guides planned non-functional enhancements to the codebase or system architecture, such as significant refactoring, performance optimization, security hardening, or upgrading core dependencies, including impact analysis, execution, and validation.
**Key High-Level Actions:**

* Manages the proposal, impact analysis, and planning of technical improvements.
* Oversees implementation, developer testing, and QA validation of the improvements.
* Manages deployment and post-deployment monitoring to confirm benefit realization.

---

### Upfront Design and Planning Workflow

**File Name:** `upfront_design_and_planning_workflow.md`
**Description:** Defines the initial comprehensive phase of a project, focusing on stakeholder validation of existing documentation, creation of detailed UI/UX design artifacts, full backlog creation (including MVP definition), and development environment setup.
**Key High-Level Actions:**

* Manages stakeholder review of initial documents and subsequent updates.
* Oversees the creation of core UI/UX design artifacts (flow diagrams, wireframes, mockups, prototypes, style guide).
* Guides backlog creation, MVP definition, development environment setup, and project kick-off.

---

### Workflow Design Guide and Template

**File Name:** `workflow_design_guide_and_template.md`
**Description:** This guide provides principles and a template for designing new workflow templates to be used within the AI-driven software development system.
**Key High-Level Actions:**

* Provides principles for designing consistent and effective workflow templates.
* Offers a generic template structure for creating new workflows.
* (Note: This is a meta-document for Users to create new workflow types, not typically executed by `management-mode` as a project workflow.)

---
