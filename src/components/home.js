import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div id="todo-list">
        <h1>TODOS</h1>
        <hr />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

Home.propTypes = {
  children: React.PropTypes.node
};
