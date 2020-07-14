/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Container, Content } from 'native-base';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../../theme/colors';
import { dySize, getFontSize } from '../../../libs/responsive';
import NavigationService from '../../../navigation/NavigationService';
import I18n from '../../../i18n/i18n';
import { ArrowLeftBlue, TickCircle } from '../../../assets/images';
import {
  MyText, SBView, CustomHeader, Button
} from '../../../components';
import { fileTypeList } from '../../../libs/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  backIcon: {
    width: dySize(60),
  },
  listItem: {
    height: dySize(60),
    borderTopWidth: 1,
    borderColor: colors.gray,
    justifyContent: 'center'
  },
  checkIcon: {
    width: dySize(20),
    height: dySize(20),
    resizeMode: 'contain'
  }
});

export default class FileTypesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileType: this.props.navigation.state.params.fileType
    };
  }

  onSelectFileType = (fileType) => {
    this.setState({ fileType });
  }

  confirmFileType = () => {
    this.props.navigation.state.params.onSelect(this.state.fileType);
    NavigationService.goBack();
  }

  render() {
    const { fileType } = this.state;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('file_type')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
        />
        <Content contentContainerStyle={{ padding: dySize(30) }}>
          {
            fileTypeList.map(type => (
              <Ripple onPress={() => this.onSelectFileType(type)} rippleRadius={50} rippleDuration={400}>
                <View style={styles.listItem}>
                  <SBView>
                    <MyText text={type} color={colors.blue} fontSize={getFontSize(16)} />
                    { fileType === type && <Image source={TickCircle} style={styles.checkIcon} />}
                  </SBView>
                </View>
              </Ripple>
            ))
          }
          <View style={{ borderTopWidth: 1, borderColor: colors.gray, height: 2 }} />
        </Content>
        <Button text={I18n.t('done')} style={{ margin: dySize(20) }} onPress={() => this.confirmFileType()} />
      </Container>
    );
  }
}
