const uexpect = require('unexpected');

const lib = require('./index');


describe('hapi-test-utils', () => {
  describe('routing', () => {
    it('exports object', () => {
      uexpect(
        lib.routing,
        'to exhaustively satisfy', {
          hasRoute: uexpect.it('to be a function')
        }
      );
    });
  });
})
