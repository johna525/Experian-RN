import React from 'react';
import {
  View, StyleSheet, Dimensions, Text
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Container } from 'native-base';
import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';
import { CustomHeader } from '../../components';
import Notifications from './notifications';
import Favourites from './favourites';
import I18n from '../../i18n/i18n';
import { SearchIconWhite } from '../../assets/images';
import NavigationService from '../../navigation/NavigationService';
import { GoogleTracker } from '../../libs/providers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  content: {
    flex: 1,
  },
});

export default class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: {
        index: 0,
        routes: [
          { key: 'first', title: I18n.t('tab_notification') },
          { key: 'second', title: I18n.t('favourites') },
        ],
      }
    };
  }

  onChangeIndex = (index) => {
    const { tabState } = this.state;
    GoogleTracker.trackEvent('Notification Screen', index === 0 ? 'Clicked Notification Tab' : 'Clicked Favourites Tab');
    this.setState({ tabState: { ...tabState, index } });
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  render() {
    const { tabState } = this.state;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('tab_notification')}
          backgroundColor={colors.blue}
          rightImage={SearchIconWhite}
          onPressRight={() => this.onSearch()}
        />
        <View style={styles.content}>
          <TabView
            navigationState={tabState}
            renderScene={SceneMap({
              first: Notifications,
              second: Favourites,
            })}
            onIndexChange={index => this.onChangeIndex(index)}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: colors.red }}
                style={{
                  backgroundColor: colors.white, height: dySize(50), borderBottomWidth: 1, borderColor: colors.gray
                }}
                renderLabel={({ route, focused }) => (
                  <Text style={{
                    color: colors.blue, fontWeight: focused ? 'bold' : 'normal', width: dySize(187), fontSize: getFontSize(16), textAlign: 'center'
                  }}
                  >
                    {route.title}
                  </Text>
                )}
              />
            )}
            swipeEnabled={false}

          />
        </View>
      </Container>
    );
  }
}
