import React from 'react';

export default class TodosForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    //avoids page refreshing
    e.preventDefault();

    let node = this.refs['todo-input'];

    this.props.createTodo(node.value);
    
    //Clear the form after submission
    this.refs.todosForm.reset();
  }
  
  render() {
    return (
      <div id="todo-form">
        <form ref="todosForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="type todo" ref="todo-input" />
          <input type="submit" value="OK!" hidden />
        </form>
      </div>
    );
  }
}

TodosForm.propTypes = {
  createTodo: React.PropTypes.func
}