'use strict';

angular.module('psJwtApp').controller('LoginCtrl', function ($scope, alert, auth) {
    $scope.submit = function() {
        auth.login($scope.email, $scope.password)
        .success(function(res) {
            alert('success', 'Login Successful', 'Welcome ' + res.user.email + '!');
        })
        .error(function(err) {
            alert('warning', 'Something went wrong', err.message);
        });
    }
});
