import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { colors } from '../../theme/colors';
import { dySize, getFontSize } from '../../libs/responsive';
import { SBView, MyText, CustomHeader } from '../../components';
import NavigationService from '../../navigation/NavigationService';
import I18n from '../../i18n/i18n';
import { ArrowLeftBlue, SearchIconBlue, ChevronRightBlue } from '../../assets/images';

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
    borderTopWidth: 1,
    borderColor: colors.gray,
    paddingVertical: dySize(10)
  },
  lineIcon: {
    width: dySize(15),
    height: dySize(15),
    resizeMode: 'contain'
  }
};

class PersonalDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  getSurName = (name) => {
    const array = name.split(' ');
    return array[array.length - 1];
  }

  render() {
    const { user_decoded } = this.props;
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('personal_details')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />
        <Content contentContainerStyle={styles.content}>
          <SBView style={styles.lineView}>
            <View>
              <MyText color={colors.text} fontSize={12} paddingVertical={0} text={I18n.t('title')} />
              <MyText color={colors.blue} fontSize={getFontSize(16)} paddingVertical={0} text="Mr" />
            </View>
            {/* <Image source={ChevronRightBlue} style={styles.lineIcon} /> */}
          </SBView>
          <SBView style={styles.lineView}>
            <View>
              <MyText color={colors.text} fontSize={12} paddingVertical={0} text={I18n.t('name')} />
              <MyText color={colors.blue} fontSize={getFontSize(16)} paddingVertical={0} text={user_decoded.name} />
            </View>
            {/* <Image source={ChevronRightBlue} style={styles.lineIcon} /> */}
          </SBView>
          <SBView style={styles.lineView}>
            <View>
              <MyText color={colors.text} fontSize={12} paddingVertical={0} text={I18n.t('surname')} />
              <MyText color={colors.blue} fontSize={getFontSize(16)} paddingVertical={0} text={this.getSurName(user_decoded.name)} />
            </View>
            {/* <Image source={ChevronRightBlue} style={styles.lineIcon} /> */}
          </SBView>
          <SBView style={styles.lineView}>
            <View>
              <MyText color={colors.text} fontSize={12} paddingVertical={0} text={I18n.t('email')} />
              <MyText color={colors.blue} fontSize={getFontSize(16)} paddingVertical={0} text={user_decoded.email} />
            </View>
            {/* <Image source={ChevronRightBlue} style={styles.lineIcon} /> */}
          </SBView>
          <SBView style={styles.lineView}>
            <View>
              <MyText color={colors.text} fontSize={12} paddingVertical={0} text={I18n.t('phone_number')} />
              <MyText color={colors.blue} fontSize={getFontSize(16)} paddingVertical={0} text="+44(0) 7732 055698" />
            </View>
            {/* <Image source={ChevronRightBlue} style={styles.lineIcon} /> */}
          </SBView>
          <SBView style={styles.lineView}>
            <View>
              <MyText color={colors.text} fontSize={12} paddingVertical={0} text={I18n.t('job_title')} />
              <MyText color={colors.blue} fontSize={getFontSize(16)} paddingVertical={0} text="Sales manager" />
            </View>
            {/* <Image source={ChevronRightBlue} style={styles.lineIcon} /> */}
          </SBView>
          <SBView style={styles.lineView} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user_decoded: state.authReducer.user_decoded
});

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetailScreen);
