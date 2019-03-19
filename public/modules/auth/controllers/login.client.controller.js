'use strict';

angular.module('auth')

    .controller('LoginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', '$http',
            function ($scope, $rootScope, $location, AuthenticationService, $http) {
                // reset login status
                // AuthenticationService.ClearCredentials();

                $scope.login = function () {
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.username, $scope.password, function(response) {

                        let userData = response.data;

                        if(response.status ===  200) {
                            AuthenticationService.SetCredentials(userData.id ,$scope.username, $scope.password);
                            $location.path('/');
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    });
                };

                $scope.userSignUpData = {};

                $scope.userSignUp = function () {

                    console.log($scope.userSignUpData);

                    $http.post('/api/signup', $scope.userSignUpData)
                        .then(function (response) {
                            console.log(response);
                            alert('Successfully signed up!');
                            window.location = "/#!/login";
                        })
                        .catch(function(error) {
                            alert(error.message);
                        });

                    // let userData = response.data;
                    //
                    // if (response.status === 200) {
                    //     AuthenticationService.SetCredentials(userData.id, $scope.username, $scope.password);
                    //     $location.path('/');
                    // } else {
                    //     $scope.error = response.message;
                    //     $scope.dataLoading = false;
                    // }
                };
            }]);