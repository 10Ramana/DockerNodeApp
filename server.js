const express= require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const keys = require('./keys');
const url = "mongodb://"+keys.HOST+":"+keys.PORT;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/id',async function(req,res){
    await mongo.connect(url, {useNewUrlParser: true}, (err, db) => {
        if(err) {
           console.log(err);
           process.exit(0);
        }
        console.log('database connected!');
        var dbo = db.db('ramanaDataBase');
        // dbo.createCollection('users2', (err, result) => {
        //     if(err) {
        //        console.log(err);
        //        process.exit(0);
        //     }
        //     console.log('collection created!');
        //     db.close();
        // });
        let data = [{
            "id": 100,
             "name": "Shahid"
         },{
             "id": 101,
             "name": "Rahil"
         },{
             "id": 102,
             "name": "John"
         }];
        var collection = dbo.collection('users2');
        collection.insertMany(data, (err, result) => {
        if(err) {
            console.log(err);
            process.exit(0);
        }
        console.log(result);
        db.close();
    });
});
res.send("inserted")

})
app.get('/getData',function(req,res){
    console.log("====");
    mongo.connect(url, (err, db) => {
        console.log(db)
        var dbo = db.db('ramanaDataBase');
        var collection = dbo.collection('users2');
        collection.find().toArray((err, results) => {
            
            console.log(results);
            res.send(results);
        
        });
    });
})
app.get('/',async function(req,res){
    //await addData.addData()
    res.send("welcome");  
})
const server = app.listen(5000, function () {
    console.log('Server listening on port ' + 5000);
});