import React from 'react';
import PropTypes from 'prop-types';

const Home = (props) => (
  <div id="todo-list">
    <h1>TODOS LIST</h1>
    <hr />
    {React.cloneElement(props.children, props)}
  </div>
);

Home.propTypes = {
  children: PropTypes.node
};

export default Home;
