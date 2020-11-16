import Storage from './storage';
import content from './content';

const UI = class {
  // render default project with all the todos in storage
  // render projects and todos by category
  static render() {
    const list = Storage.retrieve();

    for (let project of list) {
      content.createProjectCard(project);

      if (project.list.length > 0) {
        content.createTodosWrapper(project.projectName);

        for (let todo of project.list) {
          content.collapsedTodoCard(todo);
        }
      }
    }

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
    const author = document.getElementById('author').value;
    const title = document.querySelector('#title').value;
    const pages = document.getElementById('pages').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const id = document.querySelector('#id').value;

    const project = new Project(projectName);

    content.createProjectCard(project);
    Storage.save(project);
    event.preventDefault();
  }

  // create a new todo

  // expand todo

  // set todo as complete

  // change priority



  // delete todo

  // choose which projects a todo goes into (implement at creation of todo or after)

  // delete project (nice to have)
}
