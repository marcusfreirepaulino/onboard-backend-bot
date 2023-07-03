import axios from 'axios';
import jwt from 'jsonwebtoken';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getUsersUseCase } from '../src/domain/user/get-users.use-case.js';

describe('Get Users', () => {
  const endpoint = `http://${process.env.HOST}:${process.env.SERVER_PORT}/graphql`;

  const variables = {
    data: {
      limit: 15,
      offset: 10,
    },
  };

  const token = jwt.sign('generic@email.com', process.env.JWT_SECRET);

  const headers = {
    'content-type': 'application/json',
    Authorization: token,
  };

  const query = `
    query Users($data: UsersInput) {
      users(data: $data){
        users {
          id
          name
          email
          birthDate
        }
        total
        before
        after
      }
    }
  `;

  it('should return the users signed in the database', async () => {
    const { seedDatabase } = await import('../src/seed/seed-database.js');
    await seedDatabase();

    const { data: response } = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: {
        query,
        variables,
      },
    });

    expect(response.data.users.before).to.be.true; 
    expect(response.data.users.after).to.be.true;
    expect(response.data.users.users.length).to.be.eq(variables.data.limit); 
  });
});
