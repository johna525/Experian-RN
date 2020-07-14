

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { authorize } from 'react-native-app-auth';
import { Auth } from 'aws-amplify';
import { colors } from '../../theme/colors';
import { getFontSize, dySize } from '../../libs/responsive';
import NavigationService from '../../navigation/NavigationService';
import {
  CenterLineView, MyText, Button, IconButton
} from '../../components';
import { validateEmail } from '../../libs/operators';
import { routeActions, authActions } from '../../redux/actions';
import { LoadingView } from './loading';
import {
  Logo, ShowPassword, HidePassword, ChevronLeftBlue
} from '../../assets/images';
import I18n from '../../i18n/i18n';
import { GoogleTracker } from '../../libs/providers';

const jwtDecode = require('jwt-decode');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray
  },
  header: {
    height: dySize(100),
    backgroundColor: colors.white
  },
  title: {
    fontWeight: '300',
    fontFamily: 'Roboto-Light'
  },
  backButtonView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: dySize(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: dySize(20),
    backgroundColor: colors.lightgray,
    flex: 1
  },
  passwordIconview: {
    position: 'absolute',
    top: 20,
    right: 0,
    height: dySize(50),
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitView: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: dySize(30)
  },
  logo: {
    width: dySize(150),
    height: dySize(50),
    resizeMode: 'contain',
  }
});

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        email: '',
        password: ''
      },
      showPassword: false,
      loading: false
    };
  }

  async componentDidMount() {
    this.props.setLoading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.props.setLoading(false);
      console.log(user);
    } catch (err) {
      this.props.setLoading(false);
      console.log(err);
    }
  }

  handleInputChange = name => (value) => {
    this.setState({
      [name]: value
    });
  }

  onPressPasswordIcon = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  onPressForgotPassword = () => {
    GoogleTracker.trackEvent('Login Screen', 'Clicked reset password button');
    NavigationService.navigate('RESET_PASSWORD');
  }

  checkAuthentication = async () => {
    const config = {
      issuer: 'https://experian.okta.com/oauth2/default',
      clientId: '0oam05toh42aXwYPA0x7',
      redirectUrl: 'com.okta.experian:/callback',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      // secret: 'eD0tc5iJwDb6Q1gd7Mc4To993CA9p6-bzaJ4TwwN'
    };
    try {
      const authState = await authorize(config);
      console.log(authState);
      // await Auth.revokeToken(scopes);
      // example = {
      //   accessTokenExpirationToken: '2019-03-10T06:38:37+0000',
      //   tokenType: 'Bearer',
      //   refreshToken: '',
      //   accessToken: '',
      //   idToken: ''
      // }
      const decoded = jwtDecode(authState.accessToken);
      this.props.setDecodedUser(decoded);
      // alert(`Okta Login Status: ${JSON.stringify(authState)}`);
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
        NavigationService.navigate('MAIN_SCREEN');
      }, 2500);
    } catch (error) {
      alert(`Okta Login Failed: ${error.toString()}`);
    }
    // NavigationService.navigate('MAIN_SCREEN');
  }

  // onPressLoginButton = async () => {
  //   const { email, password } = this.state;
  //   if (!this.checkInputValidation()) return false;
  //   this.props.setLoading(true);
  //   try {
  //     const user = await Auth.signIn(email, password);
  //     this.props.setLoading(false);
  //     this.props.setUser(user);
  //     console.log(user);
  //   } catch (err) {
  //     this.props.setLoading(false);
  //     setTimeout(() => {
  //       alert(err.message);
  //     });
  //     console.log(err);
  //   }
  //   // setTimeout(() => {
  //   //   NavigationService.navigate('MAIN_SCREEN');
  //   // }, 2500)
  // }

  checkInputValidation = () => {
    const { email, password, error } = this.state;
    if (email.length === 0) {
      this.setState({ error: { ...error, email: I18n.t('email_required') } });
      return false;
    }
    if (!validateEmail(email)) {
      this.setState({ error: { ...error, email: I18n.t('email_invalid') } });
      return false;
    }
    if (password.length === 0) {
      this.setState({ error: { ...error, password: I18n.t('password_required') } });
      return false;
    }
    this.setState({ error: { email: '', password: '' } });
    return true;
  }

  render() {
    const {
      email, password, error, showPassword, loading
    } = this.state;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <CenterLineView style={{ position: 'relative', width: dySize(375) }}>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.backButtonView}>
              <IconButton
                image={ChevronLeftBlue}
                imageSize={dySize(20)}
                color={colors.blue}
                onPress={() => NavigationService.goBack()}
              />
            </View>
          </CenterLineView>
        </Header>
        <Content contentContainerStyle={styles.content}>
          <CenterLineView padding={20}>
            <MyText color={colors.blue} text={I18n.t('login')} fontSize={getFontSize(30)} style={styles.title} />
          </CenterLineView>
          <TextField
            label={I18n.t('email')}
            maxLength={40}
            keyboardType="email-address"
            error={error.email}
            value={email}
            onChangeText={this.handleInputChange('email')}
          />
          <View>
            <TextField
              label={I18n.t('password')}
              secureTextEntry={!showPassword}
              maxLength={30}
              error={error.password}
              value={password}
              onChangeText={this.handleInputChange('password')}
            />
            <View style={styles.passwordIconview}>
              <IconButton
                image={showPassword ? HidePassword : ShowPassword}
                imageSize={dySize(20)}
                color={colors.blue}
                onPress={this.onPressPasswordIcon}
              />
            </View>
          </View>
          <Button
            text={I18n.t('forgot_password')}
            backgroundColor="transparent"
            textColor={colors.blue}
            fontSize={getFontSize(15)}
            onPress={this.onPressForgotPassword}
            justify="flex-start"
          />
          <View style={styles.submitView}>
            <MyText text={this.props.logoutDetail} textAlign="center" color={colors.gray} fontSize={16} />
            <Button
              text={I18n.t('signin')}
              textColor={colors.white}
              onPress={this.checkAuthentication}
            />
          </View>
          <Button
            text="Skip Login"
            backgroundColor="transparent"
            textColor={colors.blue}
            fontSize={getFontSize(15)}
            onPress={() => NavigationService.navigate('HOME')}
          />
        </Content>
        {loading && <LoadingView text={I18n.t('signing')} />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  logoutDetail: state.authReducer.logoutDetail
});

const mapDispatchToProps = ({
  setLoading: routeActions.setLoading,
  setUser: authActions.setUser,
  setDecodedUser: authActions.setDecodedUser
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
