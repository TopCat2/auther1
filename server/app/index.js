'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');


app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

    //  All this comes before the /api routes which will not end with a next()
app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'iceiscool', // or whatever you like
 // cookie:{maxAge:30000}
}));

 app.use('/', require('./auth.middleware.js'));

// app.use('/api', function (req, res, next) {
//   if (!req.session.counter) req.session.counter = 0;
//   console.log('counter', ++req.session.counter, "session:", req.session);
//   next();
// });

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});


app.use(require('./error.middleware'));

module.exports = app;
