-- CreateTable
CREATE TABLE "Ministerio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "order" INTEGER DEFAULT 0,
    "showInMenu" BOOLEAN NOT NULL DEFAULT true,
    "showOnHomepage" BOOLEAN NOT NULL DEFAULT true,
    "externalUrl" TEXT NOT NULL DEFAULT '',
    "logoInvert" BOOLEAN NOT NULL DEFAULT false,
    "eyebrow" TEXT NOT NULL DEFAULT 'MINISTERIOS',
    "title" TEXT NOT NULL DEFAULT '',
    "intro" TEXT NOT NULL DEFAULT '',
    "heroImageUrl" TEXT NOT NULL DEFAULT '',
    "logoUrl" TEXT NOT NULL DEFAULT '',
    "descriptionTitle" TEXT NOT NULL DEFAULT 'Descripción',
    "description" TEXT NOT NULL DEFAULT '',
    "scheduleLabel" TEXT NOT NULL DEFAULT 'Horario',
    "scheduleValue" TEXT NOT NULL DEFAULT '',
    "locationLabel" TEXT NOT NULL DEFAULT 'Ubicación',
    "locationValue" TEXT NOT NULL DEFAULT '',
    "leadersLabel" TEXT NOT NULL DEFAULT 'Encargados',
    "leaders" JSONB,

    CONSTRAINT "Ministerio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ministerio_slug_key" ON "Ministerio"("slug");
