const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({app, path: '/graphql'});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("The Express, GraphQL server is up on port", PORT)
})