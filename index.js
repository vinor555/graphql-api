const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const typeDefs = require('./schemas/schema');
const resolvers = require('./resolvers/resolver');
const models = require('./models');

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Get the user token from the headers
    const token = req.headers.authorization || '';

    // Try to retrieve a user with the token
    const user = getUser(token.replace('Bearer ', ''));

    // Add the user and models to the context
    return { user, models };
  },
});

models.sequelize.sync().then(() => {
  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
