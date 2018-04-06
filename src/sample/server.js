const Hapi=require('hapi');
const helloPlugin=require('./src/helloPlugin');
const server=Hapi.Server({
    host:'localhost',
    port:'8000'
});
async function start(){
        await server.register(helloPlugin);
        await server.start();
        console.log('server is running at:',server.info.uri); // eslint-disable-line no-console
}
start();
module.exports={
    server
}
