import { Task } from "./task";

export class TaskManager {
  constructor() {
    this.tasks = []; // stores our Task objects
    this.currentId = 0; // ID generator for each Task object
  }

  addTask(description) {
    const newTask = new Task(this.currentId, description);
    this.tasks.push(newTask);
    this.currentId++;
    return newTask;
  }

  findTaskById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id) {
    // get the index of element with given id to delete it
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }

  getAllTasks() {
    return this.tasks;
  }

  getIncompleteTaskCount() {
    return this.tasks.filter((task) => !task.isCompleted).length;
  }
}
