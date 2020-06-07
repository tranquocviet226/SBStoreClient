import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {Button} from 'react-native-elements';
import Colors from '../contants/Colors';
import CartItem from '../components/CartItem';
import Toast from 'react-native-root-toast';

import {useSelector, useDispatch} from 'react-redux';
import * as cartAction from '../store/action/cart-action';
import * as orderAction from '../store/action/order-action';

function CartScreen() {
  const toastShow = () => {
    let toast = Toast.show('Đặt hàng thành công!', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      // hideOnPress: true,
      delay: 0,
      onShow: () => {},
      onShown: () => {},
      onHide: () => {},
      onHidden: () => {},
    });
    setTimeout(function() {
      Toast.hide(toast);
    }, 2000);
  };
  const dispatch = useDispatch();

  const totalAmount = useSelector(state => state.carts.totalAmount);
  const cartItem = useSelector(state => {
    const transformCartItems = [];
    for (const key in state.carts.items) {
      transformCartItems.push({
        id: key,
        quantity: state.carts.items[key].quantity,
        price: +state.carts.items[key].price,
        title: state.carts.items[key].title,
        sum: +state.carts.items[key].sum,
        image: state.carts.items[key].image,
      });
    }
    return transformCartItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  });

  const orderHandler = () => {
    dispatch(orderAction.addOrder());
    toastShow();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summayText}>
          Tổng tiền:
          <Text style={styles.totalAmount}> {totalAmount} VND</Text>
        </Text>
        <Button
          title="Đặt hàng"
          type="clear"
          titleStyle={{color: Colors.orange}}
          onPress={orderHandler}
        />
      </View>
      <FlatList
        data={cartItem}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.title}
            price={itemData.item.price}
            amount={itemData.item.sum}
            imageUrl={itemData.item.image}
            onRemove={() => {
              dispatch(cartAction.removeCart(itemData.item.id));
            }}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    padding: 5,
  },
  summayText: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontSize: 15,
  },
  totalAmount: {
    fontWeight: 'bold',
    color: Colors.darkRed,
  },
});
