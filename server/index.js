const express = require('express');
const bodyParser = require('body-parser');
let app = express();
var helper = require('../helpers/github.js');
var getReposByUsername = helper.getReposByUsername;
var save = require('../database/index.js');
var saveRepos = save.save;
var retrieve = save.retreive;


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = Object.keys(req.body)[0];
  getReposByUsername(username, function(error, response, body) {
    reposArray = JSON.parse(body);
    saveRepos(reposArray, function(err, data) {
      if (err) {
        console.log('err in findOneAndUpdate----------------------------', err);
      } else {
        console.log('saved-----------------------------', data);      
      }
    }) 
    res.send('success!');   
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  retrieve(function(err, post) {
    res.send(post);
  })
});

let port = 1128;

app.listen(process.env.PORT || port, function() {
  console.log(`listening on port ${port}`);
});

