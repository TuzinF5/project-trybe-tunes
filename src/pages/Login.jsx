import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginNameInput: '',
      disableButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const valueState = this.state;
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
            onClick={ () => createUser({ name: valueState.loginNameInput }) }
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
