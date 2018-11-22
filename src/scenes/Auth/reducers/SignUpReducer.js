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
  CHANGE_SIGNUP_CITY_LIST,
} from '../actions/types';

const INITIAL_STATE = {
  signUpName: 'Filipe',
  signUpSex: 'M',
  signUpBirthDate: '21/07/1993',
  signUpDdd: '81',
  signUpPhone: '996927685',
  signUpAddress: 'Rua Paraná',
  signUpNeighborhood: 'Socorro',
  signUpZipCode: '54160660',
  signUpCity: 2607901,
  signUpEmail: 'filipegame07@gmail.com',
  signUpUsername: 'filipegame07',
  signUpPassword: '123456',
  signUpRepassword: '123456',
  registering: false,
  signUpCityList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SIGNUP_NAME:
      return { ...state, signUpName: action.payload };
    case CHANGE_SIGNUP_SEX:
      return { ...state, signUpSex: action.payload };
    case CHANGE_SIGNUP_BIRTHDATE:
      return { ...state, signUpBirthDate: action.payload };
    case CHANGE_SIGNUP_DDD:
      return { ...state, signUpDdd: action.payload };
    case CHANGE_SIGNUP_PHONE:
      return { ...state, signUpPhone: action.payload };
    case CHANGE_SIGNUP_ADDRESS:
      return { ...state, signUpAddress: action.payload };
    case CHANGE_SIGNUP_NEIGHBORHOOD:
      return { ...state, signUpNeighborhood: action.payload };
    case CHANGE_SIGNUP_ZIPCODE:
      return { ...state, signUpZipCode: action.payload };
    case CHANGE_SIGNUP_CITY:
      return { ...state, signUpCity: action.payload };
    case CHANGE_SIGNUP_EMAIL:
      return { ...state, signUpEmail: action.payload };
    case CHANGE_SIGNUP_USERNAME:
      return { ...state, signUpUsername: action.payload };
    case CHANGE_SIGNUP_PASSWORD:
      return { ...state, signUpPassword: action.payload };
    case CHANGE_SIGNUP_REPASSWORD:
      return { ...state, signUpRepassword: action.payload };
    case REGISTERING:
      return { ...state, registering: action.payload };
    case CHANGE_SIGNUP_CITY_LIST:
      return { ...state, signUpCityList: action.payload };
    default:
      return state;
  }
};
