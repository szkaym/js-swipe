var clients = [];
var broadcast = function(message) {
    clients.map(function(port) {
        port.postMessage(message);
    });
}

onconnect = function(event) {
    var port = event.ports[0];
    clients.push(port);
    port.onmessage = function(message) {
        var res = message.data;
        // broadcast
        broadcast(res);
    }
    port.start();
    broadcast(res);
}