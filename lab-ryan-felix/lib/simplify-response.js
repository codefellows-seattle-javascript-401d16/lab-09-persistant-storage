'use strict';

module.exports = (res) => {
  res.send = (status, data) => {
    res.writeHead(status, {
      'Content-Type': 'text/plain',
    });
    res.write(data);
    res.end();
  };

  res.sendStatus = (status) => {
    res.writeHead(status);
    res.end();
  };

  res.json = (status, data) => {
    res.writeHead(status, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(data));
    res.end();
  };
};
