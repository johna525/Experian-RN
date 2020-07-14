import React from 'react';
import { Container, Content } from 'native-base';
import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';
import {
  SBView, MyText, CustomHeader, ToggleButton
} from '../../components';
import NavigationService from '../../navigation/NavigationService';
import I18n from '../../i18n/i18n';
import { ArrowLeftBlue, SearchIconBlue } from '../../assets/images';
import { GoogleTracker } from '../../libs/providers';

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  content: {
    paddingHorizontal: dySize(30),
  },
  lineView: {
    borderTopWidth: 1,
    borderColor: colors.gray,
    paddingVertical: dySize(15)
  },
  lineIcon: {
    fontSize: getFontSize(20),
    color: colors.blue
  }
};

export default class AccountNotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: false,
      proposition: false,
      marketing: false,
      general: false
    };
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onChangeSetting = name => (value) => {
    this.setState({ [name]: value });
    GoogleTracker.trackEvent('Notification Setting Screen', 'Toggle setting', null, { category: name, value });
  }

  render() {
    const {
      app, proposition, marketing, general
    } = this.state;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('tab_notification')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />
        <Content contentContainerStyle={styles.content}>
          <MyText
            color={colors.text}
            fontSize={getFontSize(16)}
            text={I18n.t('description_3_1')}
            paddingVertical={dySize(30)}
          />
          <SBView style={styles.lineView}>
            <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('sub_title_3_1')} />
            <ToggleButton value={app} onValueChange={this.onChangeSetting('app')} />
          </SBView>
          <SBView style={styles.lineView}>
            <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('sub_title_3_2')} />
            <ToggleButton value={proposition} onValueChange={this.onChangeSetting('proposition')} />
          </SBView>
          <SBView style={styles.lineView}>
            <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('sub_title_3_3')} />
            <ToggleButton value={marketing} onValueChange={this.onChangeSetting('marketing')} />
          </SBView>
          <SBView style={styles.lineView}>
            <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('sub_title_3_4')} />
            <ToggleButton value={general} onValueChange={this.onChangeSetting('general')} />
          </SBView>
          <SBView style={styles.lineView} />
        </Content>
      </Container>
    );
  }
}
