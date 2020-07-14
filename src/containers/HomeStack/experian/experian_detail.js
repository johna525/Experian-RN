/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { isIphoneX, ifIphoneX } from 'react-native-iphone-x-helper';
import * as _ from 'lodash';

import { colors } from '../../../theme/colors';
import { dySize, getFontSize } from '../../../libs/responsive';
import NavigationService from '../../../navigation/NavigationService';
import { clarifyText, convertHTML } from '../../../libs/operators';
import { notificationActions } from '../../../redux/actions';
import { GoogleTracker } from '../../../libs/providers';
import {
  ArrowLeftWhite, ArrowLeftBlue, FlagBlueInfill, FlagBlueOutline, SearchIconBlue, FlagWhiteInfill, FlagWhiteOutline, SearchIconWhite
} from '../../../assets/images';
import {
  MyText, IconButton, ImageBackground, CenterLineView
} from '../../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  topImage: {
    height: dySize(200),
    width: dySize(375),
    resizeMode: 'cover',
  },
  topImageView: {
    height: dySize(200),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...ifIphoneX({
      paddingTop: dySize(30)
    }, {
      paddingTop: dySize(0)
    })
  },
  headerContainer: {
    height: dySize(60),
    backgroundColor: colors.white,
  },
  stickyHeaderView: {
    width: dySize(375),
    height: dySize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dySize(10),
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderColor: colors.gray
  },
  headerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dySize(10),
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0
  },
  stickyTabView: {
    height: dySize(50),
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: colors.gray
  },
  stickyHeaderText: {
    flex: 1,
    color: colors.blue,
    paddingLeft: dySize(40),
    fontSize: getFontSize(16),
    textAlign: 'center'
  },
  content: {
    flex: 1
  },
});

class ExperianDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiableHeader: false,
      height: 0
    };
  }

  onBookmark = (experian) => {
    if (this.isFlagged()) GoogleTracker.trackEvent('Experian Detail Screen', 'Removed bookmark');
    else GoogleTracker.trackEvent('Experian Detail Screen', 'Added bookmark');
    this.props.toggleFlag(experian);
  }

  isFlagged = () => {
    const _this = this;
    const filtered = _.filter(this.props.flagExperians, o => o.id === _this.props.selectedExperian.id);
    return filtered.length > 0;
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  render() {
    const { visiableHeader, height } = this.state;
    const { selectedExperian } = this.props;
    return (
      <Container style={styles.container}>
        <ParallaxScrollView
          ref="parallax"
          backgroundColor={colors.lightgray}
          contentBackgroundColor={colors.lightgray}
          parallaxHeaderHeight={dySize(200)}
          fadeOutForeground
          stickyHeaderHeight={visiableHeader ? (isIphoneX() ? dySize(104) : dySize(80)) : 0}
          onChangeHeaderVisibility={(visible) => {
            this.setState({ visiableHeader: !visible });
          }}
          renderStickyHeader={() => (
            <View style={{ zIndex: 100 }}>
              <Header style={styles.headerContainer}>
                <View style={styles.stickyHeaderView}>
                  <IconButton
                    image={ArrowLeftBlue}
                    color={colors.blue}
                    imageSize={getFontSize(20)}
                    onPress={() => NavigationService.goBack()}
                  />
                  <Text style={styles.stickyHeaderText} numberOfLines={1}>
                    {clarifyText(selectedExperian.title.rendered)}
                  </Text>
                  <CenterLineView>
                    <IconButton
                      image={this.isFlagged() ? FlagBlueInfill : FlagBlueOutline}
                      color={colors.blue}
                      imageSize={getFontSize(20)}
                      onPress={() => this.onBookmark(selectedExperian)}
                    />
                    <IconButton
                      image={SearchIconBlue}
                      color={colors.blue}
                      imageSize={getFontSize(20)}
                      onPress={() => this.onSearch()}
                    />
                  </CenterLineView>
                </View>
              </Header>
            </View>
          )}
          renderForeground={() => (
            <View>
              <View style={styles.topImageView}>
                <MyText
                  text={clarifyText(selectedExperian.title.rendered)}
                  color={colors.lightgray}
                  textAlign="center"
                  style={{ fontWeight: 'bold', width: dySize(300) }}
                />
              </View>
              {!visiableHeader
                && (
                <View style={styles.headerView}>
                  <Header style={styles.headerInnerView}>
                    <IconButton
                      image={ArrowLeftWhite}
                      color={colors.lightgray}
                      imageSize={getFontSize(20)}
                      onPress={() => NavigationService.goBack()}
                    />
                    <CenterLineView>
                      <IconButton
                        image={this.isFlagged() ? FlagWhiteInfill : FlagWhiteOutline}
                        color={colors.lightgray}
                        imageSize={getFontSize(20)}
                        onPress={() => this.onBookmark(selectedExperian)}
                      />
                      <IconButton
                        image={SearchIconWhite}
                        color={colors.lightgray}
                        imageSize={getFontSize(20)}
                        onPress={() => this.onSearch()}
                      />
                    </CenterLineView>
                  </Header>
                </View>
                )
              }
            </View>
          )}
          renderBackground={() => (
            <ImageBackground source={{ uri: selectedExperian.acf.background_image }} opacity={0.3} style={styles.topImage} />
          )}
        >
          <AutoHeightWebView
            style={{ width: dySize(335), height, margin: dySize(20) }}
            onSizeUpdated={size => this.setState({ height: size.height + 50 })}
            source={{ html: convertHTML(selectedExperian.acf.content) }}
            scalesPageToFit={false}
          />
        </ParallaxScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  selectedExperian: state.homeReducer.selectedExperian,
  flagExperians: state.notificationReducer.flagExperians
});

const mapDispatchToProps = ({
  toggleFlag: notificationActions.toggleFlag,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperianDetail);
