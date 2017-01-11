import React from 'react';

const Home = (props) => (
  <div id="todo-list">
    <h1>TODOS</h1>
    <hr />
    {React.cloneElement(props.children, props)}
  </div>
);

Home.propTypes = {
  children: React.PropTypes.node
};

export default Home;
