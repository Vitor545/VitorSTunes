import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './ Loading';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userName: '',
    };
  }

  // Muito pararecido com o requesito 2 somente muda que tem que colocar componentDidMount para que
  // no primeiro ciclo de vida o recuperaUser rode.
  componentDidMount() {
    this.recuperaUser();
  }

  async recuperaUser() {
    const userName = await getUser();
    this.setState({ userName }, () => this.setState({ loading: false }));
  }

  render() {
    const { loading, userName } = this.state;
    return loading ? <Loading /> : (
      <div>
        <header data-testid="header-component">
          <p data-testid="header-user-name">{userName.name}</p>
          {
            // Source do Link: https://reactrouter.com/web/api/Link, bastante coisa interessante
          }
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </header>
      </div>
    );
  }
}
