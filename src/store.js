const STORE_NAME = 'todoAppData';

let state;
const listeners = [];    

const appState = localStorage.getItem(STORE_NAME);
const initialState = {
  showAddTodoModal: false,
  addTodo: {
    title: '',
    content: ''
  },
  todoList: []
};

if (appState) {
  state = JSON.parse(appState);
} else {
  state = initialState;
}

state.subscribe = listener => {
  listeners.push(listener);
}

const setState = newState => {    
  return new Promise(resolve => {
    const oldState = { ...state };
    state = { ...state, ...newState };

    localStorage.setItem(STORE_NAME, JSON.stringify(state));
    listeners.forEach(listener => {
      let updateRequired = true;      
      if (typeof listener.shouldUpdate === 'function') {
        updateRequired = listener.shouldUpdate(oldState);
      }       
      if (updateRequired && typeof listener.render === 'function') {
        listener.render();
      }      
    });
    resolve(state);
  })
}

export { state, setState };