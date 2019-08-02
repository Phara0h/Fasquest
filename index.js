const qs = require('querystring');

const client = {
  https: require('https'),
  http: require('http'),
};

const agent = {
  http: new client.http.Agent(
  {
    keepAlive: true
  }),
  https: new client.https.Agent(
  {
    keepAlive: true
  })
};

class SimpleError extends Error
{
  constructor()
  {
    super(
      'Error happened due to simple constraint not being 2xx status code.')
    this.name = 'FR_Simple';
  }
}

class RequestError extends Error
{
  constructor(e)
  {
    super('Error happened reguarding a request: ' + e.message)
    this.name = 'FR_Simple';
  }
}

class FastRequest
{
  constructor()
  {}

  request(options, cb = null)
  {
    if (!cb)
    {
      return this.requestPromise(options);
    }
    else
    {
      this._request(options, (err, req, res) =>
      {
        const connection = res.info || res.connection;
        reject(
        {
          req,
          res,
          err
        });
      })
    }
  }

  requestPromise(options)
  {
    return new Promise((resolve, reject) =>
    {
      this._request(options, (req, res, err) =>
      {
        if (err)
        {
          reject(
          {
            req,
            res,
            err
          })
        }
        else
        {
          resolve(options.resolveWithFullResponse ? res : res.body);
        }
      });
    });
  }

  _request(options, cb)
  {
    options = this._setOptions(options);

    var req = client[options.proto].request(options.uri, options, (res) =>
    {
      res.body = '';
      res.on('data', (chunk) =>
      {
        res.body += chunk;
      });
      res.on('end', () =>
      {
        // remove as causes circular references
        delete options.agent;

        if (res.headers['content-type'] && res.headers['content-type'].indexOf('json') > -1)
        {
          res.body = JSON.parse(res.body);
        }
        if (options.simple)
        {
          if (res.statusCode > 299 || res.statusCode < 200)
          {
            return cb(req, res, new SimpleError());
          }
        }

        return cb(req, res, null);
      });
    });

    req.on('error', (e) =>
    {
      // remove as causes circular references
      delete options.agent;

      return cb(req, null, new RequestError(e))
    });

    if (options.body)
    {
      req.write(options.json ? JSON.stringify(options.body) : options.body);
    }

    req.end();
  }

  _setOptions(options)
  {
    options.proto = options.proto || options.uri.split(':')[0];

    options.simple = options.simple !== false;

    if (options.qs)
    {
      var escQS = qs.stringify(options.qs);

      if (escQS.length > 0)
      {
        options.uri += (options.uri.indexOf('?') > -1 ? '&' : '?') + escQS;
      }
    }

    options.agent = options.agent || agent[options.proto];

    if (!options.headers)
    {
      options.headers = {};
    }

    if (options.json)
    {
      options.headers['Content-Type'] = 'application/json';
    }
    else if (options.form)
    {
      options.body = qs.stringify(options.form);
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.headers['Content-Length'] = Buffer.byteLength(options.body);
    }

    return options;
  }
}
module.exports = new FastRequest();
