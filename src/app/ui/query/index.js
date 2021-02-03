import ApolloClient, { gql } from 'apollo-boost';

export const GqlClient = new ApolloClient({
    uri: 'http://localhost:5314/graphql'
});

export const GET_USERS = gql`{
    getUsers {
        nickname
    }
}`;
