const content = () => {
  const container = document.getElementById('main');
  const wrapper = document.getElementById('wrapper');

  const createHTMLTag = (tag, id = null, klass, textContent = null) => {
    const htmlElement = document.createElement(`${tag}`);
    if (id) htmlElement.id = id;
    htmlElement.className += `${klass}`;
    if (textContent) htmlElement.textContent = textContent;
    return htmlElement;
  };

  const projectForm = () => {
    const formWrapper = createHTMLTag('div', 'project-form-wrapper', 'project-form');
    const projectForm = createHTMLTag('form', 'project-form', 'form');
    const projectInput = createHTMLTag('input', 'project-input', 'input');
    const projectButton = createHTMLTag('button', 'project-button', 'button', 'create project');

    container.insertBefore(formWrapper, wrapper);
    formWrapper.appendChild(projectForm);
    projectForm.appendChild(projectInput);
    projectForm.appendChild(projectButton);
  };

  const todoForm = () => {
    const formWrapper = createHTMLTag('div', 'todo-form-wrapper', 'todo-form');
    const todoForm = createHTMLTag('form', 'todo-form', 'form');
    const todoTitleInput = createHTMLTag('input', 'todo-title-input', 'input');
    const todoDescriptionInput = createHTMLTag('input', 'todo-description-input', 'input');
    const todoDueDateInput = createHTMLTag('input', 'todo-duedate-input', 'input');
    const todoPriorityInput = createHTMLTag('input', 'todo-priority-input', 'input');
    const todoCategoryInput = createHTMLTag('input', 'todo-category-input', 'input');
    const todoButton = createHTMLTag('button', 'todo-button', 'button', 'create  todo');

    container.insertBefore(formWrapper, wrapper);
    formWrapper.appendChild(todoForm);
    todoForm.appendChild(todoTitleInput);
    todoForm.appendChild(todoDescriptionInput);
    todoForm.appendChild(todoDueDateInput);
    todoForm.appendChild(todoPriorityInput);
    todoForm.appendChild(todoCategoryInput);
    todoForm.appendChild(todoButton);
  };

  const mainPage = () => {
    const container = createHTMLTag('main', 'main', 'main');
    document.body.appendChild(container);
    const navBar = createHTMLTag('nav', 'nav', 'nav');
    const createProjectBtn = createHTMLTag('button', 'createProjectBtn', 'navBtn', 'create project');
    const createTodoBtn = createHTMLTag('button', 'createTodoBtn', 'navBtn', 'create todo');
    container.appendChild(navBar);
    navBar.appendChild(createProjectBtn);
    navBar.appendChild(createTodoBtn);
    const wrapper = createHTMLTag('div', 'wrapper', 'wrapper');
    const projectColumn = createHTMLTag('section', 'project-column', 'project-column', 'project column');
    const todoColumn = createHTMLTag('section', 'todo-column', 'todo-column', 'todo clmn');
    container.appendChild(wrapper);
    wrapper.appendChild(projectColumn);
    wrapper.appendChild(todoColumn);
  };

  // create project card
  const createProjectCard = (project) => {
    const projectColumn = document.querySelector('.projet-column');
    const projectCard = createHTMLTag('article', 'project-card', `${project.projectName}`);
    projectColumn.appendChild(projectCard);
  };

  // create collapsed todo card
  const collapsedTodoCard = (todo) => {
    const todoColumn = document.querySelector('.todo-column');
    const todoCard = createHTMLTag('article', 'todo-card');
    const todoTitle = createHTMLTag('span', 'todo-title', `${todo.Title}`);
    const todoDate = createHTMLTag('span', 'todo-date', `${todo.dueDate}`);
    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDate);
    todoColumn.appendChild(todoCard);
  };

  // create expanded todo card
  const expandedTodoCard = (todo) => {
    const todoColumn = document.querySelector('.todo-column');
    const todoCard = createHTMLTag('article', 'todo-card', '');
    const todoTitle = createHTMLTag('h3', 'todo-title', `${todo.Title}`);
    const todoDescription = createHTMLTag('h4', 'todo-description', `${todo.description}`);
    const todoDate = createHTMLTag('span', 'todo-date', `${todo.dueDate}`);
    const todoPriority = createHTMLTag('button', 'todo-priority', `${todo.priority}`);
    const todoCompleted = createHTMLTag('button', 'todo-priority', `${todo.completed}`);
    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDescription);
    todoCard.appendChild(todoDate);
    todoCard.appendChild(todoPriority);
    todoCard.appendChild(todoCompleted);
    todoColumn.appendChild(todoCard);
  };

  // set project colour on creation (nice to have)
  // change todo colour based on priority (nice to have)

  return {
    mainPage,
    projectForm,
    todoForm,
    createProjectCard,
    collapsedTodoCard,
    expandedTodoCard,
  };
};

export { content as default };
