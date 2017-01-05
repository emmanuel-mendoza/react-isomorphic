//currying function
var x = y => a => b => y.num + a(b);
var f = n => n.num + 2; 

console.log( x({num: 1})(f)({num: 1}) );

//
let tst = (data, bdata) => {
    console.log("Data: ", data, data.type);
    console.log("Bracketed Data: ", bdata, bdata.action.type);
}

const action = {type: "ACTION", id: 1};
tst(action, {action});

//reducer
var integrado = [[0,1], [2,3], [4,5]].reduce(function(a,b) {
  console.log('a: ', a, ' b: ', b);
  return a.concat(b,b);
}, []);

//
const actions = {
    "getTodos" : getTodosServer
};

//
function clientToServerAction(action) {
    return actions[action.name] || action;
}

function getTodos() {
  console.log('Action: Retrieving todos (server)')

  return {
    type: 'GET_TODOS',
    promise: 'I am a promise'
  }
}

function postTodo() {
  console.log('Action: Retrieving todos (server)')

  return {
    type: 'POST_TODOS',
    promise: 'I am a promise'
  }
}

//Get todos
function getTodosServer() {
  console.log('Action: Retrieving todos (server)')

  return {
    type: 'GET_TODOS',
    promise: 'I am a promise'
  }
}

console.log(clientToServerAction(getTodos));
console.log(clientToServerAction(postTodo));

