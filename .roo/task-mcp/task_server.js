#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError,
} = require('@modelcontextprotocol/sdk/types.js');
const fs = require('fs');
const path = require('path'); // Added for robust path joining

// The DATA_FILE path needs to be relative to the workspace root,
// as the server script might be run from there by the MCP system.
// Or, if the server is always run from within .roo/task-mcp/, then it could be relative from there.
// Given the build step, it's safer to assume it might be run from workspace root,
// or the MCP config should specify the CWD.
// For now, keeping it as originally intended by the user, assuming CWD is workspace root.
const DATA_FILE = "../mcp_data.json";

// Ensure .roo directory exists for mcp_data.json
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}


// User-provided functions (ensure DATA_FILE is accessible or adjust paths if needed)
// Original functions provided by the user start here
/**
 * Loads data from the JSON file.
 * @returns {object} The loaded data, or { tasks: {} } on error or if file doesn't exist.
 */
function loadData() {
    if (fs.existsSync(DATA_FILE)) {
        try {
            const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error("Error loading or parsing data:", error);
            return { tasks: {} }; // Ensure tasks object exists
        }
    }
    return { tasks: {} }; // Ensure tasks object exists
}

/**
 * Saves data to the JSON file.
 * @param {object} data - The data object to save.
 */
function saveData(data) {
    try {
        const jsonData = JSON.stringify(data, null, 4); // Pretty print JSON
        fs.writeFileSync(DATA_FILE, jsonData, 'utf8');
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

/**
 * Generates the next available ID for an object (dictionary).
 * @param {object} dataObject - The object to generate an ID for.
 * @returns {number} The next available ID.
 */
function nextId(dataObject) {
    if (!dataObject || Object.keys(dataObject).length === 0) {
        return 1;
    }
    const maxId = Object.keys(dataObject)
        .map(key => parseInt(key, 10))
        .filter(num => !isNaN(num))
        .reduce((max, current) => Math.max(max, current), 0);
    return maxId + 1;
}

/**
 * Adds a new task.
 * @param {object} tasks - The tasks object.
 * @param {string} name - The name of the new task.
 * @param {string|null} [parentId=null] - The ID of the parent task, if any.
 * @returns {[string|null, string]} A tuple containing the new task ID (or null on error) and a status message.
 */
function addTask(tasks, name, parentId = null) {
    const taskId = String(nextId(tasks));

    if (parentId && !tasks[String(parentId)]) {
        return [null, `Error: Parent task ID ${parentId} not found for task '${name}'.`];
    }

    tasks[taskId] = {
        id: taskId,
        name: name,
        parent_id: parentId ? String(parentId) : null,
        todos: {},
        notes: {},
        status: "new",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    return [taskId, `Task '${name}' (ID: ${taskId}) created.`];
}

/**
 * Adds multiple tasks.
 * @param {object} tasks - The tasks object.
 * @param {Array<object>} taskDefs - Array of task definitions.
 * @returns {Array<[string|null, string]>} An array of results.
 */
function addTasksBulk(tasks, taskDefs) {
    const results = [];
    for (const def of taskDefs) {
        results.push(addTask(tasks, def.name, def.parentId));
    }
    return results;
}

/**
 * Adds a todo item to a specific task.
 * @param {object} tasks - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {string} text - The text content of the todo.
 * @returns {string} A status message.
 */
function addTodo(tasks, taskId, text) {
    const strTaskId = String(taskId);
    if (!tasks[strTaskId]) {
        return `Error: Task ID ${strTaskId} not found for adding todo.`;
    }
    const task = tasks[strTaskId];
    if (!task.todos) task.todos = {};
    const todoId = String(nextId(task.todos));
    task.todos[todoId] = {
        id: todoId,
        text: text,
        done: false,
        created_at: new Date().toISOString()
    };
    task.updated_at = new Date().toISOString();
    return `Todo '${text}' (ID: ${todoId}) added to task ${strTaskId}.`;
}

/**
 * Adds multiple todos to a specific task.
 * @param {object} tasks - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {Array<string>} todoTexts - Array of todo text contents.
 * @returns {object} An object with success and error messages.
 */
function addTodosBulk(tasks, taskId, todoTexts) {
    const strTaskId = String(taskId);
    if (!tasks[strTaskId]) {
        return { successes: [], errors: [`Error: Task ID ${strTaskId} not found.`]};
    }
    const successes = [];
    const errors = [];
    let taskUpdated = false;
    for (const text of todoTexts) {
        const task = tasks[strTaskId];
        if (!task.todos) task.todos = {};
        const todoId = String(nextId(task.todos));
        task.todos[todoId] = {
            id: todoId,
            text: text,
            done: false,
            created_at: new Date().toISOString()
        };
        successes.push(`Todo '${text}' (ID: ${todoId}) added to task ${strTaskId}.`);
        taskUpdated = true;
    }
    if (taskUpdated) {
        tasks[strTaskId].updated_at = new Date().toISOString();
    }
    return { successes, errors };
}

/**
 * Toggles the 'done' status of a todo item.
 * @param {object} tasks - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {string} todoId - The ID of the todo.
 * @returns {string} A status message.
 */
function toggleTodo(tasks, taskId, todoId) {
    const strTaskId = String(taskId);
    const strTodoId = String(todoId);

    if (!tasks[strTaskId]) {
        return `Error: Task ID ${strTaskId} not found.`;
    }
    const task = tasks[strTaskId];
    if (!task.todos || !task.todos[strTodoId]) {
        return `Error: Todo ID ${strTodoId} not found in task ${strTaskId}.`;
    }
    task.todos[strTodoId].done = !task.todos[strTodoId].done;
    task.updated_at = new Date().toISOString();
    const status = task.todos[strTodoId].done ? "done" : "not done";
    return `Todo ${strTodoId} in task ${strTaskId} marked as ${status}.`;
}

/**
 * Toggles the 'done' status of multiple todo items.
 * @param {object} tasks - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {Array<string>} todoIds - Array of todo IDs.
 * @returns {object} An object with success and error messages.
 */
function toggleTodosBulk(tasks, taskId, todoIds) {
    const strTaskId = String(taskId);
    if (!tasks[strTaskId]) {
        return { successes: [], errors: [`Error: Task ID ${strTaskId} not found.`] };
    }
    const successes = [];
    const errors = [];
    let taskUpdated = false;
    for (const todoId of todoIds) {
        const strTodoId = String(todoId);
        const task = tasks[strTaskId];
        if (!task.todos || !task.todos[strTodoId]) {
            errors.push(`Error: Todo ID ${strTodoId} not found in task ${strTaskId}.`);
            continue;
        }
        task.todos[strTodoId].done = !task.todos[strTodoId].done;
        const status = task.todos[strTodoId].done ? "done" : "not done";
        successes.push(`Todo ${strTodoId} in task ${strTaskId} marked as ${status}.`);
        taskUpdated = true;
    }
    if (taskUpdated) {
        tasks[strTaskId].updated_at = new Date().toISOString();
    }
    return { successes, errors };
}

/**
 * Adds a note to a specific task.
 * @param {object} tasks - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {string} noteText - The text content of the note.
 * @param {string} [noteType="general"] - The type of the note.
 * @returns {string} A status message.
 */
function addNote(tasks, taskId, noteText, noteType = "general") {
    const strTaskId = String(taskId);
    if (!tasks[strTaskId]) {
        return `Error: Task ID ${strTaskId} not found.`;
    }
    const task = tasks[strTaskId];
    if (!task.notes) task.notes = {};
    const noteId = String(nextId(task.notes));
    task.notes[noteId] = {
        id: noteId,
        text: noteText,
        type: noteType,
        created_at: new Date().toISOString()
    };
    task.updated_at = new Date().toISOString();
    return `Note (ID: ${noteId}, Type: ${noteType}) added to task ${strTaskId}.`;
}

/**
 * Adds multiple notes to a specific task.
 * @param {object} tasks - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {Array<object>} noteDefs - Array of note definitions.
 * @returns {object} An object with success and error messages.
 */
function addNotesBulk(tasks, taskId, noteDefs) {
    const strTaskId = String(taskId);
    if (!tasks[strTaskId]) {
        return { successes: [], errors: [`Error: Task ID ${strTaskId} not found.`] };
    }
    const successes = [];
    const errors = [];
    let taskUpdated = false;

    for (const def of noteDefs) {
        const task = tasks[strTaskId];
        if (!task.notes) task.notes = {};
        const noteId = String(nextId(task.notes));
        task.notes[noteId] = {
            id: noteId,
            text: def.text,
            type: def.type || "general",
            created_at: new Date().toISOString()
        };
        successes.push(`Note (ID: ${noteId}, Type: ${def.type || "general"}) added to task ${strTaskId}.`);
        taskUpdated = true;
    }
    if (taskUpdated) {
        tasks[strTaskId].updated_at = new Date().toISOString();
    }
    return { successes, errors };
}

/**
 * Links a task to a parent task.
 * @param {object} tasks - The tasks object.
 * @param {string} taskId - The ID of the task to be linked.
 * @param {string} parentId - The ID of the parent task.
 * @returns {string} A status message.
 */
function linkTask(tasks, taskId, parentId) {
    const strTaskId = String(taskId);
    const strParentId = String(parentId);

    if (!tasks[strTaskId]) return `Error: Task ID ${strTaskId} not found.`;
    if (!tasks[strParentId]) return `Error: Parent task ID ${strParentId} not found.`;
    if (strTaskId === strParentId) return "Error: Cannot link a task to itself.";

    let current = tasks[strParentId];
    const visitedDuringCheck = new Set([strTaskId]);
    while (current) {
        if (visitedDuringCheck.has(current.id)) {
            return `Error: Circular dependency detected. Cannot link ${strTaskId} to ${strParentId}. Path includes ${current.id}.`;
        }
        visitedDuringCheck.add(current.id);
        if (current.parent_id === strTaskId) {
             return `Error: Circular dependency detected. ${strParentId} is an ancestor of ${strTaskId}.`;
        }
        if (!current.parent_id) break;
        if (!tasks[current.parent_id]) {
            return `Error: Broken parent chain. Ancestor ${current.parent_id} of ${strParentId} not found.`;
        }
        current = tasks[current.parent_id];
    }

    tasks[strTaskId].parent_id = strParentId;
    tasks[strTaskId].updated_at = new Date().toISOString();
    tasks[strParentId].updated_at = new Date().toISOString();
    return `Task ${strTaskId} linked to parent task ${strParentId}.`;
}

/**
 * Links multiple tasks to their respective parents.
 * @param {object} tasks - The tasks object.
 * @param {Array<object>} links - Array of link definitions.
 * @returns {Array<string>} An array of status messages.
 */
function linkTasksBulk(tasks, links) {
    const results = [];
    for (const link of links) {
        results.push(linkTask(tasks, link.taskId, link.parentId));
    }
    return results;
}

/**
 * Formats a single task for display.
 * @param {object} task - The task object.
 * @param {object} allTasks - The entire tasks object.
 * @returns {string} A formatted string representation.
 */
function formatTask(task, allTasks) {
    if (!task) return "Error: Task not found for formatting.";
    const output = [];
    output.push(`- ID: ${task.id}, Name: ${task.name}, Status: ${task.status} (Created: ${task.created_at.substring(0, 10)}, Updated: ${task.updated_at.substring(0,10)})`);
    if (task.parent_id) {
        const parentTask = allTasks[task.parent_id];
        output.push(`  Parent: ${parentTask ? `ID: ${parentTask.id} - "${parentTask.name}"` : `ID: ${task.parent_id} (Not found)`}`);
    } else {
        output.push("  Parent: None");
    }
    const children = Object.values(allTasks).filter(t => t.parent_id === task.id);
    if (children.length > 0) {
        output.push("  Children:");
        children.forEach(child => output.push(`    - ID: ${child.id} - "${child.name}" (Status: ${child.status})`));
    } else {
        output.push("  Children: None");
    }
    let openTodos = 0, doneTodos = 0;
    if (task.todos) Object.values(task.todos).forEach(todo => todo.done ? doneTodos++ : openTodos++);
    output.push(`  Todo Summary: Open: ${openTodos}, Done: ${doneTodos} (Total: ${openTodos + doneTodos})`);
    const numNotes = task.notes ? Object.keys(task.notes).length : 0;
    output.push(`  Notes Count: ${numNotes}`);
    return output.join("\n");
}

/**
 * Lists all tasks or a specific task.
 * @param {object} tasks - The tasks object.
 * @param {string|null} [taskId=null] - Specific task ID or null for all.
 * @returns {string} List of tasks or task details.
 */
function listTasks(tasks, taskId = null) {
    if (!tasks || Object.keys(tasks).length === 0) return "No tasks found.";
    const output = [];
    if (taskId) {
        const task = tasks[String(taskId)];
        if (task) {
            output.push(formatTask(task, tasks));
            if (task.todos && Object.keys(task.todos).length > 0) {
                output.push("  Detailed Todos:");
                Object.values(task.todos).sort((a,b) => new Date(a.created_at) - new Date(b.created_at)).forEach(todo => {
                    output.push(`    - [${todo.done ? "✓" : "✗"}] (ID: ${todo.id}) ${todo.text} (Added: ${todo.created_at.substring(0,10)})`);
                });
            } else output.push("  Detailed Todos: None");
            if (task.notes && Object.keys(task.notes).length > 0) {
                output.push("  Detailed Notes:");
                Object.values(task.notes).sort((a,b) => new Date(a.created_at) - new Date(b.created_at)).forEach(note => {
                    output.push(`    - (ID: ${note.id}) [${note.type}] ${note.text} (Added: ${note.created_at.substring(0,10)})`);
                });
            } else output.push("  Detailed Notes: None");
        } else return `Error: Task ID ${taskId} not found.`;
    } else {
        output.push("Tasks (Summary):");
        Object.values(tasks).sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).forEach(taskData => {
            output.push(formatTask(taskData, tasks));
            output.push("---");
        });
    }
    return output.join("\n");
}

/**
 * Fetches and formats notes for a specific task.
 * @param {object} tasks - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @returns {string} Formatted notes or status message.
 */
function getNotes(tasks, taskId) {
    const strTaskId = String(taskId);
    if (!tasks[strTaskId]) return `Error: Task ID ${strTaskId} not found.`;
    const task = tasks[strTaskId];
    if (!task.notes || Object.keys(task.notes).length === 0) return `No notes for task ${strTaskId} ("${task.name}").`;
    const output = [`Notes for Task ${strTaskId} ("${task.name}"):`];
    Object.values(task.notes).sort((a,b) => new Date(a.created_at) - new Date(b.created_at)).forEach(note => {
         output.push(`  - (ID: ${note.id}) [${note.type}] ${note.text} (Added: ${note.created_at.substring(0,10)})`);
    });
    return output.join("\n");
}

/**
 * Sets the status of a task.
 * @param {object} tasks - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {string} status - The new status.
 * @returns {string} A status message.
 */
function setStatus(tasks, taskId, status) {
    const strTaskId = String(taskId);
    const validStatuses = ["new", "blocked", "in progress", "finished"];
    if (!validStatuses.includes(status)) {
        return `Error: Invalid status '${status}'. Valid: ${validStatuses.join(", ")}.`;
    }
    if (!tasks[strTaskId]) return `Error: Task ID ${strTaskId} not found.`;
    tasks[strTaskId].status = status;
    tasks[strTaskId].updated_at = new Date().toISOString();
    return `Status of task ${strTaskId} set to '${status}'.`;
}
// End of user-provided functions


class TaskManagerServer {
    constructor() {
        this.server = new Server(
            { name: 'project-task-manager', version: '0.1.0' },
            { capabilities: { tools: {}, resources: {} } } // No resources for now
        );
        this.setupToolHandlers();
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    setupToolHandlers() {
        const toolDefinitions = [
            {
                name: 'addTask',
                description: 'Adds a new task.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', description: 'Name of the task.' },
                        parentId: { type: ['string', 'null'], description: 'ID of the parent task, if any.' }
                    },
                    required: ['name']
                },
                handler: (args) => {
                    let data = loadData();
                    const [taskId, message] = addTask(data.tasks, args.name, args.parentId);
                    if (taskId) saveData(data);
                    return { taskId, message };
                }
            },
            {
                name: 'addTasksBulk',
                description: 'Adds multiple tasks in bulk.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskDefs: {
                            type: 'array',
                            description: 'Array of task definitions [{name, parentId}].',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    parentId: { type: ['string', 'null'] }
                                },
                                required: ['name']
                            }
                        }
                    },
                    required: ['taskDefs']
                },
                handler: (args) => {
                    let data = loadData();
                    const results = addTasksBulk(data.tasks, args.taskDefs);
                    if (results.some(r => r[0] !== null)) saveData(data);
                    return results;
                }
            },
            {
                name: 'listTasks',
                description: 'Lists all tasks or a specific task with details.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskId: { type: ['string', 'null'], description: 'ID of a specific task to list, or null/omit to list all.' }
                    }
                },
                handler: (args) => {
                    let data = loadData(); // No save needed for list
                    return listTasks(data.tasks, args.taskId);
                }
            },
            {
                name: 'addTodo',
                description: 'Adds a todo item to a specific task.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        text: { type: 'string', description: 'Text content of the todo.' }
                    },
                    required: ['taskId', 'text']
                },
                handler: (args) => {
                    let data = loadData();
                    const message = addTodo(data.tasks, args.taskId, args.text);
                    if (!message.startsWith("Error:")) saveData(data);
                    return message;
                }
            },
            {
                name: 'addTodosBulk',
                description: 'Adds multiple todos to a specific task.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        todoTexts: { type: 'array', items: { type: 'string' }, description: 'Array of todo texts.'}
                    },
                    required: ['taskId', 'todoTexts']
                },
                handler: (args) => {
                    let data = loadData();
                    const result = addTodosBulk(data.tasks, args.taskId, args.todoTexts);
                    if (result.successes && result.successes.length > 0) saveData(data);
                    return result;
                }
            },
            {
                name: 'toggleTodo',
                description: 'Toggles the done status of a todo item.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        todoId: { type: 'string', description: 'ID of the todo item.' }
                    },
                    required: ['taskId', 'todoId']
                },
                handler: (args) => {
                    let data = loadData();
                    const message = toggleTodo(data.tasks, args.taskId, args.todoId);
                    if (!message.startsWith("Error:")) saveData(data);
                    return message;
                }
            },
            {
                name: 'toggleTodosBulk',
                description: 'Toggles the done status of multiple todos for a task.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        todoIds: { type: 'array', items: { type: 'string' }, description: 'Array of todo IDs.'}
                    },
                    required: ['taskId', 'todoIds']
                },
                handler: (args) => {
                    let data = loadData();
                    const result = toggleTodosBulk(data.tasks, args.taskId, args.todoIds);
                    if (result.successes && result.successes.length > 0) saveData(data);
                    return result;
                }
            },
            {
                name: 'addNote',
                description: 'Adds a note to a specific task.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        noteText: { type: 'string', description: 'Text content of the note.' },
                        noteType: { type: 'string', description: 'Type of the note (e.g., general, reminder). Defaults to general.', default: 'general' }
                    },
                    required: ['taskId', 'noteText']
                },
                handler: (args) => {
                    let data = loadData();
                    const message = addNote(data.tasks, args.taskId, args.noteText, args.noteType);
                    if (!message.startsWith("Error:")) saveData(data);
                    return message;
                }
            },
            {
                name: 'addNotesBulk',
                description: 'Adds multiple notes to a specific task.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        noteDefs: {
                            type: 'array',
                            description: 'Array of note definitions [{text, type (\'general\' default)}].',
                            items: {
                                type: 'object',
                                properties: {
                                    text: { type: 'string' },
                                    type: { type: 'string', default: 'general' }
                                },
                                required: ['text']
                            }
                        }
                    },
                    required: ['taskId', 'noteDefs']
                },
                handler: (args) => {
                    let data = loadData();
                    const result = addNotesBulk(data.tasks, args.taskId, args.noteDefs);
                     if (result.successes && result.successes.length > 0) saveData(data);
                    return result;
                }
            },
            {
                name: 'getNotes',
                description: 'Fetches and formats notes for a specific task.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task to get notes for.' }
                    },
                    required: ['taskId']
                },
                handler: (args) => {
                    let data = loadData(); // No save needed
                    return getNotes(data.tasks, args.taskId);
                }
            },
            {
                name: 'setStatus',
                description: 'Sets the status of a task.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        status: { type: 'string', description: 'New status (new, blocked, in progress, finished).', enum: ["new", "blocked", "in progress", "finished"]}
                    },
                    required: ['taskId', 'status']
                },
                handler: (args) => {
                    let data = loadData();
                    const message = setStatus(data.tasks, args.taskId, args.status);
                    if (!message.startsWith("Error:")) saveData(data);
                    return message;
                }
            },
            {
                name: 'linkTask',
                description: 'Links a task to a parent task.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the child task.' },
                        parentId: { type: 'string', description: 'ID of the parent task.' }
                    },
                    required: ['taskId', 'parentId']
                },
                handler: (args) => {
                    let data = loadData();
                    const message = linkTask(data.tasks, args.taskId, args.parentId);
                    if (!message.startsWith("Error:")) saveData(data);
                    return message;
                }
            },
            {
                name: 'linkTasksBulk',
                description: 'Links multiple tasks to their respective parents.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        links: {
                            type: 'array',
                            description: 'Array of link definitions [{taskId, parentId}].',
                            items: {
                                type: 'object',
                                properties: {
                                    taskId: { type: 'string' },
                                    parentId: { type: 'string' }
                                },
                                required: ['taskId', 'parentId']
                            }
                        }
                    },
                    required: ['links']
                },
                handler: (args) => {
                    let data = loadData();
                    const results = linkTasksBulk(data.tasks, args.links);
                    if (results.some(r => !r.startsWith("Error:"))) saveData(data);
                    return results;
                }
            }
        ];

        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: toolDefinitions.map(tool => ({
                name: tool.name,
                description: tool.description,
                inputSchema: tool.inputSchema
            }))
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const tool = toolDefinitions.find(t => t.name === request.params.name);
            if (!tool) {
                throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
            }
            try {
                // Basic validation, MCP SDK might do more with schema
                if (tool.inputSchema.required) {
                    for (const requiredParam of tool.inputSchema.required) {
                        if (request.params.arguments[requiredParam] === undefined) {
                            throw new McpError(ErrorCode.InvalidParams, `Missing required parameter: ${requiredParam}`);
                        }
                    }
                }

                const result = tool.handler(request.params.arguments);
                return {
                    content: [{ type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) }]
                };
            } catch (error) {
                if (error instanceof McpError) throw error;
                console.error(`Error calling tool ${tool.name}:`, error);
                throw new McpError(ErrorCode.InternalError, `Error executing tool ${tool.name}: ${error.message}`);
            }
        });
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Project Task Manager MCP server running on stdio, writing data to:', DATA_FILE);
    }
}

const server = new TaskManagerServer();
server.run().catch(error => {
    console.error("Failed to start TaskManagerServer:", error);
    process.exit(1);
});
