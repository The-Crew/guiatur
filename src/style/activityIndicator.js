import { success, danger, primary } from './colors';

export const styleActivityIndicator = {
  larger: {
    success: {
      size: 50,
      color: success,
    },
    danger: {
      size: 50,
      color: danger,
    },
    default: {
      size: 50,
      color: primary,
    },
  },
  medium: {
    success: {
      size: 'large',
      color: success,
    },
    danger: {
      size: 'large',
      color: danger,
    },
    default: {
      size: 50,
      color: primary,
    },
  },
  small: {
    success: {
      size: 'small',
      color: success,
    },
    danger: {
      size: 'small',
      color: danger,
    },
    default: {
      size: 50,
      color: primary,
    },
  },
  success: {
    color: success,
  },
  danger: {
    color: danger,
  },
  default: {
    size: 50,
    color: primary,
  },
};
