/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { Header } from 'native-base';
import { colors } from '../theme/colors';
import { dySize, getFontSize } from '../libs/responsive';
import { IconButton, MyText, SBView } from '.';

const styles = StyleSheet.create({
  header: {
    width: dySize(375),
    borderBottomWidth: 3,
    borderColor: colors.red,
  },
  iconView: {
    width: dySize(60),
  },
  iconImage: {
    width: dySize(20),
    height: dySize(20),
    resizeMode: 'contain',
    margin: dySize(10)
  }
});

export default class CustomHeader extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    onPressLeft: PropTypes.func,
    onPressRight: PropTypes.func,
    backgroundColor: PropTypes.string,
    leftIconSize: PropTypes.number,
    rightIconSize: PropTypes.number,
    leftImage: PropTypes.any,
    rightImage: PropTypes.any
  }

  static defaultProps = {
    backgroundColor: 'transparent',
    leftIcon: '',
    rightIcon: '',
    leftIconSize: getFontSize(24),
    rightIconSize: getFontSize(24),
    leftImage: undefined,
    rightImage: undefined,
    onPressLeft: () => undefined,
    onPressRight: () => undefined
  }

  render() {
    const {
      title, backgroundColor, leftIcon, rightIcon, onPressLeft, onPressRight, leftIconSize, rightIconSize, leftImage, rightImage
    } = this.props;
    const color = backgroundColor === 'transparent' ? colors.blue : colors.lightgray;
    return (
      <Header style={{ backgroundColor }}>
        <SBView style={styles.header}>
          {
            leftImage !== undefined
              ? (
                <IconButton
                  image={leftImage}
                  color={color}
                  imageSize={dySize(20)}
                  style={styles.iconView}
                  onPress={onPressLeft}
                />
              )
              : leftIcon.length > 0
                ? (
                  <IconButton
                    icon={leftIcon}
                    color={color}
                    size={leftIconSize}
                    style={styles.iconView}
                    onPress={onPressLeft}
                  />
                )
                : <Text style={styles.iconView} />
          }
          <MyText text={title} color={color} />
          {
            rightImage !== undefined
              ? (
                <IconButton
                  image={rightImage}
                  color={color}
                  imageSize={dySize(20)}
                  style={styles.iconView}
                  onPress={onPressRight}
                />
              )
              : rightIcon.length > 0
                ? (
                  <IconButton
                    icon={rightIcon}
                    color={color}
                    size={rightIconSize}
                    style={styles.iconView}
                    onPress={onPressRight}
                  />
                )
                : <Text style={styles.iconView} />
          }
        </SBView>
      </Header>
    );
  }
}
