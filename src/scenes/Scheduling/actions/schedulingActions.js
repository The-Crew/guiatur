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

import { SCHEDULING_LIST } from '../../PendingServices/actions/types';

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
  /*axios.post('http://beleza-agendada-api.herokuapp.com/Municipio/listarPorEstado/', { "Uf": "PE" })
    .then((response) => {
      if (response.data) {
        dispatch({ type: MODIFY_SCHEDULING_CITY_LIST, payload: response.data });
      } else {
        Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar as cidades.');
      }
    })
    .catch((error) => {
      Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar as cidades.');
    });*/
  dispatch({
    type: MODIFY_SCHEDULING_CITY_LIST,
    payload: [
      { "Id": "2604106", "Nome": "Caruaru" },
      { "Id": "2606002", "Nome": "Garanhuns" },
      { "Id": "2607208", "Nome": "Ipojuca" },
      { "Id": "2607901", "Nome": "Jaboatão dos Guararapes" },
      { "Id": "2609600", "Nome": "Olinda" },
      { "Id": "2611606", "Nome": "Recife" },
    ]
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
  } else if (city === null) {
    Alert.alert('Beleza Agendada informa:', 'Selecione a cidade');
  } else {
    const { user } = getState().Variables;
    const newDate = schedulingDate.split('/');
    const data = {
      Cliente: { "Id": user.Id },
      Profissional: { "Id": professional },
      Servico: { "Id": serviceIndex },
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

        // Atualizar a lista de pendentes
        const { user } = getState().Variables;
        axios.post(
          'http://beleza-agendada-api.herokuapp.com/Atendimento/listarNaoConcluidos',
          { Id: user.Id },
        )
          .then((response) => {
            if (response.data === null) {
              dispatch({ type: SCHEDULING_LIST, payload: [] });
            } else {
              const schedulingList = response.data.map((scheduleing) => {
                let arrayDate = scheduleing.DataAgendado.split('-');
                arrayDate[2] = arrayDate[2].split(' ')[0];
                const newDate = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
                return {
                  key: scheduleing.Id,
                  description: scheduleing.Servico.Descricao,
                  schedulingDate: newDate,
                };
              });
              dispatch({ type: SCHEDULING_LIST, payload: schedulingList });
            }
          })
          .catch(error => Alert.alert('Beleza Agendada informa:', 'Falha ao obter a lista dos agendamentos pendentes.'));
        // Fim atualizar a lista de pendentes

      })
      .catch((error) => {
        Alert.alert('Beleza Agendada informa:', 'Não foi possível registrar o agendamento.');
      });
  }
};
