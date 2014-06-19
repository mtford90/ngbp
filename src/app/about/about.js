angular.module('ngBoilerplate.about', [
    'ui.router',
    'ui.bootstrap'
])

    .config(function config($stateProvider) {
        $stateProvider.state('about', {
            url: '/about',
            views: {
                "main": {
                    controller: 'AboutCtrl',
                    templateUrl: 'about/about.tpl.html'
                }
            },
            data: { pageTitle: 'What is It?' }
        });
    })

    .controller('AboutCtrl', function AboutCtrl($scope, youtube, $sce, $log) {

        $scope.snapshots = [];

        $scope.startSnapTime = null;
        $scope.endSnapTime = null;

        $scope.change = function (url) {
            console.log('Changing to ' + url);
            youtube.getPlaybackURL(url, {}, function (err, playback_url, info, format) {
                if (!err) {
                    $log.debug('Received playback:', playback_url, info, format);

                    var req = $.ajax({
                        url: playback_url,
                        type: 'HEAD'
                    });

                    req.done(function (data, statusCode, xhr) {
                        var length = xhr.getResponseHeader('Content-Length');
                        var typ = xhr.getResponseHeader('Content-Type');
                        console.log(length, typ);
                        $scope.$apply(function () {
                            $scope.playback_url = $sce.trustAsResourceUrl(playback_url);
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
        };

        $scope.capture = function () {
            var video = $('#video').get(0);
            console.log(video.currentTime);
            $scope.snapshots.push({
                time: video.currentTime,
                url: $scope.playback_url,
                playback: true,
                breakdown: false
            });
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

        $scope.captureWithBreakdown = function () {
            var video = $('#video').get(0);
            console.log(video.currentTime);
            $scope.snapshots.push({
                time: video.currentTime,
                url: $scope.playback_url,
                playback: false,
                breakdown: true
            });
        };

        $scope.startSnap = function () {
            var video = $('#video').get(0);
            $scope.startSnapTime = video.currentTime;
            console.log('Started snap', $scope.startSnapTime);
        };


        $scope.endSnap = function () {
            var video = $('#video').get(0);
            $scope.endSnapTime = video.currentTime;
            var start = $scope.startSnapTime;
            var end = $scope.endSnapTime;
            console.log('Start is', start);
            console.log('End is', end);
            if (start && end) {
                if (end > start) {
                    var url = $scope.playback_url + '#t=' + start + ',' + end;
                    console.log(url);
                    $scope.snapshots.push({
                        time: video.currentTime,
                        url: url,
                        playback: true,
                        breakdown: false,
                        start: start,
                        end: end
                    });

                }
            }
        };

    })

    .factory('youtube', function () {
        return {
            getPlaybackURL: function (url, opts, callback) {
                ytdl(url, opts, function (err, video_url, info, format) {
                    callback(err, video_url, info, format);
                });
            }
        };
    })

    .directive('snapshot', function () {
        function link(scope, element, attrs) {
            function updateTime() {
                var video = element.children().get(0);
                $(video).on('loadedmetadata', function () {
                    video.currentTime = scope.data.time;
                });
                $(video).on('timeupdate', function () {
                    if (!video.paused) {
                        if (video.currentTime < scope.data.start) {
                            video.pause();
                            video.currentTime = scope.data.start;
                        }
                        else if (video.currentTime > scope.data.end) {
                            video.pause();
                            video.currentTime = scope.data.end;
                        }
                    }
                });
                $(video).on('play', function () {
                    if (video.currentTime < scope.data.start) {
                        video.currentTime = scope.data.start;
                    }
                    else if (video.currentTime >= scope.data.end) {
                        video.currentTime = scope.data.start;
                    }
                });
            }

            scope.$watch('data.time', updateTime);
        }

        return {
            link: link,
            scope: {
                data: '='
            },
            templateUrl: 'about/snapshot.tpl.html'
        };
    })

    .directive('canvas', function () {
        function link(scope, element, attrs) {
            var video = document.createElement('video');
            video.src = scope.data.url;
            $(video).on('loadedmetadata', function () {
                video.currentTime = scope.data.time;
                video.play();
                // Have to play the video to load the data before can perform
                // any image capture.
                $(video).on('playing', function () {
                    video.pause();
                    var w = video.videoWidth;
                    var h = video.videoHeight;
                    var canvas = element.children().get(0);
                    canvas.height = h;
                    canvas.width = w;
                    console.log(canvas);
                    var context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0, w, h);
                });

            });
        }

        return {
            link: link,
            scope: {
                data: '='
            },
            template: '<canvas></canvas>'
        };
    })

/**
 * A directive for use in debugging.
 */
    .directive('breakdown', function ($log) {
        function append(table, key, value) {
            var tr = $('<tr></tr>');
            var keyTd = $('<td></td>');
            var valueTd = $('<td></td>');
            keyTd.text(key);
            valueTd.text(value);
            tr.append(keyTd);
            tr.append(valueTd);
            table.append(tr);
        }

        function link(scope, element, attrs) {
            var table = $(element.children().get(0));
            append(table, 'url', scope.data.url);
            var video = document.createElement('video');
            video.src = scope.data.url;
            $(video).on('loadedmetadata', function () {
                var total = video.duration;
                var start = video.buffered.start(0);
                var end = video.buffered.end(0);
                $log.debug('buffer dump:', total, start, end);
            });
        }

        return {
            link: link,
            scope: {
                data: '='
            },
            template: '<table></table>'
        };
    })



;
