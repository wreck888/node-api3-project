// require your server and launch it
const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log('server listening on 9000')
})