angular.module('ngBoilerplate.feedback', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('feedback', {
            url: '/feedback',
            views: {
                "main": {
                    controller: 'FeedbackCtrl',
                    templateUrl: 'feedback/feedback.tpl.html'
                }
            },
            data: { pageTitle: 'Give Feedback' }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('FeedbackCtrl', function HomeController($scope) {
    })

;
