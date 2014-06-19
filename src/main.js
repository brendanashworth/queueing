var Queue = require('./Queue');

// Reference the Queue.
module.exports = {
	init: function(options) {
		return new Queue(options);
	}
};