/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Container } from 'native-base';
import TouchID from 'react-native-touch-id';
import { colors } from '../../theme/colors';
import { getFontSize, dySize } from '../../libs/responsive';
import NavigationService from '../../navigation/NavigationService';
import { MyText, Button } from '../../components';
import { fingerprint } from '../../assets/images';
import { LoadingView } from './loading';
import I18n from '../../i18n/i18n';
import { GoogleTracker } from '../../libs/providers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dySize(20),
    backgroundColor: colors.lightgray
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrapper: {
    width: dySize(200),
    height: dySize(200),
    borderRadius: dySize(100),
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: dySize(200),
    height: dySize(200),
  }
});

export default class TouchEnableScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  onEnableFingerPrint = () => {
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    };
    GoogleTracker.trackEvent('Touch Enalbe Screen', 'Clicked enable button');
    TouchID.isSupported(optionalConfigObject)
      .then((biometryType) => {
        // Success code
        console.log('biometryType', biometryType);
        if (biometryType === 'TouchID') {
          console.log('FaceID is supported.');
          this.TouchIDAuthentication();
        } else {
          alert("Touch ID is not supported. You can't enable that.");
        }
      })
      .catch((error) => {
        // Failure code
        console.log('TouchID Error: ', error);
        alert("Touch ID is not supported. You can't enable that.");
      });
  }

  TouchIDAuthentication = () => {
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    TouchID.authenticate('Confirm your fingerprint now.', optionalConfigObject)
      .then((success) => {
        console.log('TouchID success: ', success);
        alert('Congrats! You enabled the Touch ID successfully!');
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  onSkip = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      GoogleTracker.trackEvent('Touch Enalbe Screen', 'Clicked skip button');
      NavigationService.navigate('GET_START');
    }, 2500);
  }

  render() {
    return (
      <Container style={styles.container}>
        <MyText
          color={colors.blue}
          text={I18n.t('enable_touch_id')}
          fontSize={getFontSize(30)}
          textAlign="center"
          paddingVertical={30}
        />
        <MyText
          color={colors.gray}
          text={I18n.t('touch_id_description')}
          fontSize={getFontSize(20)}
          textAlign="center"
        />
        <View style={styles.imageView}>
          <Image source={fingerprint} style={styles.image} />
        </View>
        <Button
          text={I18n.t('enable')}
          onPress={() => this.onEnableFingerPrint()}
        />
        <Button
          text={I18n.t('touch_id_no_thanks')}
          textColor={colors.blue}
          backgroundColor="transparent"
          onPress={() => this.onSkip()}
          style={{ marginTop: 20 }}
        />
        {this.state.loading && <LoadingView text={I18n.t('signing_up')} />}
      </Container>
    );
  }
}
