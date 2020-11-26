import './assets/css/style.css';
import content from './content';
import ui from './ui';

content.staticPage();
content.todoForm();
content.projectForm();

const viewProjectFormBtn = document.querySelector('.createProjectBtn');
const viewTodoFormBtn = document.querySelector('.createTodoBtn');
const projectForm = document.querySelector('.project-form');
const todoForm = document.querySelector('.todo-form');
const projectColumn = document.querySelector('.project-column');
const todoColumn = document.querySelector('.todo-column');

document.addEventListener('DOMContentLoaded', ui.render);

viewProjectFormBtn.addEventListener('click', ui.viewProjectForm);
viewTodoFormBtn.addEventListener('click', ui.viewTodoForm);
projectForm.addEventListener('submit', ui.createProject);
todoForm.addEventListener('submit', ui.createTodo);

projectColumn.addEventListener('click', e => {
  ui.showProjectList(e.target.textContent);
});

todoColumn.addEventListener('click', e => {
  const short = e.target.textContent;

  if (short !== 'High' && short !== 'Low' && short !== 'Complete' && short !== 'Incomplete' && short !== 'Delete'
      && short !== null) {
    ui.expandTodo(e.target.dataset.id);
  }
});

todoColumn.addEventListener('click', e => {
  const short = e.target.textContent;

  if ((short === 'High' || short === 'Low' || short === 'Complete' || short === 'Incomplete' || short === 'Delete')
  && (e.target !== null)) {
    ui.editTodo(e.target);
  }
});
