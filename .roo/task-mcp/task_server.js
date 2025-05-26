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
const path = require('path');

// New directory for storing individual task JSON files
const TASKS_DIR = "../project_tasks_data"; // Changed from DATA_FILE

// Ensure TASKS_DIR exists
if (!fs.existsSync(TASKS_DIR)) {
    fs.mkdirSync(TASKS_DIR, { recursive: true });
    console.log(`Created tasks directory at: ${path.resolve(TASKS_DIR)}`);
} else {
    console.log(`Tasks directory already exists at: ${path.resolve(TASKS_DIR)}`);
}

/**
 * Loads a single task from its JSON file.
 * @param {string} taskId - The ID of the task to load.
 * @returns {object|null} The loaded task data, or null on error or if file doesn't exist.
 */
function loadTask(taskId) {
    const taskFile = path.join(TASKS_DIR, `task-${taskId}.json`);
    if (fs.existsSync(taskFile)) {
        try {
            const fileContent = fs.readFileSync(taskFile, 'utf8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error(`Error loading or parsing task ${taskId}:`, error);
            return null;
        }
    }
    return null;
}

/**
 * Saves a single task object to its JSON file.
 * @param {object} taskData - The task object to save. Must have an 'id' property.
 */
function saveTask(taskData) {
    if (!taskData || !taskData.id) {
        console.error("Error saving task: Task data or ID is missing.", taskData);
        return;
    }
    const taskFile = path.join(TASKS_DIR, `task-${taskData.id}.json`);
    try {
        const jsonData = JSON.stringify(taskData, null, 4); // Pretty print JSON
        fs.writeFileSync(taskFile, jsonData, 'utf8');
    } catch (error) {
        console.error(`Error saving task ${taskData.id}:`, error);
    }
}


/**
 * Loads all tasks from their individual JSON files in the TASKS_DIR.
 * @returns {{ tasks: object }} An object containing all tasks, keyed by ID.
 */
function loadAllTasks() {
    const tasks = {};
    if (!fs.existsSync(TASKS_DIR)) {
        console.warn(`Tasks directory ${path.resolve(TASKS_DIR)} not found. Returning empty tasks.`);
        return { tasks: {} };
    }

    try {
        const files = fs.readdirSync(TASKS_DIR);
        for (const file of files) {
            if (file.startsWith('task-') && file.endsWith('.json')) {
                const taskIdMatch = file.match(/^task-(.+)\.json$/);
                if (taskIdMatch && taskIdMatch[1]) {
                    const taskId = taskIdMatch[1];
                    const taskData = loadTask(taskId);
                    if (taskData) {
                        tasks[taskId] = taskData;
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Error reading tasks directory ${path.resolve(TASKS_DIR)}:`, error);
        return { tasks: {} }; // Return empty on error
    }
    return { tasks };
}


/**
 * Generates the next available ID for an object (dictionary).
 * @param {object} dataObject - The object to generate an ID for (e.g., allTasks.tasks, task.todos).
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
 * Adds a new task. Now also saves the new task to its own file.
 * @param {object} allTasksObject - The object containing all tasks (e.g., from loadAllTasks().tasks).
 * @param {string} name - The name of the new task.
 * @param {string|null} [parentId=null] - The ID of the parent task, if any.
 * @returns {[string|null, string]} A tuple containing the new task ID (or null on error) and a status message.
 */
function addTask(allTasksObject, name, parentId = null) {
    const taskId = String(nextId(allTasksObject));

    if (parentId && !allTasksObject[String(parentId)]) {
        return [null, `Error: Parent task ID ${parentId} not found for task '${name}'.`];
    }

    const newTask = {
        id: taskId,
        name: name,
        parent_id: parentId ? String(parentId) : null,
        todos: {},
        notes: {},
        status: "new",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    allTasksObject[taskId] = newTask; // Add to in-memory collection
    saveTask(newTask); // Save the new task to its file
    return [taskId, `Task '${name}' (ID: ${taskId}) created.`];
}

/**
 * Adds multiple tasks. Each task is saved individually.
 * @param {object} allTasksObject - The tasks object.
 * @param {Array<object>} taskDefs - Array of task definitions.
 * @returns {Array<[string|null, string]>} An array of results.
 */
function addTasksBulk(allTasksObject, taskDefs) {
    const results = [];
    for (const def of taskDefs) {
        results.push(addTask(allTasksObject, def.name, def.parentId));
    }
    return results;
}

/**
 * Adds a todo item to a specific task. Saves the modified task.
 * @param {object} allTasksObject - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {string} text - The text content of the todo.
 * @returns {string} A status message.
 */
function addTodo(allTasksObject, taskId, text) {
    const strTaskId = String(taskId);
    if (!allTasksObject[strTaskId]) {
        return `Error: Task ID ${strTaskId} not found for adding todo.`;
    }
    const task = allTasksObject[strTaskId];
    if (!task.todos) task.todos = {};
    const todoId = String(nextId(task.todos));
    task.todos[todoId] = {
        id: todoId,
        text: text,
        done: false,
        created_at: new Date().toISOString()
    };
    task.updated_at = new Date().toISOString();
    saveTask(task); 
    return `Todo '${text}' (ID: ${todoId}) added to task ${strTaskId}.`;
}

/**
 * Adds multiple todos to a specific task. Saves the modified task once.
 * @param {object} allTasksObject - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {Array<string>} todoTexts - Array of todo text contents.
 * @returns {object} An object with success and error messages.
 */
function addTodosBulk(allTasksObject, taskId, todoTexts) {
    const strTaskId = String(taskId);
    if (!allTasksObject[strTaskId]) {
        return { successes: [], errors: [`Error: Task ID ${strTaskId} not found.`] };
    }
    const task = allTasksObject[strTaskId];
    const successes = [];
    const errors = []; 
    let taskUpdated = false;

    if (!task.todos) task.todos = {};
    for (const text of todoTexts) {
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
        task.updated_at = new Date().toISOString();
        saveTask(task); 
    }
    return { successes, errors };
}

/**
 * Toggles the 'done' status of a todo item. Saves the modified task.
 * @param {object} allTasksObject - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {string} todoId - The ID of the todo.
 * @returns {string} A status message.
 */
function toggleTodo(allTasksObject, taskId, todoId) {
    const strTaskId = String(taskId);
    const strTodoId = String(todoId);

    if (!allTasksObject[strTaskId]) {
        return `Error: Task ID ${strTaskId} not found.`;
    }
    const task = allTasksObject[strTaskId];
    if (!task.todos || !task.todos[strTodoId]) {
        return `Error: Todo ID ${strTodoId} not found in task ${strTaskId}.`;
    }
    task.todos[strTodoId].done = !task.todos[strTodoId].done;
    task.updated_at = new Date().toISOString();
    saveTask(task); 
    const status = task.todos[strTodoId].done ? "done" : "not done";
    return `Todo ${strTodoId} in task ${strTaskId} marked as ${status}.`;
}

/**
 * Toggles the 'done' status of multiple todo items. Saves the modified task once.
 * @param {object} allTasksObject - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {Array<string>} todoIds - Array of todo IDs.
 * @returns {object} An object with success and error messages.
 */
function toggleTodosBulk(allTasksObject, taskId, todoIds) {
    const strTaskId = String(taskId);
    if (!allTasksObject[strTaskId]) {
        return { successes: [], errors: [`Error: Task ID ${strTaskId} not found.`] };
    }
    const task = allTasksObject[strTaskId];
    const successes = [];
    const errors = [];
    let taskUpdated = false;

    for (const todoId of todoIds) {
        const strTodoId = String(todoId);
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
        task.updated_at = new Date().toISOString();
        saveTask(task); 
    }
    return { successes, errors };
}

/**
 * Adds a note to a specific task. Saves the modified task.
 * @param {object} allTasksObject - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {string} noteText - The text content of the note.
 * @param {string} [noteType="general"] - The type of the note.
 * @returns {string} A status message.
 */
function addNote(allTasksObject, taskId, noteText, noteType = "general") {
    const strTaskId = String(taskId);
    if (!allTasksObject[strTaskId]) {
        return `Error: Task ID ${strTaskId} not found.`;
    }
    const task = allTasksObject[strTaskId];
    if (!task.notes) task.notes = {};
    const noteId = String(nextId(task.notes));
    task.notes[noteId] = {
        id: noteId,
        text: noteText,
        type: noteType,
        created_at: new Date().toISOString()
    };
    task.updated_at = new Date().toISOString();
    saveTask(task); 
    return `Note (ID: ${noteId}, Type: ${noteType}) added to task ${strTaskId}.`;
}

/**
 * Adds multiple notes to a specific task. Saves the modified task once.
 * @param {object} allTasksObject - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {Array<object>} noteDefs - Array of note definitions.
 * @returns {object} An object with success and error messages.
 */
function addNotesBulk(allTasksObject, taskId, noteDefs) {
    const strTaskId = String(taskId);
    if (!allTasksObject[strTaskId]) {
        return { successes: [], errors: [`Error: Task ID ${strTaskId} not found.`] };
    }
    const task = allTasksObject[strTaskId];
    const successes = [];
    const errors = []; 
    let taskUpdated = false;

    if (!task.notes) task.notes = {};
    for (const def of noteDefs) {
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
        task.updated_at = new Date().toISOString();
        saveTask(task); 
    }
    return { successes, errors };
}

/**
 * Links a task to a parent task. Saves both modified tasks if successful.
 * @param {object} allTasksObject - The tasks object.
 * @param {string} taskId - The ID of the task to be linked (child).
 * @param {string} parentId - The ID of the parent task.
 * @returns {string} A status message.
 */
function linkTask(allTasksObject, taskId, parentId) {
    const strTaskId = String(taskId);
    const strParentId = String(parentId);

    if (!allTasksObject[strTaskId]) return `Error: Task ID ${strTaskId} not found.`;
    if (!allTasksObject[strParentId]) return `Error: Parent task ID ${strParentId} not found.`;
    if (strTaskId === strParentId) return "Error: Cannot link a task to itself.";

    // Check for circular dependency: Traverse up from the proposed parent (strParentId).
    // If we encounter strTaskId, then linking strTaskId to strParentId would create a circle.
    let ancestor = allTasksObject[strParentId];
    const visitedAncestors = new Set(); // To detect cycles in the parent's own ancestry

    while (ancestor) {
        if (ancestor.id === strTaskId) {
            return `Error: Circular dependency detected. Task ${strTaskId} is an ancestor of ${strParentId}. Cannot link.`;
        }
        if (visitedAncestors.has(ancestor.id)) {
             // This indicates a pre-existing cycle in the parent's chain, data corruption.
             return `Error: Corrupted data - circular dependency already exists in ancestors of ${strParentId} involving ${ancestor.id}. Cannot link.`;
        }
        visitedAncestors.add(ancestor.id);

        if (!ancestor.parent_id) break; // Reached the top of this branch

        if (!allTasksObject[ancestor.parent_id]) {
            return `Error: Broken parent chain for potential parent ${strParentId}. Ancestor ${ancestor.parent_id} not found.`;
        }
        ancestor = allTasksObject[ancestor.parent_id];
    }
    
    const childTask = allTasksObject[strTaskId];
    const proposedParentTask = allTasksObject[strParentId];

    childTask.parent_id = strParentId;
    childTask.updated_at = new Date().toISOString();
    saveTask(childTask);

    proposedParentTask.updated_at = new Date().toISOString(); 
    saveTask(proposedParentTask);

    return `Task ${strTaskId} linked to parent task ${strParentId}.`;
}

/**
 * Links multiple tasks to their respective parents. Each link saves relevant tasks.
 * @param {object} allTasksObject - The tasks object.
 * @param {Array<object>} links - Array of link definitions.
 * @returns {Array<string>} An array of status messages.
 */
function linkTasksBulk(allTasksObject, links) {
    const results = [];
    for (const link of links) {
        results.push(linkTask(allTasksObject, link.taskId, link.parentId));
    }
    return results;
}

/**
 * Formats a single task for display.
 * @param {object} task - The task object.
 * @param {object} allTasksCtx - The entire tasks object for context (e.g., parent name).
 * @returns {string} A formatted string representation.
 */
function formatTask(task, allTasksCtx) {
    if (!task) return "Error: Task not found for formatting.";
    const output = [];
    output.push(`- ID: ${task.id}, Name: ${task.name}, Status: ${task.status} (Created: ${task.created_at.substring(0, 10)}, Updated: ${task.updated_at.substring(0,10)})`);
    if (task.parent_id) {
        const parentTask = allTasksCtx[task.parent_id];
        output.push(`   Parent: ${parentTask ? `ID: ${parentTask.id} - "${parentTask.name}"` : `ID: ${task.parent_id} (Not found - data may be inconsistent if parent file is missing)`}`);
    } else {
        output.push("   Parent: None");
    }
    const children = Object.values(allTasksCtx).filter(t => t.parent_id === task.id);
    if (children.length > 0) {
        output.push("   Children:");
        children.forEach(child => output.push(`     - ID: ${child.id} - "${child.name}" (Status: ${child.status})`));
    } else {
        output.push("   Children: None");
    }
    let openTodos = 0, doneTodos = 0;
    if (task.todos) Object.values(task.todos).forEach(todo => todo.done ? doneTodos++ : openTodos++);
    output.push(`   Todo Summary: Open: ${openTodos}, Done: ${doneTodos} (Total: ${openTodos + doneTodos})`);
    const numNotes = task.notes ? Object.keys(task.notes).length : 0;
    output.push(`   Notes Count: ${numNotes}`);
    return output.join("\n");
}

/**
 * Lists all tasks or a specific task.
 * @param {object} allTasksObject - The tasks object.
 * @param {string|null} [taskId=null] - Specific task ID or null for all.
 * @returns {string} List of tasks or task details.
 */
function listTasks(allTasksObject, taskId = null) {
    if (!allTasksObject || Object.keys(allTasksObject).length === 0) return "No tasks found.";
    const output = [];
    if (taskId) {
        const task = allTasksObject[String(taskId)];
        if (task) {
            output.push(formatTask(task, allTasksObject)); 
            if (task.todos && Object.keys(task.todos).length > 0) {
                output.push("   Detailed Todos:");
                Object.values(task.todos).sort((a,b) => new Date(a.created_at) - new Date(b.created_at)).forEach(todo => {
                    output.push(`     - [${todo.done ? "✓" : "✗"}] (ID: ${todo.id}) ${todo.text} (Added: ${todo.created_at.substring(0,10)})`);
                });
            } else output.push("   Detailed Todos: None");
            if (task.notes && Object.keys(task.notes).length > 0) {
                output.push("   Detailed Notes:");
                Object.values(task.notes).sort((a,b) => new Date(a.created_at) - new Date(b.created_at)).forEach(note => {
                    output.push(`     - (ID: ${note.id}) [${note.type}] ${note.text} (Added: ${note.created_at.substring(0,10)})`);
                });
            } else output.push("   Detailed Notes: None");
        } else return `Error: Task ID ${taskId} not found. (It may not have a corresponding file or failed to load)`;
    } else {
        output.push("Tasks (Summary):");
        Object.values(allTasksObject).sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).forEach(taskData => {
            output.push(formatTask(taskData, allTasksObject)); 
            output.push("---");
        });
    }
    return output.join("\n");
}

/**
 * Fetches and formats notes for a specific task.
 * @param {object} allTasksObject - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @returns {string} Formatted notes or status message.
 */
function getNotes(allTasksObject, taskId) {
    const strTaskId = String(taskId);
    if (!allTasksObject[strTaskId]) return `Error: Task ID ${strTaskId} not found.`;
    const task = allTasksObject[strTaskId];
    if (!task.notes || Object.keys(task.notes).length === 0) return `No notes for task ${strTaskId} ("${task.name}").`;
    const output = [`Notes for Task ${strTaskId} ("${task.name}"):`];
    Object.values(task.notes).sort((a,b) => new Date(a.created_at) - new Date(b.created_at)).forEach(note => {
           output.push(`   - (ID: ${note.id}) [${note.type}] ${note.text} (Added: ${note.created_at.substring(0,10)})`);
    });
    return output.join("\n");
}

/**
 * Sets the status of a task. Saves the modified task.
 * @param {object} allTasksObject - The tasks object.
 * @param {string} taskId - The ID of the task.
 * @param {string} status - The new status.
 * @returns {string} A status message.
 */
function setStatus(allTasksObject, taskId, status) {
    const strTaskId = String(taskId);
    const validStatuses = ["new", "blocked", "in progress", "finished"];
    if (!validStatuses.includes(status)) {
        return `Error: Invalid status '${status}'. Valid: ${validStatuses.join(", ")}.`;
    }
    if (!allTasksObject[strTaskId]) return `Error: Task ID ${strTaskId} not found.`;
    
    const task = allTasksObject[strTaskId];
    task.status = status;
    task.updated_at = new Date().toISOString();
    saveTask(task); 
    return `Status of task ${strTaskId} set to '${status}'.`;
}
// End of user-provided functions


class TaskManagerServer {
    constructor() {
        this.server = new Server(
            { name: 'project-task-manager', version: '0.2.0' }, // version bumped
            { capabilities: { tools: {}, resources: {} } }
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
                description: 'Adds a new task. Each task is saved in its own file.',
                inputSchema: { 
                    type: 'object',
                    properties: {
                        name: { type: 'string', description: 'Name of the task.' },
                        parentId: { type: ['string', 'null'], description: 'ID of the parent task, if any.' }
                    },
                    required: ['name']
                },
                handler: (args) => {
                    let data = loadAllTasks(); 
                    const [taskId, message] = addTask(data.tasks, args.name, args.parentId);
                    return { taskId, message };
                }
            },
            {
                name: 'addTasksBulk',
                description: 'Adds multiple tasks in bulk. Each task is saved individually.',
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
                    let data = loadAllTasks();
                    const results = addTasksBulk(data.tasks, args.taskDefs);
                    return results;
                }
            },
            {
                name: 'listTasks',
                description: 'Lists all tasks or a specific task with details. Reads from individual task files.',
                inputSchema: { 
                    type: 'object',
                    properties: {
                        taskId: { type: ['string', 'null'], description: 'ID of a specific task to list, or null/omit to list all.' }
                    }
                },
                handler: (args) => {
                    let data = loadAllTasks(); 
                    return listTasks(data.tasks, args.taskId);
                }
            },
            {
                name: 'addTodo',
                description: 'Adds a todo item to a specific task. Saves the modified task file.',
                inputSchema: { 
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        text: { type: 'string', description: 'Text content of the todo.' }
                    },
                    required: ['taskId', 'text']
                },
                handler: (args) => {
                    let data = loadAllTasks(); 
                    const message = addTodo(data.tasks, args.taskId, args.text);
                    return message;
                }
            },
            {
                name: 'addTodosBulk',
                description: 'Adds multiple todos to a specific task. Saves the modified task file once.',
                inputSchema: { 
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        todoTexts: { type: 'array', items: { type: 'string' }, description: 'Array of todo texts.'}
                    },
                    required: ['taskId', 'todoTexts']
                },
                handler: (args) => {
                    let data = loadAllTasks();
                    const result = addTodosBulk(data.tasks, args.taskId, args.todoTexts);
                    return result;
                }
            },
            {
                name: 'toggleTodo',
                description: 'Toggles the done status of a todo item. Saves the modified task file.',
                inputSchema: { 
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        todoId: { type: 'string', description: 'ID of the todo item.' }
                    },
                    required: ['taskId', 'todoId']
                },
                handler: (args) => {
                    let data = loadAllTasks();
                    const message = toggleTodo(data.tasks, args.taskId, args.todoId);
                    return message;
                }
            },
            {
                name: 'toggleTodosBulk',
                description: 'Toggles the done status of multiple todos for a task. Saves the modified task file once.',
                inputSchema: { 
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        todoIds: { type: 'array', items: { type: 'string' }, description: 'Array of todo IDs.'}
                    },
                    required: ['taskId', 'todoIds']
                },
                handler: (args) => {
                    let data = loadAllTasks();
                    const result = toggleTodosBulk(data.tasks, args.taskId, args.todoIds);
                    return result;
                }
            },
            {
                name: 'addNote',
                description: 'Adds a note to a specific task. Saves the modified task file.',
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
                    let data = loadAllTasks();
                    const message = addNote(data.tasks, args.taskId, args.noteText, args.noteType);
                    return message;
                }
            },
            {
                name: 'addNotesBulk',
                description: 'Adds multiple notes to a specific task. Saves the modified task file once.',
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
                    let data = loadAllTasks();
                    const result = addNotesBulk(data.tasks, args.taskId, args.noteDefs);
                    return result;
                }
            },
            {
                name: 'getNotes',
                description: 'Fetches and formats notes for a specific task. Reads from the task file.',
                inputSchema: { 
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task to get notes for.' }
                    },
                    required: ['taskId']
                },
                handler: (args) => {
                    let data = loadAllTasks(); 
                    return getNotes(data.tasks, args.taskId);
                }
            },
            {
                name: 'setStatus',
                description: 'Sets the status of a task. Saves the modified task file.',
                inputSchema: { 
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the task.' },
                        status: { type: 'string', description: 'New status (new, blocked, in progress, finished).', enum: ["new", "blocked", "in progress", "finished"]}
                    },
                    required: ['taskId', 'status']
                },
                handler: (args) => {
                    let data = loadAllTasks();
                    const message = setStatus(data.tasks, args.taskId, args.status);
                    return message;
                }
            },
            {
                name: 'linkTask',
                description: 'Links a task to a parent task. Saves both modified task files.',
                inputSchema: { 
                    type: 'object',
                    properties: {
                        taskId: { type: 'string', description: 'ID of the child task.' },
                        parentId: { type: 'string', description: 'ID of the parent task.' }
                    },
                    required: ['taskId', 'parentId']
                },
                handler: (args) => {
                    let data = loadAllTasks(); 
                    const message = linkTask(data.tasks, args.taskId, args.parentId);
                    return message;
                }
            },
            {
                name: 'linkTasksBulk',
                description: 'Links multiple tasks to their respective parents. Saves affected task files.',
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
                    let data = loadAllTasks();
                    const results = linkTasksBulk(data.tasks, args.links);
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
                const args = { ...request.params.arguments }; // Clone args to avoid mutating original request

                // Apply defaults for any parameter defined in schema properties if not provided
                if (tool.inputSchema.properties) {
                    for (const paramName in tool.inputSchema.properties) {
                        if (args[paramName] === undefined && tool.inputSchema.properties[paramName].hasOwnProperty('default')) {
                            args[paramName] = tool.inputSchema.properties[paramName].default;
                        }
                    }
                }
                
                // Validate required parameters after defaults have been potentially applied (though defaults usually make params optional)
                if (tool.inputSchema.required) {
                    for (const requiredParam of tool.inputSchema.required) {
                        if (args[requiredParam] === undefined) {
                             // If a required param is still undefined even after default check (e.g. no default for it), it's an error.
                            throw new McpError(ErrorCode.InvalidParams, `Missing required parameter: ${requiredParam}`);
                        }
                    }
                }

                const result = tool.handler(args); 
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
        console.error(`Project Task Manager MCP server running on stdio, writing tasks to directory: ${path.resolve(TASKS_DIR)}`);
    }
}

const serverInstance = new TaskManagerServer();
serverInstance.run().catch(error => {
    console.error("Failed to start TaskManagerServer:", error);
    process.exit(1);
});