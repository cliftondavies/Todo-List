const Todo = class {
  constructor(title, description, dueDate, priority, category) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.completed = 'Incomplete';
    // this.id = Todo.generateId();
    this.id = Date.now().toString(); // returns a number so call toString() here
  }

  // static numberOfTodos = 0 // to implement otherwise might be a problem when refreshed

  // static generateId() {
  //   return Todo.numberOfTodos + 1;
  // }

  // toggleCompleteStatus(){}
  updateStatus() {
    this.completed = (this.completed === 'Complete') ? 'Incomplete' : 'Complete';
  }

  // changePriority(){}
  updatePriority() {
    this.priority = (this.priority === 'Low') ? 'High' : 'Low';
  }
};

export { Todo as default };
