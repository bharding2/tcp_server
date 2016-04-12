const net = require('net');
const fs = require('fs');

const slothbearServer = module.exports = exports = net.createServer((socket) => {
  var currentTime = Date.now();
  var fileToWrite = fs.createWriteStream(__dirname + '/' + currentTime + '.txt');
  socket.pipe(fileToWrite);
  socket.on('data', () => {
    socket.end('' + currentTime);
    console.log('fin sent');
  });
});

slothbearServer.listen(3000, () => {
  process.stdout.write('server up on 3000\n');
});
