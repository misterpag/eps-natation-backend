import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Example route: Get all classes
fastify.get('/classes', async (request, reply) => {
  const classes = await prisma.class.findMany({
    include: { students: true },
  });
  return classes;
});

fastify.listen({ port: process.env.PORT || 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
