db.getCollection('users').find({"$where": function(){
    if (!this.request)
    {  return false;
    }
     return this.request.indexOf("IE 8.0") > -1;
}}).count()

db.getCollection('users').find({"$where": function(){
    if (!this.request)
    {  return false;
    }
     return this.request.indexOf("IE 7.0") > -1;
}}).count()


db.getCollection('users').find({"$where": function(){
    if (!this.request)
    {  return false;
    }
     return this.request.indexOf("WeixinJSBridge") > -1;
}}).count()


db.getCollection('users').find({"$where": function(){
    if (!this.request)
    {  return false;
    }
     return this.request.indexOf("Script error.") > -1;
}}).count()


db.getCollection('users').find({"$where": function(){
    if (!this.request)
    {  return false;
    }
     return this.request.indexOf("Maximum call stack size") > -1;
}}).count()


db.getCollection('users').find({"$where": function(){
    if (!this.request)
    {  return false;
    }
     return this.request.indexOf("Cannot read property 'init' of undefined") > -1;
}}).count()


db.getCollection('users').find({"$where": function(){
    if (!this.request)
    {  return false;
    }
     return this.request.indexOf("") > -1;
}}).count()



















