import generateName from "sillyname";
import {randomSuperhero} from 'superheroes';

var sillyName = generateName();
console.log(`My name is ${sillyName} ${randomSuperhero()}`);
