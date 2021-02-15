import { TAGS, TAG } from '../actions/types';

const initialState = {
  tags: null,
  singleTag: null,
  loading: true,
};
const tag = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TAGS:
      return {
        ...state,
        loading: false,
        tags: payload,
      };
    case TAG:
      return {
        ...state,
        loading: false,
        singleTag: payload,
      };

    default:
      return state;
  }
};

export default tag;
