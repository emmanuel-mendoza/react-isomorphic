const path = require('path');

const SRC_DIR = path.join(__dirname, './src');
const DIST_DIR = path.join(__dirname, './dist');

const client = require('./webpack.config.client')(SRC_DIR, DIST_DIR);
const server = require('./webpack.config.server')(SRC_DIR, DIST_DIR);

module.exports = [client, server];
