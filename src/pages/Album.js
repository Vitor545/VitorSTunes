import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/ Loading';
import MusicCard from '../components/MusicCard';
import { getUser } from '../services/userAPI';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      musicAlbum: [],
      saveId: '',
      userName: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.getMusicAlbum(id);
    this.recuperaUser();
  }

  async recuperaUser() {
    const userName = await getUser();
    this.setState({ userName }, () => this.setState({ loading: false }));
  }

  async getMusicAlbum(id) {
    const musicAlbum = await getMusics(id);
    this.setState({ musicAlbum, saveId: id });
  }

  render() {
    const { musicAlbum, loading, saveId, userName } = this.state;
    return (
      <div data-testid="page-album">
        {loading ? <Loading /> : (
          <div className="album-id">
            <header className="header">
              <Header userName={ userName } />
            </header>
            <div className="title-grid">
              <h1 data-testid="artist-name">{musicAlbum[0].artistName}</h1>
              <p data-testid="album-name">{musicAlbum[0].collectionName}</p>
            </div>
            {/* usar o slice para pular o primeiro objeto que não é musica
            Source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice */}
            <div className="music-grid">
              {musicAlbum.slice(1).map(({ trackName, previewUrl, trackId }) => (
                <MusicCard
                  key={ trackName }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  trackId={ trackId }
                  saveId={ saveId }
                />
              ))}
            </div>
          </div>
        ) }
      </div>
    );
  }
}
// https://stackoverflow.com/questions/47519612/eslint-match-is-missing-in-props-validation-react-prop-types

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: { params: { id: 'Nenhum album selecionado' } },
};
