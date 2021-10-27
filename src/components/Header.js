import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './ Loading';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: '',
    };
  }

  componentDidMount() {
    this.recuperaUser();
  }

  async recuperaUser() {
    const user = await getUser();
    this.setState({ user }, () => this.setState({ loading: false }));
  }

  render() {
    const { loading, user } = this.state;
    return loading ? <Loading /> : (
      <div>
        <header data-testid="header-component">
          <p data-testid="header-user-name">{user.name}</p>
        </header>
      </div>
    );
  }
}
