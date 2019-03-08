const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  ownerLogin: String,
  _id: Number,
  repoName: String,
  html_url: String,
  stargazers_count: Number,
}, { _id: false });

let Repo = mongoose.model('Repo', repoSchema);

let save = (reposArray, callback) => {
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
    }, { upsert: true}, callback)
  }
}

let retrieve = (callback) => {
  Repo.find({}, 'ownerLogin repoName html_url stargazers_count', {sort: '-stargazers_count', limit: 25}, callback);
}

module.exports.save = save;
module.exports.retreive = retrieve;