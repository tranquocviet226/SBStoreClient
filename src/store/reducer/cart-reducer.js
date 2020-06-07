import Cart from '../model/cart-model';
import {ADD_TO_CART, REMOVE_CART} from '../action/cart-action';
import { ADD_ORDER } from '../action/order-action';

const initialState = {
  items: {},
  totalAmount: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const id = action.product._id;
      const price = +action.product.productPrice;
      const title = action.product.productName;
      const image = action.product.productImage;

      let NewCart;

      if (state.items[id]) {
        //Alreaady
        NewCart = new Cart(
          state.items[id].quantity + 1,
          +price,
          title,
          +(state.items[id].sum + price),
          image,
        );
      } else {
        NewCart = new Cart(1, +price, title, +price, image);
      }
      return {
        ...state,
        items: {...state.items, [id]: NewCart},
        totalAmount: state.totalAmount + price,
      };
    case REMOVE_CART:
      const selectedItem = state.items[action.productId];
      const currentQuantity = +(selectedItem.quantity);

      let Cartitems;

      if (currentQuantity > 1) {
        const Item = new Cart(  
          selectedItem.quantity - 1,
          selectedItem.price,
          selectedItem.title,
          +(selectedItem.sum - selectedItem.price),
          selectedItem.image,
        );
        Cartitems = {...state.items, [action.productId]: Item};
      } else {
        Cartitems = {...state.items};
        delete Cartitems[action.productId];
      }
      return {
        ...state,
        items: Cartitems,
        totalAmount: state.totalAmount - selectedItem.price,
      };
    case ADD_ORDER:
        return initialState;
  }
  return state;
};
