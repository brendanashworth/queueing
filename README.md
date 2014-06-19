Queuing
=====

> Queuing is a queuing library for the synchronized execution of asynchronous functions. It is a non-blocking library. [Relative XKCD](http://xkcd.com/853/).

![Staticize NPM](https://nodei.co/npm/queuing.png)

**Note**: this is a lightweight library, check out [Kue](http://learnboost.github.io/kue/) for a more heavyweight alternative.

## Documentation

#### Install
```bash
$ npm install queuing --save
```

#### Initiate the queue
```javascript
var queuing = require('queuing');

var queue = queuing.init({
	// The delay to be ran between each task
	delayBetweenTasks: 1000
});
```
This function takes an object as its parameter. This object contains all the options for the queue. All the options are optional.

#### Push a task
This assumes you already have initiated a queue.
```javascript
queue.pushTask(function(done) {
	// What I want to do in my task
	fs.doSomething('my/file', function() {
		done();
	});
});
```

Simply supply a function to `pushTask` that will be executed in the queue. **You must** call `done()` when you are finished, otherwise the queue will not be able to continue execution.

### Push multiple tasks
Again, assumes you have already initiated a queue.
```javascript
queue.pushTasks([function(done) {
	// Do things
	done();
}, function(done) {
	// Do more things
	done();
}, function(done) {
	// Do my last things
	done();
}]);
```

This is a bulk `pushTask` alternative. It takes a single array as a parameter. The array contains multiple functions, ordered in their execution line.

### Stop the queue
```javascript
queue.stop();
```

This stops the queue immediately after the present task is finished executing. If there is no task executing, it will be stopped immediately.

## License
[MIT](./LICENSE)