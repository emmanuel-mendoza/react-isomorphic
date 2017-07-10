import * as datamgr from '../data-manager';

const todos = [{text: "my first todo", date:1490064923485}]; //should be the same content as todos.json
let testTodo = { text: "new TODO", date: Date.now() };

it('get all TODOS', () => {
  expect.assertions(1);
  // return datamgr.getAll(datamgr.filename, 1).then(data => expect(data).toEqual([{text: "my first todo", date:1490064923485}]));
  return expect(datamgr.getAll(datamgr.filename, 1)).resolves.toEqual(todos);
});

it('post new TODO', () => {
  expect.assertions(1);
  return expect(datamgr.post(datamgr.filename, testTodo, 1)).resolves.toEqual(testTodo);
});

testTodo.text = "updated";
it('update last TODO', () => { 
  expect.assertions(1);
  return expect(datamgr.update(datamgr.filename, testTodo, todos.length, 1)).resolves.toEqual(testTodo);
});

it('delete last TODO', () => {
  expect.assertions(1);
  return expect(datamgr.remove(datamgr.filename, todos.length, 1)).resolves.toEqual({ id: todos.length });
});