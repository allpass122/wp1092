import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation';
import ChatBox from './resolvers/ChatBox'

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: { 
    Mutation,
    ChatBox,
    Message},
  context: {db, pubsub}
})

const mongo = require('./mongo');
mongo.connect();

server.start()