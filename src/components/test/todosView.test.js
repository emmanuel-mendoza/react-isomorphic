import React from 'react';
import {shallow} from 'enzyme';
import TodosView from '../todosView';

const mockItems = () => ([{ text: "test", date: Date.now() }]);

test('TodosView renders the title', () => {
  const todos = mockItems();
  const editTodo = () => {};
  const deleteTodo = () => {};
  const wrapper = shallow(
    <TodosView todos={todos} editTodo={editTodo} deleteTodo={deleteTodo} />
  );

  expect(wrapper.find('div > span').text()).toEqual(todos[0].text);
});