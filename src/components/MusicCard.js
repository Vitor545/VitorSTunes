import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './ Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class CardMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      checked: false,
    };
    this.getMusicFavorita = this.getMusicFavorita.bind(this);
    this.setStateMusic = this.setStateMusic.bind(this);
  }

  async getMusicFavorita({ target }) {
    const musicaId = target.name;
    this.setState({ loading: true }, () => this.setStateMusic(musicaId));
  }

  async setStateMusic(musicaId) {
    const { checked } = this.state;
    await addSong(musicaId);
    if (checked) {
      this.setState({ checked: false });
    } else {
      this.setState({ checked: true });
    }
    this.setState({ loading: false });
  }

  // saveid é porque addSong recebe o mesmo paramentro de getMusic
  render() {
    const { previewUrl, trackName, trackId, saveId } = this.props;
    const { loading, checked } = this.state;
    return loading ? <Loading /> : (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favoritar
          <input
            type="checkbox"
            id={ trackId }
            name={ saveId }
            checked={ checked }
            onChange={ this.getMusicFavorita }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

CardMusic.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  saveId: PropTypes.string.isRequired,
};
