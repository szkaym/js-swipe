(function() {
    var sw = new SharedWorker('./js/sharedWorker.js?1234');
    var send = function() {
        var sendData = '(´•ω•`๑)';
        sw.port.postMessage({
            'head' : 'text',
            'body' : sendData
            });
        console.log('(おくったよ)');
    }
    sw.port.start();
    document.querySelector('#sendAnchor').addEventListener('click', send);
})();