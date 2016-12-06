#!/usr/bin/env mocha

var createServer = require("http").createServer;
var WebSocket = require("ws");
var TITLE = __filename.replace(/^.*\//, "");
var msgpackWebSocket = require("../msgpack-websocket").msgpackWebSocket;
var assert = require("assert");

var port = process.env.PORT || Math.floor(8000 + 900 * Math.random());

describe(TITLE, function() {
  var endpoint = "http://127.0.0.1:" + port;

  it("server.listen(" + port + ")", function(done) {
    var server = createServer();
    var wss = new WebSocket.Server({server: server});

    // echo server
    wss.on("connection", function(ws) {
      ws = msgpackWebSocket(ws, echo);

      function echo(msg) {
        ws.send(msg.data);
      }
    });

    server.listen(port, function() {
      done();
    });
  });

  it(endpoint, function(done) {
    var ws = new WebSocket(endpoint);
    ws = msgpackWebSocket(ws, onmessage);
    var cnt = 0;

    function onmessage(msg) {
      if (cnt++ === 0) {
        assert.equal(msg.data.hello, "World!");
      } else {
        assert.equal(msg.data[0], -1);
        ws.close();
      }
    }

    ws.onclose = function() {
      done(); // 5. success
    };

    ws.onerror = done; // failure

    ws.onopen = function() {
      ws.send({hello: "World!"});
      ws.send([-1]);
    };
  });
});
