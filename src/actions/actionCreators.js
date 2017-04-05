// Request (this would fail when executing from server as objects only exist in client side)
// let headers = new Headers();
// headers.append('Accept', 'application/json');
// headers.append('Content-Type', 'application/json');

import fetch from 'isomorphic-fetch';

const init = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

// Get todos
export function getTodos() {
  console.log('Action: Retrieving todos');

  init.method = 'GET';
  init.body = '';

  return {
    type: 'GET_TODOS',
    promise: fetch('http://localhost:3000/api', init)
  };
}

// Add a todo item
export function createTodo(text) {
  console.log('Action: Creating TODO item');

  init.method = 'POST';
  init.body = JSON.stringify({ text, date: Date.now() });

  return {
    type: 'CREATE_TODO',
    promise: fetch('/api', init)
  };
}

// Edit a todo item
export function editTodo(id, text) {
  init.method = 'PUT';
  init.body = JSON.stringify({ data: { text, date: Date.now() }, id });
  return {
    type: 'EDIT_TODO',
    id,
    promise: fetch('/api', init)
  };
}

// Delete a todo item
export function deleteTodo(id) {
  init.method = 'DELETE';
  init.body = JSON.stringify({ id });
  return {
    type: 'DELETE_TODO',
    promise: fetch('/api', init)
  };
}
