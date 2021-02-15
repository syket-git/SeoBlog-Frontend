import { CATEGORIES, CATEGORY } from '../actions/types';

const initialState = {
  categories: null,
  singleCategory: null,
  loading: true,
};
const category = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: payload,
      };
    case CATEGORY:
      return {
        ...state,
        loading: false,
        singleCategory: payload,
      };

    default:
      return state;
  }
};

export default category;
