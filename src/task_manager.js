import { Task } from "./task";

export class TaskManager {
  constructor() {
    this.tasks = []; // stores our Task objects
    this.currentId = 0; // ID generator for each Task object
    this.incompleteTaskCount = 0;
  }

  addTask(description) {
    const newTask = new Task(this.currentId, description);
    this.tasks.push(newTask);
    this.currentId++;
    this.incompleteTaskCount++;
    return newTask;
  }

  findTaskById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id) {
    // get the index of element with given id to delete it
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      if (!this.tasks[taskIndex].isCompleted) {
        this.incompleteTaskCount--;
      }
      this.tasks.splice(taskIndex, 1);
    }
  }

  getAllTasks() {
    return this.tasks;
  }

  getIncompleteTaskCount() {
    return this.incompleteTaskCount;
  }

  toggleTaskCompletion(id) {
    const task = this.findTaskById(id);

    if (task) {
      task.changeCompleteStatus();
      this.incompleteTaskCount += task.isCompleted ? -1 : 1;
    }
  }

  loadTasksFromStorage() {
    const tasksArray = localStorage.getItem("tasks");
    if (tasksArray) {
      this.tasks = JSON.parse(tasksArray).map(({ id, description, isCompleted }) => new Task(id, description, isCompleted));
    } else {
      this.tasks = [];
    }
  }
}
