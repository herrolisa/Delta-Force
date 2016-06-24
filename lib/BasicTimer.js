var EventEmitter = require('events');
var util = require('util');

module.exports = BasicTimer;



function BasicTimer(maxTime) {
  EventEmitter.call(this);
  this.theTicker;
  this.timeToTick = maxTime * 1000 || 10000;
}
util.inherits(BasicTimer, EventEmitter);

BasicTimer.prototype.start = function () {
  var _this = this;
  var startTime = Date.now();
  _this.theTicker = setInterval(function () {
    _this.emit('tick');
    var timePassed = Date.now() - startTime;
    console.log('timePassed: ' + timePassed + ' maxTime: ' + _this.timeToTick);

    if (timePassed >= _this.timeToTick){
      _this.emit('complete', {totalTime: timePassed});
      clearInterval(_this.theTicker);
    }
  }, 1000);
  _this.emit('start', {startTime: this.startTime});
};

BasicTimer.prototype.stop = function(){
  var _this = this;
  var stopTime = Date.now();
  _this.emit('stop', {stopTime: this.stopTime});
  clearInterval(_this.theTicker);
};

var test3 = new BasicTimer(3);
test3.on('complete', function (event) {
  console.log(event.totalTime);
});
test3.start();

// var test20 = new BasicTimer(20);
// test20.start();
