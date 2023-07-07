import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Container } from 'typedi';

import { describe, it } from 'mocha';
import { expect } from 'chai';
import { CreateUserUseCase } from '../src/domain/user/create-user.use-case';

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
    const user = await Container.get(CreateUserUseCase).execute(variables.data);

    const { data: response } = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: {
        query,
        variables: { id: user.id },
      },
    });

    expect(response.data.user).to.be.deep.eq({
      id: user.id,
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
    });
  });
});
