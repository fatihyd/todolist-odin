import { Todo } from "./todo";

// creates and returns a todo object
function createTodoItem() {
    let titleInput = document.querySelector("#title-input").value;
    let descriptionInput = document.querySelector("#description-input").value;
    let dueDateInput = document.querySelector("#duedate-input").value;
    let priorityInput = document.querySelector('input[name="priority"]:checked').value;
    let projectInput = document.querySelector('input[name="project"]:checked').value;

    return new Todo(titleInput, descriptionInput, dueDateInput, priorityInput, projectInput);
}

export { createTodoItem };