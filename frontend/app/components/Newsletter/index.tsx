'use client';

import { reducer } from '@/lib/forms/newsletter/reducer';
import { initialState } from '@/lib/forms/newsletter/reducer';
import { actions } from '@/lib/forms/newsletter/types';
import { useReducer } from 'react';
import { Error as ErrorIcon, Check } from '../icons';

export default function Newsletter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    email,
    firstname,
    lastname,
    canISend,
    isLoading,
    successMessage,
    firstnameError,
    lastnameError,
    emailError,
    errorMessage,
    showErrors,
  } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: actions.fieldsChanged,
      fieldName: e.currentTarget.name as 'email' | 'firstname' | 'lastname',
      payload: e.currentTarget.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: actions.formSubmitted,
      payload: {
        firstname,
        lastname,
        email,
      },
    });

    if (canISend) {
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstname, lastname, email }),
        });
        const responseText = await response.text();
        const data = JSON.parse(responseText);

        if (!response.ok) {
          dispatch({
            type: actions.submitError,
            payload: data.message || 'Error al suscribirse al newsletter',
          });
          return;
        }

        dispatch({
          type: actions.submitSuccess,
          payload: `${firstname} ${lastname}, has sido agregado a nuestra lista de suscriptores con el email ${email}`,
        });
      } catch (e: unknown) {
        dispatch({
          type: actions.submitError,
          payload:
            e instanceof Error && e.message.includes('429')
              ? 'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.'
              : 'Error al suscribirse al newsletter',
        });
      }
    } else {
      dispatch({
        type: actions.resetForm,
      });
    }
  };

  return (
    <form
      className="flex flex-col w-full md:w-2/5 lg:w-1/3 mx-auto md:mx-0 bg-white p-4 shadow-2xl top-10 md:-top-12 md:right-12 relative md:absolute"
      onSubmit={onSubmit}
    >
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor="firstname"
      >
        Nombre
      </label>
      <div className="relative">
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Ingresa tu nombre"
          className={`appearance-none px-4 py-3 outline-none w-full focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 border ${
            firstnameError ? 'border-red-500' : ''
          }`}
          value={firstname}
          onChange={handleChange}
          data-1p-ignore="true"
        />
        {firstnameError && showErrors && (
          <ErrorIcon
            className="absolute right-4 h-6 w-6 text-red-600"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          />
        )}
      </div>
      {firstnameError && showErrors && (
        <p className="text-red-500 text-sm mt-1">
          El nombre debe tener al menos 3 caracteres
        </p>
      )}

      <label
        className="block text-sm font-medium text-gray-700 mb-2 mt-4"
        htmlFor="lastname"
      >
        Apellido
      </label>
      <div className="relative">
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Ingresa tu apellido"
          className={`appearance-none px-4 py-3 outline-none w-full focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 border ${
            firstnameError && showErrors ? 'border-red-500' : ''
          }`}
          value={lastname}
          onChange={handleChange}
          data-1p-ignore="true"
        />
        {lastnameError && showErrors && (
          <ErrorIcon
            className="absolute right-4 h-6 w-6 text-red-600"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          />
        )}
      </div>
      {lastnameError && showErrors && (
        <p className="text-red-500 text-sm mt-1">
          El apellido debe tener al menos 3 caracteres
        </p>
      )}
      <label
        className="block text-sm font-medium text-gray-700 mb-2 mt-4"
        htmlFor="email"
      >
        Email
      </label>
      <div className="relative">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Ingresa tu email"
          className={`appearance-none px-4 py-3 outline-none w-full focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 border ${
            firstnameError && showErrors ? 'border-red-500' : ''
          }`}
          value={email}
          onChange={handleChange}
          data-1p-ignore="true"
        />
        {emailError && showErrors && (
          <ErrorIcon
            className="absolute right-4 h-6 w-6 text-red-600"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          />
        )}
      </div>
      {emailError && showErrors && (
        <p className="text-red-500 text-sm mt-1">El email debe ser válido</p>
      )}
      {errorMessage && (
        <div className="bg-red-50 p-2 flex items-center mb-8 relative mt-4">
          <ErrorIcon className="w-6 h-6 text-red-600 mr-2" />
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="bg-green-50 p-2 flex items-center relative mt-4">
          <Check className="w-12 h-12 text-green-600 mr-2" />
          <p className="text-sm">{successMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`mt-8 inline px-8 py-3 border border-primary bg-primary text-white uppercase text-sm tracking-wider font-bold hover:bg-primary/90 ease-in-out duration-300 ${
          isLoading ? 'disabled:cursor-not-allowed' : 'cursor-pointer '
        }`}
      >
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
