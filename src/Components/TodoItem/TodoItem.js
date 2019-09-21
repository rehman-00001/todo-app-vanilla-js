const TodoItem = props => {
  const _node = document.createElement('div');
  _node.setAttribute('class', 'todo-item--container');
  _node.innerHTML = `
  <h1>${props.title}</h1>
  <p>${props.content}</p>
  `;  
  _node.onclick = props.onClick;
  return _node;
};

export default TodoItem;
