

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import { Container } from 'native-base';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import I18n from '../../i18n/i18n';
import { GoogleTracker } from '../../libs/providers';
import { ImageBackground, Button } from '../../components';
import { dySize, getFontSize } from '../../libs/responsive';
import { WhiteLogo, SplashImage } from '../../assets/images';
import { colors } from '../../theme/colors';
import NavigationService from '../../navigation/NavigationService';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
    height: null
  },
  topView: {
    height: dySize(150),
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottieView: {
    marginTop: dySize(-40),
    height: dySize(250),
    justifyContent: 'center',
    alignItems: 'center',
  },
  betaText: {
    color: colors.white,
    fontSize: getFontSize(25),
    position: 'absolute',
    top: dySize(60),
    right: dySize(90),
    textAlign: 'right'
  },
  textView: {
    marginTop: dySize(-60),
    padding: dySize(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigText: {
    color: colors.lightgray,
    fontSize: getFontSize(60),
    marginBottom: dySize(20),
    fontWeight: '300'
  },
  smallText: {
    color: colors.lightgray,
    fontSize: getFontSize(24),
    fontWeight: '200'
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: dySize(40),
    alignItems: 'center'
  }
});

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }

  render() {
    return (
      <Container>
        <ImageBackground source={SplashImage} style={styles.background}>
          <View style={styles.topView}>
            <Image source={WhiteLogo} style={styles.logo} />
          </View>
          <View style={styles.lottieView}>
            <LottieView
              source={require('../../assets/svgs/indicator/data.json')}
              imageAssetsFolder="lottie"
              autoPlay
              loop
              style={{
                width: dySize(1000),
                height: dySize(250)
              }}
            />
            <Text style={styles.betaText}>Beta</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.bigText}>Hi, I'm Kit</Text>
            <Text style={styles.smallText}>I can help with all of your</Text>
            <Text style={styles.smallText}>Sales needs</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              text={I18n.t('login')}
              backgroundColor={colors.lightgray}
              textColor={colors.blue}
              width={dySize(320)}
              onPress={() => {
                GoogleTracker.trackEvent('Welcome Screen', 'Clicked Login Button');
                NavigationService.navigate('LOGIN');
              }}
            />
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
