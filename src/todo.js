const Todo = class {
  constructor(title, description, dueDate, priority, category, id = 0) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.completed = false;
    this.id = id;
  }

  static numberOfTodos = 0

  static incrementId = () => {
    return Todo.numberOfTodos++;
  }

  // set todo as complete (here or in storage)
  toggleStatus() {
    // retrieve whole list
    // find todo project category
    // find the todo
  }

  // change todo priority (here or in storage)
  changePriority() {
    // retrieve whole list
    // find todo project category
    // find the todo
  }
};
