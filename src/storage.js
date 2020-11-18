import Project from './project';

const Storage = class {
  // retrieve todo list (either all the todos or just the todos in a particular project category)
  static retrieve() {
    if (JSON.parse(localStorage.getItem('list')) === null) {
      const defaultProject = [new Project()];
      localStorage.setItem('list', JSON.stringify(defaultProject));
    }
    return JSON.parse(localStorage.getItem('list'));
  }

  // save (project or todo object) to storage
  static save(obj) {
    const storedProjects = this.retrieve();

    if (obj instanceof Project) {
      storedProjects.push(obj);
      // Call Project.addCategory(obj) here?
    } else {
      const project = storedProjects.find(project => project.projectName === obj.category);
      const index = storedProjects.indexOf(project);
      project.addTodo(obj);
      storedProjects[index] = project;
    }

    localStorage.setItem('list', JSON.stringify(storedProjects));
  }

  // remove project
  static removeProject(projects, index) {
    projects.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(projects));
  }

  // remove todo from the storage (here or in todo)
  static removeTodo() {

  }

};

export { Storage as default };
