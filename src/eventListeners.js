import { loadHome, loadProject } from "./pageLoader";
import { addProjectToDOM } from "./domUtils";
import { createTodoItem } from "./formUtils";
import { storedTodos, storedProjects, currentView, currentProject, addButton, dialog, addTodoForm, addProjectForm } from "./index";


function initEventListeners() {
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

export { initEventListeners, addButtonHandler, submitTodoHandler, submitProjectHandler, removeTodoHandler, checkboxHandler };