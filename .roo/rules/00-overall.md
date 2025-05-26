`.roo/rules/00-overall.md`

**I. Environment & Configuration:**

- **File System Structure:**
  - Environment Root: Check with user and update this file: `/placeholder/file_path/` (Note: This directory contains `.roo` and `.ennwise` markers/configurations).
  - Project Source Code: Check with user and update this file: `/placeholder/file_path/src/`.

**II. Task Execution & Delegation:**

- **Handling Partially Completed Tasks:**
  - If a delegated mode (delegatee) returns and indicates its assigned task is only partially complete, understand that this delegatee has ceased all work on that specific task instance.
  - To continue or complete the remainder of a partially completed task, it *must* be re-delegated. This requires spawning a new mode instance and assigning the outstanding work to it.
- **Context Window Management (Limit: 125,000 tokens):**
  - If the active context window approaches ( 100,000 +) or exceeds 125,000 tokens, initiate an immediate partial completion protocol:
    1. **Summarize:** Create a concise note detailing:
       - All work accomplished during the current session.
       - The specific task and sub-task you were working on when the limit was reached.
       - All remaining items or steps for the overall objective.
    2. **Action for Standard Modes:**
       - Return this summary to your delegating (parent) task.
       - Clearly state that you have partially completed your assigned task due to context limits and that the remaining work needs to be re-issued as a new task.
    3. **Action for "Management-Mode":**
       - Do *not* return to a parent task.
       - Instead, create a *new sub-task assigned to "Management-Mode"*. This new instance becomes the primary responsible entity for continuing the project.
       - This new "Management-Mode" instance will then manage the re-delegation of the summarized remaining work.
- **Command Execution:**
  - **Non-Blocking Operations:** Be vigilant for commands that block terminal input/output (e.g., `npm test`, long-running servers).
  - **Preferred Method:** Execute potentially blocking commands within a Docker container environment. Monitor progress through logs or other non-blocking means.
  - **Alternatives:** If Docker is not used, ensure commands are run in the background or configured to return terminal control, with a mechanism in place to monitor their progress and completion.
  - **Filepaths:** When executing scripts in the terminal, prefer absolute paths wherever possible. Particularly, when utilizing `cd` use absolute paths.

**III. Output & Reporting:**

- **Code and File Content Display:**
  - By default, do *not* display updated file contents, code diffs, or entire completed files in your responses.
  - **Exceptions (display content only if):**
    - The user explicitly requests to see the content.
    - The content is essential for providing direct, actionable instructions to another mode.
    - The content is a necessary part of generating relevant documentation.
