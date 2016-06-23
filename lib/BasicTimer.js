var EventEmitter = require('events');
var util = require('util');

module.exports = BasicTimer;

function BasicTimer() {
  EventEmitter.call(this);
  var _this = this;
  var theTicker;
  var startTime;
  var stopTime;

  this.start = function(){
    startTime = Date.now();
    theTicker = setInterval(function () {
      _this.emit('tick');
    }, 1000);
    _this.emit('start', {startTime: startTime});
  };

  this.stop = function(){
    stopTime = Date.now();
    _this.emit('stop', {stopTime: stopTime});
    clearInterval(theTicker);
  };
}

util.inherits(BasicTimer, EventEmitter);