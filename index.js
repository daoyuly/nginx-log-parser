'use strict';
/**
 * @file 分析nginx log，并导入到mongodb
 * http://ip.taobao.com/service/getIpInfo.php?ip=58.243.254.227
 */
var Promise = require('promise');
var Map = require("collections/map");
var List = require("collections/list");
var NginxParser = require('nginxparser');
var detectBrowswer = require('./browser');
var util = require('./util');
var DBA = require('./db');

// 使用co异步
var co = require('co');
var thunkify = require('thunkify');
var request = require('request');
var get = thunkify(request.get);

var dba = new DBA();
var list = new List();
// var logFormat = '[$time_local] - $remote_addr - $remote_user "$request" $status $request_length $request_time - $body_bytes_sent $body_bytes_sent "$http_referer" "$http_user_agent" "-" "-" $msec';
var logFormat = '[$time_local] - $remote_addr - $remote_user "$request" $status "-" $request_length $request_time - $body_bytes_sent $body_bytes_sent "$http_referer" "$http_user_agent" "-" "-" $msec';

var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
// var logFileName = '20170728.txt' 
var logFileName = 'https.log.umu.cn.access_' + yesterday.getFullYear() + util.pad0(yesterday.getMonth()+1) + util.pad0(yesterday.getDate()) + '.log';

function parseLog(resolve, reject) {
    var parser = new NginxParser(logFormat);

    var i = 0

    parser.read('/Users/liudaoyu/Documents/work/nginx-log/log/'+logFileName, function(row) {
        i = i + 1;
        var query = decodeURIComponent(row.request);
        var msg = util.getErrorMsg(query);
        // 数据集
        var content = {
            time_local:  util.formateLogTime(row.time_local),
            remote_addr: row.remote_addr,
            remote_user: row.remote_user,
            request: msg,
            status: row.status,
            request_length: row.request_length,
            request_time: row.request_time,
            body_bytes_sent: row.body_bytes_sent,
            http_referer: row.http_referer,
            http_user_agent: row.http_user_agent,
            msec: row.msec,
            browser: detectBrowswer(row.http_user_agent)
        };

        list.add(content);
         // console.log(i);

    }, function(err) {
        if (err) throw err;
        console.log(err)
        console.log('Done!')
        resolve(list);
    });


}



var promise = new Promise(function(resolve, reject) {
    parseLog(resolve, reject)
});

function innerGetIp(ip) {
    var a = get('http://ip.taobao.com/service/getIpInfo.php?ip='+list[i].remote_addr);
    return a;
}

promise.then(function(list) {
    
/*     var fn = co.wrap(function *(list){
        for(var i = 0; i < list.length; i++) {
            console.log(list);
            var ip = '0.0.0.0'; // list[i].remote_addr
            
            var a = yield innerGetIp(ip);
            console.log(a[0].body);
        }
    });

    fn(list).then(function(){
        console.log('ip设置ok')
        saveToDb(list);
    });  */

     saveToDb(list);
});

function saveToDb(list) {
    // return;
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