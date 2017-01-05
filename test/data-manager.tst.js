require('babel-register');
let fscrud = require('../data/data-manager.js');

const initialTodo = [{"text":"My first todo","date":Date.now()}];
const filename = fscrud.filename;

//Testing crud
fscrud.save(filename,initialTodo,2000)
    .then(res => {
        console.log('Data saved: ', res);
        return fscrud.getAll(filename,1000);
    })
    .then(res => {
        console.log('Data read: ', res);
        return fscrud.post(filename, {text: "my second todo", date: Date.now()}, 1000);
    })
    .then(res => {
        console.log('Data posted: ', res);
        return fscrud.update(filename, {text: "my second todo updated", date: Date.now()}, 1);
    })
    .then(res => {
        console.log('Data updated: ', res);
        return fscrud.remove(filename, 1, 1000);
    })
    .then(res => console.log('Data removed: ', res))
    .catch(err => console.log('Data error: ', err));

console.log('finished');