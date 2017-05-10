import React from 'react';
import PropTypes from 'prop-types';

export default class TodosForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // avoids page refreshing
    e.preventDefault();

    this.props.createTodo(this.todoInput.value);

    // clear the form after submission
    this.todosForm.reset();
  }

  render() {
    return (
      <div id="todo-form">
        <form ref={(form) => { this.todosForm = form; }} onSubmit={this.handleSubmit}>
          <input type="text" placeholder="type todo" ref={(input) => { this.todoInput = input; }} />
          <input type="submit" value="OK!" hidden />
        </form>
      </div>
    );
  }
}

TodosForm.propTypes = {
  createTodo: PropTypes.func
};
