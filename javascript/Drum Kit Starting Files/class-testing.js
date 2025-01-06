
// Define a constructor function
class Drum {
    constructor(type, sound) {
        this.type = type;
        this.sound = sound;
    }
    // Add a method to the prototype of Drum
    playSound() {
        console.log(this.sound);
    }
}
// Create instances of Drum
const snare = new Drum("snare", "snare sound");
const kick = new Drum("kick", "kick sound");
// Call the playSound method on the instances
snare.playSound(); // Output: snare sound
kick.playSound(); // Output: kick sound
class DrumClass {
    constructor(drumName, drumSound) {
        this.drumName = drumName;
        this.drumSound = drumSound;
    }

    playSound() {
        console.log(this.drumSound);
    }
}
const snareClass = new DrumClass("snare", "snare-sound");
snareClass.playSound();
