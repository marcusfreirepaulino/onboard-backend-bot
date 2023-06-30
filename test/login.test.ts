import axios from 'axios';
import bcrypt from 'bcrypt';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { AppDataSource } from '../src/data-source.js';
import { User } from '../src/data/db/entity/user.entity.js';

describe('Login', () => {
  const endpoint = `http://${process.env.HOST}:${process.env.SERVER_PORT}/graphql`;
  const userRepository = AppDataSource.getRepository(User);

  const headers = {
    'content-type': 'application/json',
  };

  const mutation = `
    mutation Login($data: LoginInput!) {
      login(data: $data) {
        id
        name
        email
        birthDate
      }
      token
    }
  `;

  const variables = {
    data: {
      email: 'zeramalho123@gmail.com',
      password: '1234576aa',
    },
  };

  it('should return the same email passed', async () => {
    const { data: response } = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: {
        variables,
        query: mutation,
      },
    });

    expect(response.data.login).to.not.be.empty;
  });
});
