import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container, Content } from 'native-base';
import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';
import {
  MyText, CustomHeader, Button, PickerSelect
} from '../../components';
import NavigationService from '../../navigation/NavigationService';
import { showToast } from '../../libs/operators';
import I18n from '../../i18n/i18n';
import { ArrowLeftBlue, SearchIconBlue } from '../../assets/images';
import { GoogleTracker } from '../../libs/providers';

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  content: {
    padding: dySize(30),
    paddingTop: dySize(60)
  },
  lineView: {
    paddingVertical: dySize(10)
  },
  lineIcon: {
    fontSize: getFontSize(20),
    color: colors.blue
  }
};

export default class RegionLanguageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      original_language: '',
      region: '',
      original_region: ''
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('locale');
      if (value !== null) {
        // We have data!!
        this.setState({ language: value, original_language: value });
      } else {
        this.setState({ language: 'en', original_language: 'en' });
      }
    } catch (error) {
      // Error retrieving data
    }
    try {
      const value = await AsyncStorage.getItem('region');
      if (value !== null) {
        // We have data!!
        this.setState({ region: value, original_region: value });
      } else {
        this.setState({ region: 'Europe', original_region: 'Europe' });
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onChangeLanguage = (language) => {
    this.setState({ language });
  }

  onChangeRegion = (region) => {
    this.setState({ region });
    GoogleTracker.trackEvent('Region Language Screen', 'Change region', null, { region });
  }

  saveRegionAndLanguage = async () => {
    const { language, region } = this.state;
    try {
      await AsyncStorage.setItem('locale', language);
      await AsyncStorage.setItem('region', region);
      showToast(I18n.t('saved'), { long: true, position: 'center' });
      I18n.locale = language;
      GoogleTracker.trackEvent('Region Language Screen', 'Changed language', null, { language });
    } catch (error) {
      // Error saving data
      alert('Error occurred');
    }
  }

  render() {
    const {
      language, original_language, region, original_region
    } = this.state;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('change_region_language')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />
        <Content contentContainerStyle={styles.content}>
          <View style={styles.lineView} />
          <PickerSelect
            data={I18n.t('region_list')}
            value={region}
            placeholder={I18n.t('current_region')}
            onValueChange={this.onChangeRegion}
          />

          <PickerSelect
            data={I18n.t('language_list')}
            value={language}
            placeholder={I18n.t('current_language')}
            onValueChange={this.onChangeLanguage}
          />

          <MyText color={colors.text} fontSize={12} paddingHorizontal={0} paddingVertical={20} text="Plesae log out to apply the changed language." />

        </Content>
        {
          (language !== original_language || region !== original_region)
          && (
          <Button
            backgroundColor={colors.blue}
            text={I18n.t('save_details')}
            color={colors.lightgray}
            width={dySize(315)}
            style={{ margin: dySize(30) }}
            onPress={this.saveRegionAndLanguage}
          />
          )
        }
      </Container>
    );
  }
}
