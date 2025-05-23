<<<<<<< HEAD
** ALWAYS ** Read your entire mode specific file when you have been delegated a task. `.ennwise\modes\` or `.\ennwise\management_base.md` for management mode.

The root of the environment is at /workspaces/t-and-m/ (.roo, .ennwise) however the project and all source is under the project folder at /workspaces/t-and-m/project/

=======
>>>>>>> 79dee6710cf17b6b99e70dbdd6f4676ac0d5a33b
There is no need to show updated file content or display code changes and completed files unless directly requested by the users unless providing direct instructions to modes or documentation is relevant.

If the context windows grows past 125000, it is time to wrap up the task.  Summarize work done as a note. Detail what you are currently working on, and remaining items  Summarize work done, detail what you are currently doing, and detail what is left to do, and return immediately to the calling task letting them know you have partially completed the task and want to reissue it as a new task. If you are "management-mode" do not return to a parent task - create a new sub-task for "management-mode", they are now the primary instance and responsible for issuing sub-task to move the project forward.

<<<<<<< HEAD
Be aware of commands that will not return to the terminal. Prefer to run things in docker and check for logs etc if they would block.

npm test etc block the terminal, use them in a way that they return or background them and monitor their progress.

When starting a new mode and giving them a task, always instruct them at the beginning of your instructions and at the end of the instructions given - to ensure they check their mode specific files before doing anything else -  `.ennwise\modes\` or `.\ennwise\management_base.md` for management mode.
=======
Be aware of commands that will not return to the terminal. Prefer to run things in docker and check for logs etc if they would block.
>>>>>>> 79dee6710cf17b6b99e70dbdd6f4676ac0d5a33b
