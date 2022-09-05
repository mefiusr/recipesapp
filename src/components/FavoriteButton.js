import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import whiteHeartIcon from '../images/whiteHeartIcon.png';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteButton extends Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
    };
  }

  componentDidMount = () => {
    this.verifyFavorites();
  };

  verifyFavorites = () => {
    const { id } = this.props;
    const getLocalFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getLocalFav) {
      const isFav = getLocalFav.some((fav) => fav.id === id);
      this.setState({ favorite: isFav });
    }
  };

   handleClickFavorite = () => {
     const { id, recipes, url } = this.props;
     this.setState((prevState) => ({ favorite: !prevState.favorite }));
     const favRecipes = {
       id,
       type: url.includes('foods') ? 'food' : 'drink',
       nationality: url.includes('foods') ? recipes[0].strArea : '',
       category: recipes[0].strCategory,
       alcoholicOrNot: url.includes('drinks') ? recipes[0].strAlcoholic : '',
       name: url.includes('foods') ? recipes[0].strMeal : recipes[0].strDrink,
       image: url.includes('foods') ? recipes[0].strMealThumb : recipes[0].strDrinkThumb,
     };

     const getLocalFav = JSON.parse(localStorage.getItem('favoriteRecipes'));

     if (getLocalFav) {
       localStorage.setItem('favoriteRecipes',
         JSON.stringify([...getLocalFav, favRecipes]));
     } else {
       localStorage.setItem('favoriteRecipes', JSON.stringify([favRecipes]));
     }
   };

   render() {
     const { favorite } = this.state;
     return (
       <div>

         <button
           type="button"
           data-testid="favorite-btn"
           onClick={ () => this.handleClickFavorite() }
           src={ favorite ? blackHeartIcon : whiteHeartIcon }
         >
           <img
             src={ favorite ? blackHeartIcon : whiteHeartIcon }
             alt="Favorite Button"
           />
         </button>

       </div>
     );
   }
}

FavoriteButton.propTypes = {
  id: PropTypes.string,
  recipes: PropTypes.any,
  url: PropTypes.shape({
    includes: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
});

export default connect(mapStateToProps, null)(FavoriteButton);
