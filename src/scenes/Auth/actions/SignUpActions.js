import { Alert } from 'react-native';
import axios from 'axios';

import {
  CHANGE_SIGNUP_NAME,
  CHANGE_SIGNUP_SEX,
  CHANGE_SIGNUP_BIRTHDATE,
  CHANGE_SIGNUP_DDD,
  CHANGE_SIGNUP_PHONE,
  CHANGE_SIGNUP_ADDRESS,
  CHANGE_SIGNUP_NEIGHBORHOOD,
  CHANGE_SIGNUP_ZIPCODE,
  CHANGE_SIGNUP_CITY,
  CHANGE_SIGNUP_EMAIL,
  CHANGE_SIGNUP_USERNAME,
  CHANGE_SIGNUP_PASSWORD,
  CHANGE_SIGNUP_REPASSWORD,
  REGISTERING,
  CHANGE_LOGIN_EMAIL,
  CHANGE_SIGNUP_CITY_LIST,
} from './types';

export const changeName = name => ({ type: CHANGE_SIGNUP_NAME, payload: name });

export const changeSex = sex => ({ type: CHANGE_SIGNUP_SEX, payload: sex });

export const changeBirthDate = birthDate => ({ type: CHANGE_SIGNUP_BIRTHDATE, payload: birthDate });

export const changeDdd = ddd => ({ type: CHANGE_SIGNUP_DDD, payload: ddd });

export const changePhone = phone => ({ type: CHANGE_SIGNUP_PHONE, payload: phone });

export const changeAddress = address => ({ type: CHANGE_SIGNUP_ADDRESS, payload: address });

export const changeNeighborhood = neighborhood => ({ type: CHANGE_SIGNUP_NEIGHBORHOOD, payload: neighborhood });

export const changeZipCode = zipCode => ({ type: CHANGE_SIGNUP_ZIPCODE, payload: zipCode });

export const changeCity = city => ({ type: CHANGE_SIGNUP_CITY, payload: city });

export const changeEmail = email => ({ type: CHANGE_SIGNUP_EMAIL, payload: email });

export const changeUsername = username => ({ type: CHANGE_SIGNUP_USERNAME, payload: username });

export const changePassword = password => ({ type: CHANGE_SIGNUP_PASSWORD, payload: password });

export const changeRepassword = repassword => ({ type: CHANGE_SIGNUP_REPASSWORD, payload: repassword });

export const register = callbackSuccess => (dispatch, getState) => {
  const {
    signUpName,
    signUpSex,
    signUpBirthDate,
    signUpDdd,
    signUpPhone,
    signUpAddress,
    signUpNeighborhood,
    signUpZipCode,
    signUpCity,
    signUpEmail,
    signUpUsername,
    signUpPassword,
    signUpRepassword,
  } = getState().SignUp;

  if (signUpName === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de nome vazio.');
  } else if (signUpName.length < 3) {
    Alert.alert('Beleza Agendada informa:', 'Campo de nome deve conter no mínimo 3(três) caracteres.');
  } else if (signUpBirthDate === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de data de nascimento vazio.');
  } else if (signUpDdd === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de DDD vazio.');
  } else if (signUpPhone === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de telefone vazio.');
  } else if (signUpAddress === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de endereço vazio.');
  } else if (signUpNeighborhood === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de bairro vazio.');
  } else if (signUpZipCode === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de Cep vazio.');
  } else if (signUpCity === '') {
    Alert.alert('Beleza Agendada informa:', 'Selecione a cidade');
  } else if (signUpUsername === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de sobrenome vazio.');
  } else if (signUpEmail === '') {
    Alert.alert('Beleza Agendada informa:', 'Campo de email vazio. Preencha o email corretamente.');
  } else if (signUpSex === '') {
    Alert.alert('Beleza Agendada informa:', 'Selecione o sexo');
  } else if (signUpPassword.length < 6) {
    Alert.alert('Beleza Agendada informa:', 'A senha deve conter no mínimo 6(seis) caracteres.');
  } else if (signUpPassword !== signUpRepassword || signUpPassword === '') {
    Alert.alert('Beleza Agendada informa:', 'As senhas não conferem, por favor digite-as corretamente.');
  } else {
    dispatch({ type: REGISTERING, payload: true });

    const data = {
      Nome: signUpName,
      DataNascimento: signUpBirthDate,
      Sexo: signUpSex,
      Email: signUpEmail,
      Ddd: signUpDdd,
      Telefone: signUpPhone,
      Endereco: signUpAddress,
      Bairro: signUpNeighborhood,
      Cep: signUpZipCode,
      Municipio: {
        Id: signUpCity,
      },
      Login: signUpUsername,
      Senha: signUpPassword,
    };
    const alertFail = () => {
      dispatch({ type: REGISTERING, payload: signUpEmail });
      Alert.alert('Beleza Agendada informa:', 'Que pena, houve uma falha ao efetuar o cadastro.\nTente novamente mais tarde.');
    };

    axios.post('https://beleza-agendada-api.herokuapp.com/Cliente/inserir/', data)
      .then((response) => {
        dispatch({ type: REGISTERING, payload: false });
        dispatch({ type: CHANGE_LOGIN_EMAIL, payload: signUpEmail });
        if (typeof callbackSuccess === 'function') callbackSuccess();
      })
      .catch((error) => {
        alertFail();
      });
  }
};

export const getCities = () => (dispatch) => {
  axios.post('http://beleza-agendada-api.herokuapp.com/Municipio/listarPorEstado/', { "Uf": "PE" })
    .then((response) => {
      dispatch({ type: CHANGE_SIGNUP_CITY_LIST, payload: response.data });
    })
    .catch((error) => {
      Alert.alert('Beleza Agendada informa:', 'Não foi possível carrgar as cidades.');
    });
}
