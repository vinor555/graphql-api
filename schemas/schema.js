const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
    posts: [Post]
    comments: [Comment]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User
    comments: [Comment]
  }

  type Comment {
    id: ID!
    content: String!
    user: User
    post: Post
  }

  type Query {
    users: [User]
    posts: [Post]
    comments: [Comment]
  }

  type Mutation {
    register(username: String!, password: String!, role: String!): String
    login(username: String!, password: String!): String
    createPost(title: String!, content: String!): Post
    createComment(postId: ID!, content: String!): Comment
  }
`;

module.exports = typeDefs;
