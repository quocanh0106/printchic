

const cors = require('cors');

const express = require('express');
const path = require('path');
// const {config} = require('./configs/configEnvSchema');
const { LANGUAGES } = require('./utils/constants');
const socketIo = require('socket.io');
global.language = global?.language || 'vi';
const middleware = (req, res, next) => {
    const language = req.headers['x-language'] || global?.language || 'vi';
    if (typeof language !== 'undefined' && language.length > 0) {
        if (LANGUAGES.includes(String(language))
            && String(language) !== String(global?.language)
        ) {
            global.language = String(language);
        }
    }
    next();
};
const app = express();
app.use(middleware);

const http = require('http');
const initSocketIo = require('./sockets');
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const port = normalizePort(process.env.PORT || '5000');

server.listen(port, () => {
    console.log(`App is listening at ${port}`);
});
// const origin = config.ORIGIN.split(',');
const corsOptions = {
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
const io = socketIo(server, {
    cors:{
        methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: [
            'Origin',
            'Content-Type',
            'Accept',
            'x-access-token',
            'x-auth-token',
            'x-xsrf-token',
            'authorization',
            'Access-Control-Allow-Origin',
        ],
        origin: "*",
        credentials:true,
        optionsSuccessStatus: 200,
        secureProtocol: 'TLSv1_method',
     }
  });
app.get("/", async (request, response) => {
    response.send("Ok!")
});
initSocketIo(io);

app.use(express.static(path.join(__dirname, 'public')));
require('./configs/database');
require('./configs/configInit')(app);
require('./configs/configSwagger')(app);
require('./configs/configRoutes')(app);
require('./configs/configCronJob');


module.exports = app;
