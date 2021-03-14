import { gql } from '@apollo/client';
import { RedisCache } from 'apollo-server-cache-redis';
import { ApolloServer } from 'apollo-server-express';

import DBConnection, {
    getLeaderboard,
    getUserInfo,
    getUsers
} from './mysql.js';

// getUsers: [User] @cacheControl(maxAge: 45),
const typeDefs = gql`
    type User {
        id: Int
        nickname: String
        created_at: String
        updated_at: String
    }

    type Player {
        nickname: String,
        score: Int,
        created_at: String
    }

    type Query {
        test: String,
        getUsers: [User],
        getUserInfo(id: Int): User,
        getLeaderboard: [Player]
    }
`;

const resolvers = {
    Query: {
        test: () => "Test Root Value",
        getUsers: getUsers,
        getUserInfo: getUserInfo,
        getLeaderboard: getLeaderboard
    }
};

const GqlServer = new ApolloServer({
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

export default GqlServer;
