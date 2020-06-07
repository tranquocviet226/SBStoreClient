import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as url from '../url/url'

const ProductItem = props => {
  return (
    <View style={[styles.product, {backgroundColor: props.colorData.pri50}]}>
      <View style={{width: '100%', height: '85%'}}>
        <TouchableOpacity onPress={props.onViewDetail}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, {color: props.colorData.sec900}]}>{props.itemData.productName}</Text>
          </View>
          <Image source={{uri: `${url.url}image/${props.itemData.productImage}`}} style={styles.image} />
          <View style={styles.priceContainer}>
            <Text style={[styles.price, {color: props.colorData.sec700, fontSize: 13}]}>{props.itemData.productId}</Text>
            <Text style={styles.price}>{props.itemData.productPrice} VND</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.action}>
        <View style={styles.button}>
          <Button
            icon={<Icon name="cart-plus" size={15} color="white" />}
            raised
            title="Mua"
            titleStyle={{
            //   fontFamily: 'VNI-Disney',
            }}
            buttonStyle={{
              backgroundColor: props.colorData.sec900,
              width: '100%',
            }}
            onPress={props.onAddToCart}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    flex: 1,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 15,
    overflow: 'hidden',
    // backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
    height: 300,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    height: '18%',
    marginVertical: 5,
    // backgroundColor: 'pink',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginVertical: 5,
    // fontFamily: 'VNI-Briquet',
    fontWeight: "bold",
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '65%',
    alignSelf: 'center',
  },
  priceContainer: {
    height: '10%',
    // backgroundColor: 'pink',
    // justifyContent: 'center',
  },
  price: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  action: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    height: '15%',
    paddingBottom: 10
    // position: 'absolute',
    // bottom: -18,
  },
  button: {
    width: 100,
    justifyContent: 'center',
  },
});
