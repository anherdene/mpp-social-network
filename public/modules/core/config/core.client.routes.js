'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			controller: 'HomeController',
			templateUrl: 'modules/core/views/wall.template.html'
		});

		$stateProvider.
		state('profile', {
			url: '/profile',
			controller: 'ProfileController',
			templateUrl: 'modules/core/views/profile.template.html'
		});
	}
]);