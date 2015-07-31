'use strict';

angular.module('psJwtApp').controller('LoginCtrl', function ($scope, alert, auth, $auth) {
    $scope.submit = function() {
        $auth.login({
            email: $scope.email, 
            password: $scope.password
        })
        .then(function(res) {
            var message = 'Welcome ' + res.data.user.email + '!';
            alert('success', 'Login Successful', message);
        })
        .catch(handleError);
    };
    
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider).then(function(res) {
            alert('success', 'Welcome', 'Thanks for coming back ' + res.data.user.displayName + '!');
        }, handleError);
    };
    
    function handleError(err) {
        alert('warning', 'Something went wrong', err.message);
    }
});
