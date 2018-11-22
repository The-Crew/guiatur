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
} from '../actions/types';

const INITIAL_STATE = {
  serviceIndex: null,
  schedulingDate: '',
  registering: false,
  listServices: [],
  professionalList: [],
  professional: null,
  address: '',
  neighborhood: '',
  zipCode: '',
  city: null,
  cityList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SERVICE_LIST:
      return { ...state, listServices: action.payload };
    case REGISTERING_SCHEDULING:
    case MODIFY_REGISTERING:
      return { ...state, registering: action.payload };
    case MODIFY_SCHEDULING_SERVICE:
      return { ...state, serviceIndex: action.payload };
    case MODIFY_SCHEDULING_DATE:
      return { ...state, schedulingDate: action.payload };
    case MODIFY_SCHEDULING_PROFESSIONAL:
      return { ...state, professional: action.payload };
    case MODIFY_SCHEDULING_PROFESSIONAL_LIST:
      return { ...state, professionalList: action.payload };
    case MODIFY_SCHEDULING_ADDRESS:
      return { ...state, address: action.payload };
    case MODIFY_SCHEDULING_NEIGHBORHOOD:
      return { ...state, neighborhood: action.payload };
    case MODIFY_SCHEDULING_ZIPCODE:
      return { ...state, zipCode: action.payload };
    case MODIFY_SCHEDULING_CITY:
      return { ...state, city: action.payload };
    case MODIFY_SCHEDULING_CITY_LIST:
      return { ...state, cityList: action.payload };
    default:
      return state;
  }
};
