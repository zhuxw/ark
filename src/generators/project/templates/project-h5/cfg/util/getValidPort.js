"use strict";

var http = require('http');

function getValidPort(host, port, callback) {
  var server = http.createServer().listen(port, host);

  server.on('listening', function() {
    server.close();

    // found one!
    getValidPort.lastValidPort = port;
    callback(port);
  });

  server.on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
      if (port > 65535) {
        callback(false);
      } else {
        console.log('port ' + port + ' is occupied.');
        getValidPort(host, port + 1, callback);
      }
    }
  });
}

module.exports = getValidPort;