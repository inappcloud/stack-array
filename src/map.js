module.exports = {
  name: 'map',

  args: {
    array: {
      example: [1, 2, 3],
      required: true
    },

    fn: {
      required: true
    }
  },

  call: function(args, done) {
    Promise.all(args.array.map(function(x) { return args.fn(x); })).then(function(v) {
      done(v);
    }).catch(function(e) {
      done(e);
    });

    // var i = 0;
    // var newArray = [];
    //
    // var execFn = function(item) {
    //   var fnArgs = { output: 'output' };
    //   fnArgs[args.data] = item;
    //
    //   args.fn({}, fnArgs).then(function(c) {
    //     newArray.push(c.output);
    //
    //     if (newArray.length === args.array.length) {
    //       done(newArray);
    //     } else {
    //       i++;
    //       execFn(args.array[i]);
    //     }
    //   }).catch(function(err) {
    //     error(err);
    //   });
    // };
    //
    // execFn(args.array[i]);
  }
};
