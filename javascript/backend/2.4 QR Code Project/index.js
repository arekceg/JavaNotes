/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import { input } from "@inquirer/prompts";
import qr from "qr-image";
import { writeFileSync, readFileSync, createWriteStream } from "fs";

const url = await input({
  message: "Enter the URL you want to encode",
  default: readFileSync("URL.txt"),
});

qr.image(url, {
  type: "png",
  parse_url: true,
}).pipe(createWriteStream("qr.png"));

writeFileSync("input.log", url);
