import { gql } from '@apollo/client';

export const MSG_SUBSCRIPTION = gql`
  subscription message(
    $username: String!
  ){
    message(data: $username){
      mutation
      username
      data {
        sender
        receiver
        body
      }
    }
  }
`
