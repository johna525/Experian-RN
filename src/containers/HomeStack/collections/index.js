/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../../theme/colors';
import { MyText, CustomHeader } from '../../../components';
import { dySize } from '../../../libs/responsive';
import NavigationService from '../../../navigation/NavigationService';
import { CollectionList } from '../../../libs/constants';
import I18n from '../../../i18n/i18n';
import { ArrowLeftBlue, SearchIconBlue } from '../../../assets/images';
import { homeActions } from '../../../redux/actions';
import { GoogleTracker } from '../../../libs/providers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  collectionView: {
    flex: 1,
    paddingHorizontal: dySize(10),
    paddingBottom: dySize(10),
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  collectionItemView: {
    margin: dySize(10),
    width: dySize(157),
    height: dySize(140),
    backgroundColor: colors.blue,
    borderRadius: 4,
  },
  collectionItemInnerView: {
    width: dySize(157),
    height: dySize(140),
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionImage: {
    width: dySize(50),
    height: dySize(50),
    resizeMode: 'contain'
  }
});

class AllCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onSearch = () => {
    NavigationService.navigate('HOME_SEARCH');
  }

  onSelectCollection = (index) => {
    GoogleTracker.trackEvent('Sales Assets Screen', 'Clicked a collection', null, { category: CollectionList[index].title });
    NavigationService.navigate('COLLECTION_DETAIL', { index });
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          title={I18n.t('collections')}
          leftImage={ArrowLeftBlue}
          onPressLeft={() => NavigationService.goBack()}
          rightImage={SearchIconBlue}
          onPressRight={() => this.onSearch()}
        />
        <Content contentContainerStyle={{ paddingTop: 10 }}>
          <MyText color={colors.text} fontSize={16} textAlign="center" paddingVertical={dySize(10)} text={I18n.t('collections_title')} />
          <View style={styles.collectionView}>
            {
              CollectionList.map((collection, index) => (
                <View style={styles.collectionItemView} key={collection.title}>
                  <Ripple onPress={() => this.onSelectCollection(index)} rippleRadius={150} rippleDuration={400}>
                    <View style={styles.collectionItemInnerView}>
                      <Image source={collection.image} style={styles.collectionImage} />
                      <MyText text={I18n.t(collection.title.toLowerCase().replace(' ', '_'))} color={colors.white} fontSize={16} textAlign="center" />
                    </View>
                  </Ripple>
                </View>
              ))
            }
          </View>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = ({
  fetchQuickLinks: homeActions.fetchQuickLinks
});

export default connect(undefined, mapDispatchToProps)(AllCollection);
