var assert = require('assert');
var test = require('mocha').test;
var map = require('..').map;
var fn = require('@inappcloud/stack').fn;

function eq(actual, expected, done) {
  try {
    assert.deepEqual(actual, expected);
    done();
  } catch(e) {
    done(e);
  }
}

var addOne = fn({
  name: 'addOne',

  args: {
    value: {
      required: true
    }
  },

  call: function(args, done) {
    done(args.value + 1);
  }
});

var testCases = [
  {
    name: 'map',
    args: { array: [1, 2, 3], fn: function(x) { return addOne({ value: x }); } },
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
    map(testCase.args).then(function(v) {
      if (testCase.output !== 'error') {
        eq(v, testCase.output, done);
      } else {
        done(new Error('function should have returned an error.'));
      }
    }).catch(function(e) {
      if (testCase.output === 'error') {
        done();
      } else {
        done(e);
      }
    });
  });
});
