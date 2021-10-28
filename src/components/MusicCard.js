import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardMusic extends Component {
  render() {
    const { previewUrl, trackName } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
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
};
