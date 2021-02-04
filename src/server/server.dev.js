import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { RedisCache } from 'apollo-server-cache-redis';
import { DBConnection } from './mysql.test.js';
import { 
    typeDefs,
    resolvers
} from './graphql.test.js';

const BUILD_SRC = __dirname; 
const INDEX_HTML = path.join(BUILD_SRC, 'index.html');
const PORT = 5314;

if (process.env.NODE_ENV !== 'production') {
    console.log('------========Development mode========-----');
}

const app = express();
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: () => ({ 
        db: DBConnection
    }),
    cache: new RedisCache({
        host: '127.0.0.1',
        port: 6379
    }),
    cacheControl: {
        defaultMaxAge: 5
    },
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production'
});

// The sequence of use middlewares is necessary
app.use(express.static(BUILD_SRC));
server.applyMiddleware({ app });

app.get('*', function (req, res) {
    res.sendFile(INDEX_HTML);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${ PORT }`);
    console.log(`GraphQL path ${ server.graphqlPath }`);
});
