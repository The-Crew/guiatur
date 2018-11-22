import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, textStyles } from '../../style';
import { setEvaluation } from './actions/evaluationActions';
import RatingStars from './components/RatingStars';

class Evaluation extends Component {
  static navigationOptions = {
    title: 'Avaliação',
  };

  render() {
    const { scheduling } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1 }}>
        <View style={{  marginVertical: 30, marginHorizontal: 10 }}>
          <Text style={{ ...textStyles.default }}>Avalie o serviço: {scheduling.description}</Text>
          <Text style={{ ...textStyles.default }}>Realizado na data: {scheduling.schedulingDate}</Text>
        </View>
        <RatingStars scheduling={scheduling} />
      </View>
    );
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({ setEvaluation }, dispatch);

export default (Evaluation);
