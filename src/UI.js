import { TaskManager } from "./task_manager";

export class UI {
  constructor() {
    this.taskManager = new TaskManager();
    this.taskForm = document.getElementById("taskForm");
    this.taskInput = document.getElementById("taskInput");
    this.taskList = document.getElementById("taskList");
    this.itemsLeft = document.querySelector("strong");

    if (!this.taskForm || !this.taskInput || !this.taskList) {
      console.error("Required DOM elements are missing");
      return;
    }

    this.taskForm.addEventListener("submit", (e) => this.handleFormSubmit(e));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const taskDescription = this.taskInput.value.trim();
    if (taskDescription) {
      const newTask = this.taskManager.addTask(taskDescription);
      this.renderTask(newTask);
      this.taskInput.value = "";
    }
  }

  renderTask(task) {
    // Task Description
    const taskItem = document.createElement("li");
    taskItem.setAttribute("id", `${task.id}`);
    taskItem.classList.add("task");
    taskItem.textContent = task.description;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "X";

    // add event listener to the task
    taskItem.addEventListener("click", () => {
      task.changeCompleteStatus();
      taskItem.classList.toggle("completed");

      // update display for items left if task has been toggled
      this.itemsLeft.textContent = this.taskManager.getNrOfCompletedTasks();
    });

    // add event listener for each delete button
    deleteButton.addEventListener("click", (e) => {
      const taskItem = e.target.parentElement;

      const taskId = Number(taskItem.id);

      this.taskManager.deleteTask(taskId);
      this.taskList.removeChild(taskItem);

      // update display for items left after task has been deleted
      this.itemsLeft.textContent = this.taskManager.getNrOfCompletedTasks();
    });

    this.taskList.appendChild(taskItem);
    taskItem.appendChild(deleteButton);
    // update display for items left when new task has been added
    this.itemsLeft.textContent = this.taskManager.getNrOfCompletedTasks();
  }
}
