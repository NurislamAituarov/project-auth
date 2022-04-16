const REQUIRED_FIELD = 'Required to fill';

export const loginValidation = {
  required: REQUIRED_FIELD,
  validate: (value) => {
    if (value.match(/[а-яА-Я]/g)) {
      return 'Login cannot contain Russian letters';
    }
    return true;
  },
};

export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value) => {
    if (value.length < 4) {
      return 'Password must not be less than 4 characters';
    }
    if (!value.match(/[0-9]/g)) {
      return 'One digit required';
    }
    if (value.match(/[' ']/g)) {
      return 'Must not have spaces';
    }
    return true;
  },
};
