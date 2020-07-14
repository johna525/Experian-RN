import React from 'react';
import {
  View, FlatList, StyleSheet, Image, RefreshControl, Text
} from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';
import {
  SBView, MyText, CustomHeader, LottieIndicator
} from '../../components';
import NavigationService from '../../navigation/NavigationService';
import { FAQList } from '../../libs/constants';
import I18n from '../../i18n/i18n';
import { ArrowLeftBlue, SearchIconBlue, ChevronRightBlue } from '../../assets/images';
import { GoogleTracker } from '../../libs/providers';
import { homeActions } from '../../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  content: {
    // paddingHorizontal: dySize(30),
  },
  lineView: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    paddingVertical: dySize(10)
  },
  lineIcon: {
    width: dySize(15),
    height: dySize(15),
    resizeMode: 'contain'
  },
  sectionText: {
    marginHorizontal: dySize(20),
    backgroundColor: colors.lightgray,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  loadingView: {
    height: dySize(500),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class FAQScreen extends React.Component {
  componentDidMount() {
    this.props.fetchAllFaqs();
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onSelectFAQ = (faq) => {
    GoogleTracker.trackEvent('FAQs Screen', 'Clicked a question', null, { faq });
    NavigationService.navigate('HELP_FAQ_DETAIL', { faq });
  }

  _renderItem = ({ item }) => (
    <Ripple
      key={item.questionId}
      onPress={() => this.onSelectFAQ((item))}
      rippleDuration={400}
      rippleCentered
      style={{ marginHorizontal: dySize(20) }}
    >
      <SBView style={styles.lineView}>
        <View style={{ width: dySize(305) }}>
          <MyText color={colors.blue} fontSize={getFontSize(16)} text={item.title.rendered} />
        </View>
        <Image source={ChevronRightBlue} style={styles.lineIcon} />
      </SBView>
    </Ripple>
  )

  _renderSection = ({ section: { title } }) => (
    <View style={styles.sectionText}>
      <MyText
        color={colors.blue}
        paddingVertical={dySize(30)}
        fontSize={getFontSize(26)}
        text={I18n.t(title.toLowerCase().replace(' ', '_'))}
        style={{ fontFamily: 'Roboto-Light' }}
      />
    </View>
  )

  _renderEmptyView = () => (
    <View style={styles.loadingView}>
      {
      this.props.refreshing
        ? <LottieIndicator source={require('../../assets/svgs/indicator/data.json')} />
        : <Text style={{ color: colors.gray, textAlign: 'center', fontSize: getFontSize(16) }}>{I18n.t('no_results')}</Text>
    }
    </View>
  )

  render() {
    const { faqs } = this.props;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('faqs')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />

        <FlatList
          data={faqs}
          renderItem={this._renderItem.bind(this)}
          ListEmptyComponent={this._renderEmptyView.bind(this)}
          refreshControl={(
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={() => this.props.fetchAllFaqs()}
            />
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  faqs: state.homeReducer.faqs,
  refreshing: state.screenReducer.refreshing
});

const mapDispatchToProps = ({
  fetchAllFaqs: homeActions.fetchAllFaqs
});

export default connect(mapStateToProps, mapDispatchToProps)(FAQScreen);
