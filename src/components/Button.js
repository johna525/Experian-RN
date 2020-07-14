

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';
import { Icon } from 'native-base';
import { colors } from '../theme/colors';
import { getFontSize, dySize } from '../libs/responsive';

export default class Button extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    textColor: PropTypes.string,
    icon: PropTypes.string,
    style: PropTypes.object,
    image: PropTypes.any,
    imageSize: PropTypes.number,
    numberOfLines: PropTypes.number,
    textAlign: PropTypes.string,
    justify: PropTypes.string
  }

  static defaultProps = {
    backgroundColor: colors.blue,
    fontSize: getFontSize(20),
    width: null,
    height: dySize(50),
    textColor: colors.lightgray,
    style: {},
    icon: '',
    image: undefined,
    imageSize: dySize(15),
    numberOfLines: 1,
    textAlign: 'left',
    justify: 'center'
  }

  render() {
    const {
      backgroundColor, fontSize, text, width, height, onPress, textColor, style, icon, image, imageSize, numberOfLines, textAlign, justify
    } = this.props;
    return (
      <Ripple
        onPress={onPress}
        rippleDuration={400}
        rippleCentered
        style={{
          backgroundColor,
          borderRadius: 4,
          width,
          height,
          ...style
        }}
      >
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: (icon.length > 0 || image !== undefined) ? 'space-between' : justify,
          alignItems: 'center',
        }}
        >
          <Text
            numberOfLines={numberOfLines}
            style={{
              fontSize,
              color: textColor,
              textAlign,
              flex: ((width && icon.length > 0) || image !== undefined) ? 1 : 0,
            }}
          >
            {text}
          </Text>
          {image !== undefined && <Image source={image} style={{ width: imageSize, height: imageSize, resizeMode: 'contain' }} />}
          {icon.length > 0 && <Icon name={icon} style={{ fontSize, color: textColor, margin: dySize(5) }} />}
        </View>
      </Ripple>
    );
  }
}
