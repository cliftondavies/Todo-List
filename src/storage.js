import Project from './project';

const storage = (() => {
  // retrieve all projects ans todosfrom storage
  const retrieve = () => {
    if (JSON.parse(localStorage.getItem('list')) === null) {
      const defaultProject = [new Project()];
      localStorage.setItem('list', JSON.stringify(defaultProject));
    }
    return JSON.parse(localStorage.getItem('list'));
  };

  // update the storage with a project or todo item
  const save = (obj, index = null) => {
    const storedProjects = storage.retrieve();

    if (index || index === 0) {
      storedProjects[index] = obj;
    } else if (obj instanceof Project) {
      storedProjects.push(obj);
    } else {
      const project = storedProjects.find(project => project.projectName === obj.category);
      const index = storedProjects.indexOf(project);
      const projectCopy = Object.assign(new Project(), project);

      projectCopy.saveTodo(obj);
      storedProjects[index] = projectCopy;
    }

    localStorage.setItem('list', JSON.stringify(storedProjects));
  };

  // remove project from storage
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
