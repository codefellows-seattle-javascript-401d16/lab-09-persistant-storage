'use strict';

module.exports = (res) => {
  res.sendText = (status, data) => {
    res.writeHead(status, {
      'Content-type': 'text/plain',
    });
    res.write(data);
    res.end();
  };
  res.sendStatus = (status) => {
    res.writeHead(status, {
      'Content-type': 'text/plain',
    });
    res.end();
  };
  res.sendJSON = (status, data) => {
    res.writeHead(status, {
      'Content-type': 'application/json',
    });
    res.write(JSON.stringify(data));
    res.end();
  };
};
