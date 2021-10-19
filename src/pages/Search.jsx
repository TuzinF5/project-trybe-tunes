import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      disableButton: true,
      loading: false,
      artist: '',
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

  async makingRequest() {
    const { nameInput } = this.state;
    this.setState({
      loading: true,
    });
    const objectArtist = await searchAlbumsAPI(nameInput);
    this.setState({
      artist: nameInput,
      nameInput: '',
      loading: false,
    });
    console.log(objectArtist);
  }

  render() {
    const valueState = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {!valueState.loading ? (
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
              type="submit"
              onClick={ this.makingRequest }
              disabled={ valueState.disableButton }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        ) : (
          <Loading />
        )}
        {
          valueState.artist.length > 0
          && <p>{`Resultado de álbuns de: ${valueState.artist}`}</p>
        }
      </div>
    );
  }
}

export default Search;
