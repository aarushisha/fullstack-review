const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  ownerLogin: String,
  _id: {
    type: Number,
    index: true,
    unique: true
  },
  html_url: String,
  stargazers_count: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (reposArray) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //reposArray -> array of objects
  for (var i = 0; i < reposArray.length; i++) {
    var newRepo = new Repo;
    newRepo.ownerLogin =  reposArray[i].owner.login;
    newRepo._id = reposArray[i].id;
    newRepo.html_url = reposArray[i].html_url;
    newRepo.stargazers_count = reposArray[i].stargazers_count;
    newRepo.save(function(error, newRepo) {
      if (error) {
        console.log('error in saving repo---------------', error);
      } else {
        console.log('successfully saved repo------------------------'. newRepo);
      }
    })
  
  }
}

module.exports.save = save;