import "./style.css";
import { UI } from "./UI";

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI(); // Initialize the UI

  // Expose the UI instance to the global window object for console access
  window.ui = ui;
});
