

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { colors } from '../../theme/colors';
import { getFontSize, dySize } from '../../libs/responsive';
import NavigationService from '../../navigation/NavigationService';
import {
  MyText, Button, IconButton
} from '../../components';
import { authActions } from '../../redux/actions';
import I18n from '../../i18n/i18n';
import { showToast } from '../../libs/operators';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: dySize(40),
    paddingHorizontal: dySize(40),
    backgroundColor: colors.lightgray
  },
  pinInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: dySize(20)
  },
  pinPoint: {
    width: dySize(20),
    height: dySize(20),
    borderRadius: dySize(20),
    margin: dySize(10)
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    width: dySize(295)
  },
  buttonLine: {
    height: dySize(85),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: dySize(70),
    height: dySize(70),
    borderRadius: dySize(70),
    borderWidth: 1,
    borderColor: colors.blue
  },
  createButtonView: {
    height: dySize(100),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ConfirmPinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: ''
    };
  }

  onPressPin = (value) => {
    const { pin } = this.state;
    if (value === -1) {
      this.setState({ pin: pin.substr(0, pin.length - 1) });
      return;
    }
    if (pin.length === 6) return;
    this.setState({ pin: pin + value.toString() });
  }

  onCreatePin = () => {
    if (this.props.pin !== this.state.pin) {
      showToast(I18n.t('pin_not_match'), { long: true, position: 'center' });
      return;
    }
    NavigationService.navigate('TOUCH_ENABLE');
  }

  render() {
    const { pin } = this.state;
    return (
      <Container style={styles.container}>
        <MyText color={colors.text} text={I18n.t('confirm_pin')} textAlign="center" />
        <View style={styles.pinInput}>
          {
            Array.apply(null, { length: 6 }).map((item, index) => (
              <View style={[styles.pinPoint, { backgroundColor: index < pin.length ? colors.blue : colors.gray }]} />
            ))
          }
        </View>
        <View style={styles.buttonView}>
          <View style={styles.buttonLine}>
            <Button
              backgroundColor="transparent"
              text={1}
              textColor={colors.blue}
              fontSize={getFontSize(30)}
              style={styles.button}
              onPress={() => this.onPressPin(1)}
            />
            <Button
              backgroundColor="transparent"
              text={2}
              textColor={colors.blue}
              fontSize={getFontSize(30)}
              style={styles.button}
              onPress={() => this.onPressPin(2)}
            />
            <Button
              backgroundColor="transparent"
              text={3}
              textColor={colors.blue}
              fontSize={getFontSize(30)}
              style={styles.button}
              onPress={() => this.onPressPin(3)}
            />
          </View>
          <View style={styles.buttonLine}>
            <Button
              backgroundColor="transparent"
              text={4}
              textColor={colors.blue}
              fontSize={30}
              style={styles.button}
              onPress={() => this.onPressPin(4)}
            />
            <Button
              backgroundColor="transparent"
              text={5}
              textColor={colors.blue}
              fontSize={getFontSize(30)}
              style={styles.button}
              onPress={() => this.onPressPin(5)}
            />
            <Button
              backgroundColor="transparent"
              text={6}
              textColor={colors.blue}
              fontSize={getFontSize(30)}
              style={styles.button}
              onPress={() => this.onPressPin(6)}
            />
          </View>
          <View style={styles.buttonLine}>
            <Button
              backgroundColor="transparent"
              text={7}
              textColor={colors.blue}
              fontSize={getFontSize(30)}
              style={styles.button}
              onPress={() => this.onPressPin(1)}
            />
            <Button
              backgroundColor="transparent"
              text={8}
              textColor={colors.blue}
              fontSize={getFontSize(30)}
              style={styles.button}
              onPress={() => this.onPressPin(2)}
            />
            <Button
              backgroundColor="transparent"
              text={9}
              textColor={colors.blue}
              fontSize={getFontSize(30)}
              style={styles.button}
              onPress={() => this.onPressPin(3)}
            />
          </View>
          <View style={styles.buttonLine}>
            <Button
              backgroundColor="transparent"
              text={I18n.t('back')}
              textColor={colors.blue}
              fontSize={getFontSize(16)}
              style={{ width: dySize(70) }}
              onPress={() => NavigationService.goBack()}
            />
            <Button
              backgroundColor="transparent"
              text={0}
              textColor={colors.blue}
              fontSize={getFontSize(30)}
              style={styles.button}
              onPress={() => this.onPressPin(0)}
            />
            <IconButton
              icon="md-backspace"
              size={dySize(50)}
              color={colors.blue}
              onPress={() => this.onPressPin(-1)}
              style={{ width: dySize(70), paddingHorizontal: 0 }}
            />
          </View>
        </View>
        <View style={styles.createButtonView}>
          {
          pin.length === 6
            && (
            <Button
              text={I18n.t('confirm')}
              width={dySize(300)}
              onPress={() => this.onCreatePin()}
            />
            )
          }
        </View>
      </Container>
    );
  }
}

const mapStatetoProps = state => ({
  pin: state.authReducer.pin
});

const mapDispatchToProps = ({
  setPin: authActions.setPin,
});

export default connect(mapStatetoProps, mapDispatchToProps)(ConfirmPinScreen);
