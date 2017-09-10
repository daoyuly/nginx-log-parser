// var parser = require('ua-parser-js');
var parser = require('./libs/ua-parser');



function uaParser(uaStr) {
   
    var result = parser(uaStr);
    // console.log(result)
    return {
        // browser: result.browser.name,
        browser_v: result.browser.version,
        engine:  result.engine.version,
        engine_v:  result.engine.version,
        OS: result.os.name,
        OS_v: result.os.version,
        vendor: result.device.vendor,
        device_model: result.device.model
    }
}


module.exports = uaParser;