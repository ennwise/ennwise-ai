# Standard Iterative Execution Policy

**Objective:** To ensure reliable task completion by promoting manageable work increments, especially for generative or implementation tasks.

**Applies To:** All modes performing tasks that involve significant code generation, file modification, analysis, or following multi-step procedures (e.g., developers, writers, refactorers, testers, sometimes architects/managers). Less critical for simple lookups or coordination.

**Core Principles:**

1.  **Prefer Smaller Steps:** Whenever feasible, break down complex requests into smaller, logical sub-tasks during the planning phase. For tasks managed by the `project-task-manager` t this means creating granular checklist todo items.
2.  **Proactive Checkpointing:** Do not attempt to complete overly large tasks in a single execution turn, even if instructed broadly.

**Procedure:**

1.  **Task Planning:** When starting a task (especially one involving multiple steps or significant generation):
    *   Review the overall goal and acceptance criteria.
    *   If using `project-task-manager`, review the todo items.
    *   Mentally estimate the complexity. If a task or a single `project-task-manager` todo item *appears* likely to require extensive code/output generation or numerous tool calls:
        *   **Plan for Iteration:** Anticipate that completing the todo/item might require more than one execution cycle and could be broken down and creating a task linking to the original.
        *   **(Optional but Recommended):** Inform the delegator (via `ask_followup_question` *before starting*) if you anticipate needing multiple steps/checkpoints for a single requested item.

2.  **Execution & Monitoring:** While executing the task (writing code, applying diffs, following checklist items):
    *   **Trigger Checkpoint:** After completing a logical unit of work (e.g., an todo checklist item, a function, a file modification), prepare to pause and report.
        *   A "logical unit" could be:
            *   Completing the current task / todo checklist item.
            *   Finishing a complete function, class, or coherent block of code.
            *   Completing a specific file modification.
            *   Finishing a distinct step in an analysis process.

3.  **Checkpoint & Handover:** When completing a step marked for reporting (making a note) or a logical unit of work as defined above:
    *   **Finalize Current Unit:** Ensure the immediate work unit is complete and syntactically correct (e.g., finish the function, close code blocks).
    *   **Summarize Progress:** Briefly state what was completed in the current turn.
    *   **Identify Next Step:** Clearly state the *next logical step* required to continue the overall task (e.g., "Next step is to implement the `handleUpdate` function", "Next step is to process task #1 and todo #1").
    *   **Report Status:** Use `attempt_completion` to report back to the delegator. Include:
        *   Confirmation of completed unit/step.
        *   The identified *next step*.
        *   Any partial results or paths to modified/created files.
        *   *(Example Result):* "✅ Completed implementation of `getUserData` function (Task 1 item #2). Next step is to implement the `UserProfile` component using this data. Modified: `src/hooks/useUserData.ts`."

4.  **Receiving Mode Action (Management/Lead):**
    *   Acknowledge the partial completion and the stated next step.
    *   Log the progress.
    *   Re-delegate the *next step* back to the specialist mode, providing the necessary context (including the original goal and referencing the previous work/files).

**Rationale:**

*   **Error Reduction:** Smaller execution units reduce the chance of complex errors accumulating within a single turn.
*   **State Management:** Encourages breaking work into steps that align well with MDTM tracking, improving visibility.
*   **User Experience:** While it involves more turns, it leads to more reliable progress compared to large failures requiring complete restarts.
