var Cache = require('./lib/Cache');


var create = exports.create = function create ( fn, period ) {
  return new Cache(fn, period);
}


if ( require.main === module && process.argv[2] == 'test' ) {
  var exec = require('child_process').exec;

  var log = function log ( error, value ) {
    console.log(error || value);
  }

  exec('node lib/Cache.js', log);
}
