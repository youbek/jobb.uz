const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    user(hashId: ID!): User
    checkToken(token: String!): CurrentUser
  }

  extend type Mutation {
    registerUser(user: RegisterInput!): SavedUser!
    logInUser(user: LoginInput!): SavedUser!
    editUser(
      userId: ID!
      newFirstName: String
      newLastName: String
      newEmail: String
      newPassword: String
      lastPassword: String
      newPhoneNumber: String
      newAddress: String
    ): Boolean
    deleteUser(userId: ID!): Boolean
  }

  type User {
    hashId: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type CurrentUser {
    hashId: String
    firstName: String
    lastName: String
    email: String
    isHr: Boolean
  }

  type SavedUser {
    user: CurrentUser!
    token: String!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isHr: Boolean
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;
