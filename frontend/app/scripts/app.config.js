angular.module('psJwtApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {
	
	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: '/views/main.html'
	})

	.state('register', {
		url: '/register',
		templateUrl: '/views/register.html',
		controller: 'RegisterCtrl'
	})
    
	.state('login', {
		url: '/login',
		templateUrl: '/views/login.html',
		controller: 'LoginCtrl'
	})    
    
    .state('jobs', {
		url: '/jobs',
		templateUrl: '/views/jobs.html',
		controller: 'JobsCtrl'
	})
    
    .state('logout', {
		url: '/logout',
		controller: 'LogoutCtrl'
	});

	$urlRouterProvider.otherwise('/');
    
    $authProvider.loginUrl = API_URL + 'login';
    $authProvider.signupUrl = API_URL + 'register';
    
    $authProvider.google({
        clientId: '812211569237-l6unnh8tl6frnm1dchgq7ncgd6avodql.apps.googleusercontent.com',
        url: API_URL + 'auth/google'
    });
    
    $authProvider.facebook({
        clientId: '976137499095900',
        url: API_URL + 'auth/facebook'
    });
    
    $httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:3000/')

.run(function($window) {
    var params = $window.location.search.substring(1);
    
    if(params && $window.opener && $window.opener.location.origin === $window.location.origin) {
        var pair = params.split('=');
        var code = decodeURIComponent(pair[1]);
        
        $window.opener.postMessage(code, $window.location.origin);
    }
});