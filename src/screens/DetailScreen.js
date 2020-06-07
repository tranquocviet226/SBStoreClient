import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import * as url from '../url/url'

import {useDispatch, useSelector} from 'react-redux'
import * as cartAction from '../store/action/cart-action'


const DetailScreen = ({route}) => {
  const {title, price, description, image, data} = route.params;
  const dispatch = useDispatch();
  const colorData = useSelector(state => state.colors.colors)
  
  return (
    <View style={styles.screen}>
      <ScrollView>
      <Image source={{uri: `${url.url}image/${image}`}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, {color: colorData.sec900}]}>{title}</Text>
        <Text style={[styles.price, {color: colorData.sec900}]}>{price} VND</Text>
        <Text style={styles.infomation}>Thông số kỹ thuật</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: `${url.url}image/${image}`}}
          style={styles.imageCon}
        />
        <Image
          source={{uri: `${url.url}image/${image}`}}
          style={styles.imageCon}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Add to cart"
          raised
          containerStyle={{width: 100, alignSelf: 'center', marginVertical: 10}}
          buttonStyle={{backgroundColor: colorData.sec900, borderRadius: 10}}
            onPress={() => {
                dispatch(cartAction.addToCart(data))
            }}
        />
      </View>
      </ScrollView>
    </View>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    // borderRadius: 10,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    elevation: 1
  },
  title: {
    fontFamily: 'VNI-Trung Kien',
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
  },
  infomation: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', 
    paddingVertical: 10
  },
  description: {},
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 5,
    elevation: 1
  },
  imageCon: {
    width: '45%',
    height: 100,
    borderRadius: 20
  },
  btnContainer:{
      backgroundColor:'white',
      paddingVertical: 5,
      marginVertical: 5,
      elevation: 1
  }
});
