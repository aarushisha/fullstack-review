import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import { request } from 'http';

$(document).ready(function() {
  console.log('document loaded');
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    //ajax request to /post
    $.ajax({
      type: 'POST',
      url: '/repos',
      data: term,
      success: () => {
        console.log('success!');
        this.handleLoad();
      }
    })
  }
//ajax get request?
ajaxSuccess(repoArray) {
  var repoNameArray = []
  for (var i = 0; i < repoArray.length; i++) {
    var repoObj  = {};
    repoObj.name = repoArray[i].repoName;
    repoObj.user = repoArray[i].ownerLogin;
    repoObj.url = repoArray[i].html_url;
    repoObj.stargazers_count = repoArray[i].startgazers_count;
    repoNameArray.push(repoObj);
  }
  this.setState({
    repos: repoNameArray
  });
}

handleLoad () {
  $.ajax({
    type: 'GET',
    url: '/repos',
    error: function(jqXHR, exception) {
      console.log("error", jqXHR, exception);
    },
    success: (data) => {
      console.log("successsssssss", data);
      this.ajaxSuccess(data);
    }
  })
}




  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
