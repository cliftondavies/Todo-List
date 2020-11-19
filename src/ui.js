import Storage from './storage';
import content from './content';
import Project from './project';
import Todo from './todo';

const UI = class {
  // render default project with all the todos in storage & render projects and todos by category
  static render() {
    const projects = Storage.retrieve();

    const categorySelect = document.querySelector('#todo-category');

    Project.getAllCategories(projects).forEach(c => {
      content().addSelectOption(categorySelect, projects, c);
    });

    projects.forEach(project => {
      content().createProjectCard(project);

      if (project.list.length > 0) { // look into this
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
    const projectFormWrap = document.querySelector('.project-form-wrapper-hidden');

    projectFormWrap.classList.toggle('show-project-form');
  }

  // view todo form
  static viewTodoForm() {
    const todoFormWrap = document.querySelector('.todo-form-wrapper-hidden');

    todoFormWrap.classList.toggle('show-todo-form');
  }

  // create a new project category
  static createProject(event) {
    const projectName = document.querySelector('.project-name').value;
    const categorySelect = document.querySelector('#todo-category');
    const project = new Project(projectName);

    Storage.save(project);
    content().createProjectCard(project);
    const projects = Storage.getList();
    content().addSelectOption(categorySelect, projects);
    event.preventDefault();
  }

  // create a new todo
  static createTodo(event) {
    const todoTitle = document.querySelector('.todo-title').value;
    const todoDescription = document.querySelector('.todo-description').value;
    const todoDueDate = document.querySelector('.todo-duedate').value;
    // const todoPriority = document.querySelector('.todo-priority').value;
    // const todoCategory = document.querySelector('.todo-category').value;
    const todoPriority = document.querySelector('input[name="todo-priority"]:checked').value;
    const todoCategory = document.querySelector('input[name="category"]:checked').value; // checked for select too?
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

    if (target.textContent !== 'Delete') { project.saveTodo(todo, todoIndex); }

    Storage.save(project, projectIndex);
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
