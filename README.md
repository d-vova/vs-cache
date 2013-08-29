vs-cache
========

Limit the number of calls to a function by caching the results of execution


Installation
------------

```
npm install vs-cache
```


Quick Start
-----------

First, define an asynchronous function that should be cached:

```javascript
var task = function task ( callback ) {
  var execute = function ( ) {
    callback(null, new Date().getTime());
  }
  
  var timeout = 10 * Math.random() | 0;
  
  setTimeout(execute, timeout);
}
```

Second, use cache to retrieve the result of running the task

```javascript
var cache = require('vs-cache');

var cachedTask = cache(task, 50);

cachedTask.retrieve(function callback ( error, value ) {
  console.log('retrieved result: ' + String(error || value));
});
```


License
-------

MIT
