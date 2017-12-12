/**
 * @file db的操作
 */

 const bluebird = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise =bluebird; //Promise
var DB_URL = 'mongodb://localhost:27017/test';

// 设置数据类型
var logSchema = new mongoose.Schema({
    time_local: { type: String },
    time_local_date: { type: String },
    time_local_timestamp: { type: Number },
    remote_addr: { type: String },
    remote_user: { type: String },
    request: { type: String },
    status: { type: String },
    request_length: { type: String },
    request_time: { type: String },
    body_bytes_sent: { type: String },
    http_referer: { type: String },
    http_referer_url: { type: String },
    http_user_agent: { type: String },
    msec: { type: String },
    browser: { type: String },

    browser_v: { type: String },                // ua 分析
    engine: { type: String },
    engine_v: { type: String },
    OS: { type: String },
    OS_v: { type: String },
    vendor: { type: String },
    device_model: { type: String },

    error_type: { type: String },               // request 分析
    error_content: { type: String },
});


/**
 * 连接成功
 */
mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
});



function dba() {
    this.db = null;
}

dba.prototype = {
    open: function() {
       
        this.db = mongoose.connect(DB_URL, {
            useMongoClient: true
        });

    },

    close: function() {
        this.db.close();
    },

    insert: function(docs) {
        // 选择集合
        var logModel = db.model('users', logSchema);
        logModel.collection.insert(docs, function(err, docs) {
            if (err) {
                // TODO: handle error
                console.log(err)
            } else {
                console.info('%d potatoes were successfully stored.', docs.length);
            }
        });


    },

    insertItem: function(item, success, fail) {
        // 选择集合
        var logModel = this.db.model('users', logSchema);
        // 实例化对象并插入数据

        var monInsert = new logModel(item);
        monInsert.save(function(err) {
            if (err) {
                console.log(err);
                fail&&fail()
            } else {
                console.log('成功插入数据');
                success&&success();
            }

        });
    }
}


module.exports = dba;