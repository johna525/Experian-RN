/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Card } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import * as _ from 'lodash';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../theme/colors';
import NavigationService from '../../navigation/NavigationService';
import { dySize, getFontSize } from '../../libs/responsive';
import { CollectionList } from '../../libs/constants';
import { homeActions, authActions } from '../../redux/actions';
import I18n from '../../i18n/i18n';
import { LottieIndicator } from '../../components/LottieIndicator';
import {
  MyText, Button, ImageBackground, SBView
} from '../../components';
import {
  SearchIconBlue, FlagWhiteInfill, FlagWhiteOutline, Dashboard
} from '../../assets/images';
import { GoogleTracker } from '../../libs/providers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.lightgray
  },
  topImage: {
    width: dySize(375),
    height: dySize(200),
    alignItems: 'center',
    padding: dySize(30)
  },
  searchViewWrappper: {
    height: dySize(50),
    width: dySize(325),
    marginVertical: dySize(10),
    borderRadius: 4,
    backgroundColor: colors.lightgray,
  },
  searchView: {
    height: dySize(50),
    width: dySize(325),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dySize(15)
  },
  searchIcon: {
    width: dySize(20),
    height: dySize(20),
    resizeMode: 'contain'
  },
  redButtonView: {
    width: dySize(325),
    height: dySize(60),
    marginTop: dySize(-30),
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderWidth: 0,
    shadowColor: colors.text,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4
  },
  content: {
    flex: 1,
    width: dySize(375),
    paddingVertical: dySize(10)
  },
  subContent: {
    flex: 1,
    paddingVertical: dySize(10)
  },
  listView: {
    paddingHorizontal: dySize(25)
  },
  collectionItem: {
    flex: 1,
    width: dySize(150),
    borderRadius: 6,
    flexDirection: 'column',
    marginRight: dySize(15)
  },
  collectionIconView: {
    flex: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  collectionImage: {
    width: dySize(45),
    height: dySize(45),
    resizeMode: 'contain'
  },
  experianImage: {
    flex: 1,
    width: dySize(150),
    resizeMode: 'cover'
  },
  collectionTextView: {
    height: dySize(40)
  },
  flagIcon: {
    position: 'absolute',
    top: dySize(10),
    right: dySize(10),
    width: dySize(20),
    height: dySize(20),
    resizeMode: 'contain'
  },
});

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchExperian();
    this.props.loadFlaggedProposition();
    this.props.loadFlaggedExperian();
    this.props.loadBlockedNotificationIDs();
    this.props.setLoggedIn(true);
    this.props.setLogoutDetail('');
    GoogleTracker.setUser('123456789');
  }

  getMAE = () => {
    const CT = new Date();
    const H = CT.getHours();
    if (H < 12) return I18n.t('good_morning');
    if (H < 18) return I18n.t('good_afternoon');
    return I18n.t('good_evening');
  }

  getUserName = (obj) => {
    if (obj.email === undefined || obj.email.indexOf('@') < 0) return '';
    return obj.email.split('@')[0];
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  viewAllPropositions = () => {
    GoogleTracker.trackEvent('Home Tab', 'Clicked propositions button');
    NavigationService.navigate('ALL_PROPOSITIONS');
  }

  viewAllCollections = () => {
    GoogleTracker.trackEvent('Home Tab', 'Clicked view all button on Sales Assets section');
    NavigationService.navigate('ALL_COLLECTIONS');
  }

  viewAllExperian = () => {
    GoogleTracker.trackEvent('Home Tab', 'Clicked view all button on About Experian section');
    NavigationService.navigate('ALL_EXPERIANS');
  }

  onPressCollection = (item, index) => {
    NavigationService.navigate('COLLECTION_DETAIL', { index });
    GoogleTracker.trackEvent('Home Tab', 'Clicked a collection');
  }

  onPressExperian = (item) => {
    this.props.setExperianDetail(item);
    NavigationService.navigate('EXPERIAN_DETAIL');
    GoogleTracker.trackEvent('Home Tab', 'Clicked a experian');
  }

  isFlagged = (id) => {
    const filtered = _.filter(this.props.flagExperians, o => o.id === id);
    return filtered.length > 0;
  }

  _renderCollectionItem = ({ item, index }) => (
    <Ripple onPress={() => this.onPressCollection(item, index)} rippleDuration={400}>
      <Card style={styles.collectionItem}>
        <View style={styles.collectionIconView}>
          <Image source={item.image} style={styles.collectionImage} />
        </View>
        <View style={styles.collectionTextView}>
          <MyText text={I18n.t(item.title.toLowerCase().replace(' ', '_'))} color={colors.blue} paddingHorizontal={dySize(5)} fontSize={12} style={{ fontWeight: 'bold' }} />
        </View>
      </Card>
    </Ripple>
  )

  _renderExpreianItem = ({ item }) => (
    <Ripple onPress={() => this.onPressExperian(item)} rippleDuration={400}>
      <Card style={styles.collectionItem}>
        <View style={styles.collectionIconView}>
          <Image source={{ uri: item.acf.background_image }} style={styles.experianImage} />
          {
            this.isFlagged(item.id)
              ? <Image source={FlagWhiteInfill} style={styles.flagIcon} />
              : <Image source={FlagWhiteOutline} style={styles.flagIcon} />
          }
        </View>
        <View style={styles.collectionTextView}>
          <MyText text={item.title.rendered} color={colors.blue} fontSize={12} numberOfLines={2} paddingHorizontal={dySize(5)} style={{ fontWeight: 'bold' }} />
        </View>
      </Card>
    </Ripple>
  )

  _renderEmptyView = () => {
    if (this.props.refreshing) {
      return (
        <LottieIndicator
          style={{ width: dySize(335), flex: 1 }}
          source={require('../../assets/svgs/indicator/data.json')}
        />
      );
    }
    return (
      <View style={{ width: dySize(375), justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.gray, textAlign: 'center', fontSize: getFontSize(16) }}>{I18n.t('no_results')}</Text>
      </View>
    );
  }

  render() {
    const { experianList, user_decoded } = this.props;
    return (
      <Container style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.props.fetchExperian();
          }}
        />
        <ImageBackground source={Dashboard} style={styles.topImage}>
          <MyText color={colors.lightgray} textAlign="center" text={`${this.getMAE()} ${this.getUserName(user_decoded)}`} />
          <View style={styles.searchViewWrappper}>
            <Ripple onPress={() => this.onSearch()} rippleDuration={400}>
              <View style={styles.searchView}>
                <MyText color={colors.text} fontSize={14} text={I18n.t('search_placeholder')} />
                <Image source={SearchIconBlue} style={styles.searchIcon} />
              </View>
            </Ripple>
          </View>
        </ImageBackground>
        <View style={styles.redButtonView}>
          <Button
            text={I18n.t('proposition_button')}
            backgroundColor={colors.red}
            width={dySize(325)}
            height={dySize(60)}
            onPress={() => this.viewAllPropositions()}
            numberOfLines={2}
            textAlign="center"
            fontSize={getFontSize(17)}
            textColor="white"
          />
        </View>
        <View style={styles.content}>
          <View style={styles.subContent}>
            <SBView paddingHorizontal={dySize(25)}>
              <MyText text={I18n.t('collections')} fontSize={getFontSize(16)} paddingHorizontal={0} color={colors.text} />
              <Button
                text={I18n.t('view_all')}
                backgroundColor="transparent"
                textColor={colors.blue}
                fontSize={15}
                onPress={() => this.viewAllCollections()}
                height={dySize(30)}
              />
            </SBView>
            <FlatList
              contentContainerStyle={styles.listView}
              data={CollectionList}
              renderItem={this._renderCollectionItem}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.subContent}>
            <SBView paddingHorizontal={dySize(25)}>
              <MyText text={I18n.t('about_experian')} fontSize={getFontSize(16)} paddingHorizontal={0} color={colors.text} />
              <Button
                text={I18n.t('view_all')}
                backgroundColor="transparent"
                textColor={colors.blue}
                fontSize={15}
                onPress={() => this.viewAllExperian()}
                height={dySize(30)}
              />
            </SBView>
            <FlatList
              contentContainerStyle={styles.listView}
              data={experianList}
              renderItem={this._renderExpreianItem.bind(this)}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={this._renderEmptyView.bind(this)}
            />

          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  experianList: state.homeReducer.experianList,
  flagExperians: state.notificationReducer.flagExperians,
  refreshing: state.screenReducer.refreshing,
  user_decoded: state.authReducer.user_decoded
});

const mapDispatchToProps = ({
  fetchExperian: homeActions.fetchExperian,
  loadFlaggedProposition: homeActions.loadFlaggedProposition,
  loadFlaggedExperian: homeActions.loadFlaggedExperian,
  loadBlockedNotificationIDs: homeActions.loadBlockedNotificationIDs,
  setLoggedIn: authActions.setLoggedIn,
  setExperianDetail: homeActions.setExperianDetail,
  setLogoutDetail: authActions.setLogoutDetail
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
