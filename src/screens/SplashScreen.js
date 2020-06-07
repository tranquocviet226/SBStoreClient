import React from 'react'
import { Image, View } from 'react-native'

const SplashScreen = ({navigation}) => {
    setTimeout(() => {
        navigation.navigate('Auth');
    }, 2000);
    return (
        <View>
            <Image source={{uri: 'https://baski3d.files.wordpress.com/2015/01/img_0328.png'}} style={{width: "100%", height: '100%'}}/>
        </View>
    )
}

export default SplashScreen

