var readline = require('readline');
var util = require('util');
var inputStream = process.stdin;
var outputStream = process.stdout;

//获得字符串实际长度，中文2，英文1
//控制台中中文占用2个英文字符的宽度
var getDisplayLength = function(str) {
    var realLength = 0,
        len = str.length,
        charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};

//计算一个字符串在当前控制台中占用的行数和列数信息
//outputStream.rows及outputStream.columns属性为当前控制台的显示的窗口的大写
var getStrOccRowColumns = function(str) {
    //str=promptStr+str;
    var consoleMaxRows = outputStream.rows;
    var consoleMaxColumns = outputStream.columns;
    var strDisplayLength = getDisplayLength(str);
    var rows = parseInt(strDisplayLength / consoleMaxColumns, 10);
    var columns = parseInt(strDisplayLength - rows * consoleMaxColumns, 10);

    return {
        rows: rows,
        columns: columns
    };
};

class ProgressInfo {
    constructor(promptTip, value) {
        this.promptTip = promptTip || '$';
        this.intervalId = 0;
        this.value = value;
        this.init();
    }

    init() {
        this.rl = readline.createInterface({
            input: inputStream,
            output: outputStream,
            terminal: true
        });

        this.bindEvents();
    }

    displayPrompt() {
        this.rl.setPrompt(`${this.promptTip}> `);
        this.rl.prompt();
    }

    bindEvents() {
        this.rl.on('close', function() {
            process.exit(0);
        });
    }

    begin() {
        var self = this;
        this.displayPrompt();
        var k = 0,
            max = 5 * 60,
            prevOutputContent,
            outputContent,
            cursorDx = 0,
            cursorDy = 0,
            dxInfo;

        this.rl.prompt();
        this.intervalId = setInterval(function() {
            k++;
            if (k > max) {
                this.stop();
            }
            outputContent = util.format('%s', self.value);
            //将光标移动到已经写入的字符前面，
            readline.moveCursor(outputStream, cursorDx * -1, cursorDy * -1);
            //清除当前光标后的所有文字信息，以便接下来输出信息能写入到控制台
            readline.clearScreenDown(outputStream);
            outputStream.write(outputContent);
            //不要使用这个方法，此方法中写入的数据会被作为line事件的输入源读取
            //rl.write(outputContent);
            dxInfo = getStrOccRowColumns(outputContent);

            cursorDx = dxInfo.columns;
            cursorDy = dxInfo.rows;
        }, 1000);
    }

    update(val) {
        this.value = val;
    }

    stop() {
        outputStream.write(util.format('\r\n'));
        this.rl.prompt();
        outputStream.write(util.format('%s\r\n', 'done'));
        clearInterval(this.intervalId);
        this.rl.close();
    }
}

module.exports = ProgressInfo;
