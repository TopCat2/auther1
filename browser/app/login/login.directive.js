'use strict'

app.directive('loginSignup', function(AuthFactory, $state) {
    return {
        restrict: 'E',
        templateUrl: '/browser/app/login/login.html',
        scope: {
            action: "@"
        },
        link: function(scope, element, attribute) {
 //           angular.extend(scope, AlbumFactory); // copy props from param2 to param1
            scope.login = function (email, password) {
                scope.message = '';
                AuthFactory.login(email, password)
                .then(function(outcome) {
                    if (outcome)
                        $state.go('stories')
                    else
                        scope.message = 'Invalid login credentials'
                })
                .catch(function(err) {
                    alert("Unexpected error code " + err.status + ": " + err.statusText);
                    throw err;
                });
            };
            scope.signup = function (email, password) {
                scope.message = '';
                AuthFactory.signup(email, password)
                .then(function(outcome) {
                    if (outcome)
                        $state.go('stories')
                    else
                        scope.message = 'Failed to create user: email probably in use'
                })
                .catch(function(err) {
                    alert("Unexpected error code " + err.status + ": " + err.statusText);
                    throw err;
                });
            };
            scope.doStuff = function(action, email, password) {
                switch (action) {
                    case 'login': return scope.login(email, password);
                    case 'signup': return scope.signup(email, password);
                    default: throw 'Invalid action in login directive: ' + action;
                }
            }
        }
    }
})