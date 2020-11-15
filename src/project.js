const Project = class {
  constructor(projectName = 'General') {
    this.projectName = projectName;
    this.list = [];
  }

  static categories = [];

  addTodoToProject(todo) {
    return this.list.push(todo);
  }

  // add to current list of categories (optional)
  static addCategory(project) {
    Project.categories.push(project.projectName);
  }

  // remove a todo from a project list (implement here or in storage class)
};
