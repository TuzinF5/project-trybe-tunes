import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
      loading: false,
      musicFavorites: [],
    };

    this.resultGetMusic = this.resultGetMusic.bind(this);
    this.requestGetFavoriteSongs = this.requestGetFavoriteSongs.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
  }

  componentDidMount() {
    this.resultGetMusic();
    this.requestGetFavoriteSongs();
  }

  getFavorites(music) {
    const { musicFavorites } = this.state;
    const isFavorite = musicFavorites.some((song) => song.trackId === music.trackId);
    return isFavorite;
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

  toggleFavorites(music) {
    this.setState({
      loading: true,
    });
    const { musicFavorites } = this.state;
    const isFavorite = this.getFavorites(music);
    if (!isFavorite) {
      addSong(music).then(() => {
        this.setState({
          loading: false,
          musicFavorites: [...musicFavorites, music],
        });
      });
    } else {
      removeSong(music).then(() => {
        const filter = musicFavorites.filter(({ trackId }) => trackId !== music.trackId);
        this.setState({
          loading: false,
          musicFavorites: filter,
        });
      });
    }
  }

  async requestGetFavoriteSongs() {
    this.setState({
      loading: true,
    });
    const musicFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      musicFavorites,
    });
  }

  render() {
    const { musicList, loading } = this.state;
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
                    getFavorites={ this.getFavorites }
                    toggleFavorites={ this.toggleFavorites }
                  />
                ))}
            </div>
            {
              loading && <Loading />
            }
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
