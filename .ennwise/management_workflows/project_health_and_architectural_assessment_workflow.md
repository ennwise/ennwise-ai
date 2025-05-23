# Project Health and Architectural Assessment Workflow Template

## 1. Workflow Identification

* **Workflow Name:** Project Health and Architectural Assessment Workflow
* **File Name:** `project_health_and_architectural_assessment_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-21
* **Last Updated:** 2025-05-21
* **Author/Maintainer:** User via AI Assistant

## 2. Description

Provides a comprehensive framework for assessing the overall health, technical status, architectural soundness, and process efficiency of an existing software project, culminating in a detailed report with findings and strategic recommendations.

## 3. Purpose & Goal

To conduct a holistic review of a software project to identify its current strengths, weaknesses, potential risks (technical and operational), and opportunities for improvement. The goal is to provide stakeholders with a clear understanding of the project's state and actionable recommendations for its future direction, stability, and success.

## 4. Initiation & Trigger

* User request to `management-mode` for a health check or architectural review of a specific project.
* Scheduled periodic review for long-running or mission-critical projects.
* Significant change in project direction, team structure, or after a series of major incidents, prompting a need for assessment.
* Before a major new investment or refactoring effort in an existing project.

## 5. Key AI Roles Typically Involved

* `management-mode` (Overall orchestrator, primary interface with User, consolidates final report)
* `requirements-and-design-director-mode` (Assesses requirements alignment, design integrity, documentation)
* `development-director-mode` (Assesses codebase health, technical debt, development practices, architecture)
* `qa-director-mode` (Assesses test coverage, defect trends, quality processes, release stability)
* `deployment-director-mode` (Assesses deployment processes, infrastructure, operational stability)
* Various Lead Modes (e.g., `lead-architect-mode`, `lead-developer-mode`, `lead-qa-engineer-mode` to assist Directors in data gathering and analysis)
* Various Operational Modes (e.g., specialized analyst modes like `code-analyzer-mode`, `log-analyzer-mode`, `documentation-reviewer-mode`, or senior `coder-mode`/`tester-mode` performing analysis tasks. `technical-writer-mode` for report compilation.)

## 6. Workflow Phases

---

### Phase 1: Assessment Initiation, Scoping & Objective Definition

* **Objective(s):**
    * To clearly define the scope of the project assessment (e.g., which project, specific areas of focus like architecture, process, code quality, security).
    * To establish specific objectives, key questions to answer, and criteria for the assessment.
    * To identify key information sources and assign overall coordination.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps:**
    1.  User requests the project assessment via `management-mode`, outlining the target project and general concerns or goals for the review.
    2.  `management-mode` creates a master task for the "Project Health & Architectural Assessment."
    3.  `management-mode` consults with the User and relevant Director Modes to refine the scope (e.g., "Full architectural review of Project X," "Assessment of development and QA processes for Project Y," "Code quality and technical debt analysis of Module Z within Project X").
    4.  Specific objectives and key questions are documented in the master task by `management-mode` (e.g., "Is the current architecture scalable for the next 2 years?", "What is the current level of automated test coverage and its effectiveness?", "Identify top 3 areas of technical debt.").
    5.  `management-mode` identifies which Director modes will lead the data collection and analysis for their respective domains.
* **Key Deliverables/Outputs for Phase:**
    * Documented scope and objectives for the assessment.
    * List of key questions to be answered.
    * High-level plan for data collection, including responsible Director modes.
* **Next Phase Trigger / Completion Criteria:** Scope, objectives, and high-level plan approved by `management-mode` (and User if a very significant undertaking).

---

### Phase 2: Multi-Domain Data Collection & Initial Analysis

* **Objective(s):** For each relevant domain (Requirements/Design, Development, QA, Deployment), to collect pertinent data and perform an initial analysis based on the assessment scope.
* **Primary AI Mode(s) Responsible for Phase Oversight:** Respective Director Modes (`requirements-and-design-director-mode`, `development-director-mode`, `qa-director-mode`, `deployment-director-mode`). Coordinated by `management-mode`.
* **Key Activities & Process Steps:**
    1.  `management-mode` creates high-level sub-tasks for each involved Director, linked to the master assessment task, outlining their specific data collection and analysis responsibilities based on Phase 1 objectives.
    2.  **For `requirements-and-design-director-mode`:**
        * Breaks down its task to analyze: current requirements documentation (clarity, completeness, traceability), design documents (consistency, adherence to architecture), alignment of implemented features with original/current requirements. Assigns sub-tasks to `lead-business-analyst-mode` or `system-analyst-mode`.
    3.  **For `development-director-mode`:**
        * Breaks down its task to analyze: codebase structure and quality (complexity metrics, technical debt indicators via tools or sampling by senior `coder-mode`s), architectural adherence, build processes, version control practices, development workflow efficiency. Assigns sub-tasks to `lead-architect-mode` or `lead-developer-mode`.
    4.  **For `qa-director-mode`:**
        * Breaks down its task to analyze: test strategies, test coverage (automated and manual), defect data (density, trends, severity, resolution times), QA process efficiency, release stability from a quality perspective. Assigns sub-tasks to `lead-qa-engineer-mode`.
    5.  **For `deployment-director-mode`:**
        * Breaks down its task to analyze: deployment frequency and success rates, rollback capabilities and history, infrastructure stability and scalability, CI/CD pipeline efficiency, monitoring and alerting effectiveness. Assigns sub-tasks to relevant operational/lead modes.
    6.  All involved Lead/Operational modes execute their analysis tasks, meticulously documenting findings, data sources, and initial observations in notes within their respective sub-tasks in `project-task-manager`. They can add in-scope `todos` to structure their analysis, with justification.
    7.  Each Director reviews the findings from their domain and prepares a preliminary domain-specific assessment summary as a note in their assigned high-level sub-task.
* **Key Deliverables/Outputs for Phase:**
    * Raw data and initial analysis findings from each domain (documented in task notes).
    * Preliminary assessment summaries from each participating Director mode.
* **Next Phase Trigger / Completion Criteria:** All Directors have submitted their initial domain-specific findings and analysis.

---

### Phase 3: Cross-Domain Synthesis & Overall State Assessment

* **Objective(s):** To synthesize the findings from all domains, identify cross-cutting themes, assess the overall project health, and identify key strengths, weaknesses, and risks.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode` (may delegate detailed synthesis to a lead Director, e.g., `development-director-mode` or `requirements-and-design-director-mode` if a strong technical or process focus is needed for synthesis).
* **Key Activities & Process Steps:**
    1.  `management-mode` (or the delegated lead Director) creates a task for "Assessment Synthesis." This task will have `todos` like "Review Development Domain Report," "Review QA Domain Report," "Identify conflicting findings," "Summarize key architectural risks."
    2.  The responsible mode reviews all preliminary assessments and detailed notes from Phase 2.
    3.  A consolidated analysis is performed to:
        * Identify interdependencies and correlations between findings from different domains.
        * Determine systemic issues versus isolated problems.
        * Assess overall project alignment with strategic goals.
        * Compile a list of key strengths, weaknesses, opportunities, and threats (SWOT-like analysis for the project).
        * Identify and prioritize key risks (technical, process, resource-related).
    4.  All synthesized findings and overall state assessment are documented in comprehensive notes within the "Assessment Synthesis" task.
* **Key Deliverables/Outputs for Phase:**
    * Synthesized cross-domain findings.
    * Overall project health assessment.
    * Prioritized list of key risks and identified issues.
    * List of project strengths and opportunities.
* **Next Phase Trigger / Completion Criteria:** Comprehensive synthesis and overall state assessment documented.

---

### Phase 4: Recommendation Formulation & Report Drafting

* **Objective(s):** To develop actionable, prioritized recommendations based on the assessment and to draft a comprehensive report.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode` (or the delegated lead Director for synthesis), with input from all contributing Directors.
* **Key Activities & Process Steps:**
    1.  Based on the synthesized findings (Phase 3), `management-mode` (or the lead Director) facilitates the formulation of concrete, actionable recommendations. This might involve creating sub-tasks for each Director to propose specific recommendations for their domain based on the synthesized findings.
    2.  Recommendations are prioritized based on impact, urgency, and feasibility.
    3.  `management-mode` creates a task for a `technical-writer-mode` (or performs this itself) to draft the "Project Health and Architectural Assessment Report." The report structure should include:
        * Executive Summary.
        * Assessment Scope and Objectives.
        * Methodology.
        * Detailed Findings (per domain and cross-domain).
        * Overall Health Assessment (including risks and strengths).
        * Prioritized Recommendations.
        * Potential Roadmap for improvements (optional).
    4.  The draft report is compiled using information from all previous phases, primarily the detailed notes in `project-task-manager`.
* **Key Deliverables/Outputs for Phase:**
    * Prioritized list of actionable recommendations.
    * Draft "Project Health and Architectural Assessment Report."
* **Next Phase Trigger / Completion Criteria:** Draft report with recommendations is ready for final review.

---

### Phase 5: Final Review & Report Delivery

* **Objective(s):** For all key AI stakeholders (Directors, `management-mode`) to review the draft report for accuracy and completeness, and for `management-mode` to deliver the finalized report to the User.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps:**
    1.  `management-mode` circulates the draft report to all contributing Director modes for review and feedback.
    2.  Feedback is incorporated, and the report is finalized.
    3.  `management-mode` delivers the final "Project Health and Architectural Assessment Report" to the User.
    4.  `management-mode` may schedule a session with the User to present the findings and recommendations.
* **Key Deliverables/Outputs for Phase:**
    * Finalized "Project Health and Architectural Assessment Report."
    * Report delivered to the User.
* **Next Phase Trigger / Completion Criteria:** User has received and acknowledged the report.

---

### Phase 6: Action Planning & Follow-up (Optional)

* **Objective(s):** To decide on and initiate actions based on the assessment report's recommendations.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps:**
    1.  `management-mode` discusses the report and recommendations with the User to determine which actions to pursue.
    2.  For approved actions, `management-mode` may initiate other workflows, such as:
        * `technical_improvement_workflow.md` for refactoring or optimizations.
        * `epic_decomposition_workflow.md` if major new work is identified.
        * `bug_fix_workflow.md` for specific issues.
        * Tasks for process improvements or documentation updates.
    3.  Decisions and planned follow-up actions are documented in the `project-task-manager`, potentially linked to the original assessment master task.
* **Key Deliverables/Outputs for Phase:**
    * Documented decisions on actions to be taken.
    * Initiation of follow-up tasks/workflows.
* **Next Phase Trigger / Completion Criteria:** User decisions on recommendations are made, and follow-up actions are planned/initiated.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** A comprehensive assessment of the project's health and architecture is completed, findings and recommendations are delivered to the User, and decisions regarding follow-up actions are made.
* **Final Reporting/Handoff:** `management-mode` archives the assessment report and related documentation. The master assessment task is closed.

## 8. Notes & Considerations

* This workflow can be tailored in Phase 1 to focus on specific areas of concern.
* The level of detail in data collection can be adjusted based on the assessment's urgency and objectives.
* Effective visualization of data and findings in the final report is important for User comprehension.
* This workflow is diagnostic and advisory; its outputs typically lead to other action-oriented workflows.