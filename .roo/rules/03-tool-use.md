# Standard: Tool Use XML Syntax

**Objective:** To ensure all tools are invoked using a consistent and parsable XML format.

**Applies To:** All modes when intending to execute a tool.

**Rule:**

1.  **Mandatory XML Structure:** All tool uses **MUST** be formatted using XML-style tags.
    *   The tool name itself **MUST** be enclosed in opening and closing tags (e.g., `<read_file>...</read_file>`).
    *   Each parameter required by the tool **MUST** be enclosed within its own set of tags, nested inside the tool name tags (e.g., `<path>...</path>`).
    *   Parameter tags **MUST** match the exact parameter names defined in the tool's schema.

2.  **Single Tool Per Message:** Only one top-level tool invocation (e.g., one `<read_file>...</read_file>` block) is allowed per assistant message.

3.  **Example of Correct Syntax:**

    The following demonstrates the correct structure for calling the `read_file` tool:

    ```xml
    <read_file>
        <path>src/components/MyComponent.js</path>
        <start_line>10</start_line>
        <end_line>25</end_line>
    </read_file>
    ```

    Another example, for `ask_followup_question`:

    ```xml
    <ask_followup_question>
        <question>What is the target filename for the new component?</question>
        <follow_up>
            <suggest>src/components/NewFeature.jsx</suggest>
            <suggest>app/modules/NewWidget.ts</suggest>
        </follow_up>
    </ask_followup_question>
    ```

4.  **No Placeholder Tags:** **NEVER** use placeholder tags like `<tool_name>` or `<parameter_name>` in an actual tool invocation. Always use the specific, correct tool and parameter names.

**Rationale:** Strict adherence to this syntax is essential for the system to correctly parse and execute tool requests. Incorrect formatting will lead to errors.