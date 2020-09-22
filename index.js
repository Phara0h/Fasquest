const qs = require('querystring');
const url = require('url');
const client = {
  https: require('https'),
  http: require('http'),
};

const REDIRECT_CODES = [301, 302, 303, 307];
class SimpleError extends Error {
  constructor() {
    super('Error happened due to simple constraint not being 2xx status code.')
    this.name = 'FR_Simple';
  }
}
class RequestError extends Error {
  constructor(e) {
    super('Error happened reguarding a request: ' + e.message)
    this.name = 'FR_Request_'+e.name;
  }
}

class RequestTimeoutError extends Error {
  constructor(e) {
    super('Error happened reguarding a request: ' + e.message)
    this.name = 'FR_Request_Timeout';
  }
}

class Fasquest {
  constructor() {
    this.agent = {
      http: new client.http.Agent({
        keepAlive: true
      }),
      https: new client.https.Agent({
        keepAlive: true
      })
    };

  }
  request(options, cb = null) {
    if (!cb) {
      return this.requestPromise(options);
    } else {
      this._request(options, (req, res, err) => {
        cb({
          req,
          res,
          err
        });
      })
    }
  }
  requestPromise(options) {
    return new Promise((resolve, reject) => {
      this._request(options, (req, res, err) => {
        if (err) {
          reject({
            req,
            res,
            err
          })
        } else {
          resolve(options.resolveWithFullResponse ? res : res.body);
        }
      });
    });
  }
  _request(ops, cb, count = 0) {
    var options = this._setOptions(ops);

    var req = client[options.proto].request(options, (res) => {
      res.body = '';

      res.on('data', (chunk) => {
        res.body += chunk;
      });

      res.on('end', () => {
        clearTimeout(t);
        // remove as causes circular references

        if (
          REDIRECT_CODES.indexOf(res.statusCode) !== -1 &&
          count < options.redirect_max
        ) {
          options.uri = url.resolve(options.uri, res.headers.location);
          return this._request(this._setOptions(options), cb, ++count);
        } else {
          if (
            res.headers['content-type'] &&
            res.headers['content-type'].indexOf('json') > -1
          ) {
            try {
              res.body = JSON.parse(res.body);
            } catch (e) {
              // do nothing
            }
          }
          if (options.simple) {
            if (res.statusCode > 299 || res.statusCode < 200) {
              return cb(req, res, new SimpleError());
            }
          }
          return cb(req, res, null);
        }
      });
    });

    var t = setTimeout(() => {
      req.destroy();
    }, options.timeout || 60000);

    req.on('error', (e) => {
      var err =
        e.message.indexOf('socket hang up') > -1
          ? new RequestTimeoutError(e)
          : new RequestError(e);

      return cb(req, null, err);
    });

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  }
  _setOptions(opts) {
    var options = {};

    options.simple = opts.simple !== false;
    options.method = opts.method || 'GET';
    options.uri = opts.uri;
    if (opts.qs) {
      var escQS = qs.stringify(opts.qs);

      if (escQS.length > 0) {
        options.uri += (options.uri.indexOf('?') > -1 ? '&' : '?') + escQS;
      }
    }
    options = this._uri_to_options(options.uri, options);
    options.agent = opts.agent || this.agent[opts.proto];
    options.headers = {};
    if (opts.headers) {
      var h = Object.keys(opts.headers);

      for (var i = 0; i < h.length; i++) {
        options.headers[h[i]] = opts.headers[h[i]];
      }
    }
    if (opts.json) {
      options.headers['Content-Type'] = 'application/json';
      if (opts.body) {
        options.body = JSON.stringify(opts.body);
      }
    } else if (opts.form) {
      options.body = qs.stringify(opts.form);

      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.headers['Content-Length'] = Buffer.byteLength(opts.body);
    } else if (opts.body) {
      options.headers['Content-Length'] = Buffer.byteLength(opts.body);
      options.body = opts.body;
    }
    if (opts.authorization) {
      if (opts.authorization.basic) {
        options.headers['Authorization'] =
          'Basic ' +
          Buffer.from(
            opts.authorization.basic.client +
              ':' +
              opts.authorization.basic.secret,
            'ascii'
          ).toString('base64');
      } else if (opts.authorization.bearer) {
        options.headers['Authorization'] =
          'Bearer ' + opts.authorization.bearer;
      }
    }
    if (!opts.redirect_max && opts.redirect_max !== 0) {
      options.redirect_max = 5;
    }

    return options;
  }
  _uri_to_options(uri, options) {
    var convertedUri = {
      proto: '',
      path: '',
      port: 80,
      host: ''
    };
    var splitURI = uri.split('://');

    convertedUri.proto = splitURI[0];
    if (splitURI[1].indexOf(':') > -1) {
      const port_host = splitURI[1].split(':');
      const pindex = port_host[1].indexOf('/');

      if (pindex > -1) {
        splitURI[1] = port_host[1];
        convertedUri.path = splitURI[1].slice(pindex);
        convertedUri.port = splitURI[1].slice(0, pindex);
      } else {
        convertedUri.port = port_host[1];
      }
      convertedUri.host = port_host[0];
    } else {
      convertedUri.port = convertedUri.proto == 'https' ? 443 : 80;
    }
    const hostIndex = splitURI[1].indexOf('/');

    if (hostIndex > -1) {
      convertedUri.path = convertedUri.path || splitURI[1].slice(hostIndex);
      convertedUri.host = convertedUri.host || splitURI[1].slice(0, hostIndex);
    } else {
      convertedUri.path = convertedUri.path || '/';
      convertedUri.host = convertedUri.host || splitURI[1];
    }
    options.proto = convertedUri.proto;
    options.path = convertedUri.path;
    options.port = convertedUri.port;
    options.host = convertedUri.host;
    return options;
  }
}
module.exports = new Fasquest();
