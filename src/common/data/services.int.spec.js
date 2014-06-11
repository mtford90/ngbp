describe('httpBasedService', function () {

    var httpBasedService;

    beforeEach(function () {
        module('mosayc');
//        var mod = angular.module('mosayc'); // Load module into provider.
//        mod.config(['httpBasedServiceProvider', function (httpBasedServiceProvider) {
//            httpBasedServiceProvider.setPath('/MosaycAlbum/');
//        }
//        ]);
        console.log(mod);
        inject(['httpBasedService', function (x) { // Load module from provider.
            httpBasedService = x;

        }]);
    });

    afterEach(function () {

    });


    it('service is registered', function () {
        assert.ok(httpBasedService);
    });

    it('service works', function (done) {
        console.log(httpBasedService);
        httpBasedService.getTrending(function (data) {
            console.log(data);
            assert.ok(data);
            done();
        }, function () {
            done();
        });
    });


});