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
// const projectColumn = document.querySelector('#project-column'); check id/class in content
// const todoColumn = document.querySelector('.todo-column'); check id or class in content

viewProjectFormBtn.addEventListener('click', UI.viewProjectForm);
viewTodoFormBtn.addEventListener('click', UI.viewTodoForm);
projectForm.addEventListener('submit', UI.createProject);
todoForm.addEventListener('submit', UI.createTodo);

// projectColumn.addEventListener('click', (e) => {
//   // console.log(e.target.textContent);
//   UI.showProjectList(e.target.textContent);
// });

// todoColumn.addEventListener('click', (e) => {
//   // console.log(e.target);
//   // console.log(e.currentTarget);
//   // const short = e.target.textContent;
//   // // console.log((short === 'high' || short === 'low' || short === 'Complete' || short === 'Incomplete'));

//   // if (short !== 'High' || short !== 'Low' || short !== 'Complete' || short !== 'Incomplete' || short !== 'Delete') {
//   // }

//   UI.expandTodo(e.target.dataset.id);
// });

// todoColumn.addEventListener('click', (e) => {
//   const short = e.target.textContent;
//   // console.log((short === 'high' || short === 'low' || short === 'Complete' || short === 'Incomplete'));

//   if (short === 'High' || short === 'Low' || short === 'Complete' || short === 'Incomplete' || short === 'Delete') {
//     UI.editTodo(e.target);
//   }
//   // console.log(short);
// });
