'use strict';

var util = require('./util');

var logFile =  {
    
        getUrl: function() {
            return ''
        },

        getFileName: function() {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
               // var logFileName = 'https.log.umu.cn.access_20180212.log'
               var logFileName =
                'https.log.umu.cn.access_' +
                yesterday.getFullYear() +
                util.pad0(yesterday.getMonth() + 1) +
                util.pad0(yesterday.getDate()) +
                '.log';  

            return logFileName;
        },

        getLogFileName: function (params) {
            var name = logFile.getFileName();
            return '../log/' + name;
        },

        getLogFileUrl: function() {
            return logFile.getUrl() + logFile.getFileName();
        }

    
    };

module.exports = logFile;
