const register=async(server)=>{
    server.route({
        method: 'GET',
        path: '/hello',
        handler: () => {
            return 'Hello, world!';
        }
    });

};

module.exports={
    register,
    name:'hello-world-plugin',
    version: '1.0.0'
}
