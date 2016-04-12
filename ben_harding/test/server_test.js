const chai = require('chai');
const chaiHttp = require('chai-http');
const net = require('net');
const fs = require('fs');
const slothbearServer = require(__dirname + '/../server');

chai.use(chaiHttp);

describe('tcp server', () => {
  var oldNumFiles;
  var newNumFiles;

  before(() => {
    var oldList = fs.readdirSync(__dirname + '/../');
    oldNumFiles = oldList.length;
  });

  after(() => {
    // slothbearServer.close();
  });

  it('should connect and write the request to a file', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end(() => {
        var newList = fs.readdirSync(__dirname + '/../');
        newNumFiles = newList.length;
        chai.expect(newNumFiles).to.eql(oldNumFiles + 1);
        done();
      });
  });
});

describe('another test', () => {
  it('should log the right file', (done) => {
    var client = net.connect({ port: 3000 }, () => {
      client.write('hello test');
    });
    client.on('data', (chunk) => {
      var fileContents = fs.readFileSync(__dirname + '/../' + chunk.toString() + '.txt');
      chai.expect(fileContents.toString()).to.eql('hello test');
      slothbearServer.close();
      done();
    });
  });
});
