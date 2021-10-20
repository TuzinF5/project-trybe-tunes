import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
      loading: false,
    };

    this.resultGetMusic = this.resultGetMusic.bind(this);
    this.requestGetFavoriteSongs = this.requestGetFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.resultGetMusic();
    this.requestGetFavoriteSongs();
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

  async requestGetFavoriteSongs() {
    this.setState({
      loading: true,
    });
    await getFavoriteSongs();
    this.setState({
      loading: false,
    });
  }

  render() {
    const { musicList, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        {musicList.length !== 0 && (
          <div>
            <p data-testid="artist-name">{musicList[0].artistName}</p>
            <p data-testid="album-name">{musicList[0].collectionName}</p>
            <div>
              {musicList.slice(1)
                .map((element) => (
                  <MusicCard
                    key={ element.trackId }
                    element={ element }
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
