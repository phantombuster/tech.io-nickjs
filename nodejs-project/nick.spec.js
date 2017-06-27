﻿var assert = require('assert');
var nickjs = require('./nick.js');

it('should sum stars', function () {
  try {
    assert.equal("test", nickjs.launch("test"));

    printMessage("Success:", "Bien joué!");
  } catch (error) {
    printMessage("Failure:", "Nul");
    throw error;
  }
});

function printMessage(channel, message) {
  console.log('\nTECHIO> message --channel "' + channel + '" "' + message + '"');
}
