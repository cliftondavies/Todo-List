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
        // const todosWrapperID = project.projectName.split(' ').join('-')
        content().createTodosWrapper(project.projectName); // pass todoWrapperID
        // const todosWrapper = document.querySelector(`#${project.projectName}`); // pass todoWrapperID

        project.list.forEach(todo => {
          content().collapsedTodoCard(todo);
          content().expandedTodoCard(todo);

          // todosWrapper.appendChild(content().collapsedTodoCard(todo));
          // todosWrapper.appendChild(content().expandedTodoCard(todo));
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
    const todoPriority = document.querySelector('input[name="todo-priority"]:checked').value;
    const todoCategory = document.querySelector('#todo-category').value;
    const todo = new Todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoCategory);

    Storage.save(todo);
    content().collapsedTodoCard(todo); // should this & eTC be done here or will render do this after save?
    event.preventDefault();
  }

  // show list of todos within a given project
  static showProjectList(projectHeading) {
    // projectHeading = projectHeading.toLowerCase().split(' ').join('-');
    const todosWrapper = document.querySelector(`#${projectHeading}`);
    todosWrapper.classList.toggle('show-todo-wrapper');
  }

  // expand todo
  static expandTodo() {
    const collapsedTodoCard = document.querySelector('.collapsed-todo-card');
    const expandedTodoCard = document.querySelector('.expanded-todo-card');

    collapsedTodoCard.classList.toggle('hide-todo-class');
    expandedTodoCard.classList.toggle('show-todo-class');
  }

  // expand todo
  // static expandTodo(dataID) {
  //   const collapsedTodoCard = document.querySelector(`span[data-id="${dataID}"]`);

  //   collapsedTodoCard.parentNode.classList.toggle('expanded-todo-card');
  //   collapsedTodoCard.parentNode.nextSibling.classList.toggle('show-todo-card');
  // }

  // edit todo: update status and priority, and delete
  static editTodo(target) {
    const projects = Storage.getList();
    const todoID = target.parent.dataset.id;
    const todoCategory = target.parent.dataset.category;
    const project = projects.find(project => project.projectName === todoCategory);
    const projectIndex = projects.indexOf(project);
    const todo = project.list.find(todo => todo.id === todoID);
    // console.log(typeof todo.id);
    // console.log(typeof todoID); // instanceof
    const todoIndex = project.list.indexOf(todo);

    if (target.textContent === 'Complete' || target.textContent === 'Incompleted') {
      todo.updateStatus();
    } else if (target.textContent === 'Delete') {
      project.deleteTodo(todo);
    } else {
      todo.updatePriority();
    }

    // if (target.textContent === 'Complete') {
    //   target.textContent = 'Incomplete';
    //   todo.completed = 'Incomplete';
    //   project.list[todoIndex] = todo; // re-save modified todo to project list
    // } else if (target.textContent === 'Incomplete') {
    //   target.textContent = 'Complete';
    //   todo.completed = 'Complete';
    //   project.list[todoIndex] = todo; // re-save modified todo to project list

    // } else if (target.textContent === 'High') {
    //   target.textContent = 'Low';
    //   todo.priority = 'Low';
    //   project.list[todoIndex] = todo; // re-save modified todo to project list

    // } else if (target.textContent === 'Low') {
    //   target.textContent = 'High';
    //   todo.priority = 'High';
    //   project.list[todoIndex] = todo; // re-save modified todo to project list
    // } else if (target.textContent === 'Delete') {
    //   // project.deleteTodo(todo);
    //   // const index = project.list.indexOf(todo);
    //   console.log(todo);
    //   console.log(todoIndex);

    //   project.list.splice(todoIndex, 1);
    //   target.parentNode.remove();
    // }

    // projects[projectIndex] = project;
    // localStorage.setItem('list', JSON.stringify(projects));
    // // Storage.save(project, projectIndex); // re-save modified project to storage

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
