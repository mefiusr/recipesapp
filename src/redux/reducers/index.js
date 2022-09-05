import { combineReducers } from 'redux';
import recipes from './recipesReducer';

const rootReducer = combineReducers({
  recipes,
});

export default rootReducer;
