var qs       = require('querystring');
var _        = require('underscore');
var util     = require('./util');
var sig      = require('./sig');
var $      = require('jquery');


var INFO_URL = '/youtube/get_video_info?' +
    'hl=en_US&el=detailpage&video_id=';
var VIDEO_URL = '/youtube/watch?v=';
var KEYS_TO_SPLIT = [
    'keywords',
    'fmt_list',
    'fexp',
    'watermark',
    'ad_channel_code_overlay'
];


/**
 * Gets info from a video.
 *
 * @param {String} link
 * @param {Object} requestOptions
 * @param {Function(Error, Object)} callback
 */
module.exports = function getInfo(link, requestOptions, callback) {
    if (typeof requestOptions === 'function') {
        callback = requestOptions;
        requestOptions = {};
    } else {
        requestOptions = _.clone(requestOptions);
    }

    var id = util.getVideoID(link);
    requestOptions.url = INFO_URL + id;
    link = VIDEO_URL + id;
    var downloadURL = requestOptions.downloadURL;
    delete requestOptions.downloadURL;

    var req = $.ajax({
        url: requestOptions.url,
        type: 'GET'
    });

    req.done(function (body) {
        var info = qs.parse(body);

        if (info.status === 'fail') {
            callback(new Error('Error ' + info.errorcode + ': ' + info.reason));
            return;
        }

        // Split some keys by commas.
        KEYS_TO_SPLIT.forEach(function(key) {
            if (!info[key]) return;
            info[key] = info[key]
                .split(',')
                .filter(function(v) { return v !== ''; });
        });

        // Convert some strings to javascript numbers and booleans.
        Object.keys(info).forEach(function(key) {
            var val = info[key];
            var intVal = parseInt(val, 10);
            var floatVal = parseFloat(val, 10);

            if (intVal.toString() === val) {
                val = intVal;
            } else if (floatVal.toString() === val) {
                val = floatVal;
            } else if (val === 'True') {
                val = true;
            } else if (val === 'False') {
                val = false;
            }
            info[key] = val;
        });

        if (info.fmt_list) {
            info.fmt_list = info.fmt_list.map(function(format) {
                return format.split('/');
            });
        } else {
            info.fmt_list = [];
        }

        info.formats = util.parseFormats(info);

        if (info.video_verticals) {
            info.video_verticals = info.video_verticals
                .slice(1, -1)
                .split(', ')
                .filter(function(val) { return val !== ''; })
                .map(function(val) { return parseInt(val, 10); })
            ;
        }

        if (downloadURL) {
            sig.get(link, info, callback);
        } else {
            callback(null, info);
        }
    });

    req.fail(function (jqXHR, textStatus) {
        callback(textStatus);
    });


};
