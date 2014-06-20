angular.module('ngBoilerplate.edit', [
    'ui.router',
    'ui.bootstrap'
])

    .config(function config($stateProvider) {
        $stateProvider.state('edit', {
            url: '/edit',
            views: {
                "main": {
                    controller: 'EditCtrl',
                    templateUrl: 'edit/edit.tpl.html'
                }
            },
            data: { pageTitle: 'Edit' }
        });
    })

    .controller('EditCtrl', function EditCtrl($scope, youtube, $sce, $log) {

        $scope.snapshots = [];

        $scope.startSnapTime = null;
        $scope.endSnapTime = null;

        $scope.url = 'https://www.youtube.com/watch?v=kNAxYBEfC_Y';

        function videoWithFormat(url, container, variable) {
            youtube.getPlaybackURL(url, {
                filter: function (format) {
                    return format.container === container;
                }
            }, function (err, playback_url, proxied_playback_url, info, format) {
                if (!err) {
                    $log.debug('Received playback:', playback_url, info, format);

                    var req = $.ajax({
                        url: proxied_playback_url,
                        type: 'HEAD'
                    });

                    req.done(function (data, statusCode, xhr) {
                        var length = xhr.getResponseHeader('Content-Length');
                        var typ = xhr.getResponseHeader('Content-Type');
                        console.log(length, typ);
                        $scope.$apply(function () {
                            $scope[variable] = $sce.trustAsResourceUrl(playback_url);
                            $scope.info = info;
                            $scope.format = format;
                        });
                    });
                    req.fail(function (status_code, textStatus) {
                        // TODO: Plonk the error somewhere?
                    });
                }
                else {
                    // TODO: Plonk the error somewhere?
                }
            });
        }

        $scope.keyPress = function(e) {
            var keyCode = e.keyCode;
            if (keyCode == 13) {
                setTimeout(function () {
                    $(e.target).blur();
                    $scope.change($scope.url);
                });
            }
        };

        $scope.change = function (url) {
            console.log('Changing to ' + url);
            /**
             * Hack to fix bug in chrome where cant play video with same URL.
             */
            videoWithFormat(url, 'webm', 'playback_url');
            videoWithFormat(url, 'mp4', 'playback_url2');
            $scope.snapshots = [];
        };

        $scope.imageCapture = function () {
            var video = $('#video').get(0);
            console.log(video.currentTime);
            $scope.snapshots.push({
                time: video.currentTime,
                url: $scope.playback_url,
                playback: false,
                breakdown: false
            });
        };

        $scope.snap = function () {
            var video = $('#video').get(0);
            if ($scope.startSnapTime) {
                $scope.endSnapTime = video.currentTime;
                console.log('ended snap', $scope.endSnapTime);
                var start = $scope.startSnapTime;
                var end = $scope.endSnapTime;
                $scope.snapshots.push({
                    time: video.currentTime,
                    url: $scope.playback_url,
                    playback: true,
                    start: start,
                    end: end
                });
                $scope.startSnapTime = null;
                $scope.endSnapTime = null;


            }
            else {

                $scope.startSnapTime = video.currentTime;
                console.log('Started snap', $scope.startSnapTime);
            }

        };

        if ($scope.url) {
            $scope.change($scope.url);
        }

    })

    .factory('youtube', function () {
        return {
            getPlaybackURL: function (url, opts, callback) {
                ytdl(url, opts, function (err, video_url, proxy_url, info, format) {
                    callback(err, video_url, proxy_url, info, format);
                });
            }
        };
    })

    .directive('snapshot', function () {

        var drawToken = null;

        function draw(v, c, w, h) {
            console.log('drawing');
            if (v.paused || v.ended) {
                return false;
            }
            c.drawImage(v, 0, 0, w, h);
            drawToken = setTimeout(draw, 20, v, c, w, h);
        }

        function clear() {
            if (drawToken) {
                clearInterval(drawToken);
                drawToken = null;
            }
        }

        function link(scope, element) {
            console.log('linking');
            var v = $('#hidden-video').get(0);
            console.log('linking', v);
            var canvas = element.children().get(0);
            console.log('linking', canvas);
            var width = v.videoWidth;
            var height = v.videoHeight;
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            var limitFunction = function () {
                var start = scope.data.start;
                var end = scope.data.end;
                var currentTime = v.currentTime;
                if (currentTime <= start) {
                    scope.stop();
                    v.currentTime = start;
                }
                else if (currentTime >= end) {
                    scope.stop();
                    v.currentTime = start;
                }
                console.log('current time is ', v.currentTime);
            };
            scope.play = function () {
                clear();
                var start = scope.data.start;
                var end = scope.data.end;
                var currentTime = v.currentTime;
                if (currentTime <= start) {
                    v.currentTime = start;
                }
                else if (currentTime >= end) {
                    v.currentTime = start;
                }
                v.play();
                draw(v, ctx, width, height);
                $(v).on('timeupdate', limitFunction);
            };
            scope.stop = function () {
                v.pause();
                clear();
                $(v).off('timeupdate', limitFunction);
            };
            /**
             * Ensure that the canvas is initialised with first frame
             */
            var init = function () {
                scope.play();
                clearInterval(draw(v, ctx, width, height));
            };
            init();
        }

        return {
            link: link,
            scope: {
                data: '='
            },
            templateUrl: 'edit/snapshot.tpl.html'
        };
    })


;
