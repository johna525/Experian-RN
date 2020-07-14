import React from 'react';
import {
  View, StatusBar, StyleSheet, NetInfo
} from 'react-native';
import { connect } from 'react-redux';
import UserInactivity from 'react-native-user-inactivity';

import { routeActions, authActions } from '../redux/actions';
import MainNavigator from './RootNavigation';
import NavigatorService from './NavigationService';
import { GoogleTracker } from '../libs/providers';
import { LottieIndicator } from '../components';
import { dySize } from '../libs/responsive';
import { INACTIVITY_TIME } from '../libs/constants';
import I18n from '../i18n/i18n';

const styles = StyleSheet.create({
  loadingView: {

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  indicatorWrapper: {
    width: dySize(150),
    height: dySize(150),
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class AppWithNavigationState extends React.Component {
  onAction = (active) => {
    if (!active && this.props.loggedIn) {
      this.props.setLoggedIn(false);
      this.props.setLogoutDetail(I18n.t('logout_detail'));
      NavigatorService.navigate('LOGIN');
    }
  }

  _onChangeNavigationState = (prevState, currentState, action) => {
    console.log('Navigation Action Changed: ', action);
    const { routeName } = currentState.routes[currentState.index];
    // tracking screens
    GoogleTracker.trackScreenView(routeName);
    // save route name
    this.props.setRouteName(routeName);
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log(
        `Initial, type: ${
          connectionInfo.type
        }, effectiveType: ${
          connectionInfo.effectiveType}`,
      );
      if (connectionInfo.type === 'none') alert('No internet connection detected please try again with an active connection.');
    });
  }

  render() {
    const { isLoading } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <UserInactivity
          timeForInactivity={INACTIVITY_TIME}
          onAction={this.onAction}
        >
          <StatusBar barStyle="dark-content" backgroundColor="transparent" />
          <MainNavigator
            ref={(navigatorRef) => {
              NavigatorService.setContainer(navigatorRef);
            }}
            onNavigationStateChange={this._onChangeNavigationState}
          />
          {
            isLoading
            && (
            <View style={styles.loadingView}>
              <View style={styles.indicatorWrapper}>
                <LottieIndicator source={require('../assets/svgs/indicator/data.json')} />
              </View>
            </View>
            )
          }
        </UserInactivity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.screenReducer.isLoading,
  screenName: state.screenReducer.screenName,
  loggedIn: state.authReducer.loggedIn
});

const mapDispatchToProps = ({
  setRouteName: routeActions.setRouteName,
  setLoggedIn: authActions.setLoggedIn,
  setLogoutDetail: authActions.setLogoutDetail
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
