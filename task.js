class Task {
  constructor(id, description) {
    this.id = id;
    this.description = description;
    this.isCompleted = false;
  }

  changeCompleteStatus() {
    this.isCompleted = this.isCompleted ? false : true;
  }
}
