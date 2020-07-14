/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  RefreshControl,
  Text,
  Linking,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Card } from 'native-base';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../../theme/colors';
import {
  MyText, IconButton, Button, LottieIndicator
} from '../../../components';
import { dySize, getFontSize } from '../../../libs/responsive';
import NavigationService from '../../../navigation/NavigationService';
import I18n from '../../../i18n/i18n';
import { CloseCircle, ChevronRightBlue } from '../../../assets/images';
import { clarifyText, showToast } from '../../../libs/operators';
import { homeActions } from '../../../redux/actions';
import { GoogleTracker } from '../../../libs/providers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: dySize(30),
    paddingHorizontal: dySize(15),
    backgroundColor: colors.lightgray
  },
  closeView: {
    height: dySize(50),
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  searchInputCard: {
    borderRadius: 4,
  },
  searchView: {
    width: dySize(345),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dySize(15),
  },
  searchInput: {
    flex: 1,
    height: dySize(50),
    fontSize: getFontSize(16),
    margin: 0,
  },
  filterButton: {
    marginRight: dySize(10),
    borderWidth: 1,
    borderColor: colors.blue,
    paddingHorizontal: dySize(12),
    height: dySize(40)
  },
  filterButtonView: {
    flexDirection: 'row',
  },
  listItem: {
    width: dySize(335),
    height: dySize(60),
    borderTopWidth: 1,
    borderColor: colors.text
  },
  linkItemView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkIcon: {
    width: dySize(15),
    height: dySize(15),
    resizeMode: 'contain'
  },
  linkTextRoot: {
    width: dySize(300),
    flexDirection: 'row',
    alignItems: 'center'
  },
  linkNormalText: {
    fontSize: getFontSize(15),
    color: colors.gray,
  },
  linkBoldText: {
    fontSize: getFontSize(15),
    color: colors.blue,
    fontWeight: 'bold'
  },
  loadingView: {
    height: dySize(400),
    justifyContent: 'center',
    alignItems: 'center'
  },
});

class HomeSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      filterType: 'all',
      fileType: '',
      showFilter: false
    };
  }

  componentDidMount() {
    this.props.fetchQuickLinks();
  }

  onChangeSearchText = (text) => {
    this.setState({ searchText: text });
  }

  onChangeFilterOption = (filterType) => {
    this.setState({ filterType });
    if (filterType === 'file') {
      NavigationService.navigate('HOME_FILE_TYPES', {
        fileType: this.state.fileType, onSelect: fileType => this.onSelectFileType(fileType)
      });
    }
    GoogleTracker.trackEvent('Search Screen', 'Changed filer option');
  }

  onSelectFileType = (fileType) => {
    this.setState({ fileType });
    GoogleTracker.trackEvent('Search Screen', 'Changed filtered file type');
  }

  getFilteredSource = () => {
    const { quicklinks } = this.props;
    const { searchText, fileType, filterType } = this.state;
    const res = [];
    quicklinks.map((link) => {
      const title = clarifyText(link.title.rendered);
      if (title.toLowerCase().indexOf(searchText.toLowerCase()) < 0) return false;
      if (filterType === 'file' && link.acf.format.toLowerCase().indexOf(fileType.toLowerCase()) < 0) return false;
      res.push(link);
      return true;
    });
    return res;
  }

  toggleFilterView = () => {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
    GoogleTracker.trackEvent('Search Screen', 'Toggle filter view');
  }

  onPressLink = (item) => {
    const link = item.acf.url;
    if (link.length < 5) showToast('invalid url', { long: true, position: 'bottom' });
    else {
      Linking.canOpenURL(link).then((supported) => {
        if (supported) {
          GoogleTracker.trackEvent('Search Screen', 'Opened quicklink', { url: link }, { url: link });
          Linking.openURL(link);
        } else {
          console.log(`Don't know how to open URI: ${link}`);
        }
      });
    }
  }

  _renderItem = ({ item }) => {
    const { searchText } = this.state;
    const text = clarifyText(item.title.rendered);
    const searchStartIndex = text.toLowerCase().indexOf(searchText.toLowerCase());
    const searchEndIndex = searchStartIndex < 0 ? -1 : searchStartIndex + searchText.length;
    return (
      <Ripple
        onPress={() => this.onPressLink(item)}
        rippleDuration={400}
        rippleCentered
        style={styles.listItem}
      >
        <View style={styles.linkItemView}>
          <Text style={styles.linkTextRoot}>
            {searchStartIndex > -1
              && (
              <Text numberOfLines={1} style={styles.linkNormalText}>
                {text.substr(0, searchStartIndex)}
              </Text>
              )
            }
            {searchEndIndex > 0
              && (
              <Text numberOfLines={1} style={styles.linkBoldText}>
                {text.substr(searchStartIndex, searchEndIndex).substr(0, searchText.length)}
              </Text>
              )
            }
            {searchStartIndex + searchEndIndex === 0
              ? (
                <Text numberOfLines={1} style={[styles.linkNormalText, { color: colors.blue }]}>
                  {text}
                </Text>
              )
              : (
                <Text numberOfLines={1} style={styles.linkNormalText}>
                  {text.substr(searchEndIndex, text.length)}
                </Text>
              )
            }

          </Text>
          <Image source={ChevronRightBlue} style={styles.linkIcon} />
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
    if (this.getFilteredSource().length === 0) return null;
    return (
      <View style={{
        borderTopWidth: 1, borderColor: colors.gray, height: 2, width: dySize(335)
      }}
      />
    );
  }

  render() {
    const {
      searchText, filterType, fileType, showFilter
    } = this.state;
    return (
      <Container style={styles.container}>
        <View style={styles.closeView}>
          <IconButton
            image={CloseCircle}
            color={colors.blue}
            imageSize={dySize(25)}
            onPress={() => NavigationService.goBack()}
          />
        </View>
        <Card style={styles.searchInputCard}>
          <View style={styles.searchView}>
            <TextInput
              placeholder={I18n.t('search_placeholder')}
              onChangeText={text => this.onChangeSearchText(text)}
              style={styles.searchInput}
              value={searchText}
            />
            <IconButton
              icon="ios-close"
              color={colors.blue}
              size={dySize(25)}
              onPress={() => this.setState({ searchText: '' })}
              style={{ paddingHorizontal: dySize(5) }}
            />
            <IconButton
              icon="ios-funnel"
              color={colors.blue}
              size={dySize(20)}
              onPress={() => this.toggleFilterView()}
            />
          </View>
        </Card>
        {
          showFilter
          && (
          <View style={{ padding: dySize(5) }}>
            <MyText text={I18n.t('filter_by')} fontSize={getFontSize(18)} color={colors.text} paddingVertical={10} paddingHorizontal={0} />
            <View style={styles.filterButtonView}>
              <Button
                text={I18n.t('all')}
                backgroundColor={filterType === 'all' ? colors.blue : 'transparent'}
                textColor={filterType === 'all' ? colors.lightgray : colors.blue}
                fontSize={14}
                style={styles.filterButton}
                width={dySize(50)}
                onPress={() => this.onChangeFilterOption('all')}
              />
              <Button
                text={I18n.t('information_type')}
                backgroundColor={filterType === 'information' ? colors.blue : 'transparent'}
                textColor={filterType === 'information' ? colors.lightgray : colors.blue}
                fontSize={14}
                style={styles.filterButton}
                onPress={() => this.onChangeFilterOption('information')}
                icon="ios-arrow-down"
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
          )
        }
        <FlatList
          data={this.getFilteredSource()}
          renderItem={this._renderItem.bind(this)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: dySize(30), alignItems: 'center' }}
          ListEmptyComponent={this._renderEmptyView.bind(this)}
          ListFooterComponent={this._renderFooterView.bind(this)}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearchScreen);
