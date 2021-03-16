import { 
    ApolloClient,
    gql,
    HttpLink,
    InMemoryCache
} from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

export const GET_LEADERBOARD = gql`{
    getLeaderboard {
        nickname,
        score,
        created_at
    }
}`;

export const LOGIN = gql`
    query logIn($nickname: String, $password: String) {
        logIn(nickname: $nickname, password: $password)
    }
`;

export const SIGNUP = gql`
    mutation signUp($nickname: String, $password: String) {
        signUp(nickname: $nickname, password: $password)
    }
`;

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
