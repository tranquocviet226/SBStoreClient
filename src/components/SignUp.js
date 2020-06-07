import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import Colors from '../contants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch} from 'react-redux';
import * as userAction from '../store/action/user-action';

const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [phone, setPhone] = useState('');
  const [validate, setValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      const load = async () => {
        setError(null);
        try {
          await dispatch(userAction.createUser(email, password, phone)).then(
            () => {
              Alert.alert('Thông báo?', 'Đăng kí thành công!', [
                {
                  text: 'Okay',
                  onPress: props.onSwitch,
                },
              ]);
            },
          );
        } catch (error) {
          setError(error.message);
          setValidate(false);
          setIsLoading(false);
        }
      };
      load();
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  useEffect(() => {
    if (validate) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  });

  const loginHandler = () => {
    conValidate();
  };

  const conValidate = () => {
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      setValidate(false);
      alert('Vui lòng không để trống!');
    } else if (password.trim().length < 6) {
      setValidate(false);
      alert('Mật khẩu phải có ít nhất 6 kí tự');
    } else if (password.trim() !== repassword.trim()) {
      setValidate(false);
      alert('Nhập lại mật khẩu không đúng');
    } else if (phone.trim().length < 8 || phone.trim().length > 10) {
      setValidate(false);
      alert('Số điện thoại phải từ 8 - 10 kí tự');
    } else {
      setValidate(true);
    }
  };

  const userHandler = (text) => {
    setEmail(text);
  };
  const passwordHandler = (text) => {
    setPassword(text);
  };
  const repasswordHandler = (text) => {
    setRepassword(text);
  };
  const phoneHandler = (text) => {
    setPhone(text);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.username}>EMAIL</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Nhập email"
          style={{width: '90%', color: 'white'}}
          value={email}
          onChangeText={userHandler}
        />
        <Icon name="account" size={20} color="white" />
      </View>
      <Text style={styles.username}>PASSWORD</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Nhập mật khẩu"
          style={{width: '90%', color: 'white'}}
          value={password}
          onChangeText={passwordHandler}
          secureTextEntry
        />
        <Icon name="lock" size={20} color="white" />
      </View>
      <Text style={styles.username}>RE-PASSWORD</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Nhập lại mật khẩu"
          style={{width: '90%', color: 'white'}}
          value={repassword}
          onChangeText={repasswordHandler}
          secureTextEntry
        />
        <Icon name="lock" size={20} color="white" />
      </View>
      <Text style={styles.username}>PHONE</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Nhập số điện thoại"
          style={{width: '90%', color: 'white'}}
          value={phone}
          onChangeText={phoneHandler}
          keyboardType="number-pad"
        />
        <Icon name="phone" size={20} color="white" />
      </View>
      <TouchableOpacity
        style={{width: 60, alignSelf: 'flex-end'}}
        onPress={props.onSwitch}>
        <Text style={styles.forget}>Login?</Text>
      </TouchableOpacity>
      {isLoading ? (
        <Button loading buttonStyle={styles.btnLogin} />
      ) : (
        <Button
          title="SIGN UP"
          buttonStyle={styles.btnLogin}
          onPress={() => loginHandler()}
        />
      )}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  form: {
    flex: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  username: {
    color: Colors.orange,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 5,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forget: {
    textAlign: 'right',
    color: Colors.orange,
  },
  btnLogin: {
    backgroundColor: Colors.orange,
    borderRadius: 20,
    margin: 5,
  },
  btnFbContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 110,
    marginHorizontal: 10,
  },
});
