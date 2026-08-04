import { NextRequest, NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { validateInput } from '@/lib/forms/newsletter/validators';
import {
  getMissingMailchimpEnvVars,
  initializeMailchimp,
  mailchimpConfig,
} from '@/lib/mailchimp/config';
import { rateLimit } from '@/lib/rate-limit';
import { MailchimpErrorResponse } from '@/lib/mailchimp/types';

function isMailchimpError(error: unknown): error is MailchimpErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as MailchimpErrorResponse).response?.body?.title === 'string'
  );
}

const handleSubscriptionError = (error: unknown) => {
  if (isMailchimpError(error)) {
    const { title } = error.response.body;

    if (title === 'Member Exists') {
      return NextResponse.json(
        { message: 'Este email ya está suscrito a nuestro newsletter' },
        { status: 400 }
      );
    }

    if (error.response.status === 401) {
      console.error('Mailchimp API authentication error');
      return NextResponse.json(
        { message: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    if (title === 'Resource Not Found') {
      console.error('Mailchimp list not found');
      return NextResponse.json(
        { message: 'No existe la lista de correo' },
        { status: 500 }
      );
    }

    if (error.response.status >= 500) {
      console.error('Mailchimp server error:', error.response.body);
      return NextResponse.json(
        { message: 'El servicio no está disponible en este momento' },
        { status: 503 }
      );
    }

    console.error('Mailchimp subscription error:', error.response.body);
  } else if (error instanceof Error && error.name === 'AbortError') {
    return NextResponse.json(
      {
        message:
          'El servicio tardó demasiado en responder. Inténtalo de nuevo.',
      },
      { status: 504 }
    );
  } else {
    console.error('Newsletter subscription error:', error);
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
    const missingVars = getMissingMailchimpEnvVars();
    if (missingVars.length > 0) {
      console.error(
        'Missing newsletter environment variables:',
        missingVars.join(', ')
      );
      return NextResponse.json(
        { message: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    initializeMailchimp();

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
    return handleSubscriptionError(error);
  } finally {
    clearTimeout(timeoutId);
  }
}
