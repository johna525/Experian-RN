

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

export default class IconButton extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    textSize: PropTypes.number,
    style: PropTypes.object,
    iconType: PropTypes.string,
    image: PropTypes.any,
    imageSize: PropTypes.number
  }

  static defaultProps = {
    label: '',
    color: colors.text,
    size: getFontSize(20),
    textSize: getFontSize(12),
    style: {},
    icon: '',
    iconType: 'Ionicons',
    image: undefined,
    imageSize: 30
  }

  render() {
    const {
      icon, size, label, textSize, onPress, color, style, iconType, image, imageSize
    } = this.props;
    return (
      <Ripple
        onPress={onPress}
        rippleRadius={20}
        rippleCentered
        rippleDuration={400}
        style={{
          backgroundColor: 'transparent',
          borderRadius: 4,
          ...style
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: dySize(10),
            flex: 1,
          }}
        >
          {image !== undefined
            ? <Image source={image} style={{ width: imageSize, height: imageSize, resizeMode: 'contain' }} />
            : <Icon name={icon} type={iconType} style={{ fontSize: size, color }} />
          }
          {label.length > 0 && (
          <Text style={{
            flex: 1, fontSize: textSize, color, paddingRight: size, textAlign: 'center'
          }}
          >
            {label}

          </Text>
          )}
        </View>
      </Ripple>
    );
  }
}
