function todo(state = [], action) {
  switch (action.type) {
    case 'GET_TODOS':
      console.log('Reducer: Getting data ', action);
      return [...action.res.slice(0)];
    case 'CREATE_TODO':
      console.log('Reducer: Adding item ', action);
      return [...state, {
        text: action.res.text,
        date: action.res.date
      }];
    case 'EDIT_TODO':
      return [
        ...state.slice(0, action.id),
        {
          text: action.res.text,
          date: action.res.date
        },
        ...state.slice(action.id + 1)
      ];
    case 'DELETE_TODO':
      return [
        ...state.slice(0, action.res.id),
        ...state.slice(action.res.id + 1)
      ];
    case 'GET_TODOS_REQUEST':
      console.log('Reducer: Managing ', action.type);
      return state;
    case 'CREATE_TODO_REQUEST':
      console.log('Reducer: Managing ', action.type);
      return state;
    case 'CREATE_TODO_FAILURE':
      console.log('Reducer: Managing ', action.type);
      return state;
    default:
      return state;
  }
}

export default todo;
