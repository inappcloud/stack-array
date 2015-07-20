var fn = require('@inappcloud/stack').fn;

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

require('@inappcloud/stack-test').runTests(require('..').map, testCases);
