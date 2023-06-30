import axios from 'axios';
import jwt from 'jsonwebtoken';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { createUserUseCase } from '../src/domain/user/create-user.use-case.js';

describe('Get User', () => {
  const endpoint = `http://${process.env.HOST}:${process.env.SERVER_PORT}/graphql`;

  const variables = {
    data: {
      name: 'alfredo',
      email: 'zeramalho123@gmail.com',
      password: '1234576aa',
      birthDate: '22/07/2003',
    },
  };

  const token = jwt.sign(variables.data.email, process.env.JWT_SECRET);

  const headers = {
    'content-type': 'application/json',
    Authorization: token,
  };

  const query = `
    query User($id: Int!) {
      user(id: $id) {
        id
        name
        email
        birthDate
      }
    }
`;

  it('should return the user associated with the id', async () => {
    const user = await createUserUseCase(variables.data, token);

    const { data: response } = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: {
        query,
        variables: { id: user.id },
      },
    });

    expect(response.data.user.id).to.be.eq(user.id);
    expect(response.data.user.name).to.be.eq(user.name);
    expect(response.data.user.email).to.be.eq(user.email);
    expect(response.data.user.birthDate).to.be.eq(user.birthDate);
  });
});
