const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  ownerLogin: String,
  _id: Number,
  repoName: String,
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
      repoName: reposArray[i].name,
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
  Repo.find({}, 'ownerLogin stargazers_count name html_url', {sort: '-stargazers_count', limit: 25}, callback);
}

module.exports.save = save;
module.exports.retreive = retrieve;