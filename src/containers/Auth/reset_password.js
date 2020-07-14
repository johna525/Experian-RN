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
import { colors } from '../../theme/colors';
import { getFontSize, dySize } from '../../libs/responsive';
import NavigationService from '../../navigation/NavigationService';
import {
  CenterLineView, MyText, Button, IconButton
} from '../../components';
import { validateEmail, showToast } from '../../libs/operators';
import { routeActions, authActions } from '../../redux/actions';
import { Logo } from '../../assets/images';
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
    flex: 1
  },
  passwordIconview: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: dySize(50),
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: dySize(30)
  },
  logo: {
    width: dySize(150),
    height: dySize(50),
    resizeMode: 'contain',
  }
});

class ResetPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: {
        email: ''
      }
    };
  }

  handleInputChange = name => (value) => {
    this.setState({
      [name]: value
    });
  }

  onPressResetButton = () => {
    const { email } = this.state;
    if (!this.checkInputValidation()) return false;
    this.props.setLoading(true);
    this.props.sendResetPasswordRequest(email, (res) => {
      console.log(res);
      this.props.setLoading(false);
      setTimeout(() => {
        showToast(I18n.t('reset_email_sent'), { long: true, position: 'center' });
      });
    });
    return true;
  }

  checkInputValidation = () => {
    const { email, error } = this.state;
    if (email.length === 0) {
      this.setState({ error: { ...error, email: I18n.t('email_required') } });
      return false;
    }
    if (!validateEmail(email)) {
      this.setState({ error: { ...error, email: I18n.t('email_invalid') } });
      return false;
    }
    this.setState({ error: { email: '' } });
    return true;
  }

  render() {
    const { email, error } = this.state;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <CenterLineView style={{ position: 'relative', width: dySize(375) }}>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.backButtonView}>
              <IconButton
                icon="ios-arrow-back"
                size={24}
                color={colors.blue}
                onPress={() => NavigationService.goBack()}
              />
            </View>
          </CenterLineView>
        </Header>
        <Content contentContainerStyle={styles.content}>
          <CenterLineView padding={20}>
            <MyText color={colors.blue} text={I18n.t('reset_password')} textAlign="center" fontSize={getFontSize(30)} />
          </CenterLineView>
          <TextField
            label={I18n.t('email_address')}
            maxLength={40}
            keyboardType="email-address"
            error={error.email}
            value={email}
            onChangeText={this.handleInputChange('email')}
          />
          <View style={styles.submitView}>
            <Button
              text={I18n.t('reset_password')}
              textColor={colors.white}
              onPress={this.onPressResetButton}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = ({
  setLoading: routeActions.setLoading,
  sendResetPasswordRequest: authActions.sendResetPasswordRequest,
});

export default connect(undefined, mapDispatchToProps)(ResetPasswordScreen);
