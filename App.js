import 'react-native-gesture-handler';
import React from 'react';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import userReducer from './src/store/reducer/user-reducer';
import productReducer from './src/store/reducer/product-reducer';
import cartReducer from './src/store/reducer/cart-reducer'
import colorReducer from './src/store/reducer/color-reducer'

import Navigator from './src/navigator/Navigator';

const rootReducer = combineReducers({
  users: userReducer,
  products: productReducer,
  carts: cartReducer,
  colors: colorReducer
}); 
const Store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={Store}>
      <Navigator />
    </Provider>
  );
};

export default App;
