import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, styleActivityIndicator } from '../../style';
import { setVariables } from '../../actions/VariablesActions';

class SplashScreen extends Component {
  componentWillMount() {
    this.props.setVariables({ navigation: this.props.navigation });
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundAuth }}>
        <ActivityIndicator {...styleActivityIndicator.larger.default} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setVariables }, dispatch);

export default connect(null, mapDispatchToProps)(SplashScreen);
