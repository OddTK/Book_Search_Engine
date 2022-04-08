const { AuthorizationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const utils = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_root, {id}) => {
            return await User.findById(id);
        },
    },
    Mutation: {
        login: async (_root, {email, password}) => {
            const userFound = await User.findOne({email});
            if (!userFound) {
                throw new AuthorizationError('No user found with this email address!');
            }
            if (userFound.password === password) {
                const token = utils.signToken(userFound.username, userFound.email, userFound._id);
                return (token, userFound);
            }
            throw new AuthorizationError('You must provide correct credentials');
        },
        addUser: async (_root, {username, email, password}) => {
            const user = await User.create({
                username,
                email,
                password
            })
            const token = utils.signToken(user.username, user.email, user._id);
            return (token, user);
        },
        // saveBook: async (_root, {})
    },
}

module.exports = resolvers;
