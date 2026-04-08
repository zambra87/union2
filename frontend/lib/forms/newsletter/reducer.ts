import { actions, NewsletterAction, state } from './types';
import { validate } from './validators';

export const initialState = {
  email: '',
  firstname: '',
  lastname: '',
  canISend: false,
  emailError: undefined,
  firstnameError: undefined,
  lastnameError: undefined,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  resetForm: false,
  showErrors: false,
};

export function reducer(state: state, action: NewsletterAction) {
  let error;
  switch (action.type) {
    case actions.fieldsChanged: {
      error = validate(action.fieldName, action.payload);

      const fieldStatus = {
        firstnameError: validate('firstname', action.payload),
        lastnameError: validate('lastname', action.payload),
        emailError: validate('email', action.payload),
      };

      const newState = {
        ...state,
        [action.fieldName]: action.payload,
        [action.fieldName + 'Error']: error,
        successMessage: '',
        canISend:
          !fieldStatus.firstnameError &&
          !fieldStatus.lastnameError &&
          !fieldStatus.emailError,
      };
      return newState;
    }

    case actions.formSubmitted: {
      const fieldStatus = {
        firstnameError: validate('firstname', action.payload.firstname),
        lastnameError: validate('lastname', action.payload.lastname),
        emailError: validate('email', action.payload.email),
      };

      const canISend =
        !fieldStatus.firstnameError &&
        !fieldStatus.lastnameError &&
        !fieldStatus.emailError;

      const newState = {
        ...state,
        ...fieldStatus,
        isLoading: true,
        showErrors: true,
        canISend,
      };
      return newState;
    }

    case actions.submitSuccess: {
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload,
        email: '',
        firstname: '',
        lastname: '',
        emailError: undefined,
        firstnameError: undefined,
        lastnameError: undefined,
        canISend: false,
        showErrors: false,
      };
    }

    case actions.submitError: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        showErrors: true,
      };
    }

    case actions.resetForm: {
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
      };
    }
    default:
      return state;
  }
}
