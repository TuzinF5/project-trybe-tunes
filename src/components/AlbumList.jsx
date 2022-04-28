import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AlbumList.css';

class AlbumList extends React.Component {
  render() {
    const {
      element: { collectionName, collectionId, artistName, artworkUrl100 },
    } = this.props;

    return (
      <section className="section-album-list">
        <div>
          <img src={ artworkUrl100 } alt={ collectionName } />
        </div>
        <div>
          <p>
            Álbum:
            {' '}
            {collectionName}
          </p>
        </div>
        <div>
          <p>
            Artista:
            {' '}
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              {artistName}
            </Link>
          </p>
        </div>
      </section>
    );
  }
}

AlbumList.propTypes = {
  element: PropTypes.shape({
    artworkUrl100: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumList;
