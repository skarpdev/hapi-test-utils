const Hapi = require('hapi');
const uexpect = require('unexpected');
const fakeAuth = require('./fakeAuthScheme');

const fakeCreds = { name: 'bob testor' };
const credentialsFn = () => {
  return fakeCreds;
};

describe('fake auth scheme', () => {
  let server;
  beforeEach(async () => {
    server = new Hapi.Server({});
    await server.register(fakeAuth);
    await server.auth.strategy('session', 'fake', {
      credentialsFn
    });
  });

  it('resolves with credentials', async () => {
    const path = '/testauth';
    let capturedCreds;

    server.route({
      method: 'get',
      path,
      options: {
        auth: 'session',
        handler: async (req) => {
          capturedCreds = req.auth.credentials;
          return '';
        }
      }
    });

    await server.inject({
      url: path,
      method: 'get'
    });

    uexpect(capturedCreds,
      'to exhaustively satisfy',
      fakeCreds
    );
  });
});
