import { 
    ApolloClient,
    InMemoryCache,
    gql,
    HttpLink
} from '@apollo/client';
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from 'crypto-hash';

const httpLink = new HttpLink({ uri: "/graphql" });
const persistedQueriesLink = createPersistedQueryLink({ 
    sha256,
    useGETForHashedQueries: true
});

export const GqlClient = new ApolloClient({
    uri: 'http://localhost:5314/graphql',
    cache: new InMemoryCache(),
    link: persistedQueriesLink.concat(httpLink)
});

export const GET_USERS = gql`{
    getUsers {
        nickname
    }
}`;
