import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as url from '../url/url'

const CartItem = props => {
  return (
    <TouchableOpacity style={styles.itemData}>
      <View style={styles.image}>
        <Image
          source={{uri: `${url.url}image/${props.imageUrl}`}}
          style={{height: 70, width: '100%', borderRadius: 10}}
        />
      </View>
      <View style={styles.title}>
        <Text>{props.title}</Text>
      </View>
      <View style={styles.quantity}>
        <Text>{props.quantity}</Text>
      </View>
      <View style={styles.amount}>
        <Text>{props.amount}VND</Text>
      </View>
      <View style={styles.icon}>
        <MarIcon name="trash-can-outline" size={20} onPress={props.onRemove} />
      </View>
    </TouchableOpacity>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  itemData: {
    flex: 1,
    flexDirection: 'row',
    elevation: 5,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  quantity: {
    flex: 1.5,
  },
  image: {
    flex: 4,
    paddingHorizontal: 5
  },
  title: {
    flex: 7,
    paddingHorizontal: 5
  },
  price: {
    flex: 5,
  },
  amount: {
    flex: 6,
  },
  icon: {
    flex: 1.5,
  },
});
