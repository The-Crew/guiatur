import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, textStyles } from '../../../style';

const Star = (props) => {
  if (props.number > 0) {
    return (
      <TouchableHighlight
        onPress={() => props.onPress({ key: props.schedulingKey, numberEvaluation: props.number })}
        underlayColor="#fff"
      >
        <Icon name={props.name} size={40} color={props.color} />
      </TouchableHighlight>
    );
  }
  return (
    <TouchableHighlight
      onPress={() => props.onPress({ key: props.schedulingKey, numberEvaluation: props.number })}
      underlayColor="#fff"
    >
      <Icon name="star-border" size={40} color="#999" />
    </TouchableHighlight>
  );
};

export default (Star);
