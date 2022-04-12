/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    const { userName } = this.state;
    if (!userName.length) {
      getUser().then((object) => this.setState({
        userName: object.name,
        loading: false,
      }));
    }
  }

  render() {
    const { userName, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <header data-testid="header-component" className="header">
        <div className="div-title-header">
          <p data-testid="header-user-name">{userName}</p>
        </div>

        <div className="div-list-header">
          <nav>
            <ul className="list-header">
              <li>
                <Link to="/search" data-testid="link-to-search">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/favorites" data-testid="link-to-favorites">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/profile" data-testid="link-to-profile">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
