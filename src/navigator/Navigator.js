import React from 'react';
import {TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingScreen from '../screens/SettingScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartScreen from '../screens/CartScreen';

import {useSelector} from 'react-redux';

const StackHome = createStackNavigator();
function HomeStack({navigation}) {
  const ColorData = useSelector(state => state.colors.colors);
  return (
    <StackHome.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: ColorData.pri700,
        },
        headerTintColor: ColorData.pri50,
      }}>
      <StackHome.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Icon
                name="cart"
                size={30}
                color="white"
                style={{paddingRight: 10}}
              />
            </TouchableOpacity>
          ),
          title: 'Trang chủ',
        }}
      />
      <StackHome.Screen
        name="Detail"
        component={DetailScreen}
        options={({route}) => ({title: route.params.title})}
      />
      <StackHome.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Giỏ hàng'}}
      />
    </StackHome.Navigator>
  );
}

const StackSetting = createStackNavigator();
function SettingStack({route}) {
  return (
    <StackSetting.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <StackSetting.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false}}
        initialParams={{exp: route.params.exp}}
      />
    </StackSetting.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator({route, navigation}) {
  const ColorData = useSelector(state => state.colors.colors);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        labelStyle:{
          fontSize: 15
        },
        style: {
          backgroundColor: ColorData.pri700,
          height: 60,
          paddingBottom: 0
          // backgroundColor: 'rgba(194, 24, 91, 0.6)',
          // borderTopWidth: 1,
          // borderTopColor: Colors.darkRed,
          // position: 'absolute',
          // left: 0,
          // right: 0,
          // bottom: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Trang chủ',
          tabBarButton: props => <TouchableOpacity {...props} />,
          tabBarIcon: ({color}) => <Icon name="home" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStack}
        initialParams={{exp: 'Example passing params'}}
        options={{
          title: 'Cài đặt',
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() =>
                navigation.navigate('Setting', {
                  screen: 'Setting',
                  params: {email: route.params.params.params.email},
                })
              }
            />
          ),
          tabBarIcon: ({color}) => (
            <Icon name="view-list" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="HomeTab" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigator;
