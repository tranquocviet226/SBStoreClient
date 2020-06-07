import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import * as Colors from '../contants/Colors';

const ColorPicker = (props) => {
  const green = Colors.themeColor.green;
  const blue = Colors.themeColor.blue;
  const orange = Colors.themeColor.orange;
  const dark = Colors.themeColor.dark;
  return (
    <View style={styles.overlayContainer}>
      <TouchableOpacity onPress={props.greenHandler}>
        <View style={[styles.circle, {backgroundColor: green.pri700}]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.blueHandler}>
        <View style={[styles.circle, {backgroundColor: blue.pri700}]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.orangeHandler}>
        <View style={[styles.circle, {backgroundColor: orange.pri700}]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.darkHandler}>
        <View style={[styles.circle, {backgroundColor: dark.pri700}]} />
      </TouchableOpacity>
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
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
});
