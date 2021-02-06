import express from 'express';
import path from 'path';

import GqlServer from './graphql.js';

const BUILD_SRC = __dirname; 
const INDEX_HTML_PATH = path.join(BUILD_SRC, 'index.html');
const SW_PATH = path.join(BUILD_SRC, 'sw.js');
const PORT = 5314;

if (process.env.NODE_ENV !== 'production') {
    console.log('------========Development mode========-----');
}

const app = express();

// The sequence of use middlewares is necessary
app.use(express.static(BUILD_SRC));
GqlServer.applyMiddleware({ app });

app.get('/sw.js', function (req, res) {
    res.sendFile(SW_PATH);
});

app.get('*', function (req, res) {
    res.sendFile(INDEX_HTML_PATH);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${ PORT }`);
    console.log(`GraphQL path ${ GqlServer.graphqlPath }`);
});
