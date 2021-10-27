import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      banda: '',
      isButtonDSearch: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonSearch = this.buttonSearch.bind(this);
    this.checkButtonSearch = this.checkButtonSearch.bind(this);
  }
  // requesito 5 muito parecido com o do Login

  handleChange({ target }) {
    const valueDigitado = target.value;
    this.setState({ banda: valueDigitado }, () => this.checkButtonSearch());
  }

  buttonSearch() {

  }

  checkButtonSearch() {
    const { banda } = this.state;
    if (banda.length >= Number('2')) {
      this.setState({ isButtonDSearch: false });
    }
  }

  render() {
    const { isButtonDSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist-input">
          <input
            type="text"
            data-testid="search-artist-input"
            id="search-artist-input"
            onChange={ this.handleChange }
            placeholder="Digite a banda"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            onClick={ this.buttonSearch }
            disabled={ isButtonDSearch }
          >
            Pesquisar
          </button>
        </label>
      </div>
    );
  }
}
