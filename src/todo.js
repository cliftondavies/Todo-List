const Todo = class {
  constructor(title, description, dueDate, priority, category) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.completed = false;
    this.id = Todo.generateId();
  }

  static numberOfTodos = 0

  static generateId() {
    return Todo.numberOfTodos + 1;
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

export { Todo as default };
