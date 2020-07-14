

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { Switch } from 'react-native-switch';
import { Icon } from 'native-base';
import { colors } from '../theme/colors';
import { dySize, getFontSize } from '../libs/responsive';

const styles = StyleSheet.create({
  circle: {
    width: dySize(28),
    height: dySize(28),
    borderRadius: dySize(14),
    backgroundColor: colors.lightgray,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class ToggleButton extends React.PureComponent {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    onValueChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    disabled: false
  }

  render() {
    const { value, onValueChange, disabled } = this.props;
    return (
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        circleSize={dySize(30)}
        barHeight={dySize(30)}
        backgroundActive={colors.green}
        backgroundInactive={colors.gray}
        circleActiveColor={colors.lightgray}
        circleInActiveColor={colors.lightgray}
        renderActiveText={false}
        renderInActiveText={false}
        circleBorderWidth={1}
        innerCircleStyle={{ borderColor: value ? colors.green : colors.gray }}
        switchWidthMultiplier={1.5}
        switchLeftPx={3}
        switchRightPx={3}
        renderInsideCircle={() => (
          <View style={styles.circle}>
            <Icon
              name={value ? 'md-checkmark' : 'md-close'}
              style={{
                fontSize: getFontSize(22),
                color: value ? colors.green : colors.gray,
                margin: 0,
                padding: 0
              }}
            />
          </View>
        )}
      />
    );
  }
}
