var EventEmitter = require('events');
var util = require('util');

module.exports = BasicTimer;

var _this;

function BasicTimer() {
  EventEmitter.call(this);
  _this = this;
  var theTicker;
  var startTime;
  var stopTime;
}
util.inherits(BasicTimer, EventEmitter);

BasicTimer.prototype.start = function () {
  startTime = Date.now();
  theTicker = setInterval(function () {
    _this.emit('tick');
  }, 1000);
  _this.emit('start', {startTime: startTime});
};

BasicTimer.prototype.stop = function(){
  stopTime = Date.now();
  _this.emit('stop', {stopTime: stopTime});
  clearInterval(theTicker);
};


