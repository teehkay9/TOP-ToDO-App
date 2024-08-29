import { Task } from "./task";

export class TaskManager {
  constructor() {
    this.tasks = []; // stores our Task objects
    this.currentId = 1; // ID generator for each Task object
  }

  addTask(description) {
    const newTask = new Task(this.currentId, description);
    this.tasks.push(newTask);
    this.currentId++;
    return newTask;
  }

  getAllTasks() {
    return this.tasks;
  }
}
