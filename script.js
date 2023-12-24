// Todo class
class Todo {
    constructor(title, description, dueDate, priority, project = "none") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}
// global variables
let allTodos = [];
let allProjects = [];
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
    }
})

// loads the Home page
function loadHome() {
    mainContainer.innerHTML = "";

    for (let i = 0; i < allTodos.length; i++) {
        mainContainer.appendChild(createTodoContainer(allTodos[i]));
    }
}
// loads the Project page
function loadProject(projectTitle) {
    mainContainer.innerHTML = "";

    for (let i = 0; i < allTodos.length; i++) {
        if (allTodos[i].project === projectTitle) {
            mainContainer.appendChild(createTodoContainer(allTodos[i]))
        }
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
function createTodoContainer(todo) {
    let todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");

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

    extraElements.append(descriptionElement, dueDateElement);

    let priorityElement = todo.priority;
    let priorityColor;
    if (priorityElement === "low") { priorityColor = "green" }
    else if (priorityElement === "medium") { priorityColor = "yellow" }
    else if (priorityElement === "high") { priorityColor = "red" }
    todoContainer.style.border = `2px solid ${priorityColor}`;

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
    allTodos.push(newTodo);

    let newTodoContainer = createTodoContainer(newTodo);
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
    let projectsList = document.querySelector("#projects-list");
    let projectTitleInput = document.querySelector("#project-title-input").value;
    let newProjectElement = document.createElement("li");
    newProjectElement.classList.add("project");
    newProjectElement.id = projectTitleInput;

    let newProjectButton = document.createElement("button");
    newProjectButton.textContent = projectTitleInput;
    newProjectElement.appendChild(newProjectButton);
    projectsList.appendChild(newProjectElement);

    allProjects.push(projectTitleInput);

    let newProjectRadio = document.createElement("input");
    newProjectRadio.type = "radio";
    newProjectRadio.id = "projects-choice-" + (allProjects.length + 2);
    newProjectRadio.name = "project";
    newProjectRadio.value = projectTitleInput;
    let newProjectRadioLabel = document.createElement("label");
    newProjectRadioLabel.setAttribute("for", newProjectRadio.id);
    newProjectRadioLabel.textContent = projectTitleInput;
    projectsRadioContainer.append(newProjectRadio, newProjectRadioLabel);
    // resets the form  
    document.querySelector("#add-project-form").reset();
    // closes the dialog and adds the book to the DOM  
    dialog.close();
}
