import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Profile.css';

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
        {loading ? (
          <Loading />
        ) : (
          <main className="main-profile">
            <section>
              <div>
                <p>
                  Nome:
                  {' '}
                  {user.name}
                </p>
              </div>
              <div>
                <p>
                  Descrição:
                  {' '}
                  {user.description}
                </p>
              </div>
              <div>
                <p>
                  Email:
                  {' '}
                  {user.email}
                </p>
              </div>
              <div>
                <img
                  src={ user.image }
                  alt={ user.name }
                  data-testid="profile-image"
                />
              </div>
            </section>
            <div>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          </main>
        )}
      </div>
    );
  }
}

export default Profile;
