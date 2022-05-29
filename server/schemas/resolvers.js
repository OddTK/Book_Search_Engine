const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id }).select(
              "-__v -password"
            );

            return userData;
          }

          throw new AuthenticationError("Must be logged in");
        },
      },
    Mutation: {
        login: async (parent, {email, password}) => {
            const userFound = await User.findOne({email});
            if (!userFound) {
                throw new AuthenticationError('No user found with this email address!');
            }
            if (userFound.password === password) {
                const token = signToken(userFound);
                return (token, userFound);
            }
            throw new AuthenticationError('You must provide correct credentials');
        },
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user);
            return (token, user);
        },
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: input } },
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError("You must be logged in");
          },
          removeBook: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError("You must be logged in");
          },
        },
}

module.exports = resolvers;
