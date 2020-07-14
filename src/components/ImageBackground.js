import React from 'react';
import { View, Image } from 'react-native';
import { colors } from '../theme/colors';

export const ImageBackground = ({
  source, opacity = 0, children, ...props
}) => (
  <View style={{ position: 'relative', backgroundColor: 'blue' }} {...props}>
    <Image
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: null, height: null
      }}
      source={source}
      resizeMode="cover"
    />
    <View
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: null, height: null, backgroundColor: colors.black, opacity
      }}
    />
    {children}
  </View>
);
