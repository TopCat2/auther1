'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    template: '<login-signup action="signup"></login-signup>',
  });
});
