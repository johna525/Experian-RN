/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Container } from 'native-base';
import { colors } from '../../theme/colors';
import { MyText } from '../../components';
import I18n from '../../i18n/i18n';
import { dySize } from '../../libs/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: colors.lightgray
  },
});

export const Step2 = () => (
  <Container style={styles.container}>
    <MyText color={colors.blue} fontSize={30} text={I18n.t('title_2_1')} style={{ fontFamily: 'Roboto-Light', lingHeight: dySize(34) }} />
    <MyText color={colors.blue} fontSize={30} text={I18n.t('title_2_2')} style={{ fontFamily: 'Roboto-Light', lingHeight: dySize(34) }} />
    <MyText color={colors.text} fontSize={16} paddingVertical={20} text={I18n.t('description_2_1')} />
    <MyText color={colors.blue} fontSize={16} text={I18n.t('sub_title_2')} />
    <MyText color={colors.text} fontSize={16} paddingVertical={10} text={I18n.t('description_2_2')} />
    <MyText color={colors.text} fontSize={16} paddingVertical={5} text={I18n.t('description_2_3')} />
  </Container>
);
