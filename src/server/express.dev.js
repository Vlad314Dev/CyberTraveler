import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { Server as IOServer }  from 'socket.io';

import GqlServer from './graphql.js';

const BUILD_DIR = __dirname; 
const PUBLIC_DIR = path.join(__dirname, '/../src/public/');
const GAME_ASSETS = path.join(__dirname, '/../src/app/game/assets');
const INDEX_HTML_PATH = path.join(BUILD_DIR, 'index.html');
const SW_PATH = path.join(BUILD_DIR, 'sw.js');
const PORT = 5314;

const app = express();
const webServer = http.Server(app);
const ioServer = new IOServer(webServer);


if (process.env.NODE_ENV !== 'production') {
    console.log('------========Development mode========-----');
}

/**
 * Middlewares
 * 
 * The sequence of middlewares use is necessary
 */
app.use('/game/assets', express.static(GAME_ASSETS));
app.use(express.static(BUILD_DIR));
GqlServer.applyMiddleware({ app });

/**
 * Routes
 */
app.get('/sw.js', (req, res) => {
    res.sendFile(SW_PATH);
});

app.get('/precache-paths', (req, res) => {
    const filesToCache = fs.readdirSync(BUILD_DIR);

    // Remove unnecessary files
    if (filesToCache.includes('server.js')) {
        filesToCache.splice(filesToCache.indexOf('server.js'), 1);
    }

    // Transform to the request path
    filesToCache.forEach((file) => {
        return `/${ file }`;
    });

    // File paths that are not included to the build
    filesToCache.push('/');
    filesToCache.push('/favicon.ico');
    filesToCache.push('/socket.io.js');

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(filesToCache));
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(`${ PUBLIC_DIR }assets/favicon/favicon.ico`);
});

app.get('*', (req, res) => {
    res.sendFile(INDEX_HTML_PATH);
});

/**
 * WEB server
 */
webServer.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${ webServer.address().port }`);
    console.log(`GraphQL path ${ GqlServer.graphqlPath }`);
});

/**
 * socket.io server
 */
ioServer.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('SOCKET_TEST', (data) => {
        console.log('SOCKET_TEST: ' + data);
    });
});
