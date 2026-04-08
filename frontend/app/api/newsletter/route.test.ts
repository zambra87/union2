/**
 * @jest-environment node
 */

import { rateLimit } from '../../../lib/rate-limit';

jest.mock('../../../lib/rate-limit', () => ({
  rateLimit: jest.fn().mockResolvedValue(null),
}));

// Mock Mailchimp before importing
jest.mock('@mailchimp/mailchimp_marketing', () => ({
  lists: {
    addListMember: jest.fn().mockResolvedValue({ id: 'test-id' }),
  },
  setConfig: jest.fn(),
}));
import mailchimp from '@mailchimp/mailchimp_marketing';

// Mock Redis
jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({
    incr: jest.fn().mockResolvedValue(1),
    expire: jest.fn().mockResolvedValue(true),
  })),
}));

// Mock the mailchimp config
jest.mock('../../../lib/mailchimp/config', () => ({
  mailchimpConfig: {
    apiKey: 'test-api-key',
    listId: 'test-list-id',
    server: 'us12',
  },
  initializeMailchimp: jest.fn(),
}));

import { POST } from './route';
import { NextRequest, NextResponse } from 'next/server';

global.fetch = jest.fn();

describe('Newsletter API', () => {
  const originalConsoleError = console.error;
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to default success mock
    (mailchimp.lists.addListMember as jest.Mock).mockResolvedValue({
      id: 'test-id',
    });
  });

  beforeAll(() => {
    console.error = jest.fn();
    process.env.UPSTASH_REDIS_REST_URL = 'test-redis-url';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-redis-token';
    process.env.MAILCHIMP_API_KEY = 'test-api-key';
    process.env.MAILCHIMP_LIST_ID = 'test-list-id';
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('missing fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('Todos los campos son requeridos');
  });

  it('invalid email', async () => {
    (mailchimp.lists.addListMember as jest.Mock).mockRejectedValue({
      response: {
        body: {
          title: 'Invalid Resource',
        },
      },
    });
    const request = new NextRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        firstname: 'John',
        lastname: 'Doe',
        email: 'invalid-email',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('El formato del email no es válido');
  });

  it('invalid firstname', async () => {
    const request = new NextRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        firstname: 'J',
        lastname: 'Doe',
        email: 'john@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('El nombre debe tener al menos 3 caracteres');
  });

  it('invalid lastname', async () => {
    const request = new NextRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        firstname: 'John',
        lastname: 'D',
        email: 'john@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('El apellido debe tener al menos 3 caracteres');
  });

  it('email is already subscribed', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (mailchimp.lists.addListMember as jest.Mock).mockRejectedValue({
      response: {
        body: {
          title: 'Member Exists',
        },
      },
    });
    const request = new NextRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe(
      'Este email ya está suscrito a nuestro newsletter'
    );

    // Verify console.error was called with the correct error
    expect(consoleSpy).toHaveBeenCalledWith(
      'Newsletter subscription error:',
      expect.objectContaining({
        response: {
          body: {
            title: 'Member Exists',
          },
        },
      })
    );

    // Restore console.error
    consoleSpy.mockRestore();
  });

  it('rate limit exceeded', async () => {
    (rateLimit as jest.Mock).mockResolvedValueOnce(
      NextResponse.json(
        {
          message:
            'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.',
        },
        { status: 429 }
      )
    );

    const request = new NextRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.message).toBe(
      'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.'
    );
  });

  it('returns 201 for valid subscription', async () => {
    const request = new NextRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe('Suscriptor agregado exitosamente');
  });
});
