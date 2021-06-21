import { gql } from '@apollo/client';

export const MSG_QUERY = gql`
  query users(
    $username: String!
  ){
    users(query: $username){
      name
      messages{
        sender
        receiver
        body
      }
    }
  }`
