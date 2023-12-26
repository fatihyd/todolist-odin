// Todo class
class Todo {
    constructor(title, description, dueDate, priority, project = "none") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.checked = false;
    }
}

export { Todo };