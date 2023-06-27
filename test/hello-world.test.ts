import axios from 'axios';
import { describe, it } from 'mocha';
import { expect } from 'chai';

const endpoint = `http://localhost:4000/graphql:`;

const headers = {
  'content-type': 'application/json',
};

const query = `
  query Hello {
    hello
  }
`;

export const helloWorldTest = describe('Hello World!', async () => {
  const response = await axios({ url: endpoint, method: 'post', headers, data: { query } });

  it('should return the string Hello World!', () => {
    expect(response.data).to.be.eq('Hello World!');
  });
});
