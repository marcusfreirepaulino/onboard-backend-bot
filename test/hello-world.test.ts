import axios from 'axios';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Hello World!', () => {
  const endpoint = `http://${process.env.HOST}:${process.env.SERVER_PORT}/graphql:`;

  const headers = {
    'content-type': 'application/json',
  };

  const query = `
  query Hello {
    hello
  }
`;

  it('should return the string Hello World!', async () => {
    const response = await axios({ url: endpoint, method: 'post', headers, data: { query } });
    expect(response.data.data.hello).to.be.eq('Hello World!');
  });
});
