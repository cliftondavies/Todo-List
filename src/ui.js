import Storage from './storage';
import content from './content';
import Project from './project';
import Todo from './todo';

const UI = class {
  // render default project with all the todos in storage
  // render projects and todos by category
  static render() {
    const list = Storage.retrieve();

    list.forEach(project => {
      content.createProjectCard(project);

      if (project.list.length > 0) {
        content.createTodosWrapper(project.projectName);

        project.list.forEach(todo => {
          content.collapsedTodoCard(todo);
          content.expandedTodoCard(todo);
        });
      }
    });
  }

  // view project form
  static viewProjectForm() {
    content.projectForm().classList.toggle('show-project-form-class');
  }

  // view todo form
  static viewTodoForm() {
    content.todoForm().classList.toggle('show-todo-form-class');
  }

  // create a new project category
  static createProject(event) {
    const projectName = document.querySelector('.project-name').value;
    const project = new Project(projectName);

    content.createProjectCard(project);
    Storage.save(project);
    event.preventDefault();
  }

  // create a new todo
  static createTodo(event) {
    const todoTitle = document.querySelector('.todo-title').value;
    const todoDescription = document.querySelector('.todo-description').value;
    const todoDueDate = document.querySelector('.todo-date').value;
    const todoPriority = document.querySelector('.todo-priority').value;
    const todoCategory = document.querySelector('.todo-category').value;
    const todo = new Todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoCategory);

    content.collapsedTodoCard(todo);
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

  // set todo as complete

  // change priority

  // delete todo

  // delete project (nice to have)

  // choose which projects a todo goes into (implement at creation of todo or after)
};

export { UI as default };
