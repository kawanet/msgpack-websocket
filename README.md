# msgpack-websocket.js [![npm version](https://badge.fury.io/js/msgpack-websocket.svg)](http://badge.fury.io/js/msgpack-websocket)

## SYNOPSIS

Server:

```js
var createServer = require("http").createServer;
var WebSocket = require("ws");
var msgpackWebSocket = require("msgpack-websocket").msgpackWebSocket;

var server = createServer();
var wss = new WebSocket.Server({server: server});

wss.on("connection", function(ws) {
  msgpackWebSocket(ws, ondata);

  function ondata(data) {
    ws.send(data); // echo
  }
});

server.listen(3000);
```

Client:

```js
var ws = new WebSocket("http://127.0.0.1:3000");
msgpackWebSocket(ws, ondata);

function ondata(data) {
  console.warn(data.hello); // -> "world!"
}

ws.onopen = function() {
  ws.send({hello: "world!"});
};
```

## SEE ALSO

### NPM

- [https://www.npmjs.com/package/msgpack-websocket](https://www.npmjs.com/package/msgpack-websocket)

### GitHub

- [https://github.com/kawanet/msgpack-websocket](https://github.com/kawanet/msgpack-websocket)

## LICENSE

The MIT License (MIT)

Copyright (c) 2016 Yusuke Kawasaki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
