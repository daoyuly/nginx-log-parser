db.getCollection('users').find({"$where": function(){
    if (!this.request)
    {  return false;
     }
    
    // return reg.test(this.request)
     return (this.request.indexOf("status[0]=5") > -1)
}}).count()

db.getCollection('users').find({"$where": function(){
    if (!this.request)
    {  return false;
     }
    
    // return reg.test(this.request)
     return (this.request.indexOf("release") > -1)
}}).count()

db.getCollection('users').find({"$where": function(){
    if (!this.http_referer)
    {  return false;
     }
    
    // return reg.test(this.request)
     return (this.http_referer.indexOf("umu.cn") > -1)
}}).count()


db.getCollection('users').find({"$where": function(){
    if (!this.remote_loaction)
    {  return false;
     }
    
    // return reg.test(this.request)
     return (this.remote_loaction.indexOf("中国") == -1)
}}).count()


db.getCollection('users').find({"$where": function(){
    if (!this.remote_addr)
    {  return false;
     }
    
    // return reg.test(this.request)
     return (this.remote_addr.indexOf("124.205.43.114") > 0)
}}).count()


db.getCollection('users').find({"$where": function(){
    if (!this.http_user_agent)
    {  return false;
     }
    
    // return reg.test(this.request)
     return (this.http_user_agent.indexOf("iphone) > 0)
}}).count()


