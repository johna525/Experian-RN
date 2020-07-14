/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { colors } from '../../theme/colors';
import {
  MyText, Button, ImageBackground, IconButton
} from '../../components';
import { dySize, getFontSize } from '../../libs/responsive';
import NavigationService from '../../navigation/NavigationService';
import {
  Avatar, Camera, SearchIconWhite, ChevronRightBlue
} from '../../assets/images';
import I18n from '../../i18n/i18n';
import { GoogleTracker } from '../../libs/providers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  content: {
    flex: 1,
    padding: dySize(20)
  },
  avatarSection: {
    marginTop: dySize(-50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarView: {
    width: dySize(130),
    height: dySize(130),
    borderRadius: dySize(65),
    overflow: 'hidden'
  },
  cameraView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.red,
    borderRadius: dySize(15),
    width: dySize(30),
    height: dySize(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  listView: {
    borderBottomWidth: 1,
    borderColor: colors.text
  },
  listItemView: {
    borderTopWidth: 1,
    borderColor: colors.text
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  header: {
    height: dySize(150),
    backgroundColor: colors.blue,
    paddingTop: isIphoneX() ? dySize(44) : dySize(20),
    borderBottomWidth: 3,
    borderColor: colors.red
  },
  topHeader: {
    height: dySize(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: Avatar
    };
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onChangeAvatar = () => {
    const options = {
      title: I18n.t('select_avatar'),
      customButtons: [{ name: 'fb', title: I18n.t('photo_from_facebook') }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        GoogleTracker.trackEvent('Account Tab', 'Changed avatar');
        this.setState({
          avatar: source,
        });
      }
    });
  }

  render() {
    const { user_decoded } = this.props;
    return (
      <Container style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topHeader}>
            <IconButton
              image={null}
              color={colors.lightgray}
              onPress={() => console.log('')}
            />
            <MyText text={I18n.t('tab_account')} color={colors.lightgray} textAlign="center" />
            <IconButton
              image={SearchIconWhite}
              color={colors.lightgray}
              imageSize={dySize(20)}
              onPress={() => this.onSearch()}
            />
          </View>
        </View>
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <ImageBackground source={this.state.avatar} style={styles.avatarView} />
            <View style={styles.cameraView}>
              <IconButton
                image={Camera}
                size={getFontSize(12)}
                color={colors.lightgray}
                onPress={() => this.onChangeAvatar()}
              />
            </View>
          </View>
          <MyText text={user_decoded.name} color={colors.blue} fontSize={25} />
        </View>
        <View style={styles.content}>
          <View style={styles.listView}>
            <Button
              image={ChevronRightBlue}
              text={I18n.t('personal_details')}
              backgroundColor="transparent"
              textColor={colors.blue}
              style={styles.listItemView}
              fontSize={16}
              onPress={() => NavigationService.navigate('ACCOUNT_PERSONAL_DETAIL')}
            />
            <Button
              image={ChevronRightBlue}
              text={I18n.t('change_region_language')}
              backgroundColor="transparent"
              textColor={colors.blue}
              style={styles.listItemView}
              fontSize={16}
              onPress={() => NavigationService.navigate('ACCOUNT_REGION_LANGUAGE')}
            />
            <Button
              image={ChevronRightBlue}
              text={I18n.t('settings')}
              backgroundColor="transparent"
              textColor={colors.blue}
              style={styles.listItemView}
              fontSize={16}
              onPress={() => NavigationService.navigate('ACCOUNT_SETTINGS')}
            />
            <Button
              image={ChevronRightBlue}
              text={I18n.t('tab_notification')}
              backgroundColor="transparent"
              textColor={colors.blue}
              style={styles.listItemView}
              fontSize={16}
              onPress={() => NavigationService.navigate('ACCOUNT_NOTIFICATIONS')}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              backgroundColor={colors.blue}
              textColor={colors.lightgray}
              text={I18n.t('logout')}
              onPress={() => {
                GoogleTracker.trackEvent('Account Tab', 'Clicked log out button');
                NavigationService.navigate('WELCOME', { refresh: true });
              }}
            />
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user_decoded: state.authReducer.user_decoded
});

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
