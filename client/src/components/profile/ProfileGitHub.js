import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProfileGitHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "d3c76c8dcf3b8818a86a",
      clientSecret: "80a185533fe53c0237a5bbefe8a090a5fa6a744d",
      count: 5,
      sort: "created : asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;
    if (this.refs.myRef) {
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
      )
        .then(res => res.json())
        .then(data => this.setState({ repos: data }));
    }
  }

  render() {
    const { repos } = this.state;

    const repositryRenderer = repos.map(repo => (
      <div className="card card-body mb-2" key={repo.id}>
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.startgazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watcher_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repositryRenderer}
      </div>
    );
  }
}
