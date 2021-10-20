import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
    };

    this.resultGetMusic = this.resultGetMusic.bind(this);
  }

  componentDidMount() {
    this.resultGetMusic();
  }

  resultGetMusic = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const music = await getMusics(id);
    this.setState({
      musicList: music,
    });
  };

  render() {
    const { musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musicList.length !== 0 && (
          <div>
            <p data-testid="artist-name">{musicList[0].artistName}</p>
            <p data-testid="album-name">{musicList[0].collectionName}</p>
            <div>
              {musicList.slice(1)
                .map((element, index) => (
                  <MusicCard
                    key={ index }
                    trackName={ element.trackName }
                    previewUrl={ element.previewUrl }
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
