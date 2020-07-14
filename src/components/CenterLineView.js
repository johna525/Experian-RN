import React from 'react';
import { View } from 'react-native';

export const CenterLineView = ({ padding = 0, children, style }) => (
  <View
    style={{
      padding,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </View>
);
