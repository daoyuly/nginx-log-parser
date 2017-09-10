
'use strict'

var reg = /GET \/hm.gif\?bl_param=/ig;
var reg2 = /\&t=\d*\sHTTP\/1\.1/ig;

var dateReg = /(\d{2})\/([A-Za-z]{3,4})\/(\d{4})\:(\d\d\:\d\d\:\d\d)/;

function getErrorMsg(s) {
    var str = s.replace(reg, '');
    var str2 = str.replace(reg2, '');
    var obj = {};
    try {
        obj = JSON.parse(str2) || {};
    } catch (error) {
        console.log(str2);
    }
    return obj.error;
}


function pad0(num) {
   return ('0'+num).slice(-2);
}

function formateLogTime(strDate) {
    var str = strDate.replace(' +0800', '');
    str = str.replace('[', '');
    str = str.replace(']', '');
    var match = str.match(dateReg)
    var date = new Date(match[3]+match[2]+match[1]+' '+ match[4]);
    return date
}

function getUrl(url) {
    return url ? url.split('?')[0]:''; 
}

module.exports = {
    getErrorMsg: getErrorMsg,
    pad0: pad0,
    formateLogTime: formateLogTime,
    getUrl
}