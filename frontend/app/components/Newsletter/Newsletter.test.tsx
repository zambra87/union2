/// <reference types="jest" />
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Newsletter from './index';

// Mock the fetch function
global.fetch = jest.fn();

// Helper functions
const fillForm = async (fields: {
  nombre?: string;
  apellido?: string;
  email?: string;
}) => {
  if (fields.nombre) {
    await userEvent.type(screen.getByLabelText(/nombre/i), fields.nombre);
  }
  if (fields.apellido) {
    await userEvent.type(screen.getByLabelText(/apellido/i), fields.apellido);
  }
  if (fields.email) {
    await userEvent.type(screen.getByLabelText(/email/i), fields.email);
  }
};

const submitForm = () => {
  const submitButton = screen.getByRole('button', { name: /enviar/i });
  fireEvent.click(submitButton);
};

describe('Newsletter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders the newsletter form with all fields', () => {
      render(<Newsletter />);

      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /enviar/i })
      ).toBeInTheDocument();
    });
  });

  describe('form validation', () => {
    it('validate all fields with invalid data', async () => {
      render(<Newsletter />);
      const firstnameInput = screen.getByLabelText(/nombre/i);
      const lastnameInput = screen.getByLabelText(/apellido/i);
      const emailInput = screen.getByLabelText(/email/i);
      await userEvent.type(firstnameInput, 'ab'); // Less than 3 characters
      await userEvent.type(lastnameInput, 'cd'); // Less than 3 characters
      await userEvent.type(emailInput, 'invalid'); // Invalid email
      submitForm();

      const errorMessages = screen.getAllByText(
        /El nombre debe tener al menos 3 caracteres|El apellido debe tener al menos 3 caracteres|El email debe ser válido/
      );
      expect(errorMessages).toHaveLength(3);
      errorMessages.forEach((message) => {
        expect(message).toBeInTheDocument();
      });
    });

    it('validates when all fields are empty', async () => {
      render(<Newsletter />);
      submitForm();

      const errorMessages = screen.getAllByText(
        /El nombre debe tener al menos 3 caracteres|El apellido debe tener al menos 3 caracteres|El email debe ser válido/
      );
      expect(errorMessages).toHaveLength(3);
      errorMessages.forEach((message) => {
        expect(message).toBeInTheDocument();
      });
    });

    it('validates firstname field is required', async () => {
      render(<Newsletter />);
      await fillForm({ apellido: 'Doe', email: 'john@example.com' });
      submitForm();

      await waitFor(() => {
        expect(
          screen.getByText(/el nombre debe tener al menos 3 caracteres/i)
        ).toBeInTheDocument();
      });
    });

    it('validates lastname field is required', async () => {
      render(<Newsletter />);
      await fillForm({ nombre: 'John', email: 'john@example.com' });
      submitForm();

      await waitFor(() => {
        expect(
          screen.getByText(/el apellido debe tener al menos 3 caracteres/i)
        ).toBeInTheDocument();
      });
    });

    it('validates email field is required', async () => {
      render(<Newsletter />);
      await fillForm({ nombre: 'John', apellido: 'Doe' });
      submitForm();

      await waitFor(() => {
        expect(
          screen.getByText(/el email debe ser válido/i)
        ).toBeInTheDocument();
      });
    });

    it('validates when you comply with all validations but then you erase the firstname field', async () => {
      render(<Newsletter />);
      await fillForm({
        nombre: 'John',
        apellido: 'Doe',
        email: 'john@example.com',
      });
      await userEvent.clear(screen.getByLabelText(/nombre/i));
      submitForm();

      await waitFor(() => {
        expect(
          screen.getByText(/el nombre debe tener al menos 3 caracteres/i)
        ).toBeInTheDocument();
      });
    });

    it('validates email format', async () => {
      render(<Newsletter />);
      await fillForm({
        nombre: 'John',
        apellido: 'Doe',
        email: 'invalid-email',
      });
      submitForm();

      await waitFor(() => {
        expect(
          screen.getByText(/El email debe ser válido/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('form submission', () => {
    it('submits the form successfully', async () => {
      const mockResponse = {
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ success: true })),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      render(<Newsletter />);
      await fillForm({
        nombre: 'John',
        apellido: 'Doe',
        email: 'john@example.com',
      });
      fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

      await waitFor(() => {
        expect(
          screen.getByText(
            /John Doe, has sido agregado a nuestra lista de suscriptores con el email john@example.com/i
          )
        ).toBeInTheDocument();
      });

      // Verify the API was called with correct data
      expect(global.fetch).toHaveBeenCalledWith('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@example.com',
        }),
      });
    });

    it('handles rate limit errors', async () => {
      const mockResponse = {
        ok: false,
        text: () =>
          Promise.resolve(
            JSON.stringify({
              message:
                'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.',
            })
          ),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      render(<Newsletter />);
      await fillForm({
        nombre: 'John',
        apellido: 'Doe',
        email: 'john@example.com',
      });
      fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

      await waitFor(() => {
        expect(
          screen.getByText(
            /Demasiadas solicitudes\. Por favor, inténtelo de nuevo más tarde\./i
          )
        ).toBeInTheDocument();
      });
    });

    it('should show error when email already exists', async () => {
      const mockResponse = {
        ok: false,
        text: () =>
          Promise.resolve(
            JSON.stringify({
              message: 'Este email ya está suscrito a nuestro newsletter',
            })
          ),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      render(<Newsletter />);
      await fillForm({
        nombre: 'John',
        apellido: 'Doe',
        email: 'john@example.com',
      });

      const submitButton = screen.getByRole('button', { name: /enviar/i });
      fireEvent.click(submitButton);

      expect(submitButton).toHaveTextContent('Enviando...');

      await waitFor(() => {
        expect(
          screen.getByText('Este email ya está suscrito a nuestro newsletter')
        ).toBeInTheDocument();
      });

      expect(submitButton).toHaveTextContent('Enviar');
    });
  });
});
