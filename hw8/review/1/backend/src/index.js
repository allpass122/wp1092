import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import ChatBox from './resolvers/ChatBox';
import Message from './resolvers/Message';

const mongo = require('./mongo');
require('dotenv-defaults').config();

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    ChatBox,
    Message,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});