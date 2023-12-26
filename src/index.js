import { loadHome } from "./pageLoader";
import { initEventListeners } from "./eventListeners";
import { addProjectToDOM } from "./domUtils";

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

/* initializes event listeners */
initEventListeners();

// loading the application for the first time
function initTodoApp() {
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
}

initTodoApp();

export { storedTodos, storedProjects, currentView, currentProject, mainContainer, addButton, dialog, projectsRadioContainer, addTodoForm, addProjectForm };