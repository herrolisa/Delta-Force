var BasicTimer = require('./BasicTimer');
var EventEmitter = require('events');

var chai = require('chai');
var expect =  chai.expect;
var sinon = require('sinon');

describe('Timer', function(){
  var timer;
  var tickHandler;

  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
    timer = new BasicTimer();
    tickHandler = sinon.spy();
    timer.on('tick', tickHandler);
  });
  afterEach(function () {
    this.clock.restore();

  });

  describe('BasicTimer', function () {
    it('should be a function', function () {
      expect(BasicTimer).to.be.a('function');
    });

    it('should be an instance of EventEmitter', function(){
      expect(timer).to.be.an.instanceof(EventEmitter);
      expect(timer).to.have.a.constructor(BasicTimer);
    });

    // it('Should have an emit "tick" event every second', function () {
    //   expect(tickHandler.callCount).to.equal(0);

    //   // if i wait one second, the tick event should have been emitted.
    //   // wait one second
    //   this.clock.tick(1000);
    //   expect(tickHandler.callCount).to.equal(1);

    //   this.clock.tick(500);
    //   expect(tickHandler.callCount).to.equal(1);

    //   this.clock.tick(500);
    //   expect(tickHandler.callCount).to.equal(2);
    // });
  });
  describe('Controls', function(){
    it('should not start immediately', function(){
      this.clock.tick(1000);
      expect(tickHandler.callCount).to.equal(0);
    });

    it('should tick every second after it starts', function () {
      timer.start();
      expect(tickHandler.callCount).to.equal(0);
      this.clock.tick(1000);
      expect(tickHandler.callCount).to.equal(1);
      this.clock.tick(1000);
      expect(tickHandler.callCount).to.equal(2);
    });

    it('should have a stop method', function(){
      timer.start();
      expect(tickHandler.callCount).to.equal(0);
      this.clock.tick(1000);
      expect(tickHandler.callCount).to.equal(1);
      timer.stop();
      this.clock.tick(2000);
      expect(tickHandler.callCount).to.equal(1);
    });
  });
});

