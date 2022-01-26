import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';


export default class CardMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      music: [],
      favorite: false,
    };
    this.getMusicFavorita = this.getMusicFavorita.bind(this);
    this.setStateMusic = this.setStateMusic.bind(this);
    this.trackMeu = this.trackMeu.bind(this);
  }

  componentDidMount() {
    const { trackMeu } = this.props;
    this.trackMeu(trackMeu)

  }

  async trackMeu(trackMeu) {
    const music = await getMusics(trackMeu);
    console.log(music);
    this.setState({ music });
  }

  async getMusicFavorita({ target }) {
    const musicaId = target.name;
    this.setStateMusic(musicaId)
  }

  async setStateMusic(musicaId) {
    const { checked } = this.state;
    await addSong(musicaId);
    if (checked) {
      this.setState({ checked: false });
    } else {
      this.setState({ checked: true });
    }
    await getFavoriteSongs();
  }

  // saveid é porque addSong recebe o mesmo paramentro de getMusic
  render() {
    const { previewUrl, trackName, trackId, saveId, trackMeu } = this.props;
    const { checked } = this.state;
    return (
        <div className="music-card">
          <p>{ trackName }</p>
            <audio  data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
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
