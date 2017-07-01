import React from 'react';

import TodosView from './todosView';
import TodosForm from './todosForm';

export default (props) => (
  <div id="todos">
    <TodosView {...props} />

    <TodosForm {...props} />
  </div>
);
