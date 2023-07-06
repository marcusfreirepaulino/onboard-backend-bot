import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Container } from 'typedi';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { AppDataSource } from '../src/data-source';
import { User } from '../src/data/db/entity/user.entity';
import { CreateUserUseCase } from '../src/domain/index';
import { CustomError } from '../src/format-error';

describe('Login', () => {
  const endpoint = `http://${process.env.HOST}:${process.env.SERVER_PORT}/graphql`;

  const headers = {
    'content-type': 'application/json',
  };

  const mutation = `
    mutation Login($data: LoginInput!) {
      login(data: $data) {
        login{
          id
          name
          email
          birthDate
        }
        token
      }
    }
  `;

  const variables = {
    data: {
      name: 'alfredo',
      email: 'zeramalho123@gmail.com',
      password: '1234576aa',
      birthDate: '22/07/2003',
    },
  };

  it('should return the correct user information', async () => {
    const token = jwt.sign(variables.data.email, process.env.JWT_SECRET);
    await Container.get(CreateUserUseCase).execute(variables.data, token);
    const userRepository = AppDataSource.getRepository(User);

    const { data: response } = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: {
        variables: {
          data: {
            email: variables.data.email,
            password: variables.data.password,
          },
        },
        query: mutation,
      },
    });

    const userInDatabase = await userRepository.findOneBy({ id: response.data.login.login.id });

    expect(response.data.login.login.email).to.be.eq(userInDatabase.email);
    expect(response.data.login.login.name).to.be.eq(userInDatabase.name);
    expect(response.data.login.login.birthDate).to.be.eq(userInDatabase.birthDate);

    const tokenEmail = jwt.verify(response.data.login.token, process.env.JWT_SECRET);
    expect(response.data.login.login.email).to.be.eq(tokenEmail);
  });

  it('should return custom error messages', async () => {
    const { data: response } = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: {
        variables: {
          data: {
            email: 'non-existant@email.com',
            password: 'generic-password123',
          },
        },
        query: mutation,
      },
    });

    const customError = response.errors[0] as CustomError;
    expect(customError.code).to.be.eq(401);
    expect(customError.message).to.be.eq('Invalid credentials');
  });
});
