/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { colors } from '../../../theme/colors';
import { MyText } from '../../../components';
import { dySize } from '../../../libs/responsive';
import { convertHTML } from '../../../libs/operators';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray
  },
});

class PropositionHowItWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }

  render() {
    const { height } = this.state;
    const { selectedProposition } = this.props;
    return (
      <View style={styles.container}>
        <MyText color={colors.blue} fontSize={24} paddingVertical={20} paddingHorizontal={20} text="How it works" />
        <AutoHeightWebView
          style={{ width: dySize(335), height, margin: dySize(20) }}
          onSizeUpdated={size => this.setState({ height: size.height + 50 })}
          source={{ html: convertHTML(selectedProposition.acf.how_it_works) }}
          scalesPageToFit={false}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedProposition: state.homeReducer.selectedProposition
});

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PropositionHowItWorks);
