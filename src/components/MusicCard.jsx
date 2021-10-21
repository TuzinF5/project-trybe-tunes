import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { element: { trackName, previewUrl, trackId },
      getFavorites, toggleFavorites } = this.props;
    const { element } = this.props;

    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            name=""
            id={ trackId }
            checked={ getFavorites(element) }
            onClick={ () => toggleFavorites(element) }
            // onChange={ this.requestAddSong }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  getFavorites: PropTypes.func.isRequired,
  toggleFavorites: PropTypes.func.isRequired,
  element: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
