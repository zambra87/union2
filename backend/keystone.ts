import path from 'node:path';
import express from 'express';
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { PORT, DATABASE_URL } from './config';
import { withAuth, session } from './auth';

const ASSET_BASE_URL =
  process.env.ASSET_BASE_URL ||
  `http://localhost:${process.env.PORT || 3001}`;

const useS3 =
  process.env.S3_BUCKET_NAME &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY;

const storage = useS3
  ? {
      ministerio_images: {
        kind: 's3' as const,
        type: 'image' as const,
        bucketName: process.env.S3_BUCKET_NAME!,
        region: process.env.S3_REGION || 'us-east-1',
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        generateUrl: (key: string) => {
          const cdn = process.env.CDN_URL?.replace(/\/$/, '');
          if (cdn) return `${cdn}/${key}`;
          const region = process.env.S3_REGION || 'us-east-1';
          const bucket = process.env.S3_BUCKET_NAME!;
          return region === 'us-east-1'
            ? `https://${bucket}.s3.amazonaws.com/${key}`
            : `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
        },
      },
    }
  : {
      ministerio_images: {
        kind: 'local' as const,
        type: 'image' as const,
        generateUrl: (key: string) =>
          `${ASSET_BASE_URL.replace(/\/$/, '')}/uploads/${key}`,
        serverRoute: {
          path: '/uploads',
        },
        storagePath: 'public/uploads',
      },
    };

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: DATABASE_URL,
      prismaClientPath: 'node_modules/.prisma/client',
    },
    storage,
    server: {
      port: PORT,
      cors: {
        credentials: true,
        origin: [
          'http://localhost:3000',
          'https://unionchurch.cl',
          'https://www.unionchurch.cl',
          'https://admin.unionchurch.cl',
          /^https:\/\/union2.*\.vercel\.app$/,
        ],
      },
      extendExpressApp: (app) => {
        if (!useS3) {
          app.use(
            '/uploads',
            express.static(path.join(process.cwd(), 'public', 'uploads'))
          );
        }
      },
    },
    lists,
    session,
    graphql: {
      path: '/api/graphql',
      cors: {
        origin: [
          'http://localhost:3000',
          'https://unionchurch.cl',
          'https://www.unionchurch.cl',
          'https://admin.unionchurch.cl',
          /^https:\/\/union2.*\.vercel\.app$/,
        ],
        credentials: true,
      },
    },
  })
);
