import gql from 'graphql-tag';

/************************************************
  USER
 ************************************************/

export const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $password: String!
  ) {
    register(
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      password: $password
    ) {
      token
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      email
      phoneNumber
      firstName
      lastName
    }
  }
`;

export const PASSWORD_LOGIN = gql`
  mutation passwordLogin($email: String!, $password: String!) {
    passwordLogin(email: $email, password: $password) {
      token
    }
  }
`;

export const PASSWORD_FORGOT = gql`
  mutation passwordForgot($email: String!) {
    passwordForgot(email: $email) {
      message
    }
  }
`;

export const PASSWORD_RESET = gql`
  mutation passwordReset($password: String!, $code: String!) {
    passwordReset(password: $password, code: $code) {
      message
      status
    }
  }
`;