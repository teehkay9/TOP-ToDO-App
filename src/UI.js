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
      this.updateTaskCount();
    }
  }

  renderTask(task) {
    // Task Description
    const taskItem = document.createElement("li");
    taskItem.classList.add("task");
    taskItem.textContent = task.description;

    // use a data attribute to store task ID
    taskItem.dataset.taskId = task.id;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "X";

    // add event listener to the task
    taskItem.addEventListener("click", (e) => {
      if (e.target !== deleteButton) {
        const taskId = Number(taskItem.dataset.taskId);
        this.taskManager.toggleTaskCompletion(taskId);
        taskItem.classList.toggle("completed");
        this.updateTaskCount();
      }
    });

    // add event listener for each delete button
    deleteButton.addEventListener("click", (e) => {
      const taskItem = e.target.parentElement;

      const taskId = Number(taskItem.dataset.taskId);

      this.taskManager.deleteTask(taskId);
      this.taskList.removeChild(taskItem);
      this.updateTaskCount();
    });

    this.taskList.appendChild(taskItem);
    taskItem.appendChild(deleteButton);
    // update display for items left when new task has been added
    this.updateTaskCount();
  }

  updateTaskCount() {
    this.itemsLeft.textContent = this.taskManager.getIncompleteTaskCount();
  }
}
