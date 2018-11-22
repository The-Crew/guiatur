import { Alert } from 'react-native';
import axios from 'axios';

import { SCHEDULING_LIST_COMPLETED } from './types';

export const listScheduleingCompleted = () => (dispatch, getState) => {
  const { user } = getState().Variables;
  axios.post(
    'http://beleza-agendada-api.herokuapp.com/Atendimento/listarConcluidos',
    { Id: user.Id },
  )
    .then((response) => {
      const schedulingList = response.data.map((scheduleing) => {
        let arrayDate = scheduleing.DataAgendado.split('-');
        arrayDate[2] = arrayDate[2].split(' ')[0];
        const newDate = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
        return {
          key: scheduleing.Id,
          description: scheduleing.Servico.Descricao,
          schedulingDate: newDate,
          evaluation: parseInt(scheduleing.AvaliacaoSatisfacao),
        };
      });
      dispatch({ type: SCHEDULING_LIST_COMPLETED, payload: schedulingList });
    })
    .catch(error => Alert.alert('Beleza Agendada informa:', 'Falha ao obter a lista dos agendamentos pendentes.'));
};

export default () => false;
