var BasicTimer = require('./BasicTimer');
var EventEmitter = require('events');

var chai = require('chai');
var expect =  chai.expect;
var sinon = require('sinon');

// function theFunction() {
//   console.log('hello!');
// }

// var theModule = {
//   theFunction: theFunction
// };

// describe('the spy', function(){
//   var theSpy;

//   beforeEach(function(){
//     theSpy = sinon.spy(theModule, 'theFunction');
//   });

//   it('should get invoked when invoked', function () {
//     theModule.theFunction();
//     expect(theSpy.called).to.be.true;
//   });

// });

describe('BasicTimer', function () {
  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
  });
  afterEach(function () {
    this.clock.restore();
  });

  it('should be a function', function () {
    expect(BasicTimer).to.be.a('function');
  });

  it('should be an instance of EventEmitter', function(){
    var timer = new BasicTimer();
    expect(timer).to.be.an.instanceof(EventEmitter);
    expect(timer).to.have.a.constructor(BasicTimer);
  });

  it('Should have an emit "tick" event every second', function () {
    var tickHandler = sinon.spy();

    var timer = new BasicTimer();
    timer.on('tick', tickHandler);
    expect(tickHandler.callCount).to.equal(0);

    // if i wait one second, the tick event should have been emitted.
    // wait one second
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(1);

    this.clock.tick(500);
    expect(tickHandler.callCount).to.equal(1);

    this.clock.tick(500);
    expect(tickHandler.callCount).to.equal(2);
  });
});