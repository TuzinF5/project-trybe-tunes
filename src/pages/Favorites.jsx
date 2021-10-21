import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      musicFavorites: [],
    };

    this.getFavoritesMusics = this.getFavoritesMusics.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
  }

  componentDidMount() {
    this.getFavoritesMusics();
  }

  getFavorites(music) {
    const { musicFavorites } = this.state;
    const isFavorite = musicFavorites.some((song) => song.trackId === music.trackId);
    return isFavorite;
  }

  async getFavoritesMusics() {
    this.setState({
      loading: true,
    });
    const musicFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      musicFavorites,
    });
  }

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

  render() {
    const { loading, musicFavorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
        {musicFavorites.length > 0
        && musicFavorites.map((element) => (
          <MusicCard
            key={ element.trackId }
            element={ element }
            getFavorites={ this.getFavorites }
            toggleFavorites={ this.toggleFavorites }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
