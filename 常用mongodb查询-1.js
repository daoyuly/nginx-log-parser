db.getCollection('users').remove({})

db.getCollection('users').distinct('error_type')
db.getCollection('users').find({"browser" : "IE 8.0","time_local_date" : "2017-9-7"})
db.getCollection('users').find({"browser" : "IE 7.0","time_local_date" : "2017-9-7"})

db.getCollection('users').find({"http_user_agent": {$exists: true}}, {http_user_agent:1,vendor:1})

db.getCollection('users').find({})


db.getCollection('users').find({"$where": function(){
    if (!this.request)
    {  return false;
     }
    
    // return reg.test(this.request)
     return this.request.indexOf("SyntaxError") > -1;
}}).count()

// 基于request的分组
db.getCollection('users').group({
    key: {'request': true},
    initial: {count: []},
    $reduce: function(cur, prev) {
        if (!cur.request) {
            return;
         }
        if(cur.browser != "IE 8.0" 
            && cur.browser != "IE 7.0" 
            && cur.request.indexOf('WeixinJSBridge') == -1 
            && cur.request.indexOf('Script error.') == -1 
            && cur.request.indexOf('umucdn') == -1 
            && cur.request.indexOf('Maximum call stack size') == -1 
            && cur.request.indexOf("closeDialog") == -1
            && cur.request.indexOf("vendor/editor/ueditor.all") == -1
            && cur.request.indexOf("undefined is not an object (evaluating 'require") == -1
            && cur.request.indexOf("TypeError: Cannot read property 'init' of undefined") == -1
            && cur.request.indexOf("canvasList") == -1
            && cur.request.indexOf("initCountryCodeSelector") == -1
           && cur.request.indexOf("Error: [$rootScope:inprog] $digest already in progress") == -1
            && cur.request.indexOf("无法获取属性“0”的值") == -1
            && cur.request.indexOf("TypeError: Cannot set property 'chatroom' of undefined") == -1
            && cur.request.indexOf("ReferenceError: Can't find variable: getApp@global code") == -1
            && cur.request.indexOf("“console”未定义") == -1
         && cur.request.indexOf("无法获取属性“toggle”的值:") == -1
        
        

        
        
        ) {
           prev.count++
        }
        
    },
    finalize: function(prev) {
       if(prev.count < 1)
       { return null;
        }
    }
})



// 基于request的分组
db.getCollection('users').group({
    key: {'vendor': true},
    initial: {count: []},
    $reduce: function(cur, prev) {
        if (!cur.request) {
            return;
         }
        prev.count++
        
    },
    finalize: function(prev) {
       if(prev.count < 1)
       { return null;
        }
    }
})


// 基于request的分组
db.getCollection('users').group({
    key: {'error_content': true},
    initial: {count: []},
    $reduce: function(cur, prev) {
        if (!cur.request) {
            return;
         }
        prev.count++
        
    },
    finalize: function(prev) {
       if(prev.count < 1)
       { return null;
        }
    }
})



















