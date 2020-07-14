/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Container } from 'native-base';
import Swiper from 'react-native-swiper';
import { colors } from '../../theme/colors';
import { dySize } from '../../libs/responsive';
import { Step1 } from './step1';
import { Step2 } from './step2';
import Step3 from './step3';
import { Button } from '../../components';
import I18n from '../../i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray
  },
  prevButton: {
    position: 'absolute',
    left: 20,
    bottom: dySize(10),
  },
  nextButton: {
    position: 'absolute',
    right: 20,
    bottom: dySize(10),
  }
});

export default class GetStartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  moveSwiper = (value) => {
    this.refs.swiper.scrollBy(value, true);
  }

  render() {
    const { index } = this.state;
    return (
      <Container style={styles.container}>
        <Swiper
          ref="swiper"
          showsButtons={false}
          loop={false}
          onIndexChanged={tabIndex => this.setState({ index: tabIndex })}
          scrollEnabled={false}
          activeDotColor={colors.blue}
          paginationStyle={{ marginBottom: 0 }}
        >
          <View style={{ flex: 1 }}>
            <Step1 />
          </View>
          <View style={{ flex: 1 }}>
            <Step2 />
          </View>
          <View style={{ flex: 1 }}>
            <Step3 />
          </View>
        </Swiper>
        {
          index > 0
          && (
          <View style={styles.prevButton}>
            <Button
              text={I18n.t('prev')}
              backgroundColor="transparent"
              textColor={colors.gray}
              onPress={() => this.moveSwiper(-1)}
            />
          </View>
          )
        }
        {
          index < 2
          && (
          <View style={styles.nextButton}>
            <Button
              text={I18n.t('next')}
              backgroundColor="transparent"
              textColor={colors.blue}
              onPress={() => this.moveSwiper(1)}
            />
          </View>
          )
        }
      </Container>
    );
  }
}
