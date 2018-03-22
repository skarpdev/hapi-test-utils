# hapi-test-utils

This package provides common helpers for testing hapijs code.
It is currently compatible with hapi v17 and therefore also only works on nodejs 8.

Install the module as a dev dependency

```bash
yarn add --dev hapi-test-utils # or npm install --save-dev hapi-test-utils
```

The package exports and object with "namespaces" for the various test functionality, which will be covered below
## Routes

The `routing` namespace currently contains one helper for testing whether routes have been registered. Imagine some code like this

```js
const Hapi = require('hapi');

const server = new Hapi.Server({});

server.route({
    method: 'get',
    path: '/hello',
    handler: () => return 'hello';
});
```

One can of course test that the hapi server responds with hello, however, the `hasRoute` helper from this library can help you test whether your routes / plugin have been registered in hapi according to specification:

```js
const { hasRoute } = require('hapi-test-util').routing;

// Test in jest format
describe('hello api', () => {
    it('has a get /hello route', () => {
        // we are using server instance described above.
        expect(hasRoute(server, '/hello', 'get')).toBe(true);
    });
});
```

## Auth

*TODO*
