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
    
    db.authorsDetails.aggregate([
        {"$group":{
            _id: { "$gte":[ "$awards", n ]
            }}
        }
        ])
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

    db.author.find( { author: { $gt: new Date('1950-01-01') } } )
        
    callback();
}
const taskThree = function(db,callback){
    console.log("call task three");
    db.booksDeatils.aggregate([
        {$unwind:"$statuses"},
        {$group:{"_id":"$_id",
                "sold":{$last:"$statuses.sold"},
                "seller_id":{$last:"$seller_id"}}},
        {$group:{"_id":"$seller_id",
                "total_sold":{$sum:"$sold"}},
                totalSales:{$sum:"$sold.Product_price"}},
        {$sort:{"$total_sold":-1}}
    ])
    callback();

}
const taskFour = function(db,callback){
    console.log("call task four");
    db.collname.aggregate([
        {"$project":{
        "authors": 1,
        "DOB": 1,
        "books": 1
        }},
        {"$match":{"dob":{"$gte":{"input given DOB"}}}},
          {"$group":{
            "_id":"$authors","totalPrice":{"$sum": $product.product_price}
            }}  
         ])
    callback();
}
