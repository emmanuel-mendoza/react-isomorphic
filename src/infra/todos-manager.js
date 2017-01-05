// - Middlewares are executed in the order they are applied when creating the stores.
// - next(action) will execute next middleware function; this means that if action.type is 
//   changed when calling next(action), previous middlefunction will NOT be executed for new type,
//   and following middleware funtions will not be executed for old type.
//   i.e. :
//      If we have 4 middleware functions F1, F2, F3 & F4, and during the execution of F2 the action 
//      type is routed (changed, e.g. action.type = 'TYPE1' and then changed to 'TYPE2' to then call 
//      next(action)), then, F1 and F2 will be executed for 'TYPE1' while F3 and F4 will be executed
//      for 'TYPE2'.
// - When next(action) is called from the last middleware function, action is dispacthed. It means
//   that only those actions types called from the last function will be dispacthed. In the previous
//   example only the 'TYPE2' will be dispacthed.



//logs every dispatched action 
const logger = store => next => action => {
  console.log('Middleware - Logger - Dispatching', action)
  let result = next(action)
  console.log('Middleware - Logger - ', action.type, ' managed: ', result);
  return result
}

//Catchs errors that occur when dispatching actions. This is
//very useful in production environments
const crashReporter = store => next => action => {
  try {
    console.log('Middleware - CrashReporter - Safe execution of ', action.type);
    let result = next(action);
    console.log('Middleware - CrashReporter - ', action.type, ' managed', result);
    return result;
  } catch (err) {
    console.error('Middleware - CrashReporter - Caught an exception!', err)
    //Logic to notify errors goes here
    /*Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })*/
    throw err
  }
}

//
const promiseMiddleware = store => next => action => {
        console.log('Middleware - Promise - Action type: ', action.type, ' Action has promise? ', action.promise?'Yes':'No');

        const { promise, type, ...rest } = action;

        if (!promise) return next(action);

        const SUCCESS = type;
        const REQUEST = type + '_REQUEST';
        const FAILURE = type + '_FAILURE';

        console.log('Middleware - Promise - Next action: ', REQUEST);
        next({ ...rest, type: REQUEST });
        console.log('Middleware - Promise - ', REQUEST, ' managed');

        return promise
            .then(res => res.json? res.json():res) //this is needed when using fetch
            .then(res => {
                console.log('Middleware - Promise - Then - ', SUCCESS, ' | ', res);
                return next({ ...rest, res, type: SUCCESS });
                //return true;
            })
            .catch(error => {
                // Another benefit is being able to log all failures here 
                // But instead, we created another action to manage errors.
                console.log('Middleware - Promise - Catch - ', FAILURE, ' | ', error);
                return next({ ...rest, error, type: FAILURE });

                //return false;
            });
}

export {logger, crashReporter, promiseMiddleware};