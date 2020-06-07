import Product from '../model/product-model';
import {SET_PRODUCT, SEARCH_PRODUCT, FETCH_PRODUCT} from '../action/product-action';

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        products: action.products,
      };
    case SEARCH_PRODUCT:
      return {
        products: action.products
      }
    case FETCH_PRODUCT:
      return {
        products: state.products
      }
    default:
      return state;
  }
};
