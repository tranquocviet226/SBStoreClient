import {CHANGE_COLOR} from '../action/color-action';

const initialState = {
  colors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        colors: action.colors,
      };
    default:
      return state;
  }
};
