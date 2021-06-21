import { gql } from '@apollo/client';

const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox(
    $name1: String!
    $name2: String!
  ) {
    createChatBox(
      name1: $name1
      name2: $name2
    ) {
      id
      name
      messages
      {
        id
        body
      }
    }
  }
`
const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $sender: String!
    $receiver: String!
    $body: String!
  ) {
    createMessage(
      data: {
        sender: $sender
        receiver: $receiver
        body: $body
      }
    ) {
      sender
      receiver
      body
    }
  }
`

export {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION}