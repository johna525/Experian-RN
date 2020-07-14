import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';

const styles = {
  loadingView: {
    width: dySize(120),
    height: dySize(120),
    borderRadius: dySize(60),
    borderWidth: 12,
    borderColor: colors.gray,
    position: 'relative',
    opacity: 0.8
  },
  cover: {
    position: 'absolute',
    top: dySize(-9),
    left: dySize(-9),
    width: dySize(114),
    height: dySize(114),
    borderRadius: dySize(57),
    backgroundColor: colors.lightgray
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightgray
  },
  text: {
    fontSize: getFontSize(24),
    color: colors.text,
    marginTop: 20
  }
};

export const LoadingView = ({ text }) => (
  <View style={styles.container}>
    <View style={styles.loadingView}>
      <MaterialIndicator color={colors.blue} size={dySize(120)} />
      {/* <View style={styles.cover} /> */}
    </View>
    <Text style={styles.text}>{text}</Text>
  </View>
);
