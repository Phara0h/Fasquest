describe('Fast Request', () =>
{
  var server;
  var fastRequest = require('../index.js')
  var options = {
    uri: 'http://127.0.0.1:1237/',
    resolveWithFullResponse: true,
    json: true
  }

  test('start server', async () =>
  {
    server = await require('./include/testServer.js')();
    expect(1).toBe(1);
  })

  describe('Promise', () =>
  {
    test('Simple Get', async () =>
    {
      var res = await fastRequest.request(options)
      console.log(res.body)
      expect(1).toBe(1);
    })

    test('Simple Get with QS', async () =>
    {
      options.qs = {
        foo: "foo",
        bar: "bar"
      }
      var res = await fastRequest.request(options)
      expect(res.body.query).toEqual(options.qs);
    })

  })

  test('stop server', async () =>
  {
    await server.exit();
    expect(1).toBe(1);
  })
});
