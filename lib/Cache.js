var bond = require('vs-bond');


var Cache = module.exports = function Cache ( fn, period ) {
  this.fn = fn;
  this.period = period;

  this.cached = 0;
  this.result = { }

  this.bond = null;
}

Cache.prototype.retrieve = function retrieve ( callback ) {
  var self = this, timestamp = new Date().getTime();

  if ( timestamp - this.cached > this.period ) {
    if ( !this.bond ) {
      var update = function update ( error, value ) {
        self.result.error = error;
        self.result.value = value;

        self.cached = new Date().getTime();
        self.bond = null;
      }

      this.bond = bond.run(this.fn).callback(update);
    }
    
    this.bond.callback(callback);
  }
  else callback(this.result.error, this.result.value);
}


if ( require.main === module ) {
  console.log('Testing Cache at "' + __filename + '"...');

  var ran = [ ], requested = [ ];

  var task = function task ( callback ) {
    setTimeout(function ( ) {
      callback(null, ran.push(new Date().getTime()));
    }, 20 * Math.random() | 0);
  }

  var cache = new Cache(task, 50);
  var test = setInterval(function ( ) {
    requested.push(new Date().getTime());

    cache.retrieve(function ( ) { });
  }, 10);
  
  setTimeout(function ( ) {
    clearInterval(test);

    console.log('ran:       ' + ran.length);
    console.log('requested: ' + requested.length);
  }, 1000);
}
