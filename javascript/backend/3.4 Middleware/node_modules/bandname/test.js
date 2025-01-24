var bandname = require('./bandname');
var assert = require('assert');

var name = bandname();
var name2 = bandname();

assert.equal('string', typeof name);
assert.notEqual(name, name2);
