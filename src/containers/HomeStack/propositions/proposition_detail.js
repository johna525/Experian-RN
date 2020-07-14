/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header } from 'native-base';
import * as _ from 'lodash';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { isIphoneX, ifIphoneX } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../theme/colors';
import { dySize, getFontSize } from '../../../libs/responsive';
import NavigationService from '../../../navigation/NavigationService';
import { clarifyText } from '../../../libs/operators';
import PropositionOverview from './overview';
import PropositionHowItWorks from './howitworks';
import PropositionQuickLinks from './quicklinks';
import { notificationActions } from '../../../redux/actions';
import I18n from '../../../i18n/i18n';
import {
  ArrowLeftWhite, ArrowLeftBlue, FlagBlueInfill, FlagBlueOutline, SearchIconBlue, FlagWhiteInfill, FlagWhiteOutline, SearchIconWhite
} from '../../../assets/images';
import {
  MyText, IconButton, ImageBackground, CenterLineView, Button
} from '../../../components';
import { GoogleTracker } from '../../../libs/providers';

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
    borderBottomWidth: 1,
    borderColor: 'lightgray'
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
    marginTop: 1,
    height: dySize(50),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgray'
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
  tabContent: {
    padding: dySize(20)
  },
  linearGradient: {
    height: dySize(150),
  },
});

class PropositionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: {
        index: 0,
        routes: [
          { key: 'first', title: I18n.t('overview') },
          { key: 'second', title: I18n.t('how_it_works') },
          { key: 'third', title: I18n.t('quick_links') },
        ],
      },
      visiableHeader: false,
    };
  }

  onBookmark = (proposition) => {
    if (this.isFlagged()) GoogleTracker.trackEvent('Proposition Detail Screen', 'Removed bookmark');
    else GoogleTracker.trackEvent('Proposition Detail Screen', 'Added bookmark');
    this.props.toggleFlag(proposition);
  }

  isFlagged = () => {
    const _this = this;
    const filtered = _.filter(this.props.flagPropositions, o => o.id === _this.props.selectedProposition.id);
    return filtered.length > 0;
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onChangeIndex = (index) => {
    const { tabState } = this.state;
    this.setState({ tabState: { ...tabState, index } });
    this.refs.parallax.scrollTo({ y: 0, animated: false });
    if (index === 0) GoogleTracker.trackEvent('Proposition Detail Screen', 'Selected overview tab');
    if (index === 1) GoogleTracker.trackEvent('Proposition Detail Screen', 'Selected how it works tab');
    if (index === 0) GoogleTracker.trackEvent('Proposition Detail Screen', 'Selected quicklinks tab');
  }

  _renderTapButtons = () => {
    const { tabState } = this.state;
    return (
      <View style={styles.stickyTabView}>
        <View style={{ flex: 1 }}>
          <Button
            height={dySize(49)}
            backgroundColor={colors.white}
            textColor={colors.text}
            text="Overview"
            fontSize={getFontSize(16)}
            onPress={() => this.onChangeIndex(0)}
            style={{
              borderBottomWidth: tabState.index === 0 ? 3 : 0,
              borderColor: colors.red,
              borderRadius: 0
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            height={dySize(49)}
            backgroundColor={colors.white}
            textColor={colors.text}
            text="How it works"
            fontSize={getFontSize(16)}
            onPress={() => this.onChangeIndex(1)}
            style={{
              borderBottomWidth: tabState.index === 1 ? 3 : 0,
              borderColor: colors.red,
              borderRadius: 0
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            height={dySize(49)}
            backgroundColor={colors.white}
            textColor={colors.text}
            text="Quick links"
            fontSize={getFontSize(16)}
            onPress={() => this.onChangeIndex(2)}
            style={{
              borderBottomWidth: tabState.index === 2 ? 3 : 0,
              borderColor: colors.red,
              borderRadius: 0
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    const { tabState, visiableHeader } = this.state;
    const { selectedProposition } = this.props;
    return (
      <Container style={styles.container}>
        <ParallaxScrollView
          ref="parallax"
          backgroundColor={colors.lightgray}
          contentBackgroundColor={colors.lightgray}
          parallaxHeaderHeight={dySize(200)}
          fadeOutForeground
          stickyHeaderHeight={visiableHeader ? (isIphoneX() ? dySize(154) : dySize(130)) : 0}
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
                    {clarifyText(selectedProposition.title.rendered)}
                  </Text>
                  <CenterLineView>
                    <IconButton
                      image={this.isFlagged() ? FlagBlueInfill : FlagBlueOutline}
                      color={colors.blue}
                      imageSize={getFontSize(20)}
                      onPress={() => this.onBookmark(selectedProposition)}
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
              <View style={{ marginTop: isIphoneX() ? dySize(18) : 0 }}>
                {this._renderTapButtons()}
              </View>
            </View>
          )}
          renderForeground={() => (
            <View>
              <View style={styles.topImageView}>
                <MyText
                  text={clarifyText(selectedProposition.title.rendered)}
                  color={colors.lightgray}
                  textAlign="center"
                  style={{ fontWeight: 'bold', width: dySize(300) }}
                  numberOfLines={2}
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
                        onPress={() => this.onBookmark(selectedProposition)}
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
            <ImageBackground source={{ uri: selectedProposition.acf.background_image }} style={styles.topImage}>
              <LinearGradient
                colors={['rgba(20, 20, 20, 1)', 'rgba(20, 20, 20, 0)']}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
                style={styles.linearGradient}
              />
            </ImageBackground>
          )}
        >
          {visiableHeader || this._renderTapButtons()}
          {tabState.index === 0 && <PropositionOverview />}
          {tabState.index === 1 && <PropositionHowItWorks />}
          {tabState.index === 2 && <PropositionQuickLinks />}
        </ParallaxScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  selectedProposition: state.homeReducer.selectedProposition,
  flagPropositions: state.notificationReducer.flagPropositions
});

const mapDispatchToProps = ({
  toggleFlag: notificationActions.toggleFlag,
});

export default connect(mapStateToProps, mapDispatchToProps)(PropositionDetail);
