db.getCollection('users').find({"browser" : "QQBrowser"}).count()
db.getCollection('users').find({"browser" : "QQBrowser"}).explain()

db.getCollection('users').distinct('http_referer')
db.getCollection('users').distinct('http_user_agent')
db.getCollection('users').distinct('remote_addr')
db.getCollection('users').distinct('request')
db.getCollection('users').distinct('request',{"browser" : "IE"})

db.getCollection('users').count({"browser" : "IE"})
db.getCollection('users').count({"browser" : "IE"})