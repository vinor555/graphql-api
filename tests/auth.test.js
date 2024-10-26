const { ApolloServer } = require('apollo-server');
const typeDefs = require('../schemas/schema');
const resolvers = require('../resolvers/resolver');
const models = require('../models'); // This should point to Sequelize models

// Set up a new Apollo Server for testing
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    models, // Provide models to the context for testing
  }),
});

describe('Authentication Tests', () => {
  
  it('registers a user', async () => {
    const REGISTER = `
      mutation {
        register(username: "testuser", password: "password", role: "USER")
      }
    `;

    // Execute the registration mutation
    const res = await server.executeOperation({
      query: REGISTER,
    });

    // Test the response to match expected result
    expect(res.data.register).toBe('User registered successfully');
  });

  it('logs in a user', async () => {
    const LOGIN = `
      mutation {
        login(username: "testuser", password: "password")
      }
    `;

    // Execute the login mutation
    const res = await server.executeOperation({
      query: LOGIN,
    });

    // Test the response to be defined, which means JWT was returned
    expect(res.data.login).toBeDefined();
  });
});
