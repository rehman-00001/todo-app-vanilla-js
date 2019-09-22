import { state, setState } from '../../store.js';
import TodoItem from '../../Components/TodoItem/TodoItem.js'
import Component from '../../utils/Component.js';

class TodoList extends Component {
  bindFunctions() {
    this.onTodoClicked = this.onTodoClicked.bind(this);
  }

  shouldUpdate(previousState) {    
    return previousState.todoList !== state.todoList;
  }

  onTodoClicked(note, index) {    
    setState({
      showAddTodoModal: true,
      addTodo: { ...note, index }
    });
  }
  
  render() {    
    console.log('TodoList - rendered');
    const { todoList } = state;
    this._targetNode.innerHTML = null;
    todoList.forEach((item, index) => {
      const _note = TodoItem({
        ...item,
        onClick: () => this.onTodoClicked(item, index)
      });
      this._targetNode.appendChild(_note);
    });
  }
}

export default TodoList;