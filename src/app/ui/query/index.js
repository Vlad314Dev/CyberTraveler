import { 
    ApolloClient,
    gql,
    HttpLink,
    InMemoryCache} from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

export const GET_USERS = gql`{
    getUsers {
        nickname
    }
}`;

const httpLink = new HttpLink({ uri: '/graphql' });
const persistedQueriesLink = createPersistedQueryLink({ 
    sha256,
    useGETForHashedQueries: true
});
const GqlClient = new ApolloClient({
    uri: 'http://localhost:5314/graphql',
    cache: new InMemoryCache(),
    link: persistedQueriesLink.concat(httpLink)
});

export default GqlClient;
