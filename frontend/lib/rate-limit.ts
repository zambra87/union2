import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const RATE_LIMIT = 5;
const WINDOW_SIZE = 60;

function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

export async function rateLimit(request: NextRequest) {
  const redis = getRedisClient();
  if (!redis) {
    return null;
  }

  try {
    const ip = request.ip ?? '127.0.0.1';
    const key = `rate-limit:${ip}`;

    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, WINDOW_SIZE);
    }

    if (current > RATE_LIMIT) {
      return NextResponse.json(
        {
          message:
            'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.',
        },
        { status: 429 }
      );
    }
  } catch (error) {
    console.error('Rate limit check failed:', error);
  }

  return null;
}
