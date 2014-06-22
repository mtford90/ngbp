var mod = angular.module('mosayc', []);

mod.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

mod.provider('httpBasedService',  function () {


    this.path = '/apiv2/MosaycAlbum/';

    var self = this;

    //
    this.$get = function ($http) {
        $http.defaults.useXDomain = true;
        return {
            sendMessage: function (msg) {
                return $http.get('somthing.json?msg=' + msg)
                    .then(function (result) {
                        return result.data;
                    });
            }
        };
    };

    this.setPath = function (path) {
        this.path = path;
    };

});