import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      disableButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.makingRequest = this.makingRequest.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.checkInputSize());
  }

  checkInputSize() {
    const minimumNumber = 2;
    const { nameInput } = this.state;
    if (nameInput.length >= minimumNumber) {
      this.setState({
        disableButton: false,
      });
    }
  }

  makingRequest() {
    const { nameInput } = this.state;
    this.setState({
      nameInput: '',
    });
    searchAlbumsAPI(nameInput);
  }

  render() {
    const valueState = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="nameInput"
            id="search-artist-input"
            data-testid="search-artist-input"
            value={ valueState.nameInput }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={ this.makingRequest }
            disabled={ valueState.disableButton }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
