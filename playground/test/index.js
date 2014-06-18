/**
 * Globals
 */
$ = require('jquery');
_ = require('underscore');

/**
 * Internals
 */
var formats = require('./formats');
var util = require('./util');
var sig = require('./sig');
var getInfo = require('./info');


//////

var options = {};
options.downloadURL = true;

ytdl = module.exports = function ytdl(link, options, callback) {
    options = options || {};
    options.downloadURL = true;
    getInfo(link, options, function (err, info) {
        if (err) {
            callback(err);
            return;
        }
        var format = util.chooseFormat(info.formats, options);
        if (format instanceof Error) {
            callback(format);
            return;
        }
        var requestOptions = _.clone(options);
        requestOptions.url = format.url;
        if (requestOptions.range) {
            requestOptions.url += '&range=' + requestOptions.range;
        }
        delete requestOptions.quality;
        delete requestOptions.range;
        delete requestOptions.filter;
        callback(null, requestOptions.url);
    });
};






