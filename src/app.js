import TodoList from './Containers/TodoList/TodoList.js';
import AddTodoModal from './Containers/AddTodoModal/AddTodoModal.js';
import { state, setState } from './store.js';

const todoListContainer = document.getElementById('todo-list--container');
const modalContainer = document.getElementById('modal--root');
const addTodoButton = document.getElementById('add-todo--btn');

const todoList = new TodoList(todoListContainer);
const addTodoModal = new AddTodoModal(modalContainer);

addTodoButton.addEventListener('click', () => {  
  setState({ showAddTodoModal: !state.showAddTodoModal });
});
