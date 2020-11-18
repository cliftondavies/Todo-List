const Project = class {
  constructor(projectName = 'General') {
    this.projectName = projectName;
    this.list = [];
  }

  static categories = []; // might not need this anymore

  static getCategories(projects) {
    const categories = [];
    projects.forEach(p => categories.push(p.projectName));
    return categories; // we want the last added category?
  }

  // add todo item to a project's list
  addTodo(todo) {
    this.list.push(todo);
  }

  // remove todo from a oroject's list
  deleteTodo(todo) {
    const index = this.list.indexOf(todo);
    this.list.splice(index, 1);
  }

  // add to current list of categories (optional)
  static addCategory(project) { // might not need this anymore
    this.categories.push(project.projectName);
  }
};

export { Project as default };
