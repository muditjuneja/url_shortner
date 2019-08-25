#!/usr/bin/env node

/**
 * Module dependencies.
 */

const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const db = require('./db/db');
const allModels = require('./app/models');
allModels.use(db);


//After loading the models. It's time for make the assocaitions in various models.
db.makeAssociations();
app.use(cors());
app.options('*', cors())

const middlewares = require('./middlewares');
middlewares.beforeRouter(app);
middlewares.router(app);
middlewares.afterRouter(app);








/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);



/**
 * Create HTTP server.
 */

const server = http.createServer(app);

db.sequelize.sync().then(function () {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  console.log('Listening on ' + bind);
}

//http://sequelize.readthedocs.io/en/2.0/docs/models-definition/