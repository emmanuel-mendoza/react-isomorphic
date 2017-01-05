'use strict';

import React from 'react';

export default class TodosView extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderTodo = this.renderTodo.bind(this);
  }

  renderTodo (todo, i) {
    return (
      <div key={i}>
        <span>{todo.text}</span>
        <button data-id={i} onClick={this.handleDelete}>X</button>
        <button data-id={i} onClick={this.handleEdit}>Edit</button>
      </div>
    );
  }

  handleDelete(e) {
    const id = Number(e.target.dataset.id);

    // Equivalent to dispatch(deleteTodo())
    this.props.deleteTodo(id);
  }

  handleEdit(e) {
    const id  = Number(e.target.dataset.id);
    //const val = this.props.todos.get(id).text;
    const val = this.props.todos[id];
    
    // For cutting edge UX
    let newVal = window.prompt('', val);
    this.props.editTodo(id, newVal);
  }
   
  //This is used when not using server rendering
  //componentDidMount() {
  //  this.props.getTodos();
  //}

  render() {
    console.log('View component todos: ',this.props.todos);
    return (
      <div id="todo-list">
        {this.props.todos.map(this.renderTodo)}
      </div>
    );
  }
}