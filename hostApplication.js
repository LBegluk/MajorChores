var express = require('express');
var bodyParser = require("body-parser");
var http = require('http');
var choreassigner = require("./Controller/chore-assigner.js");
fs = require('fs');
var arr = [];
var allChores = [];

app = express();

httpServer = http.Server(app);

app.use(express.static('./View'));

var Initialize = async function(){
  arr = await choreassigner.assigneChoresToMember();
  allChores = await choreassigner.getAllChores();
  allMembers = await choreassigner.getAllMembers();
}

Initialize();

app.get('/', function(req, res) {
  res.sendfile('./View/angular-test.html');
});

app.get('/controller', function(req, res) {
  res.sendfile('./View/controller/angular-controller.js');
});

app.get('/stat-page', function(req, res) {
  res.sendfile('./View/angular-stat-page.html');
});

app.get('/stat-page/statCtrl', function(req, res) {
  res.sendfile('./View/statCtrl/angular-controller-stat-page.js');
});

app.get('/getAllChores', function(req, res){
  console.log("In getAllChore controler");
  console.log(allChores);
  res.send(allChores);
})

app.get('/getAllMembers', function(req, res){
  console.log("In getAllChore controler");
  console.log(allMembers);
  res.send(allMembers);
})

app.get('/chores', function(req, res) {  
  console.log("In chore controller");
  console.log(arr);
  res.send(arr);
});

app.listen(8080)