import React from 'react';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      description: '',
      email: '',
      image: '',
      name: '',
      isSaveButtonDisabled: true,
    };

    this.userInformation = this.userInformation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
  }

  componentDidMount() {
    this.userInformation();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.inputValidation());
  }

  emailValidation() {
    const { email } = this.state;
    const emailValue = email;
    const validation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
    if (!validation.test(emailValue)) {
      this.setState({
        email: '',
      });
    }
  }

  inputValidation() {
    const { description, name, email, image } = this.state;
    if (description !== '' && name !== '' && email !== '' && image !== '') {
      return this.setState({
        isSaveButtonDisabled: false,
      });
    }
    this.setState({
      isSaveButtonDisabled: true,
    });
  }

  async userInformation() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      loading: false,
      description: user.description,
      email: user.email,
      image: user.image,
      name: user.name,
    });
  }

  render() {
    const { loading, description, name, email, image, isSaveButtonDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="edit-input-name">
              <p>Nome</p>
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                id="edit-input-name"
                data-testid="edit-input-name"
              />
            </label>

            <label htmlFor="edit-input-description">
              <p>Descrição</p>
              <textarea
                name="description"
                value={ description }
                onChange={ this.handleChange }
                id="edit-input-description"
                cols="30"
                rows="10"
                data-testid="edit-input-description"
              />
            </label>

            <label htmlFor="edit-input-email">
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                onBlur={ this.emailValidation }
                id="edit-input-email"
                data-testid="edit-input-email"
              />
            </label>

            <label htmlFor="edit-input-image">
              <p>Imagem</p>
              <input
                type="text"
                name="image"
                value={ image }
                onChange={ this.handleChange }
                id="edit-input-image"
                data-testid="edit-input-image"
              />
            </label>

            <div>
              <button
                type="submit"
                disabled={ isSaveButtonDisabled }
                data-testid="edit-button-save"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
