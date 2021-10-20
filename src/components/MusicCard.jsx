import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };

    this.request = this.request.bind(this);
  }

  async request() {
    const { element } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(element);
    this.setState({
      loading: false,
      checked: true,
    });
  }

  render() {
    const { element: { trackName, previewUrl, trackId } } = this.props;
    const { checked, loading } = this.state;

    if (loading) return <Loading />;

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
            checked={ checked }
            onChange={ this.request }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  element: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
