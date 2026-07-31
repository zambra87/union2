// Add this at the top of your file, before any mailchimp calls
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

import { NextRequest, NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { validateInput } from '@/lib/forms/newsletter/validators';
import { initializeMailchimp, mailchimpConfig } from '@/lib/mailchimp/config';
import { rateLimit } from '@/lib/rate-limit';
import { MailchimpErrorResponse } from '@/lib/mailchimp/types';

initializeMailchimp();

// Validate all environment variables at once
const validateConfig = () => {
  const missingVars = Object.entries(mailchimpConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
};

validateConfig();

const handleMailchimpError = (error: MailchimpErrorResponse) => {
  // Handle specific Mailchimp error cases
  if (error.response.body.title === 'Member Exists') {
    return NextResponse.json(
      { message: 'Este email ya está suscrito a nuestro newsletter' },
      { status: 400 }
    );
  }

  // Authentication error
  if (error.response?.status === 401) {
    console.error('Mailchimp API authentication error');
    return NextResponse.json(
      { message: 'Error de configuración del servidor' },
      { status: 500 }
    );
  }
  // List not found
  if (error.response.body.title === 'Resource Not Found') {
    console.error('Mailchimp list not found');
    return NextResponse.json(
      { message: 'No existe la lista de correo' },
      { status: 500 }
    );
  }
  // Server errors
  if (error.response?.status >= 500) {
    console.error('Mailchimp server error:', error.response.body);
    return NextResponse.json(
      { message: 'El servicio no está disponible en este momento' },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { message: 'Error al suscribirse al newsletter' },
    { status: 500 }
  );
};

export async function POST(request: NextRequest) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) return rateLimitResult;

    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 1024) {
      return NextResponse.json(
        { message: 'Request body too large' },
        { status: 413 }
      );
    }
    const body = await request.json();
    const validation = validateInput(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { message: validation.error?.message || 'Error de validación' },
        { status: validation.error?.status || 400 }
      );
    }

    const { email, firstname, lastname } = validation.data!;

    await mailchimp.lists.addListMember(mailchimpConfig.listId!, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname,
      },
    });

    return NextResponse.json(
      { message: 'Suscriptor agregado exitosamente' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);

    return handleMailchimpError(error as MailchimpErrorResponse);
  } finally {
    clearTimeout(timeoutId);
  }
}
