import { gql } from "apollo-boost";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $isHr: Boolean
  ) {
    registerUser(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        isHr: $isHr
      }
    ) {
      user {
        hashId
        firstName
        lastName
        email
        isHr
      }
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LogInUser($email: String!, $password: String!) {
    logInUser(user: { email: $email, password: $password }) {
      user {
        hashId
        firstName
        lastName
        email
      }
      token
    }
  }
`;

export const POST_JOB = gql`
  mutation PostJob(
    $title: String!
    $address: JobAddressInput!
    $companyName: String!
    $contactPhone: String
    $description: String!
    $noExperience: Boolean!
    $salaryFrom: Int!
    $salaryTo: Int!
    $partTime: Boolean!
  ) {
    postJob(
      title: $title
      address: $address
      companyName: $companyName
      contactPhone: $contactPhone
      description: $description
      noExperience: $noExperience
      salaryFrom: $salaryFrom
      salaryTo: $salaryTo
      partTime: $partTime
    ) {
      hashId
      title
      state
      address {
        name
        lat
        long
      }
      companyName
      contactPhone
      description
      noExperience
      salaryFrom
      salaryTo
      partTime
      author {
        firstName
        lastName
        hashId
      }
      date
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser(
    $userId: ID!
    $newFirstName: String
    $newLastName: String
    $newEmail: String
    $newPhoneNumber: String
    $newAddress: String
    $newPassword: String
    $lastPassword: String
  ) {
    editUser(
      userId: $userId
      newFirstName: $newFirstName
      newLastName: $newLastName
      newEmail: $newEmail
      newPhoneNumber: $newPhoneNumber
      newAddress: $newAddress
      newPassword: $newPassword
      lastPassword: $lastPassword
    )
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;
