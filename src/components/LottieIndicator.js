import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { dySize } from '../libs/responsive';

export const LottieIndicator = ({
  source, style, autoPlay = true, loop = true
}) => (
  <View style={{ ...style, justifyContent: 'center', alignItems: 'center' }}>
    <LottieView
      source={source}
      imageAssetsFolder="lottie"
      autoPlay={autoPlay}
      loop={loop}
      style={{
        width: dySize(200),
        height: dySize(100)
      }}
    />
  </View>
);
