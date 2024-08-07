const fastify = require('fastify')({ logger: true });
const path = require('path');

// Register Swagger
fastify.register(require('fastify-swagger'), {
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

fastify.get('/api/info', async (request, reply) => {
  return {
    name: "User Account API",
    version: "1.0.0",
    description: "First Name: John Last Name: Doe LastOrderAmount: 12$ Age: 45"
  };
});

// Serve Swagger UI
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/', // optional: default '/'
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '0.0.0.0');
    fastify.swagger(); // Generate the Swagger documentation
    fastify.log.info(`Server is running on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
