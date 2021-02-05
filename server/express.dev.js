import express from 'express';
import path from 'path';
import GqlServer from './graphql.js';

const BUILD_SRC = __dirname; 
const INDEX_HTML = path.join(BUILD_SRC, 'index.html');
const SW = path.join(BUILD_SRC.concat('/../src/sw.js')); // @todo refactor
const PORT = 5314;

if (process.env.NODE_ENV !== 'production') {
    console.log('------========Development mode========-----');
}

const app = express();

// The sequence of use middlewares is necessary
app.use(express.static(BUILD_SRC));
GqlServer.applyMiddleware({ app });

// @todo refactor
app.get('/sw.js', function (req, res) {
    res.sendFile(SW);
});

app.get('*', function (req, res) {
    res.sendFile(INDEX_HTML);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${ PORT }`);
    console.log(`GraphQL path ${ GqlServer.graphqlPath }`);
});
