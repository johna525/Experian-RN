/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  Image,
  FlatList,
  View,
  RefreshControl,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Card } from 'native-base';
import * as _ from 'lodash';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../../theme/colors';
import { MyText, CustomHeader, LottieIndicator } from '../../../components';
import { dySize, getFontSize } from '../../../libs/responsive';
import NavigationService from '../../../navigation/NavigationService';
import I18n from '../../../i18n/i18n';
import { homeActions } from '../../../redux/actions';
import { clarifyText } from '../../../libs/operators';
import {
  ArrowLeftBlue, SearchIconBlue, FlagWhiteInfill, FlagWhiteOutline
} from '../../../assets/images';
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
    width: dySize(165),
    height: dySize(200),
    backgroundColor: colors.white,
    borderRadius: 4,
    overflow: 'hidden',
    margin: 0,
    padding: 0
  },
  itemImageView: {
    width: dySize(165),
    height: dySize(100),
    position: 'relative'
  },
  itemImage: {
    width: dySize(165),
    height: dySize(100),
    resizeMode: 'cover'
  },
  loadingView: {
    height: dySize(500),
    justifyContent: 'center',
    alignItems: 'center'
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

class PropositionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchAllPropositions();
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onSelectProposition = (proposition) => {
    this.props.setPropositionDetail(proposition);
    GoogleTracker.trackEvent('Propositions Screen', 'Clicked a proposition', null, { data: proposition });
    NavigationService.navigate('PROPOSITION_DETAIL');
  }

  checkFlagged = (proposition) => {
    const filtered = _.filter(this.props.flagPropositions, o => o.id === proposition.id);
    return filtered.length > 0;
  }

  _renderItem = ({ item }) => (
    <Ripple
      key={item.id}
      onPress={() => this.onSelectProposition(item)}
      rippleRadius={150}
      rippleDuration={400}
      style={{ marginLeft: dySize(13), marginTop: dySize(10) }}
    >
      <Card style={styles.collectionItemView}>
        <View style={styles.itemImageView}>
          <Image source={{ uri: item.acf.background_image }} style={styles.itemImage} />
          {
              this.checkFlagged(item)
                ? <Image source={FlagWhiteInfill} style={styles.flagIcon} />
                : <Image source={FlagWhiteOutline} style={styles.flagIcon} />
            }
        </View>
        <MyText
          text={clarifyText(item.title.rendered)}
          color={colors.blue}
          fontSize={getFontSize(14)}
          paddingHorizontal={dySize(10)}
          paddingVertical={dySize(5)}
          numberOfLines={2}
          style={{ fontWeight: 'bold' }}
        />
        <MyText
          text={item.acf.description === undefined ? 'No description' : item.acf.description}
          color={colors.text}
          fontSize={getFontSize(12)}
          paddingHorizontal={dySize(10)}
          paddingVertical={0}
          numberOfLines={3}
        />
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
    const { propositions } = this.props;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('propositions')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />
        <FlatList
          contentContainerStyle={{ paddingVertical: dySize(30) }}
          data={propositions}
          renderItem={this._renderItem.bind(this)}
          numColumns={2}
          ListEmptyComponent={this._renderEmptyView.bind(this)}
          refreshControl={(
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={() => this.props.fetchAllPropositions()}
            />
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  propositions: state.homeReducer.propositions,
  flagPropositions: state.notificationReducer.flagPropositions,
  refreshing: state.screenReducer.refreshing
});

const mapDispatchToProps = ({
  fetchAllPropositions: homeActions.fetchAllPropositions,
  setPropositionDetail: homeActions.setPropositionDetail,
});

export default connect(mapStateToProps, mapDispatchToProps)(PropositionsScreen);
