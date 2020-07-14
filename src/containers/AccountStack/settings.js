import React from 'react';
import { Image } from 'react-native';
import { Container, Content } from 'native-base';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';
import {
  SBView, MyText, CustomHeader, ToggleButton
} from '../../components';
import NavigationService from '../../navigation/NavigationService';
import I18n from '../../i18n/i18n';
import { ArrowLeftBlue, SearchIconBlue, ChevronRightBlue } from '../../assets/images';
import { GoogleTracker } from '../../libs/providers';

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  content: {
    padding: dySize(30),
    paddingTop: dySize(60)
  },
  lineView: {
    borderTopWidth: 1,
    borderColor: colors.gray,
    paddingVertical: dySize(15)
  },
  lineIcon: {
    width: dySize(15),
    height: dySize(15),
    resizeMode: 'contain'
  }
};

export default class AccountSettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: false,
      touch: false
    };
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onChangeSetting = name => (value) => {
    this.setState({ [name]: value });
    GoogleTracker.trackEvent('Setting Screen', `${value ? 'Enabled' : 'Disabled'} "${name}"`);
  }

  onChangePin = () => {
    GoogleTracker.trackEvent('Setting Screen', 'Clicked change pin button');
    NavigationService.navigate('ACCOUNT_SETTING_PIN');
  }

  render() {
    const { location, touch } = this.state;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('settings')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />
        <Content contentContainerStyle={styles.content}>
          <SBView style={styles.lineView}>
            <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('enable_location')} />
            <ToggleButton value={location} onValueChange={this.onChangeSetting('location')} />
          </SBView>
          <SBView style={styles.lineView}>
            <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('use_touch_id')} />
            <ToggleButton value={touch} onValueChange={this.onChangeSetting('touch')} />
          </SBView>
          <Ripple onPress={() => this.onChangePin()} rippleDuration={400} rippleCentered>
            <SBView style={styles.lineView}>
              <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('change_pin')} />
              <Image source={ChevronRightBlue} style={styles.lineIcon} />
            </SBView>
          </Ripple>
          <SBView style={styles.lineView} />
        </Content>
      </Container>
    );
  }
}
