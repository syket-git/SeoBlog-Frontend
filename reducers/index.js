import { combineReducers } from 'redux';
import authReducer from './auth';
import category from './category';
import tag from './tag';

const reducer = combineReducers({
  auth: authReducer,
  category,
  tag,
});
export default reducer;
