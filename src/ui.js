import storage from './storage';
import content from './content';
import Project from './project';
import Todo from './todo';

const ui = (() => {
  // render default project with all the todos in storage & render projects and todos by category
  const render = () => {
    const projects = storage.retrieve();
    const categorySelect = document.querySelector('#todo-category');

    Project.getAllCategories(projects).forEach(c => {
      content.addSelectOption(categorySelect, projects, c);
    });

    projects.forEach(project => {
      content.createProjectCard(project);

      if (project.list.length > 0) {
        const todosWrapperID = project.projectName.split(' ').join('-');
        content.createTodosWrapper(todosWrapperID);
        const todosWrapper = document.querySelector(`#${todosWrapperID}`);

        project.list.forEach(todo => {
          todosWrapper.appendChild(content.collapsedTodoCard(todo));
          todosWrapper.appendChild(content.expandedTodoCard(todo));
        });
      }
    });
  };

  // view project form
  const viewProjectForm = () => {
    const projectFormWrap = document.querySelector('.project-form-wrapper-hidden');

    // projectFormWrap.classList.toggle('show-project-form');
    content.toggleClass(projectFormWrap, 'show-project-form');
  };

  // view todo form
  const viewTodoForm = () => {
    const todoFormWrap = document.querySelector('.todo-form-wrapper-hidden');

    // todoFormWrap.classList.toggle('show-todo-form');
    content.toggleClass(todoFormWrap, 'show-todo-form');
  };

  // create a new project category
  const createProject = (event) => {
    const projectName = document.querySelector('.project-name').value;
    const categorySelect = document.querySelector('#todo-category');
    const project = new Project(projectName);

    storage.save(project);
    content.createProjectCard(project);
    const projects = storage.getList();
    content.addSelectOption(categorySelect, projects);
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
    content.collapsedTodoCard(todo); // should this & eTC be done here or will render do this after save?
    event.preventDefault();
  };

  // show list of todos within a given project
  const showProjectList = (projectHeading) => {
    projectHeading = projectHeading.toLowerCase().split(' ').join('-');
    const todosWrapper = document.querySelector(`#${projectHeading}`);
    // todosWrapper.classList.toggle('show-todo-wrapper');
    content.toggleClass(todosWrapper, 'show-todo-wrapper');
  };

  // expand todo
  const expandTodo = (dataID) => {
    const collapsedTodoCard = document.querySelector(`span[data-id="${dataID}"]`); // change span

    // collapsedTodoCard.parentNode.classList.toggle('expanded-todo-card');
    // collapsedTodoCard.parentNode.nextSibling.classList.toggle('show-todo-card');
    content.toggleClass(collapsedTodoCard.parentNode, 'expanded-todo-card');
    content.toggleClass(collapsedTodoCard.parentNode.nextSibling, 'show-todo-card');
  };

  // edit todo: update status and priority, and delete
  const editTodo = (target) => {
    const projects = storage.retrieve();
    const todoID = target.parent.dataset.id;
    const todoCategory = target.parent.dataset.category;
    const project = projects.find(project => project.projectName === todoCategory);
    const projectIndex = projects.indexOf(project);
    const todo = project.list.find(todo => todo.id === todoID);
    const todoIndex = project.list.indexOf(todo);

    if (target.textContent === 'Complete') {
      // target.textContent = 'Incomplete'; // update target content
      // todo.completed = 'Incomplete'; // update todo status property - todo.updateStatus()
      // project.list[todoIndex] = todo; // save todo to project list
      content.updateTargetContent(target);
      todo.updateStatus();
    } else if (target.textContent === 'Incomplete') {
      // target.textContent = 'Complete'; // update target content
      // todo.completed = 'Complete'; // update todo status property - todo.updateStatus()
      // project.list[todoIndex] = todo; // save todo to project list
      content.updateTargetContent(target);
      todo.updateStatus();
    } else if (target.textContent === 'High') {
      // target.textContent = 'Low'; // update target content
      // todo.priority = 'Low'; // update todo priority property - todo.updatePriority()
      // project.list[todoIndex] = todo; // save todo to project list
      content.updateTargetContent(target);
      todo.updatePriority();
    } else if (target.textContent === 'Low') {
      // target.textContent = 'High'; // update target content
      // todo.priority = 'High'; // update todo priority property - todo.updatePriority()
      // project.list[todoIndex] = todo; // save todo to project list
      content.updateTargetContent(target);
      todo.updatePriority();
    } else if (target.textContent === 'Delete') {
      // project.list.splice(todoIndex, 1); // remove todo from project list - project.deleteTodo(todo);
      // if (target) { target.parentNode.previousSibling.remove(); } // remove collapsed card
      // if (target) { target.parentNode.remove(); } // remove expanded card
      project.deleteTodo(todoIndex);
      if (target) { content.removeTodoCards(target); } // remove both collapsed and expanded cards
    }

    if (target.textContent !== 'Delete') { project.saveTodo(todo, todoIndex); } // save todo to project list

    storage.save(project, projectIndex); // save project to local storage
  };

  // delete project
  const deleteProject = () => {
    const projects = storage.retrieve();
    const projectCategory = document.querySelector('.project-heading').textContent; // to format heading
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
