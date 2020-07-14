/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import Stars from 'react-native-stars';
import AutoHeightWebView from 'react-native-autoheight-webview';

import { colors } from '../../../theme/colors';
import {
  MyText, Button, ImageBackground
} from '../../../components';
import { dySize, getFontSize } from '../../../libs/responsive';
import NavigationService from '../../../navigation/NavigationService';
import { cardBack1, StarFilled, StarOutline } from '../../../assets/images';
import { GoogleTracker } from '../../../libs/providers';
import { convertHTML } from '../../../libs/operators';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    marginTop: dySize(20)
  },
  accessView: {
    padding: dySize(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dySize(10),
    overflow: 'hidden',
    marginVertical: dySize(40),
    marginHorizontal: dySize(20),
  },
  rateView: {
    backgroundColor: colors.white,
    padding: dySize(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  helpView: {
    padding: dySize(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  startIcon: {
    resizeMode: 'contain',
    width: dySize(30),
    height: dySize(30)
  }
});

class PropositionOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }

  accessTraningMaterial = () => {
    GoogleTracker.trackEvent('Overview Tab', 'Clicked "Access Training Material" button');
  }

  onUpdateStart = (count) => {
    this.setState({ stars: count });
    GoogleTracker.trackEvent('Overview Tab', `Selected ${count} star${count > 1 ? '' : 's'}`);
  }

  onPressContract = () => {
    GoogleTracker.trackEvent('Overview Tab', 'Clicked contact button');
    NavigationService.navigate('Help');
  }

  onPressFAQ = () => {
    GoogleTracker.trackEvent('Overview Tab', 'Clicked FAQ button');
    NavigationService.navigate('HELP_FAQ');
  }

  render() {
    const { height } = this.state;
    const { selectedProposition } = this.props;
    return (
      <View style={styles.container}>
        <MyText color={colors.blue} fontSize={24} paddingVertical={dySize(10)} paddingHorizontal={dySize(20)} text="Overview" />
        <AutoHeightWebView
          style={{ width: dySize(335), height, marginHorizontal: dySize(20) }}
          onSizeUpdated={size => this.setState({ height: size.height + 50 })}
          source={{ html: convertHTML(selectedProposition.acf.overview) }}
          scalesPageToFit={false}
        />
        {/* <ImageBackground source={cardBack1} opacity={0.6} style={styles.accessView}>
          <MyText
            color={colors.lightgray}
            fontSize={15}
            text="Training centre"
          />
          <MyText
            color={colors.lightgray}
            fontSize={12}
            text="Lorem ipsum dolor sit meris doloris aventls Lorem ipsum"
            style={{ width: dySize(200) }}
            textAlign="center"
            paddingVertical={20}
          />
          <Button
            backgroundColor={colors.red}
            text="Access training material"
            width={dySize(200)}
            height={dySize(40)}
            fontSize={getFontSize(15)}
            onPress={() => this.accessTraningMaterial()}
          />
        </ImageBackground> */}
        <View style={styles.rateView}>
          <MyText color={colors.blue} paddingVertical={20} fontSize={24} textAlign="center" text="Did you find this page useful?" />
          <Stars
            default={0}
            update={val => this.onUpdateStart(val)}
            spacing={dySize(15)}
            count={5}
            fullStar={<Image source={StarFilled} style={styles.startIcon} />}
            emptyStar={<Image source={StarOutline} style={styles.startIcon} />}
          />
          <Button
            backgroundColor="transparent"
            text="Leave feedback >"
            textColor={colors.blue}
            fontSize={getFontSize(18)}
            onPress={() => NavigationService.navigate('HELP_FEEDBACK')}
          />
        </View>
        <View style={styles.helpView}>
          <MyText color={colors.blue} paddingVertical={20} fontSize={24} text="Need help?" />
          <Button
            text="Contact us here"
            onPress={() => this.onPressContract()}
            width={dySize(300)}
            style={{ marginBottom: dySize(20) }}
          />
          <Button
            text="Visit FAQs"
            onPress={() => this.onPressFAQ()}
            width={dySize(300)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedProposition: state.homeReducer.selectedProposition
});

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PropositionOverview);
