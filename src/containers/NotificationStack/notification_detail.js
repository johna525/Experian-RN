/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { isIphoneX, ifIphoneX } from 'react-native-iphone-x-helper';
import * as _ from 'lodash';

import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';
import NavigationService from '../../navigation/NavigationService';
import { clarifyText, convertHTML } from '../../libs/operators';
import {
  ArrowLeftWhite, ArrowLeftBlue, SearchIconBlue, SearchIconWhite, cardBack1
} from '../../assets/images';
import {
  MyText, IconButton, ImageBackground, CenterLineView
} from '../../components';

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

class NotificationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiableHeader: false,
      height: 0,
      notification: this.props.navigation.state.params.notification
    };
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  render() {
    const { visiableHeader, height, notification } = this.state;
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
                    {clarifyText(notification.title.rendered)}
                  </Text>
                  <CenterLineView>
                    {/* <IconButton
                      image={this.isFlagged() ? FlagBlueInfill : FlagBlueOutline}
                      color={colors.blue}
                      imageSize={getFontSize(20)}
                      onPress={() => this.onBookmark(selectedExperian)}
                    /> */}
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
                  text={clarifyText(notification.title.rendered)}
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
                      {/* <IconButton
                        image={this.isFlagged() ? FlagWhiteInfill : FlagWhiteOutline}
                        color={colors.lightgray}
                        imageSize={getFontSize(20)}
                        onPress={() => this.onBookmark(selectedExperian)}
                      /> */}
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
            <ImageBackground source={notification.better_featured_image === null ? cardBack1 : { uri: notification.better_featured_image.source_url }} opacity={0.3} style={styles.topImage} />
          )}
        >
          <AutoHeightWebView
            style={{ width: dySize(335), height, margin: dySize(20) }}
            onSizeUpdated={size => this.setState({ height: size.height + 50 })}
            source={{ html: convertHTML(notification.content.rendered) }}
            scalesPageToFit={false}
          />
        </ParallaxScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notificationReducer.notifications,
});

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDetail);
