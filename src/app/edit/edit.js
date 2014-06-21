var ngBoilerplate = angular.module('ngBoilerplate.edit', [
        'ui.router',
        'ui.bootstrap'
    ])

        .constant("DEV", true)

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

        .controller('EditCtrl', function EditCtrl($scope, youtube, $sce, $log, DEV, testData) {

            $scope.snapshots = [];
            $scope.url = null;

            $scope.startSnapTime = null;
            $scope.endSnapTime = null;

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

            $scope.keyPress = function (e) {
                var keyCode = e.keyCode;
                if (keyCode == 13) {
                    setTimeout(function () {
                        $(e.target).blur();
                        $scope.change($scope.url);
                    });
                }
            };

            $scope.change = function (url) {
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

            // Inject test data if dev mode enabled.
            if (DEV) {
                var $hidden = $('#hidden-video');
                var f = function () {
                    $scope.$apply(function () {
                        $scope.snapshots = testData;
                    });
                    $hidden.off('loadeddata', f);
                };
                $hidden.on('loadeddata', f);
                $scope.url = 'https://www.youtube.com/watch?v=djZBeE9yfec';
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

        /**
         * A service that maintains a video DOM element that can be used by the
         * canvases and provides an interface to consuming data from that element.
         */
        .factory('hidden-video', function () {
            var queue = [];
            var executing = null; // The function that is currently executing
            var executeFunction = function () {
                if (queue.length) {
                    executing = queue[0];
                    var done = function () {
                        executing = null;
                        queue.shift();
                        executeFunction();
                    };
                    executing(done);
                }
            };
            var addFunction = function (f) {
                queue.push(f);
                if (!queue.length) {
                    executeFunction();
                }
            };
            return {

            }
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
                var $hidden = $('#hidden-video');
                console.log('linking ', scope.data);
                var v = $hidden.get(0);
                var canvas = $(element).find('canvas').get(0);
                var width = v.videoWidth;
                var height = v.videoHeight;
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext('2d');
                var limitFunction = function () {
                    var start = scope.data.start;
                    var end = scope.data.end;
                    var currentTime = v.currentTime;
                    if (currentTime >= end) {
                        scope.stop();
                        v.currentTime = start;
                    }
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
                var initVideo = function () {

                    clearInterval(draw(v, ctx, width, height));
                };
                initVideo();
                var editor = $(element).find('.editor');
                var penOptions = {
                    editor: editor.get(0),
                    class: 'pen',
                    debug: false,
                    list: [
                        'h1', 'h2', 'h3', 'blockquote', 'p', 'insertorderedlist', 'insertunorderedlist',
                        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
                    ],
                    stay: false
                };
                scope.editor = new Pen(penOptions);
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
