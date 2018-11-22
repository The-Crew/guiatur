import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

import { colors, textStyles } from '../../style';

export default class AuthSignUp extends Component {
  static navigationOptions = {
    title: 'Recuperar Senha',
    headerTitleStyle: { ...textStyles.title },
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundAuth }}>
        <View style={{  marginVertical: 30 }}>
          <TextInput
            style={{ width: 300 }}
            placeholder="Insira seu email"
            keyboardType="email-address"
            onChangeText={() => {}}
          />
        </View>
        <View style={{ marginVertical: 30, width: 100 }}>
          <Button
            title='Recuperar'
            color={colors.button}
            onPress={ () => this.props.navigation.goBack() }
          />
        </View>
      </View>
    );
  }
};
