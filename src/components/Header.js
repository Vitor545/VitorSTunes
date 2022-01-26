import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // Muito pararecido com o requesito 2 somente muda que tem que colocar componentDidMount para que
  // no primeiro ciclo de vida o recuperaUser rode.

  render() {
    const { userName } = this.props;
    return (
      <React.Fragment>
        <header className="header-component" data-testid="header-component">
          <p data-testid="header-user-name">{userName.name}</p>
          {
            // Source do Link: https://reactrouter.com/web/api/Link, bastante coisa interessante
          }
          <Link to="/search" data-testid="link-to-search">Search</Link>
        </header>
      </React.Fragment>
    );
  }
}
