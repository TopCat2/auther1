'use strict';

app.factory('AuthFactory', function ($http, $log) {
  var AuthFactory = {};

  AuthFactory.login = function(email, password) {
    return $http.post('/login', {email: email, password: password})
    .then(function(response){
        return true;
    })
    .catch(function(err) {
        if(err.status === 401) {
            return false;
        }
        else {
            throw err;
        }
    })
  }

  AuthFactory.signup = function(email, password) {
   return $http.post('/signup', {email: email, password: password})
    .then(function(response){
        return true;
    })
    .catch(function(err) {
        if(err.status === 409) {
            return false;
        }
        else {
            throw err;
        }
    })
  }

  AuthFactory.logout = function(email, password) {
   return $http.post('/logout')
    .then(function(response){
        return true;
    })
    .catch($log.error);
  }

  return AuthFactory;
})
