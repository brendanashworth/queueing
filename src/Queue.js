/**
 * This initiates the Queue. The Queue is an object
 *   that represents this entire package. It works by
 *   having a sequence of functions to call and executing
 *   them, one by one. It will never stop on its own,
 *   you must use Queue#stop to stop it.
 *
 * @constructor
 * @param {object} options - The options for the Queue.
 **/
function Queue(options) {
	this.options = options;

	// Setup options
	if (!this.options.hasOwnProperty('delayBetweenTasks')) this.options.delayBetweenTasks = 0; // No default delay.

	// Its now running
	this.running = true;

	this.start();
}

// Export with NodeJS
module.exports = Queue;

/**
 * This is the array where tasks are stored. The tasks
 *   are ordered in ascending order; where index 0 is next
 *   for execution, and the largest index is the last one
 *   to be called.
 **/
Queue.prototype.stack = [];

/**
 * Pushes a single task to the task list. This task is not
 *   passed as an array, but simply a Function.
 *
 * @param task Function
 */
Queue.prototype.pushTask = function(task) {
	this.stack.push(task);
};

/**
 * Pushes multiple tasks to the task list. The tasks are passed
 *   within an array, in sequence of execution.
 *
 * @param tasks Array
 */
Queue.prototype.pushTasks = function(tasks) {
	for (var i = 0; i < tasks.length; i++) {
		this.stack.push(tasks[i]);
	}
};

/** 
 * Starts the Queue processor. If there is not a queue task left,
 *   it will wait for 500 milliseconds, then try again. If there
 *   is any task left, it will take it, execute it, and repeat with
 *   the given delay (passed through options in the constructor).
 */
Queue.prototype.start = function() {
	var next = function(queue) {
		if (!queue.running) {
			return;
		}

		// Do we have any left?
		if (queue.stack.length > 0) {
			var task = queue.stack.shift();

			// Pause for the given delay
			setTimeout(function() {
				task(function() {
					next(queue);
				});
			}, queue.options.delayBetweenTasks);
		} else {
			setTimeout(function() {
				next(queue);
			}, 500);
		}
	}

	next(this);
};

/**
 * Stops the Queue. This function will wait until the running task
 *   is finished, at which point it will stop execution of the task
 *   list. Any leftover tasks will be dropped with no execution.
 */
Queue.prototype.stop = function() {
	this.running = false;
};