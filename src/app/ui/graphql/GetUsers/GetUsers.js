import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const getUsers = gql`{
    getUsers {
        nickname
    }
}`;

class GetUsers extends PureComponent
{
    render() {
        return (
            <Query query={ getUsers }>
            {
                ({ loading, error, data }) => {
                    if (loading) return <p>Relax, it is worth the wait...</p>
                    if (error) return <p>Looks like we have got a problem... { console.log(error) }</p>
                    return <div>
                        { 
                            data.getUsers.map((user, idx) => {
                                return ( <div key={ idx }>{ user.nickname }</div> )
                            })
                        }
                    </div>
                }
            }
            </Query>
        )
    }
}

export default GetUsers;