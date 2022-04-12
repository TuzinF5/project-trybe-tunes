/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css';

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
          {valueState.redirect && <Redirect to="/search" />}
        </div>
      );
    }

    return (
      <main data-testid="page-login" className="main-login">
        <section className="section-login">
          <div className="div-title-login">
            <p>Trybe Tunes</p>
          </div>
          <div className="div-form-login">
            <form className="form-login">
              <div>
                <input
                  placeholder="Digite seu nome"
                  type="text"
                  name="loginNameInput"
                  id="login-name-input"
                  value={ valueState.loginNameInput }
                  onChange={ this.handleChange }
                  data-testid="login-name-input"
                  className="input-login"
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={ () => this.saveInputName(valueState.loginNameInput) }
                  disabled={ valueState.disableButton }
                  data-testid="login-submit-button"
                  className="button-login"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }
}

export default Login;
