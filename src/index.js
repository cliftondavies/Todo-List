import './assets/css/style.css';
import content from './content';
import UI from './ui';

content().staticPage();
content().todoForm();
content().projectForm();

document.addEventListener('DOMContentLoaded', UI.render);

const viewProjectFormBtn = document.querySelector('.createProjectBtn');
const viewTodoFormBtn = document.querySelector('.createTodoBtn');
const projectForm = document.querySelector('.project-form');
const todoForm = document.querySelector('.todo-form');

viewProjectFormBtn.addEventListener('click', UI.viewProjectForm);
viewTodoFormBtn.addEventListener('click', UI.viewTodoForm);
projectForm.addEventListener('submit', UI.newCategory);
todoForm.addEventListener('submit', UI.newTodo);
