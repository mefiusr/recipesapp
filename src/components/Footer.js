import PropTypes from 'prop-types';
import React, { Component } from 'react';
import drinkIcon from '../images/drinkIcon.png';
import mealIcon from '../images/mealIcon.png';

import '../css/footer.css';

export default class Footer extends Component {
  render() {
    const { history } = this.props;
    return (
      <footer className="footer" data-testid="footer">
        <div className="btn-footer">
          <button
            type="button"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            onClick={ () => history.push('/recipesapp/drinks') }
          >
            <img src={ drinkIcon } alt="Drink Icon" />
          </button>

          <button
            type="button"
            data-testid="food-bottom-btn"
            src={ mealIcon }
            onClick={ () => history.push('/recipesapp/foods') }
          >
            <img src={ mealIcon } alt="Meal Icon" />
          </button>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
