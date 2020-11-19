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

  // save new (project or todo object) to storage
  static save(obj, index = null) {
    const storedProjects = this.retrieve();

    if (index) { // or Project obj && index if this doesn't work
      storedProjects[index] = obj;
    } else if (obj instanceof Project) { // Project obj && !index
      storedProjects.push(obj);
    } else {
      const project = storedProjects.find(project => project.projectName === obj.category);
      const index = storedProjects.indexOf(project);
      project.saveTodo(obj);
      storedProjects[index] = project;
    }

    localStorage.setItem('list', JSON.stringify(storedProjects));
  }

  // static update(projects, index, project) {
  //   projects[index] = project;
  //   localStorage.setItem('list', JSON.stringify(projects));
  // }

  // remove project
  static removeProject(projects, index) {
    projects.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(projects));
  }
};

export { Storage as default };
