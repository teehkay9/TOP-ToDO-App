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
    const taskItem = document.createElement("li");
    taskItem.textContent = task.description;
    this.taskList.appendChild(taskItem);
  }
}
