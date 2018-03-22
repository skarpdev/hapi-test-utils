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

Often you develop apis that are either fully protected or partially protected with authentication and authorization, e.g like this:

```js
const Hapi = require('hapi');

// Ugly pattern for brewity, this addRootRoute should be made into a plugin instead!
const addRootRoute = (server) => {
    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: 'simple'
        },
        handler: function (request, h) {
            return $`welcome request.auth.credentials.name`;
        }
    });
};

const server = new Hapi.Server({});
await server.register(require('hapi-auth-basic'));

// validate function cut out for brewity
server.auth.strategy('simple', 'basic', { validateFn });
addRootRoute(server);
```

Now you can't easily test this `/` handler as you have to provide correct credentials for the `validateFn`, which might go into the database and so forth.

To overcome this, the `fake auth scheme` from this package can be utilized. The fake auth scheme takes in a `credentialsFn` which should return an object with the authenticated user's credentials - but no real authentication is going to take place, it will simply inject the credentials into the hapi auth pipeline as if real auth had taken place.

An example:

```js
const Hapi = require('hapi');
const { fakeAuthScheme } = require('hapi-test-utils').auth;

// this function is passed to the fake auth scheme to provide the required credentials to the hapi route function
const credentialsFn = () => {
    return {
        name: 'Bob The Builder'
    }
};

describe('root route', () => {
    let server;
    // create a new test server before each test execution
    beforeEach(async () => {
        server = new Hapi.server({});
        // get in the fake auth scheme
        await server.register(fakeAuthScheme);
        // register the fake strategy under the name 'simple' to satisfy the root route's requirements
        server.auth.strategy('simple', 'fake', {
            credentialsFn
        });

        // add the route like we did above, really, it should have been a plugin
        addRootRoute(server);
    })
    it('responds with user name', async () => {
        const request = {
            url: '/',
            method: 'get'
        };
        const response = await server.inject(request);
        expect(response.payload).toBe('welcome Bob The Builder');
    });
});
```
