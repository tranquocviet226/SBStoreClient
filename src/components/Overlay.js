import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import * as Colors from '../contants/Colors';

const OverlayComponent = props => {
  const green = Colors.themeColor.green;
  const blue = Colors.themeColor.blue;
  const orange = Colors.themeColor.orange;
  const dark = Colors.themeColor.dark;

  return (
    <View>
      <Overlay
        isVisible={props.visible}
        overlayStyle={{borderRadius: 30, elevation: 10}}
        overlayBackgroundColor="white"
        width="auto"
        height={200}
        onBackdropPress={props.visibleHanlder}>
        {props.isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={props.colorData.pri800} />
          </View>
        ) : (
          <View style={styles.overlay}>
            <View>
              <Text>Chọn màu yêu thích của bạn</Text>
            </View>
            <View style={styles.overlayContainer}>
              <TouchableOpacity onPress={props.greenHandler}>
                <View
                  style={[styles.circle, {backgroundColor: green.pri700}]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={props.blueHandler}>
                <View style={[styles.circle, {backgroundColor: blue.pri700}]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={props.orangeHandler}>
                <View
                  style={[styles.circle, {backgroundColor: orange.pri700}]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={props.darkHandler}>
                <View style={[styles.circle, {backgroundColor: dark.pri700}]} />
              </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
              <Button
                title="Okay"
                buttonStyle={{
                  backgroundColor: props.colorData.sec700,
                  borderRadius: 10,
                }}
                onPress={props.visibleHanlder}
              />
            </View>
          </View>
        )}
      </Overlay>
    </View>
  );
};

export default OverlayComponent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    padding: 20,
  },
});
