import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';
import { MyText, CustomHeader } from '../../components';
import NavigationService from '../../navigation/NavigationService';
import I18n from '../../i18n/i18n';
import { ArrowLeftBlue, SearchIconBlue } from '../../assets/images';
import { convertHTML } from '../../libs/operators';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  content: {
    padding: dySize(20),
  },
});

export default class FAQDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onSelectFAQ = (faq) => {
    NavigationService.navigate('HELP_FAQ_DETAIL', { faq });
  }

  render() {
    const { height } = this.state;
    const { faq } = this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('faqs')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />
        <Content contentContainerStyle={styles.content}>
          <MyText color={colors.blue} fontSize={getFontSize(16)} text={faq.title.rendered} style={{ paddingVertical: dySize(10), fontFamily: 'Roboto-Bold' }} />
          <MyText color={colors.text} fontSize={getFontSize(16)} text={faq.acf.answer} style={{ paddingVertical: dySize(5) }} />
        </Content>
      </Container>
    );
  }
}
