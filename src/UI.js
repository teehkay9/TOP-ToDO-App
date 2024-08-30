import { TaskManager } from "./task_manager";

export class UI {
  constructor() {
    this.taskManager = new TaskManager();
    this.taskForm = document.getElementById("taskForm");
    this.taskInput = document.getElementById("taskInput");
    this.taskList = document.getElementById("taskList");

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
      this.taskInput.value = ""; // Clear input field after submission
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

    // add event listener for each delete button
    deleteButton.addEventListener("click", (e) => {
      const taskItem = e.target.parentElement;

      const taskId = Number(taskItem.id);

      this.taskManager.deleteTask(taskId);
      this.taskList.removeChild(taskItem);
    });

    this.taskList.appendChild(taskItem);
    taskItem.appendChild(deleteButton);
  }
}
