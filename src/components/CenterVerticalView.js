import React from 'react';
import { View } from 'react-native';

export const CenterVerticalView = ({ padding = 0, children, style }) => (
  <View
    style={{
      ...style,
      padding,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {children}
  </View>
);
