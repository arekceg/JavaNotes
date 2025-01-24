import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("listening!")
});
app.get("/", (req, res) => {
    req.
    res.send("<h1>HELLO</h1>");
});
