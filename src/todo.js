const Todo = class {
  constructor(title, description, dueDate, priority, category) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.completed = 'Incomplete';
    this.id = Date.now().toString();
  }

  // toggle todo completion status
  updateStatus = () => {
    this.completed = (this.completed === 'Complete') ? 'Incomplete' : 'Complete';
  }

  // change todo priority
  updatePriority = () => {
    this.priority = (this.priority === 'Low') ? 'High' : 'Low';
  }
};

export { Todo as default };
