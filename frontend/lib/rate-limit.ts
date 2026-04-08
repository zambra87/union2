import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RATE_LIMIT = 5; // requests
const WINDOW_SIZE = 60; // seconds

export async function rateLimit(request: NextRequest) {
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
}
