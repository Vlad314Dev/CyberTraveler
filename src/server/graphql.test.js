import {
    getUsers,
    getUserInfo
} from './mysql.test.js';
import { gql } from '@apollo/client';

// getUsers: [User] @cacheControl(maxAge: 45),
export const typeDefs = gql`
    type User {
        id: Int
        nickname: String
        created_at: String
        updated_at: String
    }

    type Query {
        test: String,
        getUsers: [User],
        getUserInfo(id: Int): User
    }
`;

export const resolvers = {
    Query: {
        test: () => "Test Root Value",
        getUsers: getUsers,
        getUserInfo: getUserInfo
    }
};
