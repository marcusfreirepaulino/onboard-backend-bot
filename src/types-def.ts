export const typeDefs = `
  type User {
    id: Int!
    name: String!
    email: String!
    birthDate: String!
  }

  type Users {
    users: [User!]!
    total: Int!
    before: Boolean!
    after: Boolean!
  }

  type Login {
    login: User!
    token: String! 
  }

  input UserInput {
    name: String!
    email: String!
    birthDate: String!
    password: String!
  }

  input UsersInput {
    limit: Int
    offset: Int
  }

  input LoginInput {
    email: String!
    password: String!
  }
   
  type Query {
    user(id: Int!): User!
  }
  
  type Query {
    users(data: UsersInput): Users!
  }
  
  type Mutation {
    createUser(data: UserInput!): User!
  }
  
  type Mutation {
    login(data: LoginInput!): Login!
  }
`;

