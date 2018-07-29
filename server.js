// Dependensies

const http         = require('http');
const express      = require('express');
const logger       = require('morgan');

// ------------------------------------------------------------------
// Server

const port    = process.env.PORT || 8080;
const app     = express();
const server  = http.createServer(app);

// ------------------------------------------------------------------
//Routes

const view = require('./routes/view');

// ------------------------------------------------------------------
// View engine

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// ------------------------------------------------------------------
// Middleware function handles

function not_found (req, res, next) {
  next({
    status: 404,
    message: '404: Not Found'
  });
}

function error_handler (err, req, res, next) {

  res.status(err.status || 500);

  if (res.statusCode == 404) {
    res.render('error', {
      message: err.message
    });
  }

  else {
    res.json(err);
  }
}

// ------------------------------------------------------------------
// Middleware for every path

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

// ------------------------------------------------------------------
// Middleware for generate templates

app.use(view);

// ------------------------------------------------------------------
// Error handler for paths

app.use(not_found);
app.use(error_handler);

// ------------------------------------------------------------------
// Server listener

server.listen(port, function() {
  console.log( 'http://localhost:' + port
    + ' : server has been launched' );
});