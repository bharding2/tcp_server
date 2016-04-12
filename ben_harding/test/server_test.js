const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const slothbear_server = require(__dirname + '/../server');

chai.use(chaiHttp);

describe('tcp server', () => {
  var oldNumFiles;
  var newNumFiles;

  before(() => {
    var oldList = fs.readdirSync(__dirname + '/../');
    oldNumFiles = oldList.length;
    slothbear_server.listen(3000, (socket) => {
      process.stdout.write('server up on 3000\n');
    });
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
