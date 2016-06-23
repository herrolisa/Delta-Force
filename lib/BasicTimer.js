var EventEmitter = require('events');
var util = require('util');

module.exports = BasicTimer;

function BasicTimer() {
  var _this = this;
  setInterval(function () {
    _this.emit('tick');
  }, 1000);
}

util.inherits(BasicTimer, EventEmitter);