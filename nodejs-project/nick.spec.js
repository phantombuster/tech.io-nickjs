﻿var assert = require('assert');
var nickjs = require('./nick.js');

it("should return TEST", function () {
  try {
    assert.equal("TEST", nickjs.launch("TEST"));

    printMessage("Success:", "Bien joué!");
  } catch (error) {
    printMessage("Failure:", "Nul");
    throw error;
  }
});

function printMessage(channel, message) {
  console.log('\nTECHIO> message --channel "' + channel + '" "' + message + '"');
}
