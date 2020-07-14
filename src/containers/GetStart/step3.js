/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Container, Icon } from 'native-base';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../theme/colors';
import { MyText, ToggleButton, Button } from '../../components';
import { dySize, getFontSize } from '../../libs/responsive';
import NavigationService from '../../navigation/NavigationService';
import I18n from '../../i18n/i18n';
import { GoogleTracker } from '../../libs/providers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: colors.lightgray
  },
  settingLine: {
    height: dySize(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: colors.gray
  },
  checkView: {
    width: dySize(30),
    height: dySize(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dySize(20),
    borderWidth: 1,
    borderColor: colors.blue
  },
  checkIcon: {
    fontSize: getFontSize(24),
    color: colors.blue
  },
  startButtonView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: dySize(60)
  }
});

export default class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: true,
      proposition: true,
      marketing: true,
      business: true,
      neverShow: false
    };
  }

  onToggleCheck = () => {
    const { neverShow } = this.state;
    if (neverShow) GoogleTracker.trackEvent('Get Started Screen', 'Unchecked "Dont show again" Button');
    else GoogleTracker.trackEvent('Get Started Screen', 'Checked "Dont show again" Button');
    this.setState({ neverShow: !neverShow });
  }

  getStarted = () => {
    NavigationService.navigate('MAIN_SCREEN');
  }

  render() {
    const {
      app, proposition, marketing, business, neverShow
    } = this.state;
    return (
      <Container style={styles.container}>
        <MyText color={colors.blue} fontSize={30} text={I18n.t('title_3')} style={{ fontFamily: 'Roboto-Light', lingHeight: dySize(34) }} />
        <MyText color={colors.text} fontSize={16} paddingVertical={20} text={I18n.t('description_3_1')} />
        <View style={styles.settingLine}>
          <MyText text={I18n.t('sub_title_3_1')} color={colors.blue} />
          <ToggleButton value={app} onValueChange={value => this.setState({ app: value })} />
        </View>
        <View style={styles.settingLine}>
          <MyText text={I18n.t('sub_title_3_2')} color={colors.blue} />
          <ToggleButton value={proposition} onValueChange={value => this.setState({ proposition: value })} />
        </View>
        <View style={styles.settingLine}>
          <MyText text={I18n.t('sub_title_3_3')} color={colors.blue} />
          <ToggleButton value={marketing} onValueChange={value => this.setState({ marketing: value })} />
        </View>
        <View style={styles.settingLine}>
          <MyText text={I18n.t('sub_title_3_4')} color={colors.blue} />
          <ToggleButton value={business} onValueChange={value => this.setState({ business: value })} />
        </View>
        <Ripple onPress={() => this.onToggleCheck()} rippleDuration={400}>
          <View style={[styles.settingLine, { borderBottomWidth: 1 }]}>
            <MyText text={I18n.t('sub_title_3_5')} color={colors.blue} />
            <View style={styles.checkView}>
              {neverShow && <Icon name="md-checkmark" style={styles.checkIcon} />}
            </View>
          </View>
        </Ripple>
        <View style={styles.startButtonView}>
          <Button text={I18n.t('get_started')} onPress={() => this.getStarted()} />
        </View>
      </Container>
    );
  }
}
