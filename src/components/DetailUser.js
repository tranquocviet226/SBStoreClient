import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import * as userAction from '../store/action/user-action';

const DetailUser = props => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    props.props.navigate('Auth');
    dispatch(userAction.logout());
  };
  return (
    <View style={{borderTopWidth: 1}}>
      <View style={styles.information}>
        <Text style={[styles.username, {color: props.colorData.pri800}]}>FULLNAME</Text>
        <Text style={styles.userInput}>{props.userData.fullname}</Text>
      </View>
      <View style={styles.information}>
        <Text style={[styles.username, {color: props.colorData.pri800}]}>PHONE</Text>
        <Text style={styles.userInput}>{props.userData.phone}</Text>
      </View>
      <View style={styles.information}>
        <Text style={[styles.username, {color: props.colorData.pri800}]}>EMAIL</Text>
        <Text style={styles.userInput}>{props.userData.email}</Text>
      </View>
      <View style={styles.information}>
        <Text style={[styles.username, {color: props.colorData.pri800}]}>BIRTHDAY</Text>
        <Text style={styles.userInput}>{props.userData.birthday}</Text>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => logoutHandler()}>
          <Text style={[styles.titleLogout, {color: props.colorData.pri800}]}>LOG OUT </Text>
          <Icon name="logout" size={20} color= {props.colorData.pri800}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailUser;

const styles = StyleSheet.create({
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  username: {
    flex: 3,
    fontWeight: 'bold',
  },
  userInput: {
    flex: 5,
  },
  logout: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },

  titleLogout: {
    fontWeight: 'bold',
  },
});
