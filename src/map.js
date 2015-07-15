module.exports = {
  name: 'map',
  args: {
    array: {
      example: [1, 2, 3],
      required: true
    },

    fn: {
      required: true
    },

    data: {
      required: true
    }
  },

  call: function(args, done, error) {
    var i = 0;
    var newArray = [];

    var execFn = function(item) {
      var fnArgs = { output: 'output' };
      fnArgs[args.data] = item;

      args.fn({}, fnArgs).then(function(c) {
        newArray.push(c.output);

        if (newArray.length === args.array.length) {
          done(newArray);
        } else {
          i++;
          execFn(args.array[i]);
        }
      }).catch(function(err) {
        error(err);
      });
    };

    execFn(args.array[i]);
  }
};
