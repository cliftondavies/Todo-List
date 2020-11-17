import Project from './project';

const Storage = class {
  // retrieve todo list (either all the todos or just the todos in a particular project category)
  static retrieve() {
    if (JSON.parse(localStorage.getItem('list'))) {
      JSON.parse(localStorage.getItem('list'));
    } else {
      const defaultProject = [new Project()];
      localStorage.setItem('list', JSON.stringify(defaultProject));
      JSON.parse(localStorage.getItem('list'));
    }
  }

  // save (project or todo object) to storage
  static save(obj) {
    const storedProjects = this.retrieve();

    if (obj instanceof Project) {
      storedProjects.push(obj);
    } else {
      const project = storedProjects.find(project => project.projectName === obj.category);
      const index = storedProjects.indexOf(project);
      project.addTodo(obj);
      storedProjects[index] = project;
    }

    localStorage.setItem('list', JSON.stringify(storedProjects));
  }

  // remove todo from a project list (implement here or in project class)

  // remove a project from the storage (nice to have)


  // const todolist = [
  //   {
  //     title: 'work',
  //     list_of_todos: [{
  //       title: 'todo-title1',
  //       description: 'todo description1',
  //       dueDate: 'todo due date',
  //       priority: 'todo-priority',
  //     },
  //     {
  //       title: 'todo-title2',
  //       description: 'todo description2',
  //       dueDate: 'todo due date',
  //       priority: 'todo-priority',
  //     }],
  //   },
  //   {
  //     title: 'shopping',
  //     list_of_todos: [{
  //       title: 'todo-title',
  //       description: 'todo description',
  //       dueDate: 'todo due date',
  //       priority: 'todo-priority',
  //     },
  //     {
  //       title: 'todo-title',
  //       description: 'todo description',
  //       dueDate: 'todo due date',
  //       priority: 'todo-priority',
  //     }],
  //   },
  // ];
};

export { Storage as default };
