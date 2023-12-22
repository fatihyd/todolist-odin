class Todo {
    constructor(title, description, dueDate, priority, project = "home") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

// get the modal
let dialog = document.querySelector("dialog");

// turn off the stuff inside the modal
let addTodoForm = document.querySelector("#add-todo-form");
let addProjectForm = document.querySelector("#add-project-form");
//addTodoForm.style.display = "none";
addProjectForm.style.display = "none";
// click outside the modal to exit
dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

// get the add button
let addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addButtonHandler);

function addButtonHandler() {
    dialog.showModal();

    // prevents page refresh  
    document.querySelector("#add-book-form").addEventListener("submit", function (event) {
        event.preventDefault();
    })
}
