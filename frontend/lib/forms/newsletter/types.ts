export const actions = {
  fieldsChanged: 'FIELDS_CHANGED',
  formSubmitted: 'FORM_SUBMITTED',
  submitSuccess: 'SUCCESS',
  submitError: 'ERROR',
  resetForm: 'RESET_FORM',
} as const;

export type FormData = {
  firstname: string;
  lastname: string;
  email: string;
};

export type NewsletterAction =
  | {
      type: typeof actions.fieldsChanged;
      fieldName: 'email' | 'firstname' | 'lastname';
      payload: string;
    }
  | { type: typeof actions.formSubmitted; payload: FormData }
  | { type: typeof actions.submitSuccess; payload: string }
  | { type: typeof actions.submitError; payload: string }
  | { type: typeof actions.resetForm };

export type state = {
  email: string;
  firstname: string;
  lastname: string;
  canISend: boolean | undefined;
  emailError: boolean | undefined;
  firstnameError: boolean | undefined;
  lastnameError: boolean | undefined;
  isLoading: boolean;
  successMessage: string;
  errorMessage: string;
  resetForm: boolean;
  showErrors: boolean;
};

export type NewsletterInput = {
  email: string;
  firstname: string;
  lastname: string;
};

export type ValidationResult = {
  isValid: boolean;
  data?: NewsletterInput;
  error?: { message: string; status: number };
};
