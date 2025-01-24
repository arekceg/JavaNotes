import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
export { app };

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use([bodyParser.json(), bodyParser.urlencoded({ extended: true })]);

app.use(generateBandName);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send("Your band name is " + req.body.bandName);
});

function generateBandName(req, _, next) {
  req.body.bandName = `${req.body.pet} z ${req.body.street}`;
  next();
}
