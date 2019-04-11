(function() {
    var sw = new SharedWorker('./js/sharedWorker.js?1234');
    sw.port.onmessage = function(message) {
        console.log('受け取ったよ =>', message.data.body);
        var messageBody = message.data.body;
        document.getElementById('logger').innerText = messageBody;
    }
    sw.port.start();
})()