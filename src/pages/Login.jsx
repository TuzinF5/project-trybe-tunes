import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginNameInput: '',
      disableButton: true,
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkInputSize = this.checkInputSize.bind(this);
    this.saveInputName = this.saveInputName.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.checkInputSize());
  }

  checkInputSize() {
    const minimumNumber = 3;
    const { loginNameInput } = this.state;
    if (loginNameInput.length >= minimumNumber) {
      this.setState({
        disableButton: false,
      });
    }
  }

  async saveInputName(loginNameInput) {
    this.setState({
      loading: true,
    });
    await createUser({ name: loginNameInput });
    this.setState({
      redirect: true,
    });
  }

  render() {
    const valueState = this.state;

    if (valueState.loading) {
      return (
        <div>
          <Loading />
          {
            valueState.redirect && <Redirect to="/search" />
          }
        </div>
      );
    }

    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            name="loginNameInput"
            id="login-name-input"
            value={ valueState.loginNameInput }
            onChange={ this.handleChange }
            data-testid="login-name-input"
          />
          <button
            type="submit"
            onClick={ () => this.saveInputName(valueState.loginNameInput) }
            disabled={ valueState.disableButton }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
