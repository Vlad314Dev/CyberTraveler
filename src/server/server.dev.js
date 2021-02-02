import express from 'express';
import path from 'path';

import { graphqlHTTP } from 'express-graphql';
import { 
    testSchema,
    resolvers
 } from './graphql.test.js';

 import mysql from 'mysql';

const app = express();
const BUILD_SRC = __dirname; 
const INDEX_HTML = path.join(BUILD_SRC, 'index.html');
const PORT = 5314;

if (process.env.NODE_ENV !== 'production') {
    console.log('------========Development mode========-----');
}

// The sequence of use middlewares is necessary
app.use(express.static(BUILD_SRC));
app.use((req, res, next) => {
    req.db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '4321',
        database: 'cybertraveler'
    });
    req.db.connect();
    next();
});
app.use('/graphql', graphqlHTTP({
    schema: testSchema,
    rootValue: resolvers,
    graphiql: true // Interactive mode for browser
}));

app.get('*', function (req, res) {
    res.sendFile(INDEX_HTML);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${ PORT }`);
});
