const content = () => {
  const overallWrapper = document.getElementById('overall-wrapper');
  const mainWrapper = document.getElementById('main-wrapper');

  const createHTMLTag = (tag, klass, id = null, textContent = null) => { // how to do two optional parameters? // input type
    const htmlElement = document.createElement(`${tag}`);
    if (id) htmlElement.id = id;
    htmlElement.className += `${klass}`;
    if (textContent) htmlElement.textContent = textContent;
    return htmlElement;
  };

  const staticPage = () => {
    const overallWrapper = createHTMLTag('div', 'overall-wrapper');
    const createForms = createHTMLTag('section', 'create-forms');
    const createProjectBtn = createHTMLTag('button', 'createProjectBtn', 'Add a Project');
    const createTodoBtn = createHTMLTag('button', 'createTodoBtn', 'Add a Todo');
    const mainWrapper = createHTMLTag('main', 'main-wrapper');
    const projectColumn = createHTMLTag('ul', 'project-column');
    const todoColumn = createHTMLTag('section', 'todo-column');

    createForms.appendChild(createProjectBtn);
    createForms.appendChild(createTodoBtn);
    mainWrapper.appendChild(projectColumn);
    mainWrapper.appendChild(todoColumn);
    overallWrapper.appendChild(createForms);
    overallWrapper.appendChild(mainWrapper);
    document.body.appendChild(overallWrapper);
  };

  const projectForm = () => {
    const formWrapper = createHTMLTag('div', 'project-form-wrapper-hidden');
    const projectForm = createHTMLTag('form', 'project-form',);
    const projectName = createHTMLTag('input', 'project-name');
    const createBtn = createHTMLTag('button', 'project-button', 'Create Project');

    projectForm.appendChild(projectName);
    projectForm.appendChild(createBtn);
    formWrapper.appendChild(projectForm);
    overallWrapper.insertBefore(formWrapper, mainWrapper);

    return formWrapper;
  };

  const todoForm = () => {
    const formWrapper = createHTMLTag('div', 'todo-form-wrapper-hidden');
    const todoForm = createHTMLTag('form', 'todo-form');
    const todoTitle = createHTMLTag('input', 'todo-title');
    const todoDescription = createHTMLTag('input', 'todo-description');
    const todoDueDate = createHTMLTag('input', 'todo-duedate');
    const todoPriority = createHTMLTag('input', 'todo-priority');
    const todoCategory = createHTMLTag('input', 'todo-category');
    const createBtn = createHTMLTag('button', 'todo-button', 'Create Todo');

    todoForm.appendChild(todoTitle);
    todoForm.appendChild(todoDescription);
    todoForm.appendChild(todoDueDate);
    todoForm.appendChild(todoPriority);
    todoForm.appendChild(todoCategory);
    todoForm.appendChild(createBtn);
    formWrapper.appendChild(todoForm);
    overallWrapper.insertBefore(formWrapper, mainWrapper);

    return formWrapper;
  };

  // create project card
  const createProjectCard = (project) => {
    const projectColumn = document.querySelector('.project-column');
    const projectCard = createHTMLTag('li', 'project-card', `${project.projectName}`);
    projectColumn.appendChild(projectCard);
  };

  // create wrapper within todo column
  const createTodosWrapper = (id) => {
    const todoColumn = document.querySelector('.todo-column');
    const todosWrapper = createHTMLTag('div', 'todos-wrapper-hidden', id); //show todo wrapper class when project category is clicked
    todoColumn.appendChild(todosWrapper);
  }

  // create collapsed todo card
  const collapsedTodoCard = (todo) => {
    const todoWrapper = document.querySelector('.todos-wrapper-hidden');
    const todoCard = createHTMLTag('div', 'todo-card');
    const todoTitle = createHTMLTag('h3', 'todo-title', `${todo.Title}`);
    const todoDate = createHTMLTag('span', 'todo-date', `${todo.dueDate}`);
    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDate);
    todoWrapper.appendChild(todoCard);
  };

  // create expanded todo card
  const expandedTodoCard = (todo) => {
    const todoWrapper = document.querySelector('.todos-wrapper-hidden');
    const todoCard = createHTMLTag('div', 'todo-card');
    const todoTitle = createHTMLTag('h3', 'todo-title', `${todo.Title}`);
    const todoDescription = createHTMLTag('p', 'todo-description', `${todo.description}`);
    const todoDate = createHTMLTag('span', 'todo-date', `${todo.dueDate}`);
    const todoPriority = createHTMLTag('button', 'todo-priority', `${todo.priority}`);
    const todoCompleted = createHTMLTag('button', 'todo-completed', `${todo.completed}`);
    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDescription);
    todoCard.appendChild(todoDate);
    todoCard.appendChild(todoPriority);
    todoCard.appendChild(todoCompleted);
    todoWrapper.appendChild(todoCard);
  };

  // set project colour on creation (nice to have)
  // change todo colour based on priority (nice to have)

  return {
    staticPage,
    projectForm,
    todoForm,
    createProjectCard,
    createTodosWrapper,
    collapsedTodoCard,
    expandedTodoCard,
  };
};

export { content as default };
