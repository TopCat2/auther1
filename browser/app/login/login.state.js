'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    template: '<login-signup action="login"></login-signup>',
    controller: 'LoginCtrl'
  });
});
