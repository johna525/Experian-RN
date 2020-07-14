

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from 'native-base';
import { dySize, getFontSize } from '../libs/responsive';
import { colors } from '../theme/colors';
import I18n from '../i18n/i18n';

const styles = StyleSheet.create({
  container: {
    marginTop: dySize(20)
  },
  dropdownIcon: {
    fontSize: getFontSize(24),
    color: colors.blue
  },
  placeholder: {
    fontSize: getFontSize(12),
    color: colors.gray
  }
});

export default class PickerSelect extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    color: PropTypes.string
  }

  static defaultProps = {
    color: colors.black
  }

  render() {
    const {
      data, placeholder, onValueChange, value, color
    } = this.props;

    const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: colors.gray,
        borderRadius: 4,
        color,
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: colors.gray,
        borderRadius: 8,
        color,
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      iconContainer: {
        top: 10,
        right: 0
      }
    });

    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>{placeholder}</Text>
        <RNPickerSelect
          placeholder={{}}
          placeholderTextColor={colors.blue}
          items={data}
          onValueChange={onValueChange}
          style={pickerSelectStyles}
          value={value}
          useNativeAndroidPickerStyle={false}
          doneText={I18n.t('done')}
          Icon={() => (
            <Icon name="ios-arrow-down" style={styles.dropdownIcon} />
          )}
        />
      </View>
    );
  }
}
