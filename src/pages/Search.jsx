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
        </form>
      </div>
    );
  }
}

export default Search;
