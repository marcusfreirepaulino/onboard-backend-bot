import axios from 'axios';
import bcrypt from 'bcrypt';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { AppDataSource } from '../src/data-source.js';
import { User } from '../src/data/db/index.js';

describe('Create User', () => {
  const endpoint = `http://${process.env.HOST}:${process.env.SERVER_PORT}/graphql`;
  const userRepository = AppDataSource.getRepository(User);

  const headers = {
    'content-type': 'application/json',
  };

  const mutation = `
    mutation CreateUser($data: UserInput!){
      createUser(data: $data) {
        id
        name
        email
        birthDate
      }
    }
  `;

  const variables = {
    data: {
      name: 'alfredo',
      email: 'zeramalho123@gmail.com',
      birthDate: '22/07/2003',
      password: '1234576aa',
    },
  };

  it('should create an user in the database', async () => {
    const { data: response } = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: {
        variables,
        query: mutation,
      },
    });

    expect(response.data.createUser.id).to.not.be.null;

    const userInDatabase = await userRepository.findOneBy({ id: response.data.createUser.id });

    expect(response.data.createUser.email).to.be.eq(userInDatabase.email);
    expect(response.data.createUser.name).to.be.eq(userInDatabase.name);
    expect(response.data.createUser.birthDate).to.be.eq(userInDatabase.birthDate);

    const encryptedPassword = userInDatabase.password;
    const isSamePassword = await bcrypt.compare(variables.data.password, encryptedPassword);

    expect(isSamePassword).to.be.true;
  });
});
