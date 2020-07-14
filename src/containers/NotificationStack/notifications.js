

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Card } from 'native-base';
import Ripple from 'react-native-material-ripple';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Moment from 'react-moment';
import * as _ from 'lodash';
import { dySize, getFontSize } from '../../libs/responsive';
import { colors } from '../../theme/colors';
import { Button, MyText, LottieIndicator } from '../../components';
import { notificationActions } from '../../redux/actions';
import I18n from '../../i18n/i18n';
import { TickBlueCircle } from '../../assets/images';
import { GoogleTracker } from '../../libs/providers';
import NavigationService from '../../navigation/NavigationService';
import { convertHTML } from '../../libs/operators';

const styles = StyleSheet.create({
  container: {
    paddingVertical: dySize(20),
    backgroundColor: colors.lightgray
  },
  buttonListView: {
    maxHeight: dySize(40),
    minHeight: dySize(40)
  },
  buttonListInnerView: {
    paddingHorizontal: dySize(20)
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 4,
    marginLeft: dySize(15),
    paddingHorizontal: dySize(20)
  },
  card: {
    padding: dySize(10),
    position: 'relative',
  },
  checkIconView: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: dySize(30),
    height: dySize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: dySize(24),
    height: dySize(24),
    resizeMode: 'contain'
  },
  loadingView: {
    height: dySize(400),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const excerptStyle = StyleSheet.create({
  p: {
    fontSize: getFontSize(20),
    color: colors.text, // make links coloured pink
  },
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectable: false,
      selectedIDArray: []
    };
  }

  componentDidMount() {
    this.props.fetchNotifications();
  }

  toggleSelect = () => {
    const { selectable } = this.state;
    if (selectable) this.setState({ selectedIDArray: [] });
    this.setState({ selectable: !selectable });
    GoogleTracker.trackEvent('Notification Tab', 'Toggle select button');
  }

  deleteSelected = () => {
    const { selectedIDArray } = this.state;
    const { notificationBlockIds } = this.props;

    const param = notificationBlockIds.concat(selectedIDArray);
    this.props.setBLockedNotificationIDs(param);
    GoogleTracker.trackEvent('Notification Tab', 'Deleted some notifications');
  }

  deleteAll = () => {
    const ids = this.props.notifications.map(notification => notification.id);
    this.props.setBLockedNotificationIDs(ids);
    GoogleTracker.trackEvent('Notification Tab', 'Deleted all notifications');
  }

  filterNotifications = () => {
    const filtered = _.filter(this.props.notifications, o => this.props.notificationBlockIds.indexOf(o.id) < 0);
    return filtered;
  }

  onSelectNotification = (notification) => {
    const { selectable, selectedIDArray } = this.state;
    if (!selectable) {
      // go to detail page
      NavigationService.navigate('NOTIFICATION_DETAIL', { notification });
    } else {
      // toggle selection
      const index = selectedIDArray.indexOf(notification.id);
      if (index < 0) selectedIDArray.push(notification.id);
      else selectedIDArray.splice(index, 1);
      this.setState({ selectedIDArray });
      GoogleTracker.trackEvent('Notification Tab', 'Select or deselect a notifications');
    }
  }

  _renderItem = ({ item }) => {
    const isSelected = !(this.state.selectedIDArray.indexOf(item.id) < 0);
    return (
      <View style={{ marginBottom: dySize(10) }}>
        {
          this.state.selectable
          && (
          <MyText
            text={I18n.t('select')}
            color={colors.blue}
            fontSize={12}
            textAlign="right"
          />
          )
        }
        <Ripple
          onPress={() => this.onSelectNotification(item)}
          rippleDuration={400}
          rippleCentered
        >

          <Card style={[styles.card, { opacity: isSelected ? 0.8 : 1 }]}>
            <MyText
              text={item.title.rendered}
              color={colors.blue}
              fontSize={16}
              style={{ opacity: isSelected ? 0.8 : 1, fontWeight: 'bold' }}
            />
            {/* <MyText
              text={item.excerpt.rendered}
              color={colors.text}
              fontSize={16}
              paddingVertical={dySize(5)}
              style={{ opacity: isSelected ? 0.8 : 1 }}
            /> */}
            {/* <HTMLView
              value={item.excerpt.rendered}
              stylesheet={excerptStyle}
            /> */}
            <AutoHeightWebView
              style={{ width: dySize(305) }}
              source={{ html: convertHTML(item.excerpt.rendered) }}
              scalesPageToFit={false}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MyText
                text={`${I18n.t('posted_on')} `}
                color={colors.text}
                fontSize={12}
              />
              <MyText
                text={<Moment element={Text} format="DD/MM/YYYY" date={new Date(item.date)} />}
                color={colors.text}
                fontSize={12}
              />
            </View>
            {
              isSelected
              && (
              <View style={styles.checkIconView}>
                <Image source={TickBlueCircle} style={styles.checkIcon} />
              </View>
              )
            }
          </Card>
        </Ripple>
      </View>
    );
  }

  _renderEmptyView = () => (
    <View style={styles.loadingView}>
      {
      this.props.refreshing
        ? <LottieIndicator source={require('../../assets/svgs/indicator/data.json')} />
        : <Text style={{ color: colors.gray, textAlign: 'center', fontSize: getFontSize(16) }}>{I18n.t('notification_empty')}</Text>
    }
    </View>
  )

  render() {
    const { selectable, selectedIDArray } = this.state;
    const filteredNotification = this.filterNotifications();
    return (
      <Container style={styles.container}>
        {
          filteredNotification.length > 0
          && (
          <ScrollView
            horizontal
            contentContainerStyle={styles.buttonListInnerView}
            style={styles.buttonListView}
            showsHorizontalScrollIndicator={false}
          >
            <Button
              text={selectable ? I18n.t('cancel') : I18n.t('select')}
              height={dySize(30)}
              backgroundColor={colors.blue}
              onPress={() => this.toggleSelect()}
              fontSize={12}
              style={{ paddingHorizontal: dySize(20) }}
            />
            {
              selectable && selectedIDArray.length > 0
              && (
              <Button
                text={I18n.t('delete_selected')}
                height={dySize(30)}
                textColor={colors.blue}
                backgroundColor="transparent"
                fontSize={12}
                style={styles.deleteButton}
                onPress={() => this.deleteSelected()}
              />
              )
            }
            {
              selectable
              && (
              <Button
                text={I18n.t('delete_all')}
                height={dySize(30)}
                textColor={colors.blue}
                backgroundColor="transparent"
                fontSize={12}
                style={styles.deleteButton}
                onPress={() => this.deleteAll()}
              />
              )
            }
          </ScrollView>
          )
        }
        <FlatList
          contentContainerStyle={{ padding: dySize(20) }}
          data={filteredNotification}
          renderItem={this._renderItem.bind(this)}
          ListEmptyComponent={this._renderEmptyView.bind(this)}
          refreshControl={(
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={() => this.props.fetchNotifications()}
            />
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notificationReducer.notifications,
  notificationBlockIds: state.notificationReducer.notificationBlockIds,
  refreshing: state.screenReducer.refreshing
});

const mapDispatchToProps = ({
  fetchNotifications: notificationActions.fetchNotifications,
  setBLockedNotificationIDs: notificationActions.setBLockedNotificationIDs
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
