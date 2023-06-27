import { describe, before } from 'mocha';
import { initializeApp } from '../src/initialize-app.js';
import { test } from './teste.test.js';
import { helloWorldTest } from './hello-world.test.js';

describe('#TESTE', () => {
  before(initializeApp);
  helloWorldTest;
});
