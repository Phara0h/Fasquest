
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
    var
    {
      raw,
      ...r
    } = req;

    reply.code(200).send(r);
  })

  fastify.get('/', function (req, reply)
  {

    var
    {
      raw,
      ...r
    } = req;
  
    reply.code(200).send(r);
  })

  fastify.get('/bench', function (req, reply)
  {

    reply.code(200).send();
  })

  fastify.get('/redirect', function (req, reply)
  {

    reply.redirect('https://google.com')
  })
  fastify.listen(1237)
