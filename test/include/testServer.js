
  var fastify = require('fastify')();

  fastify.use((req, res, next) => {

      if (req.headers['origin']) {
          res.setHeader('access-control-allow-origin', req.headers['origin']);
      }

      if (req.headers['access-control-request-method']) {
          res.setHeader('access-control-allow-methods',  req.headers['access-control-request-method'] || '*');
      }

      if (req.headers['access-control-request-headers']) {
          res.setHeader('access-control-allow-headers', req.headers['access-control-request-headers'] || '*');
      }
      next();
  });
  fastify.options('/*', (req, res) => {

      res.header('access-control-max-age', 6400);
      res.code(204).send();
  });

  fastify.post('/', function (req, reply)
  {

    reply.code(200).send({
      body: req.body,
      query: req.query,
      params: req.params,
      url: req.req.url,
      method: req.raw.method,
      headers: req.headers,
      // raw: req.raw,
      id: req.id,
      ip: req.ip,
      ips: req.ips,
      hostname: req.hostname,
    });
  })

  fastify.get('/', function (req, reply)
  {


    reply.code(200).send({
      body: req.body,
      query: req.query,
      params: req.params,
      url: req.req.url,
      method: req.raw.method,
      headers: req.headers,
      // raw: req.raw,
      id: req.id,
      ip: req.ip,
      ips: req.ips,
      hostname: req.hostname,
    });
  })

  fastify.get('/bench', function (req, reply)
  {

    reply.code(200).send();
  })

  fastify.get('/redirect', function (req, reply)
  {

    reply.redirect('/bench')
  })


  module.exports = async function() {
      await fastify.listen(1237);
  }
