import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        <p data-testid="header-user-name">{userName}</p>
        <Link to="/search" data-testid="link-to-search">Search</Link>
      </header>
    );
  }
}

export default Header;
