const net = require('net');
const fs = require('fs');

const slothbear_server = module.exports = exports = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    fs.writeFile(__dirname + '/' + Date.now() + '.txt', chunk, () => {
      socket.end();
      console.log('fin sent');
      slothbear_server.close();
    });
  });
});

slothbear_server.listen(3000, (socket) => {
  process.stdout.write('server up on 3000\n');
});
