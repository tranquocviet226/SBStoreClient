import React, {useState, useEffect} from 'react';
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

const FormLogin = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const loginData = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await dispatch(userAction.login(email, password));
      setIsLoading(false);
      props.onLogin(email);
      // Alert.alert('Message!', 'Welcome to SB Store', [
      //   {
      //     text: 'Okay',
      //     onPress: props.onLogin(email),
      //   },
      // ]);
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  return (
    <View style={styles.form}>
      <Text style={styles.username}>EMAIL</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Nhập email"
          style={{width: '90%', color: 'white'}}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Icon name="account" size={20} color="white" />
      </View>
      <Text style={styles.username}>PASSWORD</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Nhập mật khẩu"
          style={{width: '90%', color: 'white'}}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Icon name="lock" size={20} color="white" />
      </View>
      <TouchableOpacity
        style={{width: 60, alignSelf: 'flex-end'}}
        onPress={props.onSwitch}>
        <Text style={styles.forget}>Sign up?</Text>
      </TouchableOpacity>
      {isLoading ? (
        <Button loading buttonStyle={styles.btnLogin} />
      ) : (
        <Button
          title="LOGIN"
          buttonStyle={styles.btnLogin}
          onPress={() => loginData()}
        />
      )}
      <Text style={styles.or}>OR</Text>
      <View style={styles.btnFbContainer}>
        <Button
          icon={<Icon name="facebook" size={15} color="blue" />}
          title="FACEBOOK"
          buttonStyle={styles.btn}
          titleStyle={{color: 'blue'}}
        />
        <Button
          icon={<Icon name="google" size={15} color="red" />}
          title="GOOGLE"
          buttonStyle={styles.btn}
          titleStyle={{color: 'red'}}
        />
      </View>
    </View>
  );
};

export default FormLogin;

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
  or: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
