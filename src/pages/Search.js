import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { getUser } from '../services/userAPI';
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
      loading: true,
      userName:'',
      bandaRecomendacion: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonSearch = this.buttonSearch.bind(this);
    this.checkButtonSearch = this.checkButtonSearch.bind(this);
    this.geraMusica = this.geraMusica.bind(this);
    this.getRecomendacion = this.getRecomendacion.bind(this);
    this.geraMusicaRecom = this.geraMusicaRecom.bind(this);

  }
  // requesito 5 e 6 muito parecido com o do Login

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

  componentDidMount() {
    this.getRecomendacion();
    this.recuperaUser();

  }

  async getRecomendacion() {
    const albumApi = await searchAlbumsAPI("eminem");
    this.setState({ bandaRecomendacion: albumApi });
  }

  geraMusicaRecom(albumApi) {
    return (
      <React.Fragment>
        <p>Músicas Recomendadas</p>
        <Forms albumApi={ albumApi } />
      </React.Fragment>
    );
  }

  async recuperaUser() {
    const userName = await getUser();
    this.setState({ userName }, () => this.setState({ loading: false }));
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

   geraMusica(bandasave2, albumApi) {
    return (
      <React.Fragment>
        <p>{`Resultado de álbuns de: ${bandasave2}`}</p>
        <Forms albumApi={ albumApi } />
      </React.Fragment>
    );
  }

  render() {
    const { isButtonDSearch, bandasave2, albumApi, loading, userName, bandaRecomendacion } = this.state;
    return loading ? <Loading /> : (
      <div className="page-search" data-testid="page-search">
        <div className="header">
          <Header userName={ userName }  />
          <div className="barraBusca">
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
          </div>
        </div>
        <div className="musicas-contaneir">
          { this.geraMusica(bandasave2, albumApi) }
        </div>
      </div>
    );
  }
}
