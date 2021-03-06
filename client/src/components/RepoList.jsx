import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br></br>
    <div>
      {props.repos.map (el => {
        return <div>
        <span>Stargazers: {el.stargazers_count} | </span><a key={el.id} href={el.url} target="_blank">{el.name}</a><span> by {el.user}</span>
        </div>
      })}
    </div>
  </div>
)

export default RepoList;