import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../contants/Colors';

import {useDispatch} from 'react-redux';
import * as userAction from '../store/action/user-action';

const UpdateUser = props => {
  const _id = props.userData._id;
  const email = props.userData.email;
  const avatar = props.userData.avatar;

  const [fullname, setFullname] = useState(props.userData.fullname);
  const [phone, setPhone] = useState(props.userData.phone);
  const [birthday, setBirthday] = useState(props.userData.birthday);
  const [password, setPassword] = useState(props.userData.password);

  const fullnameHandler = text => {
    setFullname(text);
  };
  const phoneHandler = text => {
    setPhone(text);
  };
  const passwordHandler = text => {
    setPassword(text);
  };
  const birthdayHandler = text => {
    setBirthday(text);
  };

  const dispatch = useDispatch();

  const saveHandler = async () => {
    if (phone.trim().length < 8 || phone.trim().length > 10) {
      alert('Số điện thoại phải từ 8 - 10 chữ số');
    } else {
      await dispatch(
        userAction.updateInfo(
          _id,
          email,
          password,
          fullname,
          phone,
          birthday,
          avatar,
        ),
      ).then(async () => {
        Alert.alert('Tin nhắn?', 'Cập nhật thành công!', [
          {
            text: 'Okay',
            onPress: props.isSwitch,
          },
        ]);
      });
    }
  };

  return (
    <View style={{borderTopWidth: 1}}>
      <View>
        <View style={styles.informationUser}>
          <Text style={[styles.title, {color: props.colorData.sec900}]}>UPDATE INFORMATION</Text>
        </View>
        <View style={styles.information}>
          <Text style={[styles.username, {color: props.colorData.pri800}]}>FULLNAME</Text>
          <TextInput
            style={styles.userInput}
            value={fullname}
            onChangeText={fullnameHandler}
          />
        </View>
        <View style={styles.information}>
          <Text style={[styles.username, {color: props.colorData.pri800}]}>PHONE</Text>
          <TextInput
            style={styles.userInput}
            value={phone}
            onChangeText={phoneHandler}
          />
        </View>
        <View style={styles.information}>
          <Text style={[styles.username, {color: props.colorData.pri800}]}>BIRTHDAY</Text>
          <TextInput
            style={styles.userInput}
            value={birthday}
            onChangeText={birthdayHandler}
          />
        </View>
        <View style={styles.information}>
          <Text style={[styles.username, {color: props.colorData.pri800}]}>PASSWORD</Text>
          <TextInput
            style={styles.userInput}
            value={password}
            onChangeText={passwordHandler}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.logout}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => saveHandler()}>
            <Text style={[styles.titleLogout, {color: props.colorData.sec900}]}>SAVE </Text>
            <Icon name="content-save-edit" size={20} color={props.colorData.sec900} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={props.isSwitch}>
            <Text style={[styles.titleLogout, {color: props.colorData.sec900}]}>CANCEL </Text>
            <Icon name="cancel" size={20} color={props.colorData.sec900} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  informationUser: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    textAlign: 'center',
    color: Colors.primary,
    fontWeight: 'bold',
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  username: {
    flex: 3,
    color: Colors.orange,
    fontWeight: 'bold',
  },
  userInput: {
    flex: 5,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },

  titleLogout: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
