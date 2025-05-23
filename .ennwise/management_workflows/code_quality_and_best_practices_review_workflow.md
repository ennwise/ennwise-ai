# Code Quality and Best Practices Review Workflow Template

## 1. Workflow Identification

* **Workflow Name:** Code Quality and Best Practices Review Workflow
* **File Name:** `code_quality_and_best_practices_review_workflow.md`
* **Version:** 1.0
* **Date Created:** 2025-05-21
* **Last Updated:** 2025-05-21
* **Author/Maintainer:** User via AI Assistant

## 2. Description

Defines a structured process for conducting a detailed review of a specific codebase segment (e.g., module, service, feature) to assess its quality, adherence to coding standards and best practices, identify potential issues, and provide actionable suggestions for improvement.

## 3. Purpose & Goal

To provide an objective assessment of the targeted code's maintainability, readability, efficiency, and robustness, and to offer concrete recommendations for enhancing its quality and alignment with established best practices. This is not typically for reviewing code related to an active, in-progress feature or bug-fix (which have their own review steps) but rather for a standalone assessment.

## 4. Initiation & Trigger

* User request to `management-mode` to review a specific part of an existing codebase.
* Proactive suggestion by `development-director-mode` or `lead-developer-mode` to review a legacy module or a component known to have potential quality issues.
* Scheduled periodic code health checks for critical modules.

## 5. Key AI Roles Typically Involved

* `management-mode` (Initiator, recipient of final report)
* `development-director-mode` (Oversees the review process, assigns resources)
* `lead-developer-mode` (Manages the review execution, may perform a meta-review)
* Senior `coder-mode` (or a specialized `code-reviewer-mode` if defined) (Primary executor of the detailed code review)
* `technical-writer-mode` (Optional, for formatting the final report)

## 6. Workflow Phases

---

### Phase 1: Review Initiation, Scoping & Objective Setting

* **Objective(s):**
    * To clearly define the scope of the code to be reviewed.
    * To establish specific objectives and criteria for the review (e.g., focus on maintainability, security vulnerabilities, performance bottlenecks, adherence to specific style guides).
    * To assign resources for the review.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode` (initial task creation), then `development-director-mode`.
* **Key Activities & Process Steps:**
    1.  User requests code review via `management-mode`, specifying the target codebase (e.g., Git repository URL, specific modules/directories, version/branch) and high-level goals for the review.
    2.  `management-mode` creates a high-level task for "Code Quality Review" and assigns it to `development-director-mode`. Task notes include User request details and scope.
    3.  `development-director-mode` reviews the request. They may add `todos` to this task such as "Define specific review checklist items" or "Identify suitable senior coder for review". All planning documented via `addNote`.
    4.  `development-director-mode` refines the scope (e.g., specific files, classes, functions if not already detailed) and sets clear objectives/criteria for the review (e.g., "Check for OWASP Top 10 vulnerabilities," "Assess adherence to Python PEP 8," "Identify areas for refactoring to improve readability"). This is documented in the main review task.
    5.  `development-director-mode` assigns the main review task or a primary sub-task to a `lead-developer-mode`.
* **Key Deliverables/Outputs for Phase:**
    * Clearly defined scope for the code review.
    * Documented objectives and review criteria.
    * Assigned `lead-developer-mode`.
* **Next Phase Trigger / Completion Criteria:** Scope, objectives, and responsible lead are confirmed.

---

### Phase 2: Preparation & Context Gathering by Reviewer

* **Objective(s):** For the assigned reviewer to understand the context of the code, its purpose, and any existing documentation or known issues.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `lead-developer-mode`.
* **Key Activities & Process Steps:**
    1.  `lead-developer-mode` breaks down the review task and assigns a sub-task "Perform Code Analysis & Review for [Scoped Code]" to a senior `coder-mode` (acting as the Reviewer). This sub-task includes the scope and review criteria.
    2.  The Reviewer (`coder-mode`) accesses the specified codebase.
    3.  The Reviewer gathers context by:
        * Reviewing existing documentation (e.g., READMEs, design documents linked in related tasks).
        * Examining relevant task history in `project-task-manager` if available and pertinent.
        * Understanding the module's purpose and its interactions with other parts of the system.
    4.  The Reviewer adds `todos` to their own task to structure their review process, e.g., "Analyze [specific_file.py] for complexity," "Check all SQL queries for injection vulnerabilities." All such `todos` and their rationale are documented via `addNote`.
* **Key Deliverables/Outputs for Phase:**
    * Reviewer has access to code and necessary context.
    * Reviewer has a plan (potentially as `todos` in their task) for conducting the review.
* **Next Phase Trigger / Completion Criteria:** Reviewer is prepared to begin active code analysis.

---

### Phase 3: Detailed Code Analysis & Review Execution

* **Objective(s):** To conduct a thorough examination of the code based on the defined criteria, identifying strengths, weaknesses, deviations from best practices, potential bugs, and areas for improvement.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `lead-developer-mode`.
* **Key Activities & Process Steps:**
    1.  The Reviewer (`coder-mode`) systematically analyzes the code. This may involve:
        * Manual line-by-line inspection.
        * Use of static analysis tools (if available and configured for the AI mode).
        * Checking for common anti-patterns, security flaws, performance issues.
        * Assessing code readability, maintainability, testability, and documentation quality.
        * Verifying adherence to specified coding standards and best practices.
    2.  For **every finding** (positive observation, minor issue, major concern, suggestion), the Reviewer creates a detailed `addNote` entry in their review task. Notes should include:
        * Specific file paths and line numbers.
        * Clear description of the finding.
        * Examples of code (if illustrating a point, these might be presented within the note, e.g., \`\`\`python [code snippet] \`\`\`).
        * Severity/impact assessment (if applicable).
        * Specific suggestions for improvement where appropriate.
    3.  The Reviewer marks their self-added `todos` (from Phase 2) as done upon completing each part of their analysis, with notes summarizing findings for that `todo`.
* **Key Deliverables/Outputs for Phase:**
    * Comprehensive set of detailed notes documenting all review findings.
* **Next Phase Trigger / Completion Criteria:** Reviewer has completed the analysis of the entire scoped codebase.

---

### Phase 4: Findings Consolidation & Report Drafting

* **Objective(s):** To synthesize all individual findings into a structured and actionable Code Review Report.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `lead-developer-mode`, executed by Reviewer (`coder-mode`).
* **Key Activities & Process Steps:**
    1.  The Reviewer (`coder-mode`) organizes all findings from their notes.
    2.  A draft Code Review Report is created. This is typically a detailed `addNote` in their task, or if a separate document is standard, a `technical-writer-mode` could be tasked by `lead-developer-mode` to format this based on the Reviewer's notes. The report should include:
        * Executive Summary.
        * Overview of a_reviewed code and review objectives.
        * Key Strengths.
        * Detailed Findings & Issues (categorized by severity/type, with code examples and locations).
        * Actionable Recommendations & Suggestions (prioritized if possible).
        * Overall Assessment.
    3.  The Reviewer (`coder-mode`) marks their review task as "inreview" or "completed" (ready for lead's review).
* **Key Deliverables/Outputs for Phase:**
    * Draft Code Review Report (as a comprehensive note or structured document).
* **Next Phase Trigger / Completion Criteria:** Draft report is compiled and ready for review by `lead-developer-mode`.

---

### Phase 5: Lead Review & Report Finalization

* **Objective(s):** For the `lead-developer-mode` to review the draft report, discuss findings with the Reviewer, and finalize the report.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `development-director-mode`.
* **Key Activities & Process Steps:**
    1.  `lead-developer-mode` thoroughly reviews the draft Code Review Report and the Reviewer's notes.
    2.  `lead-developer-mode` may discuss specific findings with the Reviewer (`coder-mode`) for clarification or to debate recommendations (simulated via `addNote` exchanges on the task).
    3.  The report is refined and finalized by `lead-developer-mode` (or by the Reviewer based on lead's feedback).
    4.  `lead-developer-mode` adds a summary note to their managing task (assigned by `development-director-mode`) indicating the review is complete and attaches/links the final report.
* **Key Deliverables/Outputs for Phase:**
    * Finalized Code Review Report.
* **Next Phase Trigger / Completion Criteria:** Code Review Report is finalized and approved by `lead-developer-mode`.

---

### Phase 6: Report Delivery & Action Planning (Optional)

* **Objective(s):** To deliver the report to stakeholders and decide on any follow-up actions.
* **Primary AI Mode(s) Responsible for Phase Oversight:** `management-mode`.
* **Key Activities & Process Steps:**
    1.  `development-director-mode` submits the Finalized Code Review Report to `management-mode`.
    2.  `management-mode` reviews the report and shares it with the User and other relevant stakeholders.
    3.  Based on the report's findings and recommendations, `management-mode` (in consultation with the User and `development-director-mode`) decides on next steps. This might include:
        * No action needed.
        * Creating tasks for minor fixes.
        * Initiating a `technical_improvement_workflow.md` for significant refactoring.
        * Initiating a `bug_fix_workflow.md` if critical issues were found.
    4.  Decisions and planned actions are documented.
* **Key Deliverables/Outputs for Phase:**
    * Code Review Report delivered to User/stakeholders.
    * Documented decisions on follow-up actions (if any).
* **Next Phase Trigger / Completion Criteria:** Report delivered; follow-up actions (if any) are planned and initiated.

## 7. Workflow Completion

* **Final Outcome/Goal Achieved:** A comprehensive code review has been conducted, results and suggestions are documented and delivered, and any immediate follow-up actions are decided.
* **Final Reporting/Handoff:** `management-mode` archives the report and confirms completion with the User.

## 8. Notes & Considerations

* The depth and focus of the review can be adjusted in Phase 1.
* This workflow can be resource-intensive; prioritize reviews for critical or problematic areas of the codebase.
* Findings should be constructive and aim for improvement.