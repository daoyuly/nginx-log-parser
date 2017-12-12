'use strict';
/**
 * @file 分析nginx log，并导入到mongodb
 * http://ip.taobao.com/service/getIpInfo.php?ip=58.243.254.227
 */
var Promise = require('promise');
var Map = require("collections/map");
var List = require("collections/list");
var NginxParser = require('nginxparser');
var detectBrowswer = require('./src/browser');
var util = require('./src/util');
var DBA = require('./src/db');
var uaParser = require('./src/uaParser');

var errorParser = require('./src/errorParser');
var logFile = require('./src/logFile');
var download = require('./src/download');

// 使用co异步
/* var co = require('co');
var thunkify = require('thunkify');
var request = require('request');
var get = thunkify(request.get); */

var dba = new DBA();
var list = new List();
// var logFormat = '[$time_local] - $remote_addr - $remote_user "$request" $status $request_length $request_time - $body_bytes_sent $body_bytes_sent "$http_referer" "$http_user_agent" "-" "-" $msec';
var logFormat = '[$time_local] - $remote_addr - $remote_user "$request" $status "-" $request_length $request_time - $body_bytes_sent $body_bytes_sent "$http_referer" "$http_user_agent" "-" "-" $msec';
var logFormat_0928 = '[$time_local] - $remote_addr - $remote_user "$request" $status "-" $request_length $request_time "-" "-" $body_bytes_sent $body_bytes_sent "$http_referer" "$http_user_agent" "-" "$msec" "$msec" "$msec" "$msec"';

function parseLog(resolve, reject) {
    var parser = new NginxParser(logFormat_0928);
    var i = 0
    console.log('before read')
    var logFileName = logFile.getLogFileName();
    parser.read(logFileName, function(row) {
        i = i + 1;
        
        var query = '';
        try {
            query = decodeURIComponent(row.request);
        } catch(e) {
            query = row.request;
            console.log(e);
        }
        
        var msg = util.getErrorMsg(query);
        let date = util.formateLogTime(row.time_local);
        let parserUa = uaParser(row.http_user_agent);
        let parserErr =errorParser(msg);

        // 数据集
        var content = {
            time_local:  row.time_local,
            time_local_date:  date.toLocaleDateString(),
            time_local_timestamp: date.getTime(),            
            remote_addr: row.remote_addr,
            remote_user: row.remote_user,
            request: msg,
            status: row.status,
            request_length: row.request_length,
            request_time: row.request_time,
            body_bytes_sent: row.body_bytes_sent,
            http_referer: row.http_referer,
            http_referer_url: util.getUrl(row.http_referer),
            http_user_agent: row.http_user_agent,
            msec: row.msec,
            browser: detectBrowswer(row.http_user_agent)
        };

         Object.assign(content, parserUa); // 附加
         Object.assign(content, parserErr); // 附加

         list.add(content);
         console.log(parserErr);

    }, function(err) {
        if (err) throw err;
        console.log(`error: ${err}`)
        console.log('Done!')
        resolve(list);
        
    });


}

download().then(function() {
    var promise = new Promise(function(resolve, reject) {
        console.log('begin parseLog');
        parseLog(resolve, reject)
        console.log('after parseLog');
    });
    
    promise.then(function(list) {
        saveToDb(list);
    });
});


function saveToDb(list) {
    var index = 1;
    var _index = 0;
    var timerId = 0;
    var length = list.length;

     dba.open();

     var success = function() {
         if (index > length) {
             clearInterval(timerId);
             console.log('save done');
             return;
         }
         index = index + 1;
         console.log(index + '/' + length);
     }

    timerId = setInterval(function() {
        if (index > _index) {
            dba.insertItem(list.pop(), success);
            _index = index;
        }
        
    }, 10); 
}
