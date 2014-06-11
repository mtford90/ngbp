angular.module('ngBoilerplate.trending', [
    'ui.router',
    'placeholders',
    'ui.bootstrap',
    'mosayc'
])

    .config(function config($stateProvider) {
        $stateProvider.state('trending', {
            url: '/trending',
            views: {
                "main": {
                    controller: 'TrendingCtrl',
                    templateUrl: 'trending/trending.tpl.html'
                }
            },
            data: { pageTitle: 'Trending Albums' }
        });
    })

    .controller('TrendingCtrl', ['$scope', 'httpBasedService', function TrendingCtrl($scope, httpBasedService) {
        httpBasedService.getTrending(function (data) {
            for (var idx in data.results) {
                if (data.hasOwnProperty(idx)) {
                    console.log(data.results[idx]);
                }
            }
        }, function () {

        });
        $scope.dropdownDemoItems = [
            "The first choice!",
            "And another choice for you.",
            "but wait! A third!"
        ];
    }])

;
