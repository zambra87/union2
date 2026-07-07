#!/usr/bin/env node

/**
 * Migra encargados del campo JSON legacy `leaders` a la tabla MinisterioLeader.
 * Ejecutar una sola vez después del deploy de imágenes.
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function createId() {
  return `mig_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

async function migrate() {
  const rows = await prisma.$queryRawUnsafe(`
    SELECT id, slug, leaders
    FROM "Ministerio"
    WHERE leaders IS NOT NULL
  `);

  for (const row of rows) {
    const leaders = row.leaders;

    if (!Array.isArray(leaders) || leaders.length === 0) {
      continue;
    }

    const existing = await prisma.ministerioLeader.count({
      where: { ministerioId: row.id },
    });

    if (existing > 0) {
      console.log(`Skipping ${row.slug}, leaders already migrated`);
      continue;
    }

    for (const leader of leaders) {
      if (!leader?.name) {
        continue;
      }

      await prisma.ministerioLeader.create({
        data: {
          id: createId(),
          name: leader.name,
          photoUrl: leader.image || '',
          ministerioId: row.id,
        },
      });
    }

    console.log(`Migrated leaders for ${row.slug}`);
  }
}

migrate()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
