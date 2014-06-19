var lib = require('./main');

// Instantiate the Queue.
var queue = lib.init({
	// This sets a 1 second delay between each task
	delayBetweenTasks: 1000
});

// Pushes one task to the queue.
queue.pushTask(function(done) {
	// We do this thing.. then that, then we're done.
	console.log('Done our first singular task!');

	done();
});

// Pushes multiple tasks to the queue, in order.
queue.pushTasks([function(done) {
	// Do more stuff.
	console.log('First task from the multiple list.');

	done();
}, function(done) {
	// Do even more stuff.
	console.log('Second task from the multiple list.');

	done();
}, function(done) {
	console.log('This is the last queue\'d task to be called!');

	done();
}]);

// Not blocking.
console.log('This will be called before anything else, because Queuing is not blocking.');

// Stop queue execution in 5 seconds. Note: the queue will never stop on its own.
setTimeout(function() {
	queue.stop();
}, 5000);