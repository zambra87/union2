import { NewsletterInput, ValidationResult } from './types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(field: string, value: string): boolean {
  if (typeof value === 'string') value = value.trim();

  switch (field) {
    case 'firstname':
    case 'lastname':
      return value.length < 3;
    case 'email':
      return !emailRegex.test(value);
    default:
      return false;
  }
}

export const validateInput = (body: NewsletterInput): ValidationResult => {
  const { email, firstname, lastname } = body;

  // Check for empty fields
  if (!email || !firstname || !lastname) {
    return {
      isValid: false,
      error: { message: 'Todos los campos son requeridos', status: 400 },
    };
  }

  // Validate each field
  if (validate('firstname', firstname)) {
    return {
      isValid: false,
      error: {
        message: 'El nombre debe tener al menos 3 caracteres',
        status: 400,
      },
    };
  }

  if (validate('lastname', lastname)) {
    return {
      isValid: false,
      error: {
        message: 'El apellido debe tener al menos 3 caracteres',
        status: 400,
      },
    };
  }

  if (validate('email', email)) {
    return {
      isValid: false,
      error: { message: 'El formato del email no es válido', status: 400 },
    };
  }

  return { isValid: true, data: { email, firstname, lastname } };
};
