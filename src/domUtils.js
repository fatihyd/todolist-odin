import { storedProjects, projectsRadioContainer } from "./index";

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

export { createTodoContainer, addProjectToDOM };