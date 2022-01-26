import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
  render() {
    return (
      <div className="notfound" data-testid="page-not-found">
        <h1>NotFound</h1>
        <Link to="/search" data-testid="link-to-search">HOME</Link>
      </div>
    );
  }
}
