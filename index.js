// index.js
const fastify = require('fastify')({ logger: true });

fastify.get('/api/info', async (request, reply) => {
  return {
    name: "User Account API",
    version: "1.0.0",
    description: "First Name: John Last Name: Doe LastOrderAmount: 12$ Age: 45"
  };
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '0.0.0.0');
    fastify.log.info(`Server is running on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
