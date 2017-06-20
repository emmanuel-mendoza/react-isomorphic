require('babel-register');

// Prevent babel-register from transpiling css files on server side.
require.extensions['.css'] = () => {
    return;
};

require('./server.babel');
