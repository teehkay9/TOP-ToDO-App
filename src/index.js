import "./style.css";
import { TaskManager } from "./task_manager"; // Import TaskManager
import { UI } from "./UI";

document.addEventListener("DOMContentLoaded", () => {
  new UI(); // Initialize the UI
});

/* // Expose TaskManager to the global MyApp object for testing/debugging
window.MyApp = {
  TaskManager,
};

// Debugging logs
console.log("Hello SWE");
console.log(TaskManager); // Check if TaskManager is being imported correctly

// Creating an instance for testing purposes
const taskManager = new MyApp.TaskManager();
taskManager.addTask("Learn SWE");

console.log(taskManager.getAllTasks()); // Check if the task was added correctly
 */
