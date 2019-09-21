import { state, setState } from '../../store.js';
import TodoItem from '../../Components/TodoItem/TodoItem.js'

class TodoList {
  constructor(_targetNode) {
    state.subscribe(this);
    this._targetNode = _targetNode;    
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