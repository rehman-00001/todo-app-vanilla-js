import { state, setState } from '../../store.js';
import Component from '../../utils/Component.js';

class AddTodoModal extends Component {
  bindFunctions() {
    this.renderForm = this.renderForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onContentChanged = this.onContentChanged.bind(this);
    this.saveTodoNote = this.saveTodoNote.bind(this);
    this.attachListeners = this.attachListeners.bind(this);
  }

  renderForm() {
    const { title, content } = state.addTodo;
    return `
      <div class="modal--backdrop"></div>
      <div class="add-todo--root">        
        <div class="add-todo--modal-content">
          <input 
            type="text" 
            name="todo-title" 
            title="Your title" 
            value="${title}" 
            placeholder="Your Todo title"
            class="add-todo--title"
            id="add-todo--title"
            focus
          >
          <textarea 
            row="7" 
            col="15" 
            class="add-todo--content"
            id="add-todo--content"
            placeholder="Your Todo list"
          >${content}
          </textarea>
          <button
            type="submit"
            id="add-todo--submit"
            class="add-todo--submit">
              Submit
          </button>
        </div>
      </div>
    `;
  };

  shouldUpdate(previousState) {    
    return previousState.showAddTodoModal !== state.showAddTodoModal;
  };  

  closeModal() {
    setState({
      showAddTodoModal: false,
      addTodo: {
        title: '',
        content: ''
      }
    });
  }

  onTitleChanged(event) {
    const title = event.target.value;
    const { addTodo } = state;
    setState({ 
      addTodo: { 
        ...addTodo, 
        title 
      }
    });    
  }

  onContentChanged(event) {
    const content = event.target.value;
    const { addTodo } = state;
    setState({ 
      addTodo: { 
        ...addTodo, 
        content 
      }      
    });    
  }

  saveTodoNote() {
    const { title, content, index } = state.addTodo;
    if (!title && !content) {
      setState({ showAddTodoModal: false });
      return;
    };

    if (index) {
      state.todoList[index] = {
        title,
        content
      };      
    } else {
      state.todoList.push({ title, content });
    }
    
    const todoList =  [...state.todoList];
    setState({
      addTodo: {
        title: '',
        content: ''
      },
      todoList,
      showAddTodoModal: false
    });
  };

  render() {
    console.log('AddTodoModal - rendered');
    const { showAddTodoModal } = state;
    if (showAddTodoModal) {
      this._targetNode.innerHTML = this.renderForm();      
      this.attachListeners();
    } else {
      this._targetNode.innerHTML = null;
    }
  }

  attachListeners() {
    this._targetNode.querySelector('#add-todo--title').onchange = this.onTitleChanged;
    this._targetNode.querySelector('#add-todo--content').onchange = this.onContentChanged;
    this._targetNode.querySelector('#add-todo--submit').onclick = this.saveTodoNote;
    this._targetNode.querySelector('.modal--backdrop').onclick = this.closeModal;
  }
}

export default AddTodoModal;