const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ForbiddenError } = require('apollo-server');

require('dotenv').config();

const resolvers = {
  Query: {
    users: async (_, __, { models, user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return models.User.findAll();
    },
    posts: async (_, __, { models, user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return models.Post.findAll();
    },
    comments: async (_, __, { models, user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return models.Comment.findAll();
    },
  },
  Mutation: {
    register: async (_, { username, password, role }, { models }) => {
      const existingUser = await models.User.findOne({ where: { username } });
      if (existingUser) throw new Error('User already exists');
      const hash = await bcrypt.hash(password, 10);
      await models.User.create({ username, password: hash, role });
      return 'User registered successfully';
    },
    login: async (_, { username, password }, { models }) => {
      const user = await models.User.findOne({ where: { username } });
      if (!user) throw new AuthenticationError('Invalid credentials');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new AuthenticationError('Invalid credentials');

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      return token;
    },
    createPost: async (_, { title, content }, { models, user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return models.Post.create({
        title,
        content,
        userId: user.userId,
      });
    },
    createComment: async (_, { postId, content }, { models, user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return models.Comment.create({
        content,
        postId,
        userId: user.userId,
      });
    },
  },
  User: {
    posts: (user) => user.getPosts(),
    comments: (user) => user.getComments(),
  },
  Post: {
    user: (post) => post.getUser(),
    comments: (post) => post.getComments(),
  },
  Comment: {
    user: (comment) => comment.getUser(),
    post: (comment) => comment.getPost(),
  },
};

module.exports = resolvers;
