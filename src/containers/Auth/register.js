

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
import { Auth } from 'aws-amplify';
import { colors } from '../../theme/colors';
import { getFontSize, dySize } from '../../libs/responsive';
import NavigationService from '../../navigation/NavigationService';
import {
  CenterLineView, MyText, Button, IconButton
} from '../../components';
import { validateEmail } from '../../libs/operators';
import { routeActions, authActions } from '../../redux/actions';
import PickerSelect from '../../components/PickerSelect';
import {
  Logo, ChevronLeftBlue, HidePassword, ShowPassword
} from '../../assets/images';
import I18n from '../../i18n/i18n';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray
  },
  header: {
    height: dySize(100),
    backgroundColor: colors.white
  },
  backButtonView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: dySize(60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    padding: dySize(20),
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
    padding: 20,
    justifyContent: 'flex-end',
    paddingBottom: dySize(30)
  },
  logo: {
    width: dySize(150),
    height: dySize(50),
    resizeMode: 'contain',
  }
});

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
      },
      fullname: '',
      showPassword: false,
      country: 'United Kingdom',
      language: 'en'
    };
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

  onPressRegisterButton = () => {
    const { email, password } = this.state;
    if (!this.checkInputValidation()) return false;
    NavigationService.navigate('CREATE_PIN');
    // this.props.setLoading(true);
    // try {
    //   const user = await Auth.signUp({
    //     username: email,
    //     password,
    //     attributes: {
    //       email
    //     },
    //   });
    //   this.props.setLoading(false);
    //   this.props.setUser(user);
    // } catch (err) {
    //   this.props.setLoading(false);
    //   setTimeout(() => {
    //     alert(err.message);
    //   })
    //   console.log(err)
    // }
  }

  checkInputValidation = () => {
    const {
      email, password, fullname, error
    } = this.state;
    let temp = error;
    temp = {
      fullname: fullname.length === 0 ? I18n.t('fullname_required') : '',
      email: email.length === 0 ? I18n.t('email_required') : !validateEmail(email) ? I18n.t('email_invalid') : '',
      password: password.length < 8 ? I18n.t('password_length') : ''
    };
    this.setState({ error: temp });
    if ((temp.fullname + temp.email + temp.password).length === 0) return true;
    return false;
  }

  render() {
    const {
      email, password, fullname, error, showPassword, country, language
    } = this.state;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <CenterLineView style={{ position: 'relative', width: dySize(375) }}>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.backButtonView}>
              <IconButton
                image={ChevronLeftBlue}
                imageSize={15}
                color={colors.blue}
                onPress={() => NavigationService.goBack()}
              />
            </View>
          </CenterLineView>
        </Header>
        <Content contentContainerStyle={styles.content}>
          <CenterLineView padding={20}>
            <MyText color={colors.blue} text={I18n.t('register')} fontSize={getFontSize(30)} style={{ fontWeight: '200' }} />
          </CenterLineView>
          <TextField
            label={I18n.t('fullname')}
            maxLength={30}
            error={error.fullname}
            value={fullname}
            onChangeText={this.handleInputChange('fullname')}
          />
          <PickerSelect
            data={I18n.t('country_list')}
            value={country}
            placeholder={I18n.t('country')}
            onValueChange={this.handleInputChange('country')}
          />
          <PickerSelect
            data={I18n.t('language_list')}
            value={language}
            placeholder={I18n.t('language')}
            onValueChange={this.handleInputChange('language')}
          />
          <TextField
            label={I18n.t('email')}
            maxLength={40}
            keyboardType="email-address"
            error={error.email}
            value={email}
            onChangeText={this.handleInputChange('email')}
          />
          <View style={styles.inputView}>
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
        </Content>
        <View style={styles.submitView}>
          <Button
            text={I18n.t('register')}
            textColor={colors.white}
            onPress={this.onPressRegisterButton}
          />
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = ({
  setLoading: routeActions.setLoading,
  setUser: authActions.setUser
});

export default connect(undefined, mapDispatchToProps)(SignUpScreen);
