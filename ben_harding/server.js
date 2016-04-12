const net = require('net');
const fs = require('fs');

const slothbearServer = module.exports = exports = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    fs.writeFile(__dirname + '/' + Date.now() + '.txt', chunk, () => {
      socket.end();
      console.log('fin sent');
    });
  });
});

slothbearServer.listen(3000, () => {
  process.stdout.write('server up on 3000\n');
});
