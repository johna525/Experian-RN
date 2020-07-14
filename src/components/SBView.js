import React from 'react';
import { View } from 'react-native';

export const SBView = ({
  paddingHorizontal, paddingVertical = 0, children, style
}) => (
  <View style={{
    paddingHorizontal, paddingVertical, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...style
  }}
  >
    {children}
  </View>
);
