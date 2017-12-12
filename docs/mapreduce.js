db.getCollection('users3').stats()
db.getCollection('users3').find({}).count()

db.getCollection('users3').mapReduce(
   function() {emit(this.time_local_timestamp, this.request);},  //map 函数
   function(key,values) { return this.request},   //reduce 函数
   {
      out: 'post_total',
      query: {},
      
   }
)








