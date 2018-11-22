import React, { Component } from 'react';
import { Button, Image, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, textStyles } from '../../style';

import {
  changeUsername,
  changePassword,
  login,
} from './actions/LoginActions';

class AuthLogin extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundAuth }}>
        <Image
          style={{ width: 300, height: 115, marginVertical: 50}}
          source={require('../../imgs/logoH.png')}
        />
        <TextInput
          style={{ width: 300, ...textStyles.default }}
          placeholder="Insira o usuário"
          value={this.props.username}
          onChangeText={this.props.changeUsername}
        />
        <TextInput
          style={{ width: 300, ...textStyles.default }}
          placeholder="Insira a senha"
          secureTextEntry
          value={this.props.password}
          onChangeText={this.props.changePassword}
        />
        <View style={{ flexDirection: 'row', marginVertical: 30 }}>
          <View style={{ marginHorizontal: 20, width: 120 }}>
            <Button
              title='Login'
              color={colors.button}
              onPress={() => this.props.login(() => this.props.navigation.navigate('App'))}
            />
          </View>
          <View style={{ marginHorizontal: 20, width: 120 }}>
            <Button
              title='Cadastre-se'
              color={colors.button}
              onPress={() => this.props.navigation.navigate('AuthSignUp') }
            />
          </View>
        </View>
        <View style={{ marginVertical: 30, width: 150 }}>
          <Button
            style={{ flex: 1 }}
            title='Esqueci senha'
            color={colors.button}
            onPress={() => this.props.navigation.navigate('ResetPassword')}
          />
        </View>
      </View>
    );
  }
};

const mapStateToProps = state =>  ({
  username: state.Login.username,
  password: state.Login.password,
  loading: state.Login.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeUsername,
  changePassword,
  login,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
