import Project from './project';

const content = (() => {
  const createHTMLTag = (tag, klass, id = '', textContent = '') => {
    const htmlElement = document.createElement(tag);
    if (id) htmlElement.id = id;
    htmlElement.className = klass;
    if (textContent) htmlElement.textContent = textContent;
    return htmlElement;
  };

  // const overallWrapper = document.querySelector('.overall-wrapper');
  // const mainWrapper = document.querySelector('.main-wrapper');
  const overallWrapper = createHTMLTag('div', 'overall-wrapper');
  const mainWrapper = createHTMLTag('main', 'main-wrapper');
  overallWrapper.appendChild(mainWrapper);
  document.body.appendChild(overallWrapper);

  const staticPage = () => {
    // const overallWrapper = createHTMLTag('div', 'overall-wrapper');
    const createForms = createHTMLTag('section', 'create-forms');
    // add button type attribute to all buttons outside forms
    const createProjectBtn = createHTMLTag('button', 'createProjectBtn', '', 'Add a Project');
    const createTodoBtn = createHTMLTag('button', 'createTodoBtn', '', 'Add a Todo');
    // const mainWrapper = createHTMLTag('main', 'main-wrapper');
    const projectColumn = createHTMLTag('ul', 'project-column');
    const todoColumn = createHTMLTag('section', 'todo-column');

    createProjectBtn.setAttribute('type', 'button');
    createTodoBtn.setAttribute('type', 'button');

    createForms.appendChild(createProjectBtn);
    createForms.appendChild(createTodoBtn);
    mainWrapper.appendChild(projectColumn);
    mainWrapper.appendChild(todoColumn);
    overallWrapper.appendChild(createForms);
    // overallWrapper.appendChild(mainWrapper);
    // document.body.appendChild(overallWrapper);
  };

  const projectForm = () => {
    const formWrapper = createHTMLTag('div', 'project-form-wrapper-hidden');
    const projectForm = createHTMLTag('form', 'project-form');
    const projectLabel = createHTMLTag('label', 'project-label', '', 'Project Name');
    const projectName = createHTMLTag('input', 'project-name', 'project-name');
    const projectSubmit = createHTMLTag('input', 'submit-project');

    projectLabel.setAttribute('for', 'project-name');
    // projectName.setAttribute('type', 'text');
    projectName.setAttribute('name', 'project-name');
    projectSubmit.setAttribute('type', 'submit');
    projectSubmit.setAttribute('value', 'Create Project');

    projectForm.appendChild(projectLabel);
    projectForm.appendChild(projectName);
    projectForm.appendChild(projectSubmit);
    formWrapper.appendChild(projectForm);
    overallWrapper.insertBefore(formWrapper, mainWrapper);
  };

  const addSelectOption = (selectInput, projects, category = '') => {
    if (category === '') { category = Project.getLastAddedCategory(projects); }
    const option = document.createElement('option');
    option.textContent = category;
    option.setAttribute('value', category);
    selectInput.appendChild(option);
  };

  const todoForm = () => { // to refactor
    const formWrapper = createHTMLTag('div', 'todo-form-wrapper-hidden');
    const todoForm = createHTMLTag('form', 'todo-form');
    const titleLabel = createHTMLTag('label', 'todo-label', '', 'Todo Title');
    const todoTitle = createHTMLTag('input', 'todo-title', 'todo-title');
    const descriptionLabel = createHTMLTag('label', 'todo-label', '', 'Todo Description');
    const todoDescription = createHTMLTag('input', 'todo-description', 'todo-description');
    const dueDateLabel = createHTMLTag('label', 'todo-label', '', 'Todo Due Date');
    const todoDueDate = createHTMLTag('input', 'todo-duedate', 'todo-duedate');
    const priorityLabel = createHTMLTag('label', 'todo-label', '', 'Select Todo Priority:');
    const lowPriorityLabel = createHTMLTag('label', 'todo-label', '', 'Low Todo Priority');
    const lowTodoPriority = createHTMLTag('input', 'todo-priority', 'low-todo-priority');
    const highPriorityLabel = createHTMLTag('label', 'todo-label', '', 'High Todo Priority');
    const highTodoPriority = createHTMLTag('input', 'todo-priority', 'high-todo-priority');
    const categoryLabel = createHTMLTag('label', 'todo-label', '', 'Choose a Todo Category:');
    const todoCategory = createHTMLTag('select', 'todo-category', 'todo-category');
    const todoSubmit = createHTMLTag('input', 'submit-todo');

    titleLabel.setAttribute('for', 'todo-title');
    // todoTitle.setAttribute('type', 'text');
    todoTitle.setAttribute('name', 'todo-title');
    descriptionLabel.setAttribute('for', 'todo-description');
    // todoDescription.setAttribute('type', 'text');
    todoDescription.setAttribute('name', 'todo-description');
    dueDateLabel.setAttribute('for', 'todo-duedate');
    todoDueDate.setAttribute('type', 'date');
    todoDueDate.setAttribute('name', 'todo-duedate');
    lowPriorityLabel.setAttribute('for', 'low-todo-priority');
    lowTodoPriority.setAttribute('type', 'radio');
    lowTodoPriority.setAttribute('name', 'todo-priority');
    lowTodoPriority.setAttribute('value', 'Low');
    lowTodoPriority.setAttribute('checked', '');
    highPriorityLabel.setAttribute('for', 'high-todo-priority');
    highTodoPriority.setAttribute('type', 'radio');
    highTodoPriority.setAttribute('name', 'todo-priority');
    highTodoPriority.setAttribute('value', 'High');
    categoryLabel.setAttribute('for', 'todo-category');
    todoCategory.setAttribute('name', 'todo-category');
    todoSubmit.setAttribute('type', 'submit');
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
    const projectHeading = createHTMLTag('h3', 'project-heading', '', project.projectName);
    // .charAt(0).toUpperCase() + project.projectName.slice(1); Titlecase heading
    const deleteBtn = createHTMLTag('button', 'delete-project-btn', '', 'X');

    deleteBtn.setAttribute('type', 'button');

    projectCard.appendChild(projectHeading);
    projectCard.appendChild(deleteBtn);
    projectColumn.appendChild(projectCard);
  };

  // create wrapper for each list within todo column
  const createTodosWrapper = (projectNameAsID) => {
    const todoColumn = document.querySelector('.todo-column');
    const todosWrapper = createHTMLTag('div', 'todos-wrapper-hidden', projectNameAsID); // show todo wrapper class when project category is clicked

    todoColumn.appendChild(todosWrapper);
  };

  // create collapsed todo card
  const collapsedTodoCard = (todo) => {
    // const todoWrapper = document.querySelector('.todos-wrapper-hidden');
    const todoCard = createHTMLTag('div', 'collapsed-todo-card');
    const todoTitle = createHTMLTag('h3', 'todo-title', '', todo.Title);
    const todoDate = createHTMLTag('span', 'todo-date', '', todo.dueDate);
    const deleteBtn = createHTMLTag('button', 'delete-todo-btn', '', 'X');

    todoCard.setAttribute('data-id', todo.id);
    todoCard.setAttribute('data-category', todo.category);
    deleteBtn.setAttribute('type', 'button');

    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDate);
    todoCard.appendChild(deleteBtn);
    // todoWrapper.appendChild(todoCard);

    return todoCard;
  };

  // create expanded todo card
  const expandedTodoCard = (todo) => {
    // const todoWrapper = document.querySelector('.todos-wrapper-hidden');
    const todoCard = createHTMLTag('div', 'expanded-todo-card');
    const todoTitle = createHTMLTag('h3', 'todo-title', '', todo.Title);
    const todoDescription = createHTMLTag('p', 'todo-description', todo.description);
    const todoDate = createHTMLTag('span', 'todo-date', '', todo.dueDate);
    const todoPriority = createHTMLTag('button', 'todo-priority', '', todo.priority);
    const todoCompleted = createHTMLTag('button', 'todo-completed', '', todo.completed);
    const deleteBtn = createHTMLTag('button', 'delete-todo-btn', '', 'X');

    todoCard.setAttribute('data-id', todo.id);
    todoCard.setAttribute('data-category', todo.category);
    deleteBtn.setAttribute('type', 'button');

    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDescription);
    todoCard.appendChild(todoDate);
    todoCard.appendChild(todoPriority);
    todoCard.appendChild(todoCompleted);
    todoCard.appendChild(deleteBtn);
    // todoWrapper.appendChild(todoCard);

    return todoCard;
  };

  const toggleClass = (element, className) => {
    element.classList.toggle(className);
  };

  const updateTargetContent = (target) => {
    if (target.textContent === 'Complete') {
      target.textContent = 'Incomplete';
    } else if (target.textContent === 'Incomplete') {
      target.textContent = 'Complete';
    } else if (target.textContent === 'High') {
      target.textContent = 'Low';
    } else if (target.textContent === 'Low') {
      target.textContent = 'High';
    }
  };

  const removeTodoCards = (target) => {
    target.parentNode.previousSibling.remove();
    target.parentNode.remove();
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
    toggleClass,
    updateTargetContent,
    removeTodoCards,
  };
})();

export { content as default };
