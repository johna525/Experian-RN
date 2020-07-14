

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Card } from 'native-base';
import * as _ from 'lodash';
import Ripple from 'react-native-material-ripple';
import { dySize, getFontSize } from '../../libs/responsive';
import { colors } from '../../theme/colors';
import { Button, MyText } from '../../components';
import { notificationActions, homeActions } from '../../redux/actions';
import I18n from '../../i18n/i18n';
import { TickBlueCircle, FlagWhiteInfill } from '../../assets/images';
import NavigationService from '../../navigation/NavigationService';
import { GoogleTracker } from '../../libs/providers';

const styles = StyleSheet.create({
  container: {
    paddingVertical: dySize(20),
    backgroundColor: colors.lightgray
  },
  buttonListView: {
    maxHeight: dySize(40),
  },
  buttonListInnerView: {
    paddingHorizontal: dySize(20)
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 4,
    marginLeft: 20,
    paddingHorizontal: dySize(20)
  },
  card: {
    flexDirection: 'row',
    height: dySize(100),
    position: 'relative',
  },
  listInfoViefw: {
    flex: 1,
    padding: dySize(10)
  },
  imageWrapper: {
    width: dySize(120),
    height: dySize(100),
    position: 'relative'
  },
  image: {
    width: dySize(120),
    height: dySize(100),
    resizeMode: 'cover'
  },
  checkIconView: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: dySize(30),
    height: dySize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: dySize(24),
    height: dySize(24),
    resizeMode: 'contain'
  },
  flagIcon: {
    position: 'absolute',
    top: dySize(10),
    left: dySize(10),
    width: dySize(20),
    height: dySize(20),
    resizeMode: 'contain'
  },
});

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectable: false,
      selectedArray: []
    };
  }

  toggleSelect = () => {
    const { selectable } = this.state;
    if (selectable) this.setState({ selectedArray: [] });
    this.setState({ selectable: !selectable });
    GoogleTracker.trackEvent('Favourites Tab', 'Toggle select button');
  }

  deleteSelected = () => {
    this.props.deleteFavourites(this.state.selectedArray);
    this.setState({ selectedArray: [] });
    GoogleTracker.trackEvent('Favourites Tab', 'Deleted some favourites');
  }

  deleteAll = () => {
    this.props.deleteAllFavourites();
    GoogleTracker.trackEvent('Favourites Tab', 'Deleted all favourites');
  }

  onSelectFavourite = (item) => {
    const { selectable, selectedArray } = this.state;
    if (!selectable) {
      // go to detail page
      if (item.type === 'propositions') {
        this.props.setPropositionDetail(item);
        NavigationService.navigate('PROPOSITION_DETAIL');
      } else {
        this.props.setExperianDetail(item);
        NavigationService.navigate('EXPERIAN_DETAIL');
      }
      return;
    }
    const filtered = _.filter(selectedArray, o => o.id !== item.id);
    if (filtered.length === selectedArray.length) {
      filtered.push(item);
    }
    this.setState({ selectedArray: filtered });
    GoogleTracker.trackEvent('Favourites Tab', 'Select or deselect a favourite');
  }

  isSelected = (item) => {
    const filtered = _.filter(this.state.selectedArray, o => o.id === item.id);
    return filtered.length > 0;
  }

  _renderItem = ({ item }) => {
    const isSelected = !(this.state.selectedArray.indexOf(item.id) < 0);
    return (
      <View style={{ marginBottom: dySize(10) }}>
        {
          this.state.selectable
          && (
          <MyText
            text={I18n.t('select')}
            color={colors.blue}
            fontSize={12}
            textAlign="right"
          />
          )
        }
        <Ripple
          onPress={() => this.onSelectFavourite(item)}
          rippleDuration={400}
          rippleCentered
        >
          <Card style={[styles.card, { opacity: isSelected ? 0.8 : 1 }]}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.acf.background_image }} style={styles.image} />
              <Image source={FlagWhiteInfill} style={styles.flagIcon} />
            </View>
            <View style={styles.listInfoViefw}>
              <MyText
                text={item.title.rendered}
                color={colors.blue}
                fontSize={getFontSize(14)}
                paddingVertical={dySize(0)}
                numberOfLines={1}
                style={{ fontWeight: 'bold' }}
              />
              <MyText
                text={item.acf.description === undefined ? 'No description' : item.acf.description}
                color={colors.text}
                fontSize={getFontSize(12)}
                numberOfLines={3}
              />
            </View>
            {
              this.isSelected(item)
              && (
              <View style={styles.checkIconView}>
                <Image source={TickBlueCircle} style={styles.checkIcon} />
              </View>
              )
            }
          </Card>
        </Ripple>
      </View>
    );
  }

  _renderEmptyView = () => (
    <MyText
      text={I18n.t('favourites_empty')}
      color={colors.gray}
      fontSize={16}
      style={{ marginTop: dySize(200) }}
      textAlign="center"
    />
  )

  render() {
    const { selectable, selectedArray } = this.state;
    const { flagExperians, flagPropositions } = this.props;
    return (
      <Container style={styles.container}>
        {
          flagExperians.length + flagPropositions.length > 0
          && (
          <ScrollView
            horizontal
            contentContainerStyle={styles.buttonListInnerView}
            style={styles.buttonListView}
            showsHorizontalScrollIndicator={false}
          >
            <Button
              text={selectable ? I18n.t('cancel') : I18n.t('select')}
              height={dySize(30)}
              backgroundColor={colors.blue}
              onPress={() => this.toggleSelect()}
              fontSize={12}
              style={{ paddingHorizontal: dySize(20) }}
            />
            {
              selectable && selectedArray.length > 0
              && (
              <Button
                text={I18n.t('delete_selected')}
                height={dySize(30)}
                textColor={colors.blue}
                backgroundColor="transparent"
                fontSize={12}
                style={styles.deleteButton}
                onPress={() => this.deleteSelected()}
              />
              )
            }
            {
              selectable
              && (
              <Button
                text={I18n.t('delete_all')}
                height={dySize(30)}
                textColor={colors.blue}
                backgroundColor="transparent"
                fontSize={12}
                style={styles.deleteButton}
                onPress={() => this.deleteAll()}
              />
              )
            }
          </ScrollView>
          )
        }
        <FlatList
          contentContainerStyle={{ padding: dySize(20) }}
          data={flagExperians.concat(flagPropositions)}
          renderItem={this._renderItem.bind(this)}
          ListEmptyComponent={this._renderEmptyView.bind(this)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  flagExperians: state.notificationReducer.flagExperians,
  flagPropositions: state.notificationReducer.flagPropositions,
});

const mapDispatchToProps = ({
  setFavourites: notificationActions.setFavourites,
  deleteAllFavourites: notificationActions.deleteAllFavourites,
  deleteFavourites: notificationActions.deleteFavourites,
  setPropositionDetail: homeActions.setPropositionDetail,
  setExperianDetail: homeActions.setExperianDetail
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
