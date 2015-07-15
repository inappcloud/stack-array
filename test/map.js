var assert = require('assert');
var test = require('mocha').test;
var array = require('..');
var pkg = require('@inappcloud/stack').pkg;

var testPkg = pkg([{
  name: 'sort',
  args: {
    number: {
      required: true
    }
  },
  call: function(args, done) {
    done(args.number + 1);
  }
}]);

var testCases = [
  {
    name: 'map',
    args: { array: [1, 2, 3], fn: testPkg.sort, data: 'number', output: 'newArray' },
    output: [2, 3, 4]
  },
  {
    name: 'map#no-args',
    args: {},
    output: 'error'
  }
];

testCases.forEach(function(testCase) {
  test(testCase.name, function(done) {
    array.map({}, testCase.args).then(function(ctx) {
      if (testCase.output !== 'error') {
        assert.equal(ctx[testCase.args.output], testCase.output);
        done();
      } else {
        done(new Error('Function should have returned an error'));
      }
    }).catch(function(ctx) {
      if (testCase.output === 'error') {
        done();
      } else {
        done(ctx.error);
      }
    });
  });
});
