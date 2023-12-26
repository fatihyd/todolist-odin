import { createTodoContainer } from "./domUtils";
import { storedTodos, mainContainer } from "./index";

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

export { loadHome, loadProject };