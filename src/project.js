const Project = class {
  constructor(projectName = 'General') {
    this.projectName = projectName.toLowerCase();
    this.list = [];
  }

  static getLastAddedCategory(projects) {
    return projects[projects.length - 1].projectName;
  }

  static getAllCategories(projects) {
    const categories = [];
    projects.forEach(p => categories.push(p.projectName));
    return categories;
  }

  // update a project list with a todo item
  saveTodo = (todo, index = null) => {
    if (index || index === 0) {
      this.list[index] = todo;
    } else {
      this.list.push(todo);
    }
  }

  // remove todo from a project's list
  deleteTodo = (todoIndex) => {
    this.list.splice(todoIndex, 1);
  }
};

export { Project as default };
