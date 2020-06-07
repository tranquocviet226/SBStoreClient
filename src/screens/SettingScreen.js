import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import {Root, ActionSheet} from 'native-base';
import {Avatar, Image} from 'react-native-elements';
import DetailUser from '../components/DetailUser';
import UpdateUser from '../components/UpdateUser';
import ImagePicker from 'react-native-image-crop-picker';
import ColorPicker from '../components/ColorPicker';
import * as url from '../url/url';
import {useDispatch, useSelector} from 'react-redux';
import * as colorAction from '../store/action/color-action';
import * as Colors from '../contants/Colors';

function SettingScreen({navigation, route}) {
  // console.log(route.params.exp) // Example passing param
  const [isSwitch, setIsSwitch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [avatar, setAvatar] = useState();

  const {email} = route.params;
  const [userData, setUserData] = useState([]);
  const controller = new AbortController();
  useEffect(() => {
    // setIsLoading(null);
    const resData = async () => {
      if (isLoading) {
        try {
          // setIsLoading(true);
          let response = await fetch(
            `${url.url}userRn/fetchUser?email=${email}`,
            {
              signal: controller.signal,
            },
          );
          let json = await response.json();
          {
            setUserData(json);
          }
          setIsLoading(false);
          setShowAlert(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setShowAlert(false);
        }
      }
    };
    resData();
  }, [isLoading]);

  useEffect(() => {
    if (showAlert) {
      Alert.alert('Message!', 'Đông ý cập nhật ảnh đại diện!', [
        {
          text: 'Hủy',
          onPress: () => setShowAlert(false),
          style: 'cancel',
        },
        {
          text: 'Okay',
          onPress: () => {
            handlerUpload();
            // setIsLoading(true);
          },
        },
      ]);
    }
  }, [showAlert]);

  const handlerUpload = async () => {
    const data = new FormData();
    data.append('avatar', {
      name: avatar.modificationDate,
      type: avatar.mime,
      uri:
        Platform.OS === 'android'
          ? avatar.path
          : avatar.path.replace('file://', ''),
    });
    try {
      let response = await fetch(
        `${url.url}userRn/updateAvatar?id=${userData._id}`,
        {
          method: 'POST',
          body: data,
        },
      );
      await response.json();
      setIsLoading(true);
    } catch (err) {
      console.log(err);
      setIsLoading(true);
    }
  };

  const switchHandler = () => {
    setIsSwitch(prev => !prev);
    setIsLoading(true);
  };

  var BUTTONS = [
    {text: 'Take a photo', iconColor: '#2c8ef4'},
    {text: 'Choose from library', iconColor: '#f42ced'},
    {text: 'Cancel', iconColor: '#25de5b'},
  ];

  const galleryHandler = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setAvatar(image);
        setShowAlert(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const cameraHandler = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setAvatar(image);
        setShowAlert(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    ImagePicker.clean()
      .then(() => {
        // console.log('removed all tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  }, []);
  //Color picker

  const dispatch = useDispatch();
  const colorData = useSelector(state => state.colors.colors);
  const [color, setColor] = useState(colorData);
  const green = Colors.themeColor.green;
  const blue = Colors.themeColor.blue;
  const orange = Colors.themeColor.orange;
  const dark = Colors.themeColor.dark;
  const greenHandler = () => {
    setColor(green);
    setIsLoading(true);
  };

  const blueHandler = () => {
    setColor(blue);
    setIsLoading(true);
  };

  const orangeHandler = () => {
    setColor(orange);
    setIsLoading(true);
  };

  const darkHandler = () => {
    setColor(dark);
    setIsLoading(true);
  };

  const visibleHanlder = () => {
    setVisible(prev => !prev);
  };

  useEffect(() => {
    dispatch(colorAction.changeColor(color));
    setIsLoading(false);
  }, [isLoading]);

  if (isLoading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <Root>
      <View style={styles.screen}>
        <ScrollView>
          <View style={styles.backgroundContainer}>
            <Image
              source={{
                uri:
                  'https://image.freepik.com/free-vector/bokeh-effect-gradient-background_23-2148370306.jpg',
              }}
              style={styles.imageBackground}
            />
          </View>

          <View style={styles.profileContainer}>
            <Avatar
              source={{
                uri: `${url.url}image/${userData.avatar}`,
              }}
              rounded
              size={100}
              showEditButton
              editButton={{
                name: isSwitch ? 'check' : 'mode-edit',
                type: 'material',
                color: '#fff',
                underlayColor: '#000',
              }}
              onPress={() => {
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: 2,
                    title: 'Your Avatar',
                  },
                  buttonIndex => {
                    if (buttonIndex === 0) {
                      cameraHandler();
                    }
                    if (buttonIndex === 1) {
                      galleryHandler();
                    }
                  },
                );
              }}
              onEditPress={switchHandler}
              containerStyle={{position: 'absolute', top: -50}}
            />
            <View style={styles.nameContainer}>
              <Text style={[styles.fullname, {color: colorData.pri800}]}>
                {userData.fullname}
              </Text>
              <Text style={styles.url}>{userData.email}</Text>
            </View>
          </View>
          <ColorPicker
            isLoading={isLoading}
            colorData={colorData}
            greenHandler={greenHandler}
            blueHandler={blueHandler}
            orangeHandler={orangeHandler}
            darkHandler={darkHandler}
            visibleHanlder={visibleHanlder}
          />
          {!isSwitch ? (
            <DetailUser userData={userData} props={navigation} colorData={colorData}/>
          ) : (
            <UpdateUser userData={userData} isSwitch={() => switchHandler()} colorData={colorData}/>
          )}
        </ScrollView>
      </View>
    </Root>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundContainer: {
    height: (Dimensions.get('window').width * 1) / 2,
  },
  imageBackground: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  profileContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  nameContainer: {
    marginTop: 55,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  fullname: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  url: {
    color: 'gray',
    textAlign: 'center',
    paddingBottom: 10,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    marginBottom: 5,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
