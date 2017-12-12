
var Promise = require('promise');
var progress = require('progress-stream');
var request = require('request');
var fs = require('fs');

var logFile = require('./logFile');
var ProgressInfo = require('../libs/progressInfo');


 
var str = progress({
    time: 1000
});
 
var progressInfo = new ProgressInfo('download', '0s');

progressInfo.begin();

str.on('progress', function(progress) {
   progressInfo.update(`已经下载${progress.runtime} s, ${progress.transferred} B`);
});


/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(callback){
    console.log('bgin download log file ....');
    var uri  = logFile.getLogFileUrl();
    console.log(uri)
    var filename = logFile.getLogFileName();
    console.log(filename)
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(str).pipe(stream).on('close', function(){
        progressInfo.stop();
        console.log('download done ....');
        callback && callback();

    }); 
}


module.exports  = function () {
    return new Promise(function (resolve, reject) {
        downloadFile(function () {
           resolve();
        })
     });
}




