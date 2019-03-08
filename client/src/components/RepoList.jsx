import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br></br>
    <div>
      {props.repos.map (el => {
        return <div key={el.id}>
        <span>{el.name}</span>
        </div>
      })}
    </div>
    {/* {JSON.stringify(props.repos)} */}
  </div>
)

export default RepoList;