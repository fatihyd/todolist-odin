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

// event listeners for elements that gets created later  
document.addEventListener("click", function (event) {
    if (event.target.id === "submit-todo-button") {
        submitTodoHandler();
    } else if (event.target.id === "submit-project-button") {
        submitProjectHandler();
    }
})

// get the main container
let mainContainer = document.querySelector("#main-container");
// get the add button
let addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addButtonHandler);

function addButtonHandler() {
    dialog.showModal();

    // prevents page refresh  
    document.querySelector("#add-todo-form").addEventListener("submit", function (event) {
        event.preventDefault();
    })
}

//
function submitTodoHandler() {
    // gets the input values  
    let titleInput = document.querySelector("#title-input").value;
    let descriptionInput = document.querySelector("#description-input").value;
    let dueDateInput = document.querySelector("#duedate-input").value;
    let priorityInput = document.querySelector('input[name="priority"]:checked').value;
    // creates a new Todo object and a container  
    let newTodo = new Todo(titleInput, descriptionInput, dueDateInput, priorityInput);
    let newTodoContainer = createTodoContainer(newTodo);
    // resets the form  
    document.querySelector("#add-todo-form").reset();
    // closes the dialog and adds the book to the DOM  
    dialog.close();
    mainContainer.appendChild(newTodoContainer);
}

function submitProjectHandler() { }

function createTodoContainer(todo) {
    let todoContainer = document.createElement("div");

    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";

    let titleElement = document.createElement("p");
    titleElement.textContent = "title: " + todo.title;

    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = "description: " + todo.description;

    let dueDateElement = document.createElement("p");
    dueDateElement.textContent = todo.dueDate;

    let priorityElement = todo.priority;
    let priorityColor;
    if (priorityElement === "low") { priorityColor = "green" }
    else if (priorityElement === "medium") { priorityColor = "yellow" }
    else if (priorityElement === "high") { priorityColor = "red" }
    todoContainer.style.border = `2px solid ${priorityColor}`;

    todoContainer.append(checkboxElement, titleElement, descriptionElement, dueDateElement);
    return todoContainer;
}