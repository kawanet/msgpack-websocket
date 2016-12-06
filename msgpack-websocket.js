// msgpack-websocket.js

function msgpackWebSocket(ws, onmessage) {
  var _msgpack = ("undefined" !== typeof msgpack) ? msgpack : require("msgpack-lite");
  var send = ws.send;
  ws.send = _send;
  ws.onmessage = _onmessage;
  ws.binaryType = "arraybuffer";
  return ws;

  function _send(data, callback) {
    data = new Uint8Array(_msgpack.encode(data)).buffer;
    return send.call(ws, data, callback);
  }

  function _onmessage(msg) {
    msg.data = _msgpack.decode(new Uint8Array(msg.data));
    if (onmessage) return onmessage.call(ws, msg);
  }
}

if ("undefined" !== typeof exports) {
  exports.msgpackWebSocket = msgpackWebSocket;
}
