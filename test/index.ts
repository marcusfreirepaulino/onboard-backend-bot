import assert from 'assert';
import { describe, it } from 'mocha';

describe('Array', () => {
  describe('#IndexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
