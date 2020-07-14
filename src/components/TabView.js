

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../theme/colors';
import {
  HomeBlue, HomeGray, HelpBlue, HelpGray, AccountBlue, AccountGray, NotificationsBlue, NotificationsGray
} from '../assets/images';
import { dySize } from '../libs/responsive';

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    alignItems: 'center',
    padding: dySize(5),
    justifyContent: 'space-between'
  },
  icon: {
    width: dySize(20),
    height: dySize(20),
    resizeMode: 'contain'
  }
});

export default class TabView extends React.PureComponent {
  static propTypes = {
    routeName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    focused: PropTypes.bool.isRequired
  }

  render() {
    const { routeName, title, focused } = this.props;
    return (
      <View style={styles.tabView}>
        { routeName === 'Home' && <Image source={focused ? HomeBlue : HomeGray} style={styles.icon} /> }
        { routeName === 'Help' && <Image source={focused ? HelpBlue : HelpGray} style={styles.icon} /> }
        { routeName === 'Account' && <Image source={focused ? AccountBlue : AccountGray} style={styles.icon} /> }
        { routeName === 'Notifications' && <Image source={focused ? NotificationsBlue : NotificationsGray} style={styles.icon} /> }
        <Text style={{ fontSize: 12, color: focused ? colors.blue : colors.text }} numberOfLines={1}>{title}</Text>
      </View>
    );
  }
}
