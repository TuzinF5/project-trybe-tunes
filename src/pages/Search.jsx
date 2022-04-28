import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../styles/Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      disableButton: true,
      loading: false,
      artist: '',
      artistList: [],
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
      artistList: objectArtist,
    });
  }

  render() {
    const valueState = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {!valueState.loading ? (
          <main className="main-search">
            <section>
              <form>
                <div>
                  <input
                    type="text"
                    name="nameInput"
                    id="search-artist-input"
                    data-testid="search-artist-input"
                    value={ valueState.nameInput }
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={ this.makingRequest }
                    disabled={ valueState.disableButton }
                    data-testid="search-artist-button"
                  >
                    Pesquisar
                  </button>
                </div>
              </form>
            </section>
          </main>
        ) : (
          <Loading />
        )}
        {valueState.artist.length > 0 && (
          <div>
            <p>{`Resultado de álbuns de: ${valueState.artist}`}</p>
            {valueState.artistList.length === 0 ? (
              <p>Nenhum álbum foi encontrado</p>
            ) : (
              valueState.artistList.map((element, index) => (
                <div key={ index }>
                  <p>{element.collectionName}</p>
                  <Link
                    to={ `/album/${element.collectionId}` }
                    data-testid={ `link-to-album-${element.collectionId}` }
                  >
                    {element.artistName}
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
