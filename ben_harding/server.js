const net = require('net');
const fs = require('fs');

const slothbearServer = module.exports = exports = net.createServer((socket) => {
  var fileToWrite = fs.createWriteStream(__dirname + '/' + Date.now() + '.txt');
  socket.pipe(fileToWrite);
  socket.end();
  console.log('fin sent');
});

slothbearServer.listen(3000, () => {
  process.stdout.write('server up on 3000\n');
});
