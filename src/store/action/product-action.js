import Product from '../model/product-model';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
import * as url from '../../url/url';

export const getAllProduct = () => {
  return async dispatch => {
    const response = await fetch(`${url.url}userRn/getAllProduct`);

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const resData = await response.json();
    const loadProducts = [];
    
    for (const key in resData) {
      loadProducts.push(
        new Product(
          key,
          resData[key].productId,
          resData[key].productName,
          resData[key].productPrice,
          resData[key].productQuantity,
          resData[key].productDate,
          resData[key].productDescription,
          resData[key].productImage,
        ),
      );
    }
    dispatch({
      type: SET_PRODUCT,
      products: loadProducts,
    });
  };
};

export const searchProduct = (products) => {
  return async dispatch => {
    dispatch({
      type: SEARCH_PRODUCT,
      products: products
    })
  }
}

export const loadProducts = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_PRODUCT,
    })
  }
}
