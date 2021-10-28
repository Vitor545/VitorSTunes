import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/ Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      musicAlbum: [],
      saveId: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.getMusicAlbum(id);
  }

  async getMusicAlbum(id) {
    const musicAlbum = await getMusics(id);
    this.setState({ musicAlbum, saveId: id }, () => this.setState({ loading: false }));
  }

  render() {
    const { musicAlbum, loading, saveId } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <h1 data-testid="artist-name">{musicAlbum[0].artistName}</h1>
            <p data-testid="album-name">{musicAlbum[0].collectionName}</p>
            {console.log(musicAlbum)}
            {/* usar o slice para pular o primeiro objeto que não é musica
            Source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice */}
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
