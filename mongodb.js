var MongoClient = require('mongodb').MongoClient;

module.exports = {
    FindinUser : function (callback) {
        MongoClient.connect('mongodb://localhost:27017/MajorChores').then(function (db) {
            var collection = db.collection('user');
            return collection.find({},{name:1, _id:0}).toArray();
        }).then(function(data){
            var members =[];
            for (i in data)
                {
                    members.push(data[i].name);
                }
            return callback(members);
        });     
        console.log('after mongo');
    },

    GetChores : function(callback){
        console.log('in function');
        MongoClient.connect('mongodb://localhost:27017/MajorChores').then(function (db) {
            console.log("In MongoClient");
            var collection = db.collection('chores');
            return collection.find({},{name:1, frequency:1, deadline:1, score:1, _id:0}).toArray();
        }).then(function(data){
            var chores = [];
            for (i in data)
                {
                    chores.push(data[i]);
                }
            return callback(chores);
        });     
        console.log('after mongo');
    }
  };
