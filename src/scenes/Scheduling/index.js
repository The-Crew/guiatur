import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { View, ScrollView, Text, Button, Picker, TextInput, TouchableHighlight } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker'

import { colors, textStyles } from '../../style';
import Logout from '../Auth/Logout';

import {
  getServices,
  changeService,
  changeDate,
  registerScheduling,
  changeProfessional,
  changeAddress,
  changeNeighborhood,
  changeZipCode,
  changeCity,
  getCities,
  getProfessionals,
} from './actions/schedulingActions';

class Scheduling extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Agendamento',
    headerTitleStyle: { ...textStyles.title },
    headerRight: <Logout />,
    tabBarIcon: ({ focused, tintColor }) => (
      focused
        ? <Icon name="event" size={30} color={colors.button} />
        : <Icon name="event" size={30} color={colors.dark}/>
    ),
  };

  componentWillMount() {
    this.props.getServices();
    this.props.getCities();
    this.props.getProfessionals();
  }

  render() {
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
              value={null}
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

    const RenderService = () => {
      if (this.props.listServices.length > 0) {
        return (
          <Picker
            selectedValue={this.props.serviceIndex}
            onValueChange={this.props.changeService}
            style={{ marginBottom: 20 }}
          >
            <Picker.Item
              label="Selecione..."
              value={null}
            />
            {this.props.listServices.map((value, index) => {
                return (
                  <Picker.Item
                    label={value.description}
                    value={index}
                    key={index}
                  />
                )
              })
            }
          </Picker>
        )
      }
      return <Text style={{ marginVertical: 24, ...textStyles.default }}>Nenhum serviço disponível</Text>
    }

    const RenderProfessional = () => {
      if (this.props.professionalList.length > 0) {
        return (
          <Picker
            selectedValue={this.props.professional}
            onValueChange={this.props.changeProfessional}
            style={{ marginBottom: 20 }}
          >
            <Picker.Item
              label="Selecione..."
              value={null}
            />
            {this.props.professionalList.map((value, index) => {
                return (
                  <Picker.Item
                    label={value.name}
                    value={value.id}
                    key={`professional-${value.Id}`}
                  />
                )
              })
            }
          </Picker>
        )
      }
      return <Text style={{ marginVertical: 24, ...textStyles.default }}>Nenhum profissional disponível</Text>
    }

    return (
      <ScrollView style={{ padding: 20, paddingBottom: 0, flex: 1 }}>
        <View style={{ flex: 1, marginBottom: 40, justifyContent: 'center' }}>
          <Text style={{ ...textStyles.default }}>Selecione o servço</Text>
          <RenderService />
          <Text style={{ ...textStyles.default }}>Selecione o profissional</Text>
          <RenderProfessional />
          <Text style={{ marginBottom: 10, ...textStyles.default }}>Data de agendamento</Text>
          <DatePicker
            style={{ width: 155 }}
            mode="date"
            date={this.props.schedulingDate}
            placeholder="dd/mm/aaaa"
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
            onDateChange={this.props.changeDate}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            ref={(e) => this.address = e}
            placeholder="Endereço"
            returnKeyType="next"
            value={this.props.address}
            onChangeText={this.props.changeAddress}
            onSubmitEditing={() => { this.neighborhood.focus() }}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            ref={(e) => this.neighborhood = e}
            placeholder="Bairro"
            returnKeyType="next"
            value={this.props.neighborhood}
            onChangeText={this.props.changeNeighborhood}
            onSubmitEditing={() => { this.zipCode.focus() }}
          />
          <TextInput
            style={{ width: 300, ...textStyles.default }}
            ref={(e) => this.zipCode = e}
            placeholder="Cep"
            returnKeyType="next"
            keyboardType="numeric"
            value={this.props.zipCode}
            onChangeText={this.props.changeZipCode}
            onSubmitEditing={false}
          />
          <View style={{ width: 300, flexDirection: 'row' }}>
            <Text style={{ marginVertical: 15, marginHorizontal: 10, ...textStyles.default }}>Cidade:</Text>
            <RenderCities />
          </View>
          <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              style={{ flex: 1 }}
              title='Agendar'
              color={colors.button}
              onPress={this.props.registerScheduling}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
};

const mapStateToProps = state => ({
  listServices: state.Scheduling.listServices,
  serviceIndex: state.Scheduling.serviceIndex,
  schedulingDate: state.Scheduling.schedulingDate,
  professionalList: state.Scheduling.professionalList,
  professional: state.Scheduling.professional,
  address: state.Scheduling.address,
  neighborhood: state.Scheduling.neighborhood,
  zipCode: state.Scheduling.zipCode,
  city: state.Scheduling.city,
  cityList: state.Scheduling.cityList,
});

const mapDispatchToProps = dispach => bindActionCreators({
  getServices,
  changeService,
  changeDate,
  registerScheduling,
  changeProfessional,
  changeAddress,
  changeNeighborhood,
  changeZipCode,
  changeCity,
  getCities,
  getProfessionals,
}, dispach);

export default connect(mapStateToProps, mapDispatchToProps)(Scheduling);
