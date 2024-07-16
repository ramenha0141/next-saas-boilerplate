import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

function createPrismaClient() {
	const neon = new Pool({ connectionString: process.env.DATABASE_URL });
	const adapter = new PrismaNeon(neon);
	const prisma = new PrismaClient({ adapter });

	return prisma;
}

const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
