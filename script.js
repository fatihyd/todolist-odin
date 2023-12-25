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
// global variables
let storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
let storedProjects = JSON.parse(localStorage.getItem("projects")) ?? [];
let currentView = "none";
let currentProject;
// elements already in the DOM
let mainContainer = document.querySelector("#main-container");
let addButton = document.querySelector("#add-button");
let dialog = document.querySelector("dialog");
let projectsRadioContainer = document.querySelector("#projects-radio-container");
/* MODAL CONTROLS */
// turn off the stuff inside the modal
let addTodoForm = document.querySelector("#add-todo-form");
let addProjectForm = document.querySelector("#add-project-form");
addProjectForm.style.display = "none";
// click outside the modal to exit
dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});
// event listeners for elements in the DOM
addButton.addEventListener("click", addButtonHandler);
// event listeners for elements that are created later  
document.addEventListener("click", function (event) {
    if (event.target.id === "submit-todo-button") {
        submitTodoHandler();
    } else if (event.target.id === "submit-project-button") {
        submitProjectHandler();
    } else if (event.target.id === "sidebar-todo-button") {
        addProjectForm.style.display = "none";
        addTodoForm.style.display = "flex";
    } else if (event.target.id === "sidebar-project-button") {
        addTodoForm.style.display = "none";
        addProjectForm.style.display = "flex";
    } else if (event.target.id === "home-button") {
        currentView = "none";
        loadHome();
    } else if (event.target.parentNode.classList.contains("project")) {
        currentView = "project";
        currentProject = event.target.textContent;
        loadProject(currentProject);
    } else if (event.target.classList.contains("remove-todo-button")) {
        removeTodoHandler(event);
    } else if (event.target.type === "checkbox") {
        checkboxHandler(event);
    }
})

// loads the Home page
function loadHome() {
    mainContainer.innerHTML = "";

    // Check if there are todos in localStorage
    if (storedTodos && storedTodos.length > 0) {
        // Display todos on the home page
        for (let i = 0; i < storedTodos.length; i++) {
            mainContainer.appendChild(createTodoContainer(storedTodos[i], i));
        }
    } else {
        // Handle the case where there are no todos
        mainContainer.textContent = "No todos available.";
    }
}

// loads the Project page
function loadProject(projectTitle) {
    mainContainer.innerHTML = "";

    // Check if there are todos in localStorage
    if (storedTodos && storedTodos.length > 0) {
        // Display todos on the project page
        for (let i = 0; i < storedTodos.length; i++) {
            if (storedTodos[i].project === projectTitle) {
                mainContainer.appendChild(createTodoContainer(storedTodos[i], i));
            }
        }
    } else {
        // Handle the case where there are no todos in the project
        mainContainer.textContent = "No todos available.";
    }
}

// creates and returns a todo object
function createTodoItem() {
    let titleInput = document.querySelector("#title-input").value;
    let descriptionInput = document.querySelector("#description-input").value;
    let dueDateInput = document.querySelector("#duedate-input").value;
    let priorityInput = document.querySelector('input[name="priority"]:checked').value;
    let projectInput = document.querySelector('input[name="project"]:checked').value;

    return new Todo(titleInput, descriptionInput, dueDateInput, priorityInput, projectInput);
}
// creates and returns a todo container
function createTodoContainer(todo, index) {
    let todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");

    todoContainer.setAttribute("data-index", index);

    let mainElements = document.createElement("span");

    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";

    let titleElement = document.createElement("p");
    titleElement.textContent = todo.title;

    mainElements.append(checkboxElement, titleElement);

    let extraElements = document.createElement("span");

    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = "=> " + todo.description;

    let dueDateElement = document.createElement("p");
    dueDateElement.textContent = "due: " + todo.dueDate;

    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-todo-button");
    removeButton.textContent = "REMOVE";

    extraElements.append(descriptionElement, dueDateElement, removeButton);

    let priorityElement = todo.priority;
    let priorityColor;
    if (priorityElement === "low") { priorityColor = "green" }
    else if (priorityElement === "medium") { priorityColor = "yellow" }
    else if (priorityElement === "high") { priorityColor = "red" }
    todoContainer.style.border = `2px solid ${priorityColor}`;

    if (todo.checked) {
        checkboxElement.checked = true;
        todoContainer.style.textDecoration = "line-through";
    }

    todoContainer.append(mainElements, extraElements);
    return todoContainer;
}

/* event listener handlers */
// add button in the sidebar
function addButtonHandler() {
    dialog.showModal();

    // prevents page refresh  
    document.querySelector("#add-todo-form").addEventListener("submit", function (event) {
        event.preventDefault();
    })
    document.querySelector("#add-project-form").addEventListener("submit", function (event) {
        event.preventDefault();
    })
}
// add todo button in the modal
function submitTodoHandler() {
    let newTodo = createTodoItem();
    storedTodos.push(newTodo);
    //
    localStorage.setItem("todos", JSON.stringify(storedTodos));

    // resets the form
    document.querySelector("#add-todo-form").reset();
    // closes the dialog and adds the book to the DOM  
    dialog.close();

    if (currentView === "none") {
        loadHome();
    } else {
        loadProject(newTodo.project);
    }
}
// add project button in the modal
function submitProjectHandler() {
    let projectTitleInput = document.querySelector("#project-title-input").value;

    addProjectToDOM(projectTitleInput);
    storedProjects.push(projectTitleInput);
    //
    localStorage.setItem("projects", JSON.stringify(storedProjects));


    // resets the form  
    document.querySelector("#add-project-form").reset();
    // closes the dialog and adds the book to the DOM  
    dialog.close();
}

function addProjectToDOM(projectTitle) {
    let projectsList = document.querySelector("#projects-list");
    let newProjectElement = document.createElement("li");
    newProjectElement.classList.add("project");
    newProjectElement.id = projectTitle;

    let newProjectButton = document.createElement("button");
    newProjectButton.textContent = projectTitle;
    newProjectElement.appendChild(newProjectButton);
    projectsList.appendChild(newProjectElement);

    let newProjectRadio = document.createElement("input");
    newProjectRadio.type = "radio";
    newProjectRadio.id = "projects-choice-" + (storedProjects.length + 2);
    newProjectRadio.name = "project";
    newProjectRadio.value = projectTitle;
    let newProjectRadioLabel = document.createElement("label");
    newProjectRadioLabel.setAttribute("for", newProjectRadio.id);
    newProjectRadioLabel.textContent = projectTitle;
    projectsRadioContainer.append(newProjectRadio, newProjectRadioLabel);
}

function removeTodoHandler(event) {
    const todoContainer = event.target.parentNode.parentNode;
    const index = parseInt(todoContainer.dataset.index);  // Use parseInt to convert to a number

    // Remove the todoContainer from the DOM
    todoContainer.remove();

    // Remove the todo from the allTodos array
    storedTodos.splice(index, 1);
    //
    localStorage.setItem("todos", JSON.stringify(storedTodos));
}

function checkboxHandler(event) {
    let todoContainer = event.target.parentNode.parentNode;
    let todoObject = storedTodos[parseInt(todoContainer.dataset.index)];

    if (todoObject.checked) {
        todoObject.checked = false;
        todoContainer.style.textDecoration = "";
    } else {
        todoObject.checked = true;
        todoContainer.style.textDecoration = "line-through";
    }
    //
    localStorage.setItem("todos", JSON.stringify(storedTodos));
}

// load page for the first time
if (currentView === "none") {
    loadHome();
}

if (storedProjects && storedProjects.length > 0) {
    for (let i = 0; i < storedProjects.length; i++) {
        if (storedProjects[i] !== "none") {
            addProjectToDOM(storedProjects[i]);
        }
    }
}
