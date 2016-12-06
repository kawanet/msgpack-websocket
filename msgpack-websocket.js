/**
 * Apply msgpack encoder and decoder on the WebSocket
 *
 * @param ws {WebSocket}
 * @param ondata {Function}
 * @returns {WebSocket}
 */

function msgpackWebSocket(ws, ondata) {
  var _msgpack = ("undefined" !== typeof msgpack) ? msgpack : require("msgpack-lite");
  var _send = ws.send;
  ws.send = send;
  ws.onmessage = onmessage;
  ws.binaryType = "arraybuffer";
  return ws;

  function send(data, callback) {
    data = new Uint8Array(_msgpack.encode(data)).buffer;
    return _send.call(ws, data, callback);
  }

  function onmessage(msg) {
    var data = _msgpack.decode(new Uint8Array(msg.data));
    if (ondata) return ondata.call(ws, data);
  }
}

if ("undefined" !== typeof exports) {
  exports.msgpackWebSocket = msgpackWebSocket;
}
