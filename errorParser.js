
/**
 * 错误内容解析
 * 
 */

var errorType = /(EvalError)|(InternalError)|(RangeError)|(ReferenceError)|(SyntaxError)|(TypeError)|(URIError)|(Script error)/i


function errorParser(errorString = '') {
    errorString = errorString.replace('msg[0]=', '');
    var errType = 'other error';
    var errContent = errorString;
    var errTypeMatch = errorString.match(errorType)
    if (errTypeMatch && errTypeMatch.length > 0) {
        errType = errTypeMatch[0]
    }

    let index = errContent.indexOf('@');
    if (index > 0) {
        errContent =  errorString.substr(0, index);
    } 
    
    return {
        error_type: errType,              
        error_content: errContent
    } 
}


module.exports = errorParser;






