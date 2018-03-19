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

  describe('auth', () => {
    it('exports object', () => {
      uexpect(
        lib.auth,
        'to exhaustively satisfy', {
          fakeAuthScheme: {
            register: uexpect.it('to be a function'),
            version: uexpect.it('to be a string'),
            name: uexpect.it('to be a string'),
          }
        }
      );
    })
  });
})
