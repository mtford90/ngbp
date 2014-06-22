var fs = require('fs');
var ytdl = require('ytdl');

ytdl('http://www.youtube.com/watch?v=A02s8omM_hI')
    .pipe(fs.createWriteStream('/tmp/video.flv'));