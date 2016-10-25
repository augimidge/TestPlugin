export default function (server) {

  server.route({
    path: '/api/augi_testplugin/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

};
