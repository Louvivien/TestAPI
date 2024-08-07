// index.js
const fastify = require('fastify')({ logger: true });
const path = require('path');
const FastifySwagger = require('@fastify/swagger');
const FastifyStatic = require('@fastify/static');

// Register Swagger
fastify.register(FastifySwagger, {
  exposeRoute: true,
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'User Account API',
      description: 'An API to provide user account information',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  }
});

// Register Static Files
fastify.register(FastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/', // optional: default '/'
});

// Define Route
fastify.get('/api/info', async (request, reply) => {
  return {
    name: "User Account API",
    version: "1.0.0",
    description: "First Name: John Last Name: Doe LastOrderAmount: 12$ Age: 45"
  };
});

// Start Server
const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || 3000,
      host: '0.0.0.0'
    });
    fastify.swagger(); // Generate Swagger documentation
    fastify.log.info(`Server is running on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
