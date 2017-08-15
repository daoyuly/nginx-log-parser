db.getCollection('users').find()
db.getCollection('users').find({"browser" : "QQBrowser"}).count()
db.getCollection('users').find({"browser" : "QQBrowser"}).explain()

db.getCollection('users').distinct('http_referer')
db.getCollection('users').distinct('http_user_agent')
db.getCollection('users').distinct('remote_addr')
db.getCollection('users').distinct('request')
db.getCollection('users').distinct('request',{"browser" : "IE"})

db.getCollection('users').count({"browser" : "IE"})
db.getCollection('users').count({"browser" : "IE"})

// 基于浏览器的分组
db.getCollection('users').group({
    key: {'browser': true},
    initial: {list: []},
    $reduce: function(cur, prev) {
        prev.list.push(cur);
    }
    
})

// 基于IP的分组
db.getCollection('users').group({
    key: {'remote_addr': true},
    initial: {list: []},
    $reduce: function(cur, prev) {
        prev.list.push(cur);
    }
})


// 基于request的分组
db.getCollection('users').group({
    key: {'request': true},
    initial: {list: [],count:0},
    $reduce: function(cur, prev) {
        prev.list.push(cur);
    },
    finalize: function(prev) {
        prev.count = prev.list.length;
    }
})

// 正则
db.getCollection('users').find({"status": /[\d]{1,2}/}).count();

// where
db.getCollection('users').find({"$where": function(){
    return this.status == 200;
}});


