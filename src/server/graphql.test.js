import { buildSchema } from 'graphql';
import {
    getUsers,
    getUserInfo
} from './mysql.test.js';

export const testSchema = buildSchema(`
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
`);

export const resolvers = {
    test: () => "Test Root Value",
    getUsers: getUsers,
    getUserInfo: getUserInfo
};
