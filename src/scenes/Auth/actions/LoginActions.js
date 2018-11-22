import { Alert } from 'react-native';
import axios from 'axios';
import base64 from 'base-64';

import {
  CHANGE_LOGIN_USERNAME,
  CHANGE_LOGIN_PASSWORD,
  LOADING_LOGIN,
} from './types';
import { MODIFY_USER_DATA } from '../../../actions/types';

export const changeUsername = username => ({ type: CHANGE_LOGIN_USERNAME, payload: username });

export const changePassword = password => ({ type: CHANGE_LOGIN_PASSWORD, payload: password });

export const login = (callbackSuccess) => (dispatch, getState) => {
  const { username, password } = getState().Login;

  if (username === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de nome de usuário vazio.');
  } else if (password === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de senha vazio.');
  } else {
    dispatch({ type: LOADING_LOGIN, payload: true });

    const data = {
      Login: username,
      Senha: password,
    }

    axios.post('https://beleza-agendada-api.herokuapp.com/Cliente/logar/', data)
      .then((response) => {
        dispatch({ type: LOADING_LOGIN, payload: false });
        console.log('True', response)
        if (response.data) {
          dispatch({ type: MODIFY_USER_DATA, payload: response.data[0] });
          if (typeof callbackSuccess === 'function') callbackSuccess();
        } else {
          dispatch({ type: MODIFY_USER_DATA, payload: {} });
          Alert.alert('Beleza Agendada informa:', 'Usuário ou senha inválido.')
        }
      })
      .catch((error) => {
        dispatch({ type: MODIFY_USER_DATA, payload: {} });
        dispatch({ type: LOADING_LOGIN, payload: false });
        Alert.alert('Beleza Agendada informa:', 'Que pena, houve uma falha ao efetuar o login.\nTente novamente mais tarde.');
      });
  }
};
