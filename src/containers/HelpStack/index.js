import React from 'react';
import {
  View, StyleSheet, Alert, Image
} from 'react-native';
import { Container } from 'native-base';
import Mailer from 'react-native-mail';
import Ripple from 'react-native-material-ripple';
import call from 'react-native-phone-call';
import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';
import {
  SBView, MyText, CustomHeader, IconButton
} from '../../components';
import NavigationService from '../../navigation/NavigationService';
import I18n from '../../i18n/i18n';
import {
  SearchIconWhite, ChevronRightBlue, EmailIcon, Phone
} from '../../assets/images';
import { GoogleTracker } from '../../libs/providers';
import { contactEmails } from '../../libs/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  content: {
    flex: 1,
  },
  listView: {
    flex: 1,
    padding: dySize(30),
    backgroundColor: colors.white
  },
  lineView: {
    borderTopWidth: 1,
    borderColor: colors.gray,
    paddingVertical: dySize(10)
  },
  lineIcon: {
    width: dySize(15),
    height: dySize(15),
    resizeMode: 'contain'
  },
  contactView: {
    padding: dySize(30),
  },
  blueButton: {
    backgroundColor: colors.blue,
    height: dySize(50),
    marginTop: dySize(10),
    paddingHorizontal: dySize(10)
  }
});

export default class HelpScreen extends React.Component {
  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onChangeSetting = name => (value) => {
    this.setState({ [name]: value });
  }

  onCall = () => {
    const args = {
      number: '03444810800', // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    call(args).catch(console.error);
    GoogleTracker.trackEvent('Help Tab', 'Clicked call button');
  }

  onEmail = () => {
    GoogleTracker.trackEvent('Help Tab', 'Clicked email button');
    Mailer.mail({
      subject: 'email KIT',
      recipients: contactEmails,
      ccRecipients: [],
      bccRecipients: [],
      body: '',
      isHTML: true,
      // attachment: {
      //   path: '',  // The absolute path of the file from which to read data.
      //   type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
      //   name: '',   // Optional: Custom filename for attachment
      // }
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
          { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
        ],
        { cancelable: true }
      );
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('tab_help')}
          backgroundColor={colors.blue}
          rightImage={SearchIconWhite}
          onPressRight={() => this.onSearch()}
        />
        <View style={styles.content}>
          <View style={styles.listView}>
            <MyText color={colors.blue} paddingVertical={dySize(10)} fontSize={getFontSize(30)} text={I18n.t('useful_links')} style={{ fontFamily: 'Roboto-Light' }} />
            <Ripple onPress={() => NavigationService.navigate('HELP_FAQ')} rippleDuration={400} rippleCentered>
              <SBView style={styles.lineView}>
                <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('faqs')} />
                <Image source={ChevronRightBlue} style={styles.lineIcon} />
              </SBView>
            </Ripple>
            <Ripple onPress={() => NavigationService.navigate('HELP_TERMS_AND_CONDITIONS')} rippleDuration={400} rippleCentered>
              <SBView style={styles.lineView}>
                <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('tac')} />
                <Image source={ChevronRightBlue} style={styles.lineIcon} />
              </SBView>
            </Ripple>
            <Ripple onPress={() => NavigationService.navigate('HELP_PRIVACY_POLICY')} rippleDuration={400} rippleCentered>
              <SBView style={styles.lineView}>
                <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('pp')} />
                <Image source={ChevronRightBlue} style={styles.lineIcon} />
              </SBView>
            </Ripple>
            <Ripple onPress={() => NavigationService.navigate('HELP_FEEDBACK')} rippleDuration={400} rippleCentered>
              <SBView style={styles.lineView}>
                <MyText color={colors.blue} fontSize={getFontSize(16)} text={I18n.t('leave_feedback')} />
                <Image source={ChevronRightBlue} style={styles.lineIcon} />
              </SBView>
            </Ripple>
            <View style={{
              flex: 1, borderTopWidth: 1, height: 2, borderColor: colors.gray
            }}
            />
          </View>
          <View style={styles.contactView}>
            <MyText color={colors.blue} fontSize={getFontSize(30)} text={I18n.t('contact_us')} />
            <IconButton
              style={styles.blueButton}
              label={I18n.t('email_us')}
              image={EmailIcon}
              imageSize={dySize(24)}
              color={colors.lightgray}
              textSize={getFontSize(18)}
              onPress={() => this.onEmail()}
            />
            <IconButton
              style={styles.blueButton}
              label="0344 481 0800"
              image={Phone}
              imageSize={dySize(24)}
              color={colors.lightgray}
              textSize={getFontSize(18)}
              onPress={() => this.onCall()}
            />
          </View>
        </View>
      </Container>
    );
  }
}
