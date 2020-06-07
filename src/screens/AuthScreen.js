import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from 'react-native';
import Colors from '../contants/Colors';
import FormLogin from '../components/FormLogin';
import SignUp from '../components/SignUp';

function AuthScreen({ navigation}) {
  const [isSwitch, setIsSwitch] = useState(false);
  
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      keyboardVerticalOffset={0}
      {...Platform.OS === 'ios' && {behavior: 'padding'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{justifyContent: 'flex-end'}}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/logo.png')}
                  style={styles.logo}
                />
                <Text style={styles.slogan}>SB Store</Text>
              </View>
              {!isSwitch ? (
                <FormLogin
                  onSwitch={() => setIsSwitch(true)}
                  // props={props}
                  onLogin={email =>
                    navigation.navigate('HomeTab', {
                      screen: 'Home',
                      params: {screen: 'Home', params: {email: email}},
                    })
                  }
                />
              ) : (
                <SignUp onSwitch={() => setIsSwitch(false)} />
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.splash,
  },
  container: {
    // maxHeight: 400,
    width: '80%',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '50%',
    height: 100,
  },
  slogan: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'vniTrungKien'
  },
});
