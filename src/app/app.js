var app = angular.module('ngBoilerplate', [
    'templates-app',
    'templates-common',
    'ngBoilerplate.home',
    'ngBoilerplate.edit',
    'ngBoilerplate.feedback',
    'ui.router'
]);

app.config(function myAppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
});

app.run(function run() {
});

app.controller('AppCtrl', function AppCtrl($scope, $location) {
    console.log('appctl scope: ', $scope);
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | Mosayc';
        }
    });
});

//angular.element(document).ready(function () {
//    angular.bootstrap($('html'), ['ngBoilerplate']);
//});