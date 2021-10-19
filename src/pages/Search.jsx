import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name=""
            id="search-artist-input"
            data-testid="search-artist-input"
          />
          <button type="submit" data-testid="search-artist-button">
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
