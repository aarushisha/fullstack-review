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
      success: function() {
        console.log('success!');
      }
    })
  }
//ajax get request?
ajaxSuccess(repoArray) {
  this.setState({
    repos: repoArray
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
