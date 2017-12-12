db.getCollection('users2').find({'time_local_timestamp': {$gt:1511427600000}}).count()
db.getCollection('users2').remove({'request': /preventDefault.*/i})
db.getCollection('users2').find().count()


// 基于request的分组
db.getCollection('users2').group({
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
            && cur.request.indexOf("Cannot read property 'init' of undefined") == -1 
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
        
            && cur.request.indexOf("Can't find variable: _WXJS") == -1

            && cur.request.indexOf("WebViewJavascriptBridge") == -1   // fix 9.15
        
            && cur.request.indexOf("TypeError: null is not an object (evaluating 'a.childNodes')") == -1   // pending
        
            && cur.request.indexOf("Failed to set the 'domain' property on 'Document'") == -1   // pending
         
            && cur.request.indexOf("wx is not defined") == -1   // fix 9.15
            && cur.request.indexOf("Cannot call method 'replace' of undefined") == -1   // fix 9.15
         
            && cur.request.indexOf("ReferenceError: Can't find variable: wx") == -1   // todo 9.20
            
            
            && cur.request.indexOf("Can't find variable: ICBCInitTools") == -1    // todo 特定问题
            && cur.request.indexOf("BJ_REPORT.tryJs is not a function") == -1    // todo 特定问题
        
            && cur.request.indexOf("define is not defined") == -1    // todo 特定问题
            
            && cur.request.indexOf("hackLocationSuccess is not defined") == -1    // 
            
            && cur.request.indexOf("Can't find variable: MyAppGetHTMLElementsAtPoint") == -1 
        
            && cur.request.indexOf("ReferenceError: onSvFinishLoading is not defined") == -1 
            && cur.request.indexOf("Can't find variable: MyAppGetHTMLElementsAtPoint") == -1
            && cur.request.indexOf("https://static.bcedocument.com/reader/v2") == -1
           
            && cur.request.indexOf("CloudHubJSBridge is not defined") == -1
        
            && cur.request.indexOf("SeMobFillFormTool.fillForm") == -1
            && cur.request.indexOf("Can't find variable: isSpecial") == -1
            && cur.request.indexOf("window.__firefox__.reader") == -1
            && cur.request.indexOf("MyAppGetLinkHREFAtPoint") == -1
            && cur.request.indexOf("bobaoCallback is not defined") == -1   
            && cur.request.indexOf("action[0]=/core/web/error&videoUrl") == -1   
            && cur.request.indexOf("window.__$_qihoo360_$__.dayMode") == -1   
            && cur.request.indexOf("TypeError: b is not a function.") == -1  
            && cur.request.indexOf("ReferenceError: Can't find variable: taobao@closeTaobaoSmartAd") == -1  
            
            
            
            
      
       
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



// db.getCollection('users2').remove({})