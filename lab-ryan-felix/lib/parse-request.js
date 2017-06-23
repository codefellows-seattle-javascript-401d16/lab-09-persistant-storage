const url = require('url');
const querystring = require('querystring');

module.exports = (req, callback) => {

  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'POST' || req.method === 'PUT') {
    let text = '';
    req.on('data', (buf) => {
      text += buf.toString();
    });

    req.on('end', (err) => {
      if(err) {
        callback(err);
      }
      req.text = text;
      try {
        req.body = JSON.parse(text);
        // NOTE: do not put any other function calls here!
      } catch (err) {
        callback(err);
        return;
      }
      callback(null);
    });

    req.on('err', (err) => {
      req.body = {};
      req.text = '';
      callback(err);
    });

  } else {
    req.body = {};
    req.text = '';
    callback(null);
  }
};
