var adjectives = require('./adjectives.json');
var animals = require('./animals.json');

var array_member = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

module.exports = function() {
  return (array_member(adjectives)) + " " + (array_member(animals));
};
