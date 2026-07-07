# Deploy — Union Church

## Arquitectura

| Servicio | URL | Stack |
|----------|-----|-------|
| Sitio público | https://unionchurch.cl | Next.js en Vercel |
| Admin / API | https://admin.unionchurch.cl | Keystone 6 + PostgreSQL |

---

## 1. Backend (Keystone)

### Variables de entorno requeridas

```bash
DATABASE_URL=postgresql://...
SESSION_SECRET=...
PORT=3001
ASSET_BASE_URL=https://admin.unionchurch.cl   # desarrollo local

# Producción — subida de imágenes a S3
S3_BUCKET_NAME=tu-bucket
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
CDN_URL=https://dogeto6fbhozh.cloudfront.net
```

### Deploy

```bash
cd backend
npm install
npm run build    # keystone build + prisma migrate deploy
npm run start    # keystone start
```

**Importante:** usar Node.js 20 en el servidor (Keystone/Prisma fallan con Node 26).

### Migraciones incluidas en este release

1. `20260707120000_ministerios` — tabla Ministerio
2. `20260707130000_ministerio_images` — campos de imagen + MinisterioLeader

### Post-deploy (solo la primera vez con ministerios)

```bash
node scripts/seed-ministerios.js      # si la BD está vacía
node scripts/migrate-leaders.js       # migra encargados del JSON legacy
```

---

## 2. Frontend (Vercel)

### Configuración del proyecto

- **Root Directory:** `frontend`
- **Install Command:** `pnpm install`
- **Build Command:** `pnpm build`

El archivo `frontend/vercel.json` ya incluye esta configuración.

### Variables de entorno en Vercel

| Variable | Valor producción |
|----------|------------------|
| `PRODENDPOINT` | `https://admin.unionchurch.cl/api/graphql` |
| `YOUTUBE_KEY` | (tu API key) |
| `YOUTUBE_CHANNEL_ID` | (tu channel ID) |
| `SERVICES_PLAYLIST_ID` | (playlist servicios) |
| `SHEPPERD_PLAYLIST_ID` | (playlist escritorio) |
| `MAILCHIMP_API_KEY` | (tu API key) |
| `MAILCHIMP_LIST_ID` | (tu list ID) |
| `UPSTASH_REDIS_REST_URL` | (tu URL Upstash) |
| `UPSTASH_REDIS_REST_TOKEN` | (tu token) |

`ENDPOINT` solo se usa en desarrollo local.

### Deploy

```bash
cd frontend
pnpm install
pnpm build
```

O conectar el repo `zambra87/union2` en Vercel con root `frontend` y hacer push a `main`.

---

## 3. Subida de imágenes en el admin

En **Ministerios** ahora puedes subir directamente:

- **Imagen hero** — banner de la página del ministerio
- **Logo** — icono del menú y del inicio
- **Encargados → Foto** — foto de cada líder (agregar encargados desde el formulario del ministerio)

### Comportamiento por entorno

| Entorno | Storage | URL generada |
|---------|---------|--------------|
| Local (sin S3) | Disco (`backend/public/uploads/`) | `http://localhost:3001/uploads/...` |
| Producción (con S3) | Amazon S3 | `https://dogeto6fbhozh.cloudfront.net/...` |

Los campos URL legacy (`heroImageUrl`, `logoUrl`) siguen funcionando como respaldo para datos antiguos.

---

## 4. Checklist de deploy

- [ ] Push de cambios a GitHub (`main`)
- [ ] Backend: `npm run build` en el servidor
- [ ] Backend: variables S3 configuradas
- [ ] Backend: reiniciar proceso Keystone
- [ ] Vercel: redeploy del frontend
- [ ] Verificar https://unionchurch.cl
- [ ] Verificar https://admin.unionchurch.cl (crear/editar un ministerio con imagen)
- [ ] Verificar menú y logos del inicio
