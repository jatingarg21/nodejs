const express = require('express');
const app = express()
const port = 3000

var mongoose = require('mongoose')
var mongoDB =  'mongodb://127.0.0.1:27017/mydb';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log("Connected to DB");
});

/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});*/


//create Schema
//var schema = mongoose.Schema;
var bookSchema = new mongoose.Schema({
    title : String,
    author : String,
    content: String,
    created : Date
})

//create Document
var bookModel = mongoose.model('Book', bookSchema)

//Add data according to schema
const bookData = new bookModel({title:"heya1",author:"abcd",content:"efgh",created:"12/01/2021"})

//Save added data
bookData.save(function(err){
    console.log("Passed")
})

//delete documents
bookModel.deleteMany({ author: 'abcd' }, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
  });

app.get('/', (req, res)=>{
    // welcome to book store
    res.json({ message : 'Welcome to book  store'});  //.json return objects
});

app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}')
})