import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../css/login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      activeButton: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.checkPassword());
  }

  checkPassword = () => {
    const { email, password } = this.state;
    const validEmail = /\S+@\S+\.\S+/;
    const MIN_LENGTH_PASSWORD = 5;

    if (password.length > MIN_LENGTH_PASSWORD && validEmail.test(email)) {
      this.setState({ activeButton: false });
    } else {
      this.setState({ activeButton: true });
    }
  }

  saveUser = () => {
    const { email } = this.state;
    const { history } = this.props;

    const emailPerson = JSON.stringify({ email });
    localStorage.setItem('user', emailPerson);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/recipesapp/foods');
  }

  render() {
    const { email, password, activeButton } = this.state;
    return (
      <section className="secLogin">

        <div className="divEmailAndPass">

          <label htmlFor="email">
            <input
              className="inputsLogin"
              id="email"
              placeholder="Type your email"
              name="email"
              value={ email }
              type="email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password">
            <input
              className="inputsLogin"
              id="password"
              placeholder="Type your password"
              name="password"
              value={ password }
              type="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>

        </div>

        <button
          className="btnLogin"
          type="button"
          disabled={ activeButton }
          data-testid="login-submit-btn"
          onClick={ this.saveUser }
        >
          Enter

        </button>

      </section>
    );
  }
}

Login.propTypes = {
  push: PropTypes.func,
}.isRequired;

export default Login;
