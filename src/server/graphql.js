import { gql } from '@apollo/client';
import { RedisCache } from 'apollo-server-cache-redis';
import { ApolloServer } from 'apollo-server-express';

import DBConnection, {
    addToLeaderboard,
    getLeaderboard,
    getUserInfo,
    getUsers,
    logIn,
    signUp
} from './mysql.js';

// getUsers: [User] @cacheControl(maxAge: 45),
// Schema
const gqlSchema = gql`
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
        getLeaderboard: [Player],
        logIn(nickname: String, password: String): Int
    }

    type Mutation {
        signUp(nickname: String, password: String): Boolean,
        addToLeaderboard(score: Int, userId: Int, nickname: String): Boolean,
    }
`;

const resolvers = {
    Query: {
        getUsers: getUsers,
        getUserInfo: getUserInfo,
        getLeaderboard: getLeaderboard,
        logIn: async (_, args, context) => {
            const result = await logIn(_, args, context);
            return result ? result.id : 0;
        }
    },
    Mutation: {
        signUp: async (_, args, context) => {
            return await signUp(_, args, context);
        },
        addToLeaderboard: async (_, args, context) => {
            return await addToLeaderboard(_, args, context);
        }
    }
};

const GqlServer = new ApolloServer({
    typeDefs: gqlSchema, 
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
