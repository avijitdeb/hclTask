const express = require('express')
const app = express()
const port = 3000
/*Db connection */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'avijittask';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  taskOne(db, function() {
      taskTwo(db, function(){
        taskThree(db, function(){
            taskFour(db, function(){
                    client.close();
                });
            });
        });
    });
});
/*Db connection */
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));



const taskOne = function(db, callback) {
    console.log("call task One..");

    // Get the documents collection
    // const collection = db.collection('documents');
    // // Insert some documents
    // collection.insertMany([
    //   {a : 1}, {a : 2}, {a : 3}
    // ], function(err, result) {
    //   assert.equal(err, null);
    //   assert.equal(3, result.result.n);
    //   assert.equal(3, result.ops.length);
    //   console.log("Inserted 3 documents into the collection");
    //   callback(result);
    // });


    // db.collname.aggregate([
    //     {"$group":{
    //         "_id":"$awards","noawards":{"$sum": 1}
    //         }}
    //     ])
    callback();
  }

const taskTwo = function(db,callback){
    console.log("call task two..");
    // db.collname.aggregate([
    //     {"$project":{
    //     "authors": 1,
    //     "awards": 1,
    //     "year": 1
    //     }},
    //     {"$match":{
    //         "year":{"$gte":"awards"}
    //         }}
    //     ])
        
    callback();
}
const taskThree = function(db,callback){
    console.log("call task three");
    callback();

}
const taskFour = function(db,callback){
    console.log("call task four");

    // db.collname.aggregate([
    //     {"$project":{
    //     "authors": 1,
    //     "DOB": 1,
    //     "books": 1
    //     }},
    //     {"$match":{"dob":{"$gte":{"input given DOB"}}}},
    //       {"$group":{
    //         "_id":"$authors","totalPrice":{"$sum": 1}
    //         }}  
    //      ])

    callback();
}
