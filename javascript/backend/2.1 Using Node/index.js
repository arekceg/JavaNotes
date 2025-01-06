const fs = require("node:fs/promises");
fs.readFile("text.txt", "utf-8")
  .then((content) => {
    console.log(content);
  })
  .catch((err) => console.log("Error! " + err))
  .finally(console.log("Read file"));
