/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  RefreshControl,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Card } from 'native-base';
import * as _ from 'lodash';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../../theme/colors';
import {
  MyText, CustomHeader, LottieIndicator
} from '../../../components';
import { dySize, getFontSize } from '../../../libs/responsive';
import NavigationService from '../../../navigation/NavigationService';
import {
  ArrowLeftBlue, SearchIconBlue, FlagWhiteInfill, FlagWhiteOutline
} from '../../../assets/images';
import I18n from '../../../i18n/i18n';
import { homeActions } from '../../../redux/actions';
import { GoogleTracker } from '../../../libs/providers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  collectionView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  collectionItemView: {
    borderRadius: 4,
    margin: dySize(10),
    padding: 0
  },
  cardItemView: {
    backgroundColor: colors.white,
    borderRadius: 4,
    margin: 0,
    paddingBottom: dySize(10)
  },
  itemImage: {
    height: dySize(90),
    width: null,
    resizeMode: 'cover'
  },
  imageWrapper: {
    height: dySize(90),
    position: 'relative'
  },
  flagIcon: {
    position: 'absolute',
    top: dySize(10),
    right: dySize(10),
    width: dySize(20),
    height: dySize(20),
    resizeMode: 'contain'
  },
  loadingView: {
    height: dySize(500),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ExperiansScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onSelectExperian = (experian) => {
    this.props.setExperianDetail(experian);
    GoogleTracker.trackEvent('About Experian Screen', 'Clicked a experian', null, { data: experian });
    NavigationService.navigate('EXPERIAN_DETAIL', { experian });
  }

  checkFlagged = (experian) => {
    const filtered = _.filter(this.props.flagExperians, o => o.id === experian.id);
    return filtered.length > 0;
  }

  _renderItem = ({ item }) => (
    <Ripple onPress={() => this.onSelectExperian(item)} key={item.id} style={styles.collectionItemView} rippleRadius={150} rippleDuration={400}>
      <Card style={styles.cardItemView}>
        {/* {
            item.userId === this.props.user.userId &&
            <MyText text="Customer Innocation Experience" color={colors.blue} fontSize={25} paddingHorizontal={dySize(10)}/>
          } */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.acf.background_image }} style={styles.itemImage} />
          {
              this.checkFlagged(item)
                ? <Image source={FlagWhiteInfill} style={styles.flagIcon} />
                : <Image source={FlagWhiteOutline} style={styles.flagIcon} />
            }
        </View>
        <MyText text={item.title.rendered} color={colors.blue} fontSize={14} numberOfLines={1} paddingHorizontal={dySize(10)} style={{ fontWeight: 'bold' }} />
        <MyText text={item.acf.description} color={colors.text} fontSize={12} numberOfLines={2} paddingHorizontal={dySize(10)} paddingVertical={0} />
      </Card>
    </Ripple>
  )

  _renderEmptyView = () => (
    <View style={styles.loadingView}>
      {
      this.props.refreshing
        ? <LottieIndicator source={require('../../../assets/svgs/indicator/data.json')} />
        : <Text style={{ color: colors.gray, textAlign: 'center', fontSize: getFontSize(16) }}>{I18n.t('no_results')}</Text>
    }
    </View>
  )

  render() {
    const { experianList } = this.props;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('about_experian')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />
        <FlatList
          data={experianList}
          renderItem={this._renderItem.bind(this)}
          ListEmptyComponent={this._renderEmptyView.bind(this)}
          refreshControl={(
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={() => this.props.fetchExperian()}
            />
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  experianList: state.homeReducer.experianList,
  user: state.authReducer.user,
  flagExperians: state.notificationReducer.flagExperians,
  refreshing: state.screenReducer.refreshing
});

const mapDispatchToProps = ({
  setExperianDetail: homeActions.setExperianDetail,
  fetchExperian: homeActions.fetchExperian
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperiansScreen);
