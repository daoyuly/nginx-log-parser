
db.getCollection('users').find({'time_local_timestamp': {$lt:1511395200000}}).count()    // < 8:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511402400000}}).count()    // < 10:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511406000000}}).count()    // < 11:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511409600000}}).count()    // < 12:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511413200000}}).count()    // < 13:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511416800000}}).count()    // < 14:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511420400000}}).count()    // < 15:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511424000000}}).count()    // < 16:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511424000000}}).count()    // < 16:00:00


db.getCollection('users').find({'time_local_timestamp': {$lt:1511427600000}}).count()    // < 17:00:00


db.getCollection('users').find({'time_local_timestamp': {$lt:1511431200000}}).count()    // < 18:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511434800000}}).count()    // < 19:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511438400000}}).count()    // < 20:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511442000000}}).count()    // < 21:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511445600000}}).count()    // < 22:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511449200000}}).count()    // < 23:00:00

db.getCollection('users').find({'time_local_timestamp': {$lt:1511452799000}}).count()    // < 23:59:59





















