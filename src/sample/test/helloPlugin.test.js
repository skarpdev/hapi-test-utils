const {hasRoute}=require('hapi-test-utils').routing;
const Hapi = require('hapi');
const helloPlugin = require('../src/helloPlugin');
const uexpect  = require('unexpected');

describe('test helloPlugin',()=>{

      let server;
      beforeEach(async ()=>{
          server=new Hapi.Server();
          await server.register(helloPlugin);
      });
      it('has a GET /hello rout',()=>{
        uexpect (hasRoute(server,'/hello','get'),'to be true');

      });
      it('returns hello world', async () => {
        const request = {
            url:'/hello',
            method:'get'
        };
        const response = await server.inject(request);
        uexpect(response.statusCode, 'to be', 200);
        uexpect(response.payload, 'to equal', 'Hello, world!');
    });

});
