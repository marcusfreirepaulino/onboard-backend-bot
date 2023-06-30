export const typeDefs = `
  type User {
    id: Int!
    name: String!
    email: String!
    birthDate: String!
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

  input LoginInput {
    email: String!
    password: String!
  }
   
  type Query {
    user(id: Int!): User!
  }
  
  type Mutation {
    createUser(data: UserInput!): User!
  }
  
  type Mutation {
    login(data: LoginInput!): Login!
  }
`;

