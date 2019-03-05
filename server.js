const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const ENV = require('dotenv');
ENV.config();
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

//Connect to mlabs
mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

mongoose.connection.once('open', ()=>{
  console.log("Connected to database");
});

server.applyMiddleware({app, path: '/graphql'});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("The Express, GraphQL server is up on port", PORT)
})