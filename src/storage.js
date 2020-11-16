const Storage = class {
  // retrieve todo list (either all the todos or just the todos in a particular project category)
  static retrieve() {
    if (JSON.parse(localStorage.getItem('list'))) {
      return JSON.parse(localStorage.getItem('list'));
    } else {
      const defaultProject = [new Project()];
      localStorage.setItem('list', JSON.stringify(defaultProject));
      return JSON.parse(localStorage.getItem('list'));
    }
  }

  // save project
  static save(project) {
    const storedProjects = this.retrieve();
    storedProjects.push(project);
    localStorage.setItem('list', JSON.stringify(storedProjects));
  }

  // save todo to the storage
    // const saveTodo = () => {
    //   const title =
    //   const
    //   const id = Todo.incrementId;
    //   const todo = new Todo()

    //   const list = localStorage.getItem
    //   const getProject = list.find(where category of project is ==)
    //   getProject.list.push(todo)
    //   list.push(getProject)
    //   localStorage.setItem('', '')
  // }

  // remove todo from a project list (implement here or in project class)

  // remove a project from the storage (nice to have)

  const todolist = [
    {
      title: 'work',
      list_of_todos: [{
        title: 'todo-title1',
        description: 'todo description1',
        dueDate: 'todo due date',
        priority: 'todo-priority',
      },
      {
        title: 'todo-title2',
        description: 'todo description2',
        dueDate: 'todo due date',
        priority: 'todo-priority',
      }],
    },
    {
      title: 'shopping',
      list_of_todos: [{
        title: 'todo-title',
        description: 'todo description',
        dueDate: 'todo due date',
        priority: 'todo-priority',
      },
      {
        title: 'todo-title',
        description: 'todo description',
        dueDate: 'todo due date',
        priority: 'todo-priority',
      }],
    },
  ];

}

export { Storage as default };
