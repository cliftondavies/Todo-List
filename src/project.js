const Project = class {
  constructor(projectName = 'General') {
    this.projectName = projectName;
    this.list = [];
  }

  static categories = [];

  addTodoToProject(todo) {
    this.list.push(todo);
  }

  // add to current list of categories (optional)
  static addCategory(project) {
    this.categories.push(project.projectName);
  }

  // remove a todo from a project list (implement here or in storage class)
    // retrieve entire storage
    // find project that todo belongs to by project name
    // find todo
    // remove todo
    // save back to storage
};
