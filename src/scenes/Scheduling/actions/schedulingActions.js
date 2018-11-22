import { Alert } from 'react-native';
import axios from 'axios';

import {
  SERVICE_LIST,
  MODIFY_REGISTERING,
  MODIFY_SCHEDULING_SERVICE,
  MODIFY_SCHEDULING_DATE,
  REGISTERING_SCHEDULING,
  MODIFY_SCHEDULING_PROFESSIONAL_LIST,
  MODIFY_SCHEDULING_PROFESSIONAL,
  MODIFY_SCHEDULING_ADDRESS,
  MODIFY_SCHEDULING_NEIGHBORHOOD,
  MODIFY_SCHEDULING_ZIPCODE,
  MODIFY_SCHEDULING_CITY,
  MODIFY_SCHEDULING_CITY_LIST,
} from './types';

export const getServices = () => (dispatch) => {
  axios.get('http://beleza-agendada-api.herokuapp.com/Servico/listarTodos/')
    .then((response) => {
      if (response.data) {
        let services = [];

        response.data.forEach((service, index) => {
          services.push({ key: service.Id, description: service.Descricao })
        })

        dispatch({ type: SERVICE_LIST, payload: services });
      } else {
        Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar os serviços.');
      }
    })
    .catch((error) => {
      Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar os serviços.');
    });
};

export const changeService = serviceIndex => ({ type: MODIFY_SCHEDULING_SERVICE, payload: serviceIndex });

export const changeDate = date => ({ type: MODIFY_SCHEDULING_DATE, payload: date });

export const changeProfessional = professional => ({ type: MODIFY_SCHEDULING_PROFESSIONAL, payload: professional });

export const changeAddress = address => ({ type: MODIFY_SCHEDULING_ADDRESS, payload: address });

export const changeNeighborhood = neighborhood => ({ type: MODIFY_SCHEDULING_NEIGHBORHOOD, payload: neighborhood });

export const changeZipCode = zipCode => ({ type: MODIFY_SCHEDULING_ZIPCODE, payload: zipCode });

export const changeCity = city => ({ type: MODIFY_SCHEDULING_CITY, payload: city });

export const getCities = () => (dispatch) => {
  axios.post('http://beleza-agendada-api.herokuapp.com/Municipio/listarPorEstado/', { "Uf": "PE" })
    .then((response) => {
      if (response.data) {
        dispatch({ type: MODIFY_SCHEDULING_CITY_LIST, payload: response.data });
      } else {
        Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar as cidades.');
      }
    })
    .catch((error) => {
      Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar as cidades.');
    });
}

export const getProfessionals = () => (dispatch) => {
  axios.get('http://beleza-agendada-api.herokuapp.com/Profissional/listarTodos/')
    .then((response) => {
      if (response.data) {
        let professionals = [];

        response.data.forEach((professional, index) => {
          if (professional.Status === "A") {
            professionals.push({ id: professional.Id, name: professional.Nome })
          };
        })

        dispatch({ type: MODIFY_SCHEDULING_PROFESSIONAL_LIST, payload: professionals });
      } else {
        Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar os profissionais.');
      }
    })
    .catch((error) => {
      Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar os profissionais.');
    });
}

export const registerScheduling = () => (dispatch, getState) => {
  dispatch({ type: REGISTERING_SCHEDULING, payload: true });

  const {
    serviceIndex,
    professional,
    schedulingDate,
    address,
    neighborhood,
    zipCode,
    city,
  } = getState().Scheduling;

  if (serviceIndex === null) {
    Alert.alert('Beleza Agendada informa:', 'Selecione um serviço.');
  } else if (professional === null) {
    Alert.alert('Beleza Agendada informa:', 'Selecione um profissional.');
  } else if (schedulingDate === '') {
    Alert.alert('Beleza Agendada informa:', 'Selecione uma data.');
  } else if (address === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de endereço vazio.');
  } else if (neighborhood === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de bairro vazio.');
  } else if (zipCode === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de Cep vazio.');
  } else if (city === null) {
    Alert.alert('Beleza Agendada informa:', 'Selecione a cidade');
  } else {
    const { user } = getState().Variables;
    const newDate = schedulingDate.split('/');
    const data = {
      Cliente: { "Id": user.Id },
      Profissional: { "Id": professional },
      Servico: { "Id": 1 },
      DataAgendado: `${newDate[2]}-${newDate[1]}-${newDate[0]}`,
      DataRealizado: "",
      Endereco: address,
      Bairro: neighborhood,
      Cep: zipCode,
      Municipio: { "Id": city },
      Preco: "",
      Desconto: "",
      CustoAdicional: "",
      Situacao: "",
      CustoTransporte: "",
      Observacao: ""
    };

    axios.post('http://beleza-agendada-api.herokuapp.com/Atendimento/inserir/', data)
      .then((response) => {
        if (response.data) {
          Alert.alert('Beleza Agendada informa:', 'Agendamento efetuado com sucesso.');
          dispatch({ type: REGISTERING_SCHEDULING, payload: false });
        }
      })
      .catch((error) => {
        Alert.alert('Beleza Agendada informa:', 'Não foi possível registrar o agendamento.');
      });
  }
};
