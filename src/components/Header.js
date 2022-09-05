import PropTypes from 'prop-types';
import React, { Component } from 'react';
import profileIcon from '../images/profileIcon.png';
import searchIcon from '../images/searchIcon.png';
import SearchBar from './SearchBar';

import '../css/header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      showSearchIcon: true,
      showInputSearch: false,
      inputSearch: '',
    };
  }

  componentDidMount = () => {
    this.checkUrl();
  };

  checkUrl = () => {
    const { url } = this.props;

    switch (url) {
    case '/recipesapp/foods':
      this.setState({ title: 'Foods', showSearchIcon: true });
      break;
    case '/recipesapp/drinks':
      this.setState({ title: 'Drinks', showSearchIcon: true });
      break;
    case '/recipesapp/done-recipes':
      this.setState({ title: 'Done Recipes', showSearchIcon: false });
      break;
    case '/recipesapp/profile':
      this.setState({ title: 'Profile', showSearchIcon: false });
      break;
    case '/recipesapp/favorite-recipes':
      this.setState({ title: 'Favorite Recipes', showSearchIcon: false });
      break;
    default:
    }
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ inputSearch: value });
  }

  render() {
    const { url, history } = this.props;
    const { title, showSearchIcon, showInputSearch, inputSearch } = this.state;
    return (
      <header className="header">

        <h1 data-testid="page-title">{title}</h1>
        <div className="btnHeader">
          <button
            className="btns"
            type="button"
            data-testid="profile-top-btn"
            src={ profileIcon }
            onClick={ () => history.push('/recipesapp/profile') }
          >
            <img src={ profileIcon } alt="Profile" />
          </button>

          {showSearchIcon && (

            <button
              className="btns"
              type="button"
              data-testid="search-top-btn"
              src={ searchIcon }
              onClick={ () => this.setState((prevState) => ({
                showInputSearch: !prevState.showInputSearch })) }
            >
              <img src={ searchIcon } alt="Search" />
            </button>

          )}
        </div>

        {showInputSearch && (

          <label className="searchHeader" htmlFor="search">
            <input
              className="inputSearchHeader"
              id="search"
              placeholder="Search recipe"
              type="text"
              data-testid="search-input"
              value={ inputSearch }
              onChange={ this.handleChange }
            />
          </label>

        )}
        <SearchBar url={ url } inputSearch={ inputSearch } />

      </header>
    );
  }
}

Header.propTypes = {
  url: PropTypes.string,
}.isRequired;

export default Header;
