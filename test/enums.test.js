'use strict';

var Enums = require('../');
var assert = require('assert');

describe('test/enums.test.js', function() {

  it('new Enums()', function() {
    var status = new Enums([{
      name: 'CLOSED',
      code: '1',
      message: 'Shop close',
    }, {
      name: 'OPENED',
      code: '2',
      message: 'Shop open',
    }]);
    assert(status);
    assert(Object.prototype.hasOwnProperty.call(status, 'CLOSED'));
    assert(Object.prototype.hasOwnProperty.call(status, 'OPENED'));
    assert.deepEqual('CLOSED', status.CLOSED.name);
    assert.deepEqual('OPENED', status.OPENED.name);
    assert(Object.prototype.hasOwnProperty.call(status.CLOSED, 'code'));
    assert(Object.prototype.hasOwnProperty.call(status.CLOSED, 'ordinal'));
    assert(Object.prototype.hasOwnProperty.call(status.getByCode('1'), 'name'));
    assert(
      Object.prototype.hasOwnProperty.call(status.getBy('name', 'CLOSED'), 'name')
    );
    assert(status.CLOSED.eql(status.CLOSED));
    assert(!status.CLOSED.eql(status.OPENED));
    assert(!status.CLOSED.eql(null));
    assert(!status.CLOSED.eql({}));

    var status2 = new Enums(status);
    assert(Object.prototype.hasOwnProperty.call(status2, 'CLOSED'));

    assert.deepEqual(status2.values(), [{
      name: 'CLOSED',
      code: '1',
      message: 'Shop close',
      ordinal: 0,
    }, {
      name: 'OPENED',
      code: '2',
      message: 'Shop open',
      ordinal: 1,
    }]);

    assert(status2.getBy('name', 'OPENING') === null);
    assert.deepEqual(new Enums().values(), []);
    assert.deepEqual(new Enums(['A', 'B', 'C']).values(), [{
      name: 'A',
      ordinal: 0,
    }, {
      name: 'B',
      ordinal: 1,
    }, {
      name: 'C',
      ordinal: 2,
    }]);
  });

  it('should new Enums twice', function() {
    var enums = [{
      name: 'CLOSED',
      code: '1',
      message: 'Shop close',
    }, {
      name: 'OPENED',
      code: '2',
      message: 'Shop open',
    }];
    new Enums(enums);
    new Enums(enums);
  });

  describe('fromString()', function() {

    it('should return an enum type given a string', function() {
      let letter = new Enums(['X', 'Y', 'Z']);
      let xEnum = letter.fromString('X');

      assert.equal(xEnum, letter.X);
    });

    it('should return an enum type that is not equal to a same-named but different enum value', function() {
      let letterArray = ['X', 'Y', 'Z'];
      let letter1 = new Enums(letterArray);
      let letter2 = new Enums(letterArray);
      let xEnum1 = letter1.fromString('X');
      let xEnum2 = letter2.fromString('X');

      assert.notEqual(xEnum1, xEnum2);
    });

  });

});
