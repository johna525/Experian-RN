import React from 'react';
import {
  View, StyleSheet, TextInput, Alert
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Container, Content, Icon } from 'native-base';
import Mailer from 'react-native-mail';
import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';
import { MyText, CustomHeader, Button } from '../../components';
import NavigationService from '../../navigation/NavigationService';
import { TopicList, contactEmails } from '../../libs/constants';
import { showToast } from '../../libs/operators';
import I18n from '../../i18n/i18n';
import { ArrowLeftBlue, SearchIconBlue } from '../../assets/images';
import { GoogleTracker } from '../../libs/providers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  content: {
    padding: dySize(30),
  },
  dropdownIcon: {
    color: colors.blue,
    fontSize: getFontSize(24)
  },
  messageView: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: dySize(10),
    paddingRight: 0
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: getFontSize(20),
    paddingRight: dySize(10),
    height: dySize(200)
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    color: colors.blue,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    color: colors.blue,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 0
  }
});

export default class LeaveFeedbackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      message: ''
    };
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  sendMessage = () => {
    const { topic, message } = this.state;
    if (topic === '') {
      showToast(I18n.t('topic_empty'), { long: true, position: 'center' });
      return;
    } if (message.length < 20) {
      showToast(I18n.t('feedback_message_length'), { long: true, position: 'center' });
    } else {
      GoogleTracker.trackEvent('Feedback Screen', 'Sent feedback', null, { topic, message });
      Mailer.mail({
        subject: topic,
        recipients: contactEmails,
        ccRecipients: [],
        bccRecipients: [],
        body: message,
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
      // send feedback here
    }
  }

  render() {
    const { topic, message } = this.state;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('leave_feedback')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />
        <Content contentContainerStyle={styles.content}>
          <RNPickerSelect
            placeholder={{ label: 'Select topic', value: '', color: colors.blue }}
            placeholderTextColor={colors.blue}
            items={TopicList}
            onValueChange={(value) => {
              this.setState({
                topic: value,
              });
            }}
            style={pickerSelectStyles}
            value={topic}
            useNativeAndroidPickerStyle={false}
            Icon={() => (
              <Icon name="ios-arrow-down" style={styles.dropdownIcon} />
            )}
          />
          <MyText
            color={colors.text}
            fontSize={getFontSize(18)}
            text={I18n.t('feedback_description')}
            paddingVertical={dySize(20)}
            style={{ marginTop: dySize(10) }}
          />
          <View style={styles.messageView}>
            <TextInput
              multiline
              onChangeText={text => this.setState({ message: text })}
              value={message}
              style={styles.input}
              textAlignVertical="top"
            />
          </View>
          <MyText
            color={colors.text}
            fontSize={getFontSize(14)}
            text={`${message.length} / 1024`}
            textAlign="right"
            style={{ marginTop: dySize(10) }}
          />
        </Content>
        <Button
          backgroundColor={colors.blue}
          text={I18n.t('send_message')}
          color={colors.lightgray}
          width={dySize(315)}
          style={{ margin: dySize(30) }}
          onPress={() => this.sendMessage()}
        />
      </Container>
    );
  }
}
