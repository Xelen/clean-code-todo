const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const todoList = document.getElementById("incompleteTasks");
const completedList = document.getElementById("completed-tasks");
const createNewTaskElement = function (taskText) {
  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");

  label.innerText = taskText;
  label.className = "task";
  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  todoList.appendChild(listItem);
  bindTaskEvents(listItem, completeTask);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditing = listItem.classList.contains("editMode");
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }
  listItem.classList.toggle("editMode");
};
const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const moveTask = function (listItem, destinationList, onCheckboxChange) {
  destinationList.appendChild(listItem);
  bindTaskEvents(listItem, onCheckboxChange);
};
const completeTask = function () {
  const listItem = this.parentNode;
  moveTask(listItem, completedList, restoreTask);
};

const restoreTask = function () {
  const listItem = this.parentNode;
  moveTask(listItem, todoList, completeTask);
};
addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, onCheckboxChange) {
  const checkbox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = onCheckboxChange;
};
for (let i = 0; i < todoList.children.length; i++) {
  bindTaskEvents(todoList.children[i], completeTask);
}
for (let i = 0; i < completedList.children.length; i++) {
  bindTaskEvents(completedList.children[i], restoreTask);
}
