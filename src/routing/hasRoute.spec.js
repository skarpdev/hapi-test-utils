const Hapi = require('hapi');
const hasRoute = require('./hasRoute');

describe('routing: hasRoute', () => {
  let server;
  beforeEach(async () => {
    server = new Hapi.Server({});

    server.route({
      path: '/hello',
      method: 'get',
      options: {
        handler: () => {
          return 'hello'
        }
      }
    });
  });

  it('returns true when route exist', () => {
    expect(hasRoute(server, '/hello', 'get')).toBeTruthy();
  });

  it('returns false when route does not exist', () => {
    expect(hasRoute(server, '/not-there', 'get')).toBeFalsy();
  });

  it('returns false when route is there but method invalid', () => {
    expect(hasRoute(server, '/hello', 'post')).toBeFalsy();
  });

  it('works when no routes are registered', () => {
    const otherServer = new Hapi.Server({});
    expect(hasRoute(otherServer, '/something', 'get')).toBeFalsy();
  });
});
