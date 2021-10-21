import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: '',
    };

    this.userInformation = this.userInformation.bind(this);
  }

  componentDidMount() {
    this.userInformation();
  }

  async userInformation() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      loading: false,
      user,
    });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading && <Loading />
        }
        <div>
          <p>{user.name}</p>
          <p>{user.description}</p>
          <p>{user.email}</p>
          <img src={ user.image } alt={ user.name } data-testid="profile-image" />
        </div>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
