import { Alert } from 'react-native';
import axios from 'axios';

export const setEvaluation = ({ key, evaluation }, callbackSuccess) => (dispatch) => {
  axios.post(
    'http://beleza-agendada-api.herokuapp.com/Atendimento/avaliar',
    { Id: key, AvaliacaoSatisfacao: evaluation },
  )
    .then((response) => {
      if (response.data && (typeof callbackSuccess === 'function')) callbackSuccess();
    })
    .catch(error => Alert.alert('Beleza Agendada informa:', 'Falha ao registrar a avaliação.'));
};

export default () => false;
