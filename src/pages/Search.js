import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/ Loading';
import Forms from '../components/Forms';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      banda: '',
      bandasave2: '',
      albumApi: [],
      isButtonDSearch: true,
      loading: false,
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

  async getsearchAlbumsAPI() {
    const { banda } = this.state;
    const albumApi = await searchAlbumsAPI(banda);
    this.setState({ albumApi }, () => this.setState({
      loading: false,
      banda: '',
    }));
  }

  buttonSearch() {
    const { banda } = this.state;
    this.setState({ loading: true, bandasave2: banda }, () => this.getsearchAlbumsAPI());
  }

  checkButtonSearch() {
    const { banda } = this.state;
    if (banda.length >= Number('2')) {
      this.setState({ isButtonDSearch: false });
    }
  }

  render() {
    const { isButtonDSearch, bandasave2, albumApi, loading } = this.state;
    return loading ? <Loading /> : (
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
        </label>

        <button
          type="button"
          data-testid="search-artist-button"
          onClick={ this.buttonSearch }
          disabled={ isButtonDSearch }
        >
          Pesquisar
        </button>
        <div>
          <p>{`Resultado de álbuns de: ${bandasave2}`}</p>
          {albumApi.length === 0 ? <p>Nenhum álbum foi encontrado</p> : <Forms
            albumApi={ albumApi }
          /> }
        </div>
      </div>
    );
  }
}
