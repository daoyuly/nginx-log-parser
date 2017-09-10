/*db.getCollection('users').remove({})*/
db.getCollection('users').find({"browser" : "IE 8.0","time_local_date" : "2017-9-7"})
db.getCollection('users').find().count()
db.getCollection('users').find({"browser" : "QQBrowser"}).count()
db.getCollection('users').find({"browser" : "QQBrowser"}).explain()

db.getCollection('users').distinct('http_referer_url')
db.getCollection('users').distinct('browser')
db.getCollection('users').distinct('http_referer')
db.getCollection('users').distinct('http_user_agent')
db.getCollection('users').distinct('remote_addr', {"browser" : "IE","time_local_date" : "2017-08-21"}).length
db.getCollection('users').distinct('request')

db.getCollection('users').distinct('http_user_agent',{"request": /.*contentWindow.*/, "time_local_date" : "2017-9-5"}) 

db.getCollection('users').distinct('request', {"browser" : "IE","time_local_date" : "2017-9-5"}) 
db.getCollection('users').distinct('request',{"browser" : "Chrome","time_local_date" : "2017-8-25"})
db.getCollection('users').distinct('request',{"time_local_date" : "2017-9-6"})


db.getCollection('users').count({"browser" : "IE "})
db.getCollection('users').count({"browser" : "Chrome","time_local_date" : "2017-8-26"})

// 基于浏览器的分组
db.getCollection('users').group({
    key: {'browser': true},
    initial: {list: []},
    $reduce: function(cur, prev) {
        prev.list.push(cur);
    }
    
})

// 基于http_referer_url的分组
db.getCollection('users').group({
    key: {'http_referer_url': true},
    initial: {list: []},
    $reduce: function(cur, prev) {
        prev.list.push(cur);
    },
    finalize: function(prev) {
        prev.count = prev.list.length;
    }
    
})

// 基于IP的分组
db.getCollection('users').group({
    key: {'remote_addr': true},
    initial: {list: []},
    $reduce: function(cur, prev) {
        prev.list.push(cur);
    },
    finalize: function(prev) {
        prev.count = prev.list.length;
    }
})


// 基于request的分组
db.getCollection('users').group({
    key: {'request': true},
    initial: {list: []},
    $reduce: function(cur, prev) {
        prev.list.push(cur);
    },
    finalize: function(prev) {
        prev.count = prev.list.length;
    }
})

// 基于request的分组
db.getCollection('users').group({
    key: {'request': true},
    initial: {count: []},
    $reduce: function(cur, prev) {
        if(cur.browser != "IE 8.0" && cur.browser != "IE 7.0" && cur.request ) {
            prev.count++
            }
        
    },
    finalize: function(prev) {
       if(prev.count < 1)
       { return null
        }
    }
})

// 正则
db.getCollection('users').find({"status": /[\d]{1,2}/}).count();
db.getCollection('users').find({"request": /.*contentWindow.*/, "time_local_date" : "2017-9-5"})
db.getCollection('users').find({"request": /.*contentWindow.*/, "time_local_date" : "2017-9-5"})

// db.getCollection('users').find({"request": /.*contentWindow.*/, "time_local_date" : "2017-9-5"}).count()
// where
db.getCollection('users').find({"$where": function(){
    return this.request == 'msg[0]=SyntaxError: Unexpected end of input&rowNum[0]=1&colNum[0]=11&level[0]=4&count=1';
}})


db.getCollection('users').aggregate([
{$group : {_id : "$request", num : {$sum : 1}}},
{$sort : $sum}

])

// 判断IE11是否有报错
db.getCollection('users').find({"browser" : "IE","time_local_date" : "2017-9-5"})
// 判断chrome是否有报错
db.getCollection('users').find({"browser" : "chrome","time_local_date" : "2017-08-19"})


// MapReduce 处理
var m=function(){
    emit(this.request,this.time_local);
}

var r=function(key,values){
    var ret={request:key,time_local:values};
    return ret;
}

var f=function(key,rval){
    if(key==0){
        rval.msg="a new life,baby!";
    }
    return rval
}

db.runCommand({
    mapreduce:"users",
    map:m,
    reduce:r,
    finalize:f,
    out:"t_age_names"
    }
)
