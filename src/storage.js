import Project from './project';

const storage = (() => {
  // retrieve todo list (either all the todos or just the todos in a particular project category)
  const retrieve = () => {
    if (JSON.parse(localStorage.getItem('list')) === null) {
      const defaultProject = [new Project()];
      localStorage.setItem('list', JSON.stringify(defaultProject));
    }
    return JSON.parse(localStorage.getItem('list'));
  };

  // save new (project or todo object) to storage
  const save = (obj, index = null) => {
    const storedProjects = storage.retrieve();

    if (index) { // or Project obj && index if this doesn't work
      storedProjects[index] = obj;
    } else if (obj instanceof Project) { // Project obj && !index // also check obj binding
      storedProjects.push(obj);
    } else {
      const project = storedProjects.find(project => project.projectName === obj.category);
      const index = storedProjects.indexOf(project);
      // project.list.push(todo);
      project.saveTodo(obj); // won't work if project is null;
      storedProjects[index] = project;
    }

    localStorage.setItem('list', JSON.stringify(storedProjects));
  };

  // static update(projects, index, project) {
  //   projects[index] = project;
  //   localStorage.setItem('list', JSON.stringify(projects));
  // }

  // remove project
  const removeProject = (projects, index) => {
    projects.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(projects));
  };

  return {
    retrieve,
    save,
    removeProject,
  };
})();

export { storage as default };
