import Project from './project';

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
    const createProjectBtn = createHTMLTag('button', 'createProjectBtn', null, 'Add a Project');
    const createTodoBtn = createHTMLTag('button', 'createTodoBtn', null, 'Add a Todo'); // add button type attribute to all buttons outside forms
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
    const projectForm = createHTMLTag('form', 'project-form');
    const projectLabel = createHTMLTag('label', 'project-label', null, 'Project Name');
    const projectName = createHTMLTag('input', 'project-name', 'project-name'); // input type text by default?
    const projectSubmit = createHTMLTag('input', 'submit-project');

    projectLabel.setAttribute('for', 'project-name');
    projectName.setAttribute('type', 'text'); // text input is default (try not to specify these when refactoring)
    projectName.setAttribute('name', 'project-name');
    projectSubmit.setAttribute('type', 'submit');
    projectSubmit.setAttribute('value', 'Create Project');

    projectForm.appendChild(projectLabel);
    projectForm.appendChild(projectName);
    projectForm.appendChild(projectSubmit);
    formWrapper.appendChild(projectForm);
    overallWrapper.insertBefore(formWrapper, mainWrapper);
  };

  const addSelectOption = (selectInput) => {
    Project.categories.forEach(c => {
      const option = document.createElement('option');
      option.textContent = c.charAt(0).toUpperCase() + c.slice(1);
      option.setAttribute('value', c.toLowerCase());
      selectInput.appendChild(option);
    });
  };

  const todoForm = () => { // to refactor
    const formWrapper = createHTMLTag('div', 'todo-form-wrapper-hidden');
    const todoForm = createHTMLTag('form', 'todo-form');
    const titleLabel = createHTMLTag('label', 'todo-label', null, 'Todo Title');
    const todoTitle = createHTMLTag('input', 'todo-title', 'todo-title');
    const descriptionLabel = createHTMLTag('label', 'todo-label', null, 'Todo Description');
    const todoDescription = createHTMLTag('input', 'todo-description', 'todo-description');
    const dueDateLabel = createHTMLTag('label', 'todo-label', null, 'Todo Due Date');
    const todoDueDate = createHTMLTag('input', 'todo-duedate', 'todo-duedate');
    const priorityLabel = createHTMLTag('label', 'todo-label', null, 'Select Todo Priority:');
    const lowPriorityLabel = createHTMLTag('label', 'todo-label', null, 'Low Todo Priority');
    const lowTodoPriority = createHTMLTag('input', 'todo-priority', 'low-todo-priority');
    const highPriorityLabel = createHTMLTag('label', 'todo-label', null, 'High Todo Priority');
    const highTodoPriority = createHTMLTag('input', 'todo-priority', 'high-todo-priority');
    const categoryLabel = createHTMLTag('label', 'todo-label', null, 'Choose a Todo Category:');
    const todoCategory = createHTMLTag('select', 'todo-category', 'todo-category');

    // call selectOption here?

    const todoSubmit = createHTMLTag('input', 'submit-Todo');

    titleLabel.setAttribute('for', 'todo-title');
    todoTitle.setAttribute('type', 'text');
    todoTitle.setAttribute('name', 'todo-title');
    descriptionLabel.setAttribute('for', 'todo-description');
    todoDescription.setAttribute('type', 'text');
    todoDescription.setAttribute('name', 'todo-description');
    dueDateLabel.setAttribute('for', 'todo-duedate');
    todoDueDate.setAttribute('type', 'date');
    todoDueDate.setAttribute('name', 'todo-duedate');
    lowPriorityLabel.setAttribute('for', 'low-todo-priority');
    lowTodoPriority.setAttribute('type', 'radio');
    lowTodoPriority.setAttribute('name', 'todo-priority');
    lowTodoPriority.setAttribute('value', 'Low');
    lowTodoPriority.setAttribute('checked'); // check if only one param
    highPriorityLabel.setAttribute('for', 'high-todo-priority');
    highTodoPriority.setAttribute('type', 'radio');
    highTodoPriority.setAttribute('name', 'todo-priority');
    highTodoPriority.setAttribute('value', 'High');
    categoryLabel.setAttribute('for', 'todo-category');
    todoCategory.setAttribute('name', 'todo-category');
    todoSubmit.setAttribute('type', 'submit'); // and name attr
    todoSubmit.setAttribute('value', 'Create Todo');

    todoForm.appendChild(titleLabel);
    todoForm.appendChild(todoTitle);
    todoForm.appendChild(descriptionLabel);
    todoForm.appendChild(todoDescription);
    todoForm.appendChild(dueDateLabel);
    todoForm.appendChild(todoDueDate);
    todoForm.appendChild(priorityLabel);
    todoForm.appendChild(lowPriorityLabel);
    todoForm.appendChild(lowTodoPriority);
    todoForm.appendChild(highPriorityLabel);
    todoForm.appendChild(highTodoPriority);
    todoForm.appendChild(categoryLabel);
    todoForm.appendChild(todoCategory);
    todoForm.appendChild(todoSubmit);
    formWrapper.appendChild(todoForm);
    overallWrapper.insertBefore(formWrapper, mainWrapper);
  };

  // create project card
  const createProjectCard = (project) => {
    const projectColumn = document.querySelector('.project-column');
    const projectCard = createHTMLTag('li', 'project-card'); // check if li element is clickable, otherwise change to a tag
    const projectHeading = createHTMLTag('h3', 'project-heading', null, project.projectName);
    const deleteBtn = createHTMLTag('button', 'delete-project-btn', null, 'X');

    projectCard.appendChild(projectHeading);
    projectCard.appendChild(deleteBtn);
    projectColumn.appendChild(projectCard);
  };

  // create wrapper for each list within todo column
  const createTodosWrapper = (id) => {
    const todoColumn = document.querySelector('.todo-column');
    const todosWrapper = createHTMLTag('div', 'todos-wrapper-hidden', id); // show todo wrapper class when project category is clicked

    todoColumn.appendChild(todosWrapper);
  };

  // create collapsed todo card
  const collapsedTodoCard = (todo) => {
    const todoWrapper = document.querySelector('.todos-wrapper-hidden');
    const todoCard = createHTMLTag('div', 'collapsed-todo-card');
    const todoTitle = createHTMLTag('h3', 'todo-title', null, todo.Title);
    const todoDate = createHTMLTag('span', 'todo-date', null, todo.dueDate);
    const deleteBtn = createHTMLTag('button', 'delete-todo-btn', null, 'X');

    todoCard.setAttribute('data-id', 'todo.id');
    todoCard.setAttribute('data-category', 'todo.category');

    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDate);
    todoCard.appendChild(deleteBtn);
    todoWrapper.appendChild(todoCard);
  };

  // create expanded todo card
  const expandedTodoCard = (todo) => {
    const todoWrapper = document.querySelector('.todos-wrapper-hidden');
    const todoCard = createHTMLTag('div', 'expanded-todo-card');
    const todoTitle = createHTMLTag('h3', 'todo-title', null, todo.Title);
    const todoDescription = createHTMLTag('p', 'todo-description', todo.description);
    const todoDate = createHTMLTag('span', 'todo-date', null, todo.dueDate);
    const todoPriority = createHTMLTag('button', 'todo-priority', null, todo.priority);
    const todoCompleted = createHTMLTag('button', 'todo-completed', null, todo.completed);
    const deleteBtn = createHTMLTag('button', 'delete-todo-btn', null, 'X');

    todoCard.setAttribute('data-id', 'todo.id');
    todoCard.setAttribute('data-category', 'todo.category');

    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDescription);
    todoCard.appendChild(todoDate);
    todoCard.appendChild(todoPriority);
    todoCard.appendChild(todoCompleted);
    todoCard.appendChild(deleteBtn);
    todoWrapper.appendChild(todoCard);
  };

  // set project colour on creation (nice to have)
  // change todo colour based on priority (nice to have)

  return {
    staticPage,
    projectForm,
    addSelectOption,
    todoForm,
    createProjectCard,
    createTodosWrapper,
    collapsedTodoCard,
    expandedTodoCard,
  };
};

export { content as default };
