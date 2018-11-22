import React, { Component } from 'react';
import { ActivityIndicator, Button, Picker, View, Text, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker'

import { colors, styleActivityIndicator, textStyles } from '../../style';

import {
  changeName,
  changeSex,
  changeBirthDate,
  changeDdd,
  changePhone,
  changeAddress,
  changeNeighborhood,
  changeZipCode,
  changeCity,
  changeEmail,
  changeUsername,
  changePassword,
  changeRepassword,
  register,
  getCities,
} from './actions/SignUpActions';

class AuthSignUp extends Component {
  static navigationOptions = {
    title: 'Cadastre-se',
    headerTitleStyle: { ...textStyles.title },
  };
  componentWillMount() {
    this.props.getCities();
  }
  render() {
    const RenderButton = () => {
      if (this.props.registering) {
        return <ActivityIndicator {...styleActivityIndicator.larger.default} />;
      }
      return (
        <Button
          title='Cadastrar'
          color={colors.button}
          onPress={() => this.props.register(this.props.navigation.goBack)}
        />
      );
    }

    const RenderCities = () => {
      if (this.props.cityList.length > 0) {
        return (
          <Picker
            style={{ width: 235, ...textStyles.default, fontSize: null }}
            selectedValue={this.props.city}
            onValueChange={this.props.changeCity}
          >
            <Picker.Item
              label="Selecione..."
              value=""
            />
            {this.props.cityList.map((value, index) => {
              return (
                <Picker.Item
                  label={value.Nome}
                  value={value.Id}
                  key={`city-${value.Id}`}
                />
              )
            })}
          </Picker>
        )
      }
      return <Text style={{ marginVertical: 15, ...textStyles.default }}>Nenhuma cidade disponível</Text>
    };
    return (
      <ScrollView style={{ flex: 1, padding: 30, paddingBottom: 0, backgroundColor: colors.backgroundAuth }}>
        <View style={{ flex: 1, marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundAuth }}>
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Insira o seu nome"
            value={this.props.name}
            onChangeText={this.props.changeName}
          />
          <View style={{ width: 300, flexDirection: 'row' }}>
            <Text style={{ marginVertical: 15, marginHorizontal: 10, ...textStyles.default }}>Sexo</Text>
            <Picker
              style={{ width: 245, ...textStyles.default }}
              selectedValue={this.props.sex}
              onValueChange={this.props.changeSex}
            >
              <Picker.Item
                label="Selecione..."
                value=""
              />
              <Picker.Item
                label="Feminino"
                value="F"
              />
              <Picker.Item
                label="Masculino"
                value="M"
              />
            </Picker>
          </View>
          <View style={{ width: 300, flexDirection: 'row' }}>
            <Text style={{ marginVertical: 15, marginHorizontal: 10, ...textStyles.default }}>Nascimento:</Text>
            <DatePicker
              style={{ width: 185 }}
              mode="date"
              date={this.props.birthDate}
              placeholder="Data de nascimento"
              format="DD/MM/YYYY"
              confirmBtnText="Confirmar"
              cancelBtnText="Cancelar"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={this.props.changeBirthDate}
            />
          </View>
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="DDD"
            value={this.props.ddd}
            onChangeText={this.props.changeDdd}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Telefone"
            value={this.props.phone}
            onChangeText={this.props.changePhone}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Endereço"
            value={this.props.address}
            onChangeText={this.props.changeAddress}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Bairro"
            value={this.props.neighborhood}
            onChangeText={this.props.changeNeighborhood}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Cep"
            value={this.props.zipCode}
            onChangeText={this.props.changeZipCode}
          />
          <View style={{ width: 300, flexDirection: 'row' }}>
            <Text style={{ marginVertical: 15, marginHorizontal: 10, ...textStyles.default }}>Cidade:</Text>
            <RenderCities />
          </View>
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Insira o e-mail"
            keyboardType="email-address"
            value={this.props.email}
            onChangeText={this.props.changeEmail}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Insira o seu username"
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
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            placeholder="Repita a senha"
            secureTextEntry
            value={this.props.repassword}
            onChangeText={this.props.changeRepassword}
          />
          <View style={{ marginVertical: 30 }}>
            <View style={{ marginHorizontal: 20, width: 100 }}>
              <RenderButton />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const mapStateToProps = state =>  ({
  name: state.SignUp.signUpName,
  sex: state.SignUp.signUpSex,
  birthDate: state.SignUp.signUpBirthDate,
  ddd: state.SignUp.signUpDdd,
  phone: state.SignUp.signUpPhone,
  address: state.SignUp.signUpAddress,
  neighborhood: state.SignUp.signUpNeighborhood,
  zipCode: state.SignUp.signUpZipCode,
  city: state.SignUp.signUpCity,
  email: state.SignUp.signUpEmail,
  username: state.SignUp.signUpUsername,
  password: state.SignUp.signUpPassword,
  repassword: state.SignUp.signUpRepassword,
  registering: state.SignUp.registering,
  cityList: state.SignUp.signUpCityList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeName,
  changeSex,
  changeBirthDate,
  changeDdd,
  changePhone,
  changeAddress,
  changeNeighborhood,
  changeZipCode,
  changeCity,
  changeEmail,
  changeUsername,
  changePassword,
  changeRepassword,
  register,
  getCities,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthSignUp);
