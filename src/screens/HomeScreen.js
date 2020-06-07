import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import ProductItem from '../components/ProductItem';

import {useDispatch, useSelector} from 'react-redux';
import * as productAction from '../store/action/product-action';
import * as cartAction from '../store/action/cart-action';
import * as colorAction from '../store/action/color-action';
import * as Colors from '../contants/Colors';
import SlideImage from '../components/SlideImage';

function HomeScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('');
 
  const resData = useSelector(state => state.products.products);
  const [data, setData] = useState([]);

  const colorData = useSelector(state => state.colors.colors);
  const dispatch = useDispatch();

  const SearchFilterFunction = text => {
    const newData = resData.filter(item => {
      const itemData = item.productName
        ? item.productName.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
    setText(text);
  };

  const loadProduct = useCallback(async () => {
    try {
      await dispatch(productAction.getAllProduct());
      {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    // setIsLoading(true);
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    setData(resData);
  }, [resData]);

  useEffect(() => {
    dispatch(colorAction.changeColor(Colors.themeColor.orange));
  }, []);

  
  if (isLoading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  return (
    <View style={styles.screen}>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          onRefresh={loadProduct}
          refreshing={isLoading}
          numColumns={2}
          renderItem={itemData => (
            <ProductItem
              itemData={itemData.item}
              onViewDetail={() =>
                navigation.navigate('Detail', {
                  data: itemData.item,
                  title: itemData.item.productName,
                  price: itemData.item.productPrice,
                  description: itemData.item.productDescription,
                  image: itemData.item.productImage,
                })
              }
              onAddToCart={() => {
                dispatch(cartAction.addToCart(itemData.item));
              }}
              colorData={colorData}
            />
          )}
          ListHeaderComponent={
            <View>
              <SlideImage/>
              <SearchBar
                // style={styles.textInputStyle}
                onChangeText={text => SearchFilterFunction(text)}
                value={text}
                lightTheme
                round
                containerStyle={{backgroundColor: null, borderRadius: 20}}
                inputContainerStyle={{height: 40}}
                // inputStyle={{color: 'white'}}
                placeholder="Tìm kiếm"
              />
            </View>
          }
        />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ani: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    height: 50,
    zIndex: 1000,
  },
});
