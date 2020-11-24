import Project from './project';

const content = (() => {
  const createHTMLTag = (tag, klass, id = '', textContent = '') => {
    const htmlElement = document.createElement(tag);
    if (id) htmlElement.id = id;
    htmlElement.className = klass;
    if (textContent) htmlElement.textContent = textContent;
    return htmlElement;
  };

  const overallWrapper = createHTMLTag('div', 'overall-wrapper');
  const mainWrapper = createHTMLTag('main', 'main-wrapper');

  document.body.appendChild(overallWrapper);

  const staticPage = () => {
    const createForms = createHTMLTag('section', 'create-forms');
    const createProjectBtn = createHTMLTag('button', 'createProjectBtn', '', 'Add a Project');
    const createTodoBtn = createHTMLTag('button', 'createTodoBtn', '', 'Add a Todo');
    const projectColumn = createHTMLTag('section', 'project-column');
    const todoColumn = createHTMLTag('section', 'todo-column');

    createProjectBtn.setAttribute('type', 'button');
    createTodoBtn.setAttribute('type', 'button');

    createForms.appendChild(createProjectBtn);
    createForms.appendChild(createTodoBtn);
    mainWrapper.appendChild(projectColumn);
    mainWrapper.appendChild(todoColumn);
    overallWrapper.appendChild(createForms);
    overallWrapper.appendChild(mainWrapper);
  };

  const projectForm = () => {
    const formWrapper = createHTMLTag('div', 'project-form-wrapper-hidden');
    const projectForm = createHTMLTag('form', 'project-form');
    const projectLabel = createHTMLTag('label', 'project-label', '', 'Project Name');
    const projectName = createHTMLTag('input', 'project-name', 'project-name');
    const projectSubmit = createHTMLTag('input', 'submit-project');

    projectLabel.setAttribute('for', 'project-name');
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

  // To Refactor
  const todoForm = () => {
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
    todoTitle.setAttribute('name', 'todo-title');
    descriptionLabel.setAttribute('for', 'todo-description');
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

  // create project card. [Title project heading]
  const createProjectCard = (project) => {
    const projectColumn = document.querySelector('.project-column');
    const projectCard = createHTMLTag('div', 'project-card');
    const projectHeading = createHTMLTag('h3', 'project-heading', '', project.projectName);
    // textContent might return this too
    // const deleteBtn = createHTMLTag('button', 'delete-project-btn', '', 'Delete');

    // deleteBtn.setAttribute('type', 'button');

    projectCard.appendChild(projectHeading);
    // projectCard.appendChild(deleteBtn);
    projectColumn.appendChild(projectCard);
  };

  // create wrapper for each list within todo column
  const createTodosWrapper = (projectNameAsID) => {
    const todoColumn = document.querySelector('.todo-column');
    const todosWrapper = createHTMLTag('div', 'todos-wrapper-hidden', projectNameAsID);

    todoColumn.appendChild(todosWrapper);
  };

  // create collapsed todo card. [change span implementation to h3]
  const collapsedTodoCard = (todo) => {
    const todoCard = createHTMLTag('div', 'collapsed-todo-card');
    const todoTitle = createHTMLTag('h3', 'todo-title', '', todo.title);
    const todoDate = createHTMLTag('span', 'todo-date', '', todo.dueDate);
    // const deleteTodo = createHTMLTag('button', 'delete-todo-btn', '', 'Delete');

    todoCard.setAttribute('data-id', todo.id);
    todoTitle.setAttribute('data-id', todo.id);
    todoDate.setAttribute('data-id', todo.id);

    // deleteTodo.setAttribute('type', 'button');
    // deleteTodo.setAttribute('data-id', todo.id);
    // deleteTodo.setAttribute('data-category', todo.category);

    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDate);
    // todoCard.appendChild(deleteTodo);

    return todoCard;
  };

  // create expanded todo card
  const expandedTodoCard = (todo) => {
    const todoCard = createHTMLTag('div', 'expanded-todo-card');
    const todoTitle = createHTMLTag('h3', 'todo-title', '', todo.title);
    const todoDescription = createHTMLTag('p', 'todo-description', '', todo.description);
    const todoDate = createHTMLTag('span', 'todo-date', '', todo.dueDate);
    const todoPriority = createHTMLTag('button', 'todo-priority', '', todo.priority);
    const todoCompleted = createHTMLTag('button', 'todo-completed', '', todo.completed);
    const deleteTodo = createHTMLTag('button', 'delete-todo-btn', '', 'Delete');

    todoCard.setAttribute('data-id', todo.id);
    todoTitle.setAttribute('data-id', todo.id);
    todoDescription.setAttribute('data-id', todo.id);
    todoDate.setAttribute('data-id', todo.id);

    todoPriority.setAttribute('type', 'button');
    todoPriority.setAttribute('data-id', todo.id);
    todoPriority.setAttribute('data-category', todo.category);

    todoCompleted.setAttribute('type', 'button');
    todoCompleted.setAttribute('data-id', todo.id);
    todoCompleted.setAttribute('data-category', todo.category);

    deleteTodo.setAttribute('type', 'button');
    deleteTodo.setAttribute('data-id', todo.id);
    deleteTodo.setAttribute('data-category', todo.category);

    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDescription);
    todoCard.appendChild(todoDate);
    todoCard.appendChild(todoPriority);
    todoCard.appendChild(todoCompleted);
    todoCard.appendChild(deleteTodo);

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
  // implement method to append elements.

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
