/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  RefreshControl,
  Linking
} from 'react-native';

import { connect } from 'react-redux';
import { Container } from 'native-base';
import Moment from 'react-moment';
import * as _ from 'lodash';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../../theme/colors';
import { dySize, getFontSize } from '../../../libs/responsive';
import NavigationService from '../../../navigation/NavigationService';
import I18n from '../../../i18n/i18n';
import { homeActions } from '../../../redux/actions';
import {
  ArrowLeftBlue, SearchIconBlue, ChevronRightBlue, YoutubeVideo
} from '../../../assets/images';
import {
  MyText, CustomHeader, Button, LottieIndicator
} from '../../../components';
import { showToast, clarifyText } from '../../../libs/operators';
import { GoogleTracker } from '../../../libs/providers';

const CategoryArray = ['Demo', 'Playbook', 'Sales Presentation', 'Case Study', 'Brochure', 'Training'];
const TitleKeyArray = ['demos', 'playbooks', 'sales_presentation', 'case_studies', 'brochures', 'training'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  filterButtonView: {
    flexDirection: 'row',
  },
  filterButton: {
    marginRight: dySize(10),
    borderWidth: 1,
    borderColor: colors.blue,
    paddingHorizontal: dySize(10),
    height: dySize(40)
  },
  allFilterButton: {
    marginRight: dySize(10),
    borderWidth: 1,
    borderColor: colors.blue,
    paddingHorizontal: dySize(20),
    height: dySize(40)
  },
  listItem: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: colors.gray,
    paddingVertical: dySize(12)
  },
  fileIcon: {
    width: dySize(30),
    height: dySize(40),
    resizeMode: 'contain'
  },
  listContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dySize(10)
  },
  dateText: {
    fontSize: 14,
    color: colors.text
  },
  arrowIcon: {
    width: dySize(20),
    height: dySize(20),
    resizeMode: 'contain'
  },
  loadingView: {
    height: dySize(400),
    justifyContent: 'center',
    alignItems: 'center'
  },
});

class CollectionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterType: 'all',
      fileType: '',
    };
  }

  componentDidMount() {
    this.props.fetchQuickLinks();
  }

  FilterQuickLinks = () => {
    const { index } = this.props.navigation.state.params;
    const filteredLinks = _.filter(this.props.quicklinks, (o) => {
      if (o.acf.collection_name === undefined) return false;
      if (o.acf.collection_name.indexOf(CategoryArray[index]) < 0) return false;
      return true;
    });
    return filteredLinks;
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onChangeFilterOption = (filterType) => {
    this.setState({ filterType });
    GoogleTracker.trackEvent('Collection Detail Screen', 'Changed filter option');
    if (filterType === 'file') {
      NavigationService.navigate('HOME_FILE_TYPES', {
        fileType: this.state.fileType, onSelect: fileType => this.onSelectFileType(fileType)
      });
    }
  }

  onSelectFileType = (fileType) => {
    this.setState({ fileType });
    GoogleTracker.trackEvent('Collection Detail Screen', 'Changed filtered file type');
  }

  getFilteredBooks = () => {
    const { fileType, filterType } = this.state;
    const res = [];
    this.FilterQuickLinks().map((book) => {
      if (filterType === 'file' && book.acf.format.toLowerCase().indexOf(fileType.toLowerCase()) < 0) return false;
      res.push(book);
      return true;
    });
    return res;
  }

  onPressLink = (item) => {
    const link = item.acf.url;
    if (link.length < 5) showToast('invalid url', { long: true, position: 'bottom' });
    else {
      Linking.canOpenURL(link).then((supported) => {
        if (supported) {
          GoogleTracker.trackEvent('Collection Detail Screen', 'Opened URL', null, { url: link });
          Linking.openURL(link);
        } else {
          console.log(`Don't know how to open URI: ${link}`);
        }
      });
    }
  }

  _renderItem = ({ item }) => (
    <Ripple onPress={() => this.onPressLink(item)} rippleDuration={400}>
      <View style={styles.listItem}>
        <Image source={typeof item.acf.icon === 'string' ? { uri: item.acf.icon } : YoutubeVideo} style={styles.fileIcon} />
        <View style={styles.listContent}>
          <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <MyText color={colors.blue} fontSize={14} text={clarifyText(item.title.rendered)} paddingVertical={0} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MyText color={colors.text} fontSize={12} text="last update: " />
              <MyText color={colors.black} fontSize={12} text={<Moment element={Text} format="DD/MM/YYYY" date={new Date(item.modified)} />} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MyText color={colors.text} fontSize={12} text="Source: " paddingVertical={0} />
              <MyText color={colors.black} fontSize={12} text={item.acf.source} paddingVertical={0} />
            </View>
          </View>
          <Image source={ChevronRightBlue} style={styles.arrowIcon} />
        </View>
      </View>
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

  _renderFooterView = () => {
    if (this.getFilteredBooks().length === 0) return null;
    return <View style={{ borderTopWidth: 1, borderColor: colors.gray, height: 2 }} />;
  }

  render() {
    const { fileType, filterType } = this.state;
    const { index } = this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t(TitleKeyArray[index])}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />
        <View style={{ padding: dySize(10) }}>
          <MyText text={I18n.t('sort_by')} color={colors.text} paddingVertical={10} />
          <View style={styles.filterButtonView}>
            <Button
              text={I18n.t('all')}
              backgroundColor={filterType === 'all' ? colors.blue : 'transparent'}
              textColor={filterType === 'all' ? colors.lightgray : colors.blue}
              fontSize={14}
              style={styles.allFilterButton}
              onPress={() => this.onChangeFilterOption('all')}
            />
            <Button
              text={fileType.length > 0 ? fileType : I18n.t('file_type')}
              backgroundColor={filterType === 'file' ? colors.blue : 'transparent'}
              textColor={filterType === 'file' ? colors.lightgray : colors.blue}
              fontSize={14}
              style={styles.filterButton}
              onPress={() => this.onChangeFilterOption('file')}
              icon="ios-arrow-down"
            />
          </View>
        </View>
        <FlatList
          data={this.getFilteredBooks()}
          renderItem={this._renderItem.bind(this)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: dySize(10) }}
          ListEmptyComponent={this._renderEmptyView.bind(this)}
          ListFooterComponent={this._renderFooterView}
          style={{ margin: dySize(15) }}
          refreshControl={(
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={() => this.props.fetchQuickLinks()}
            />
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  quicklinks: state.homeReducer.quicklinks,
  refreshing: state.screenReducer.refreshing
});

const mapDispatchToProps = ({
  fetchQuickLinks: homeActions.fetchQuickLinks
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetail);
