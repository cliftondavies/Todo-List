const Project = class {
  constructor(projectName = 'General') {
    this.projectName = projectName.toLowerCase(); // lowercase project name before setting property
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

  // add/save new todo but no update
  // addTodo(todo) {
  //   return this.list.push(todo);
  // }

  // save (add/update) todo item to a project's list
  saveTodo(todo, index = null) {
    if (index) {
      this.list[index] = todo;
    } else {
      this.list.push(todo);
    }
  }

  // remove todo from a oroject's list
  deleteTodo(todo) {
    const index = this.list.indexOf(todo);
    this.list.splice(index, 1);
  }
};

export { Project as default };
