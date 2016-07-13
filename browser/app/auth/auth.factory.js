'use strict';

app.factory('AuthFactory', function ($http, $log) {
  var AuthFactory = {};
  var currentUser = null;

  AuthFactory.getCurrentUser = function() {
    return currentUser;
  }
  
  AuthFactory.login = function(email, password) {
    return $http.post('/login', {email: email, password: password})
    .then(function(response){
console.log("Login.  response is", response)
      currentUser = email;
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
      console.log("signup.  Responseis", response)
      currentUser = email;
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
    currentUser = null;
    return $http.post('/logout')
    .then(function(response){
        return true;
    })
    .catch($log.error);
  }

  return AuthFactory;
})
