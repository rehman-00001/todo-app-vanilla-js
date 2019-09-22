import { state } from '../store.js';

class Component {
  constructor(_targetNode) {
    state.subscribe(this);
    this._targetNode = _targetNode;    
    this.render = this.render.bind(this);
    this.shouldUpdate = this.shouldUpdate.bind(this);
    this.bindFunctions = this.bindFunctions.bind(this);
    this.bindFunctions();
    this.render();
  }

  bindFunctions(){}

  shouldUpdate(prevState) {
    return prevState !== state;
  }

  render() {}  
}

export default Component;
