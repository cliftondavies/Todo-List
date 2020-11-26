import storage from './storage';
import content from './content';
import Project from './project';
import Todo from './todo';

const ui = (() => {
  // render projects and todos by project category
  const render = () => {
    const projects = storage.retrieve();
    const categorySelect = document.querySelector('#todo-category');

    Project.getAllCategories(projects).forEach(c => {
      content.addSelectOption(categorySelect, projects, c);
    });

    projects.forEach(project => {
      content.createProjectCard(project);

      const todosWrapperID = project.projectName.split(' ').join('-');

      content.createTodosWrapper(todosWrapperID);

      const todosWrapper = document.querySelector(`#${todosWrapperID}`);

      if (project.list.length > 0) {
        project.list.forEach(todo => {
          // call 28 & 29 from content module
          todosWrapper.appendChild(content.collapsedTodoCard(todo));
          todosWrapper.appendChild(content.expandedTodoCard(todo));

          if (project.projectName === 'general') {
            const defaultWrapper = document.querySelector('#general');

            content.toggleClass(defaultWrapper, 'show-todo-wrapper');
          }
        });
      }
    });
  };

  // view project form
  const viewProjectForm = () => {
    const projectFormWrap = document.querySelector('.project-form-wrapper-hidden');

    content.toggleClass(projectFormWrap, 'show-project-form');
  };

  // view todo form
  const viewTodoForm = () => {
    const todoFormWrap = document.querySelector('.todo-form-wrapper-hidden');

    content.toggleClass(todoFormWrap, 'show-todo-form');
  };

  // create a new project category
  const createProject = (event) => {
    const projectName = document.querySelector('.project-name').value;
    const categorySelect = document.querySelector('#todo-category');
    const project = new Project(projectName);

    storage.save(project);
    content.createProjectCard(project);

    const projects = storage.retrieve();
    const todosWrapperID = projectName.toLowerCase().split(' ').join('-');

    content.addSelectOption(categorySelect, projects);
    content.createTodosWrapper(todosWrapperID);
    event.preventDefault();
  };

  // create a new todo
  const createTodo = (event) => {
    const todoTitle = document.querySelector('.todo-title').value;
    const todoDescription = document.querySelector('.todo-description').value;
    const todoDueDate = document.querySelector('.todo-duedate').value;
    const todoPriority = document.querySelector('input[name="todo-priority"]:checked').value;
    const todoCategory = document.querySelector('#todo-category').value;
    const todo = new Todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoCategory);

    storage.save(todo);

    const todosWrapperID = todoCategory.toLowerCase().split(' ').join('-');
    const todosWrapper = document.querySelector(`#${todosWrapperID}`);

    // call 87 & 88 from content module
    todosWrapper.appendChild(content.collapsedTodoCard(todo));
    todosWrapper.appendChild(content.expandedTodoCard(todo));

    const elementsOnShow = document.getElementsByClassName('show-todo-wrapper');

    Array.from(elementsOnShow).forEach(element => { content.toggleClass(element, 'show-todo-wrapper'); });
    content.toggleClass(todosWrapper, 'show-todo-wrapper');
    event.preventDefault();
  };

  // show list of todos within a given project
  const showProjectList = (projectHeading) => {
    const todosWrapperID = projectHeading.toLowerCase().split(' ').join('-');
    const todosWrapper = document.querySelector(`#${todosWrapperID}`);
    const elementsOnShow = document.getElementsByClassName('show-todo-wrapper');

    Array.from(elementsOnShow).forEach(element => { content.toggleClass(element, 'show-todo-wrapper'); });

    if (todosWrapper) { content.toggleClass(todosWrapper, 'show-todo-wrapper'); }
  };

  // expand todo. [select ctc with same id]
  const expandTodo = (dataID) => {
    const collapsedTodoCard = document.querySelector(`span[data-id="${dataID}"]`);

    if (collapsedTodoCard) {
      content.toggleClass(collapsedTodoCard.parentNode, 'expanded-todo-card');
      content.toggleClass(collapsedTodoCard.parentNode.nextSibling, 'show-todo-card');
    }
  };

  // edit todo: update status and priority, and delete. [send parent as target]
  const editTodo = (target) => {
    const projects = storage.retrieve();
    const todoID = target.dataset.id;
    const todoCategory = target.dataset.category;
    const project = projects.find(project => project.projectName === todoCategory);
    const projectIndex = projects.indexOf(project);
    const todo = project.list.find(todo => todo.id === todoID);
    const todoIndex = project.list.indexOf(todo);
    const projectCopy = Object.assign(new Project(), project);
    const todoCopy = Object.assign(new Todo(), todo);

    if (target.textContent === 'Complete') {
      content.updateTargetContent(target);
      todoCopy.updateStatus();
    } else if (target.textContent === 'Incomplete') {
      content.updateTargetContent(target);
      todoCopy.updateStatus();
    } else if (target.textContent === 'High') {
      content.updateTargetContent(target);
      todoCopy.updatePriority();
    } else if (target.textContent === 'Low') {
      content.updateTargetContent(target);
      todoCopy.updatePriority();
    } else if (target.textContent === 'Delete') {
      projectCopy.deleteTodo(todoIndex);

      if (target) { content.removeTodoCards(target); }
    }

    if (target.textContent !== 'Delete') { projectCopy.saveTodo(todoCopy, todoIndex); }

    storage.save(projectCopy, projectIndex);
  };

  // delete project. [format heading]
  const deleteProject = () => {
    const projects = storage.retrieve();
    const projectCategory = document.querySelector('.project-heading').textContent;
    const project = projects.find(project => project.projectName === projectCategory);
    const index = projects.indexOf(project);

    storage.removeProject(projects, index);
  };

  return {
    render,
    viewProjectForm,
    viewTodoForm,
    createProject,
    createTodo,
    showProjectList,
    expandTodo,
    editTodo,
    deleteProject,
  };
})();

export { ui as default };
