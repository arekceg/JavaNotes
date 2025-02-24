const animals = [
  { name: "cat", sound: "meow", feeding: { time: 1, timeUnit: "hour" } },
  { name: "dog", sound: "woof", feeding: { time: 3, timeUnit: "minutes" } },
];

const [cat, dog] = animals;
const { feeding: { timeUnit: dogFeedingTimeUnit, time: dogFeedingTime } } = dog;