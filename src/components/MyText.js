import React from 'react';
import { Text } from 'react-native';

export const MyText = ({
  color, fontSize = 20, text, textAlign, paddingHorizontal = 0, paddingVertical = 5, numberOfLines = null, style = {}
}) => (
  <Text
    style={{
      color, fontSize, textAlign, paddingHorizontal, paddingVertical, ...style
    }}
    numberOfLines={numberOfLines}
  >
    {text}
  </Text>
);
