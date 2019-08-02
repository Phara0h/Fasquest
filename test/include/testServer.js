module.exports = async function testServer()
{
  var fastify = require('fastify')()

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

  await fastify.listen(1237)

  this.exit = async () =>
  {
    return await fastify.close(1);
  }
  return this;

}
