const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  ownerLogin: String,
  _id: Number,
  html_url: String,
  stargazers_count: Number,
}, { _id: false });

let Repo = mongoose.model('Repo', repoSchema);

let save = (reposArray) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  for (var i = 0; i < reposArray.length; i++) {
    var newRepo = new Repo;
    var query = { _id: reposArray[i].id};
    Repo.findOneAndUpdate(query, {
      stargazers_count: reposArray[i].stargazers_count,
      ownerLogin: reposArray[i].owner.login,
      html_url: reposArray[i].html_url,
    }, { upsert: true}, function(err, data) {
      if (err) {
        console.log('err in findOneAndUpdate----------------------------', err);
      } else {
        console.log('saved-----------------------------', data);
      }
    })
  }
}

let retrieve = (callback) => {
  // Repo.find().sort('stargazers_count', -1).limit(25).exeqFind(function(err, post) {
  //   if(err) {
  //     console.log('error in retrieval-------------------', err);
  //   } else {
  //     console.log('retrieval was successful with------------------', post);
  //   }
  // })
  Repo.find({}, 'ownerLogin stargazers_count html_url', {sort: '-stargazers_count', limit: 25}, function (err, docs) {
    if (err) {
      console.log('error in retrieve-----------------------------', err);
    } else {
      console.log('retrieved these docs successfully --------------------------', docs);
    }
  })
}

module.exports.save = save;
module.exports.retreive = retrieve;