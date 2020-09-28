class CreateLocalJS
{
    getContent = () => `
        const {SERVER} = require('./src/server');
        const Params = require('./src/config/params');
        
        const port = process.env.PORT || Params.PORT;

        SERVER.listen(port, () => {
            console.log("Listening on: port "+port); 
        });`;
}
module.exports = new CreateLocalJS();