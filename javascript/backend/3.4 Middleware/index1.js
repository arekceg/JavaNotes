import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan("combined"));

app.use(customLogger);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function customLogger(req, res, next) {
  console.log(
    `request @ ${req.url} with body ${JSON.stringify(
      req.body
    )} with params ${JSON.stringify(req.params)}`
  );
  next();
}
