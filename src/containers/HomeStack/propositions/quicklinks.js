/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Linking,
  FlatList,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Ripple from 'react-native-material-ripple';
import Moment from 'react-moment';
import { colors } from '../../../theme/colors';
import { MyText, LottieIndicator, IconButton } from '../../../components';
import { dySize, getFontSize } from '../../../libs/responsive';
import { ChevronRightBlue, cardBack1, YoutubeVideo } from '../../../assets/images';
import { homeActions } from '../../../redux/actions';
import I18n from '../../../i18n/i18n';

const styles = StyleSheet.create({
  container: {
    padding: dySize(20),
    backgroundColor: colors.lightgray,
    minHeight: dySize(1000)
  },
  linkItemView: {
    paddingVertical: dySize(10),
    backgroundColor: colors.lightgray,
    borderTopWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
  },
  icon: {
    width: dySize(30),
    height: dySize(40),
    resizeMode: 'contain'
  },
  infoView: {
    flex: 1,
    paddingHorizontal: dySize(10)
  },
  arrowIconView: {
    width: dySize(30),
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  arrowIcon: {
    width: dySize(15),
    height: dySize(15),
    resizeMode: 'contain'
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

class PropositionQuickLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchQuickLinks();
  }

  filterLinks = () => {
    const { selectedProposition, quicklinks } = this.props;
    const temp = _.filter(quicklinks, link => selectedProposition.slug === link.acf.proposition_group);
    return temp;
  }

  onPressLink = (link) => {
    Linking.canOpenURL(link.acf.url).then((supported) => {
      if (supported) {
        Linking.openURL(link.acf.url);
      } else {
        console.log(`Don't know how to open URI: ${this.props.url}`);
      }
    });
  }

  _renderItem = ({ item }) => {
    const iconURL = item.acf.icon;
    return (
      <Ripple
        onPress={() => this.onPressLink(item)}
        rippleDuration={400}
      >
        <View style={styles.linkItemView}>
          <Image source={typeof iconURL === 'string' ? { uri: iconURL } : YoutubeVideo} style={styles.icon} />
          <View style={styles.infoView}>
            <MyText color={colors.blue} fontSize={16} text={item.acf.file_name} paddingVertical={0} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MyText color={colors.text} fontSize={12} text="Last update:" />
              <MyText color={colors.text} fontSize={12} text={<Moment element={Text} format="DD/MM/YYYY" date={new Date(item.date)} />} style={{ fontWeight: 'bold' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MyText color={colors.text} fontSize={12} text="Source" paddingVertical={0} />
              <MyText color={colors.text} fontSize={12} text={item.acf.source} paddingVertical={0} style={{ fontWeight: 'bold' }} />
            </View>
          </View>
          <View style={styles.arrowIconView}>
            <Image source={ChevronRightBlue} style={styles.arrowIcon} />
          </View>
        </View>
      </Ripple>
    );
  }

  _renderEmptyView = () => (
    <View style={styles.loadingView}>
      {
      this.props.refreshing
        ? <LottieIndicator source={require('../../../assets/svgs/indicator/data.json')} />
        : <Text style={{ color: colors.gray, textAlign: 'center', fontSize: getFontSize(16) }}>{I18n.t('no_results')}</Text>
    }
    </View>
  )

  _renderFooterView = () => {
    if (this.filterLinks().length === 0) return null;
    return <View style={{ borderTopWidth: 1, borderColor: colors.gray, height: 2 }} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <MyText color={colors.blue} fontSize={24} paddingVertical={20} paddingHorizontal={0} text="Quick links" />
          <IconButton icon="md-refresh" onPress={() => this.props.fetchQuickLinks()} />
        </View>
        <FlatList
          data={this.filterLinks()}
          renderItem={this._renderItem.bind(this)}
          ListEmptyComponent={this._renderEmptyView.bind(this)}
          ListFooterComponent={this._renderFooterView}
          refreshControl={(
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={() => this.props.fetchQuickLinks()}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  quicklinks: state.homeReducer.quicklinks,
  selectedProposition: state.homeReducer.selectedProposition,
  refreshing: state.screenReducer.refreshing
});

const mapDispatchToProps = ({
  fetchQuickLinks: homeActions.fetchQuickLinks
});

export default connect(mapStateToProps, mapDispatchToProps)(PropositionQuickLinks);
