import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Forms extends Component {
  render() {
    const { albumApi } = this.props;
    return (
      <div className="group-class">
        {albumApi.map((album) => (
          <Link
            to={ `/album/${album.collectionId}` }
            key={ album.collectionId }
            data-testid={ `link-to-album-${album.collectionId}` }
          >
            <div>
              <img src={ album.artworkUrl100 } alt={ album.collectionId } />
              <p>{ album.collectionName }</p>
              <p>{ album.artistName }</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

Forms.propTypes = {
  albumApi: PropTypes.arrayOf(PropTypes.object).isRequired,
};
