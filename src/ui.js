import Storage from './storage';
import content from './content';
import Project from './project';
import Todo from './todo';

const UI = class {
  // render default project with all the todos in storage
  // render projects and todos by category
  static render() {
    const list = Storage.retrieve();
    // add select here if list.length is one?

    list.forEach(project => {
      content().createProjectCard(project);

      if (project.list.length > 0) {
        content().createTodosWrapper(project.projectName);

        project.list.forEach(todo => {
          content().collapsedTodoCard(todo);
          content().expandedTodoCard(todo);
        });
      }
    });
  }

  // view project form
  static viewProjectForm() {
    const projectForm = document.querySelector('.project-form-wrapper-hidden');

    projectForm.classList.toggle('show-project-form');
  }

  // view todo form
  static viewTodoForm() {
    const todoForm = document.querySelector('.todo-form-wrapper-hidden');

    todoForm.classList.toggle('show-todo-form');
  }

  // create a new project category
  static createProject(event) {
    const projectName = document.querySelector('.project-name').value;
    const project = new Project(projectName);

    content().createProjectCard(project);
    Storage.save(project);
    // update form select option with new project name after save here content().addSelectOption(selectInput)?
    event.preventDefault();
  }

  // create a new todo
  static createTodo(event) {
    const todoTitle = document.querySelector('.todo-title').value;
    const todoDescription = document.querySelector('.todo-description').value;
    const todoDueDate = document.querySelector('.todo-duedate').value;
    const todoPriority = document.querySelector('.todo-priority').value;
    const todoCategory = document.querySelector('.todo-category').value;
    const todo = new Todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoCategory);

    content().collapsedTodoCard(todo);
    Storage.save(todo);
    event.preventDefault();
  }

  // expand todo
  static expandTodo() {
    const collapsedTodoCard = document.querySelector('.collapsed-todo-card');
    const expandedTodoCard = document.querySelector('.expanded-todo-card');

    collapsedTodoCard.classList.toggle('hide-todo-class');
    expandedTodoCard.classList.toggle('show-todo-class');
  }

  // edit todo: update status and priority, and delete
  static editTodo(target) {
    const projects = Storage.getList();
    const todoID = target.parent.dataset.id;
    const todoCategory = target.parent.dataset.category;
    const project = projects.find(project => project.projectName === todoCategory);
    const projectIndex = projects.indexOf(project);
    const todo = project.list.find(todo => todo.id === todoID);
    const todoIndex = project.list.indexOf(todo);

    if (target.textContent === 'Complete' || target.textContent === 'Incompleted') {
      todo.updateStatus();
    } else if (target.textContent === 'Delete') {
      project.deleteTodo(todo);
    } else {
      todo.updatePriority();
    }

    // project.addTodo(todo);
    project.list[todoIndex] = todo; // no todoIndex if todo has been deleted from project list
    projects[projectIndex] = project;
    localStorage.setItem('list', JSON.stringify(projects));
  }

  // delete project
  static deleteProject() {
    const projects = Storage.getList();
    const projectCategory = document.querySelector('.project-heading').textContent;
    const project = projects.find(project => project.projectName === projectCategory);
    const index = projects.indexOf(project);

    Storage.removeProject(projects, index);
  }
};

export { UI as default };
