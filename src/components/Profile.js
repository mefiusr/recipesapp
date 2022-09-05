import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Footer from './Footer';
import Header from './Header';

import '../css/profile.css';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };
  }

  componentDidMount = () => {
    console.log(this.props);
    this.getEmail();
  }

  getEmail = () => {
    const getEmailFromLocal = JSON.parse(localStorage.getItem('user'));
    if (getEmailFromLocal) {
      this.setState({ email: getEmailFromLocal });
    }
  }

  logout = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/recipesapp');
  }

  render() {
    const { match, history } = this.props;
    const { email } = this.state;
    return (
      <>
        <Header url={ match.url } />
        <section className="sec-profile">
          <h2 data-testid="profile-email">{email.email}</h2>
          <hr />
          <div className="btn-profile">
            <button
              type="button"
              data-testid="profile-done-btn"
              onClick={ () => history.push('/recipesapp/done-recipes') }
            >
              Done Recipes

            </button>
            <button
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ () => history.push('/recipesapp/favorite-recipes') }
            >
              Favorite Recipes

            </button>
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => this.logout() }
            >
              Logout

            </button>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
}.isRequired;
