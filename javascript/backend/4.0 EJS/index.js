import e from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = e();
app.listen("3000");

app.get("/", (req, res) => {
  const advice = determineAdvice();
  res.render(__dirname + "/views/index.ejs", { advice: advice });

  function determineAdvice() {
    var advice;
    const dayNumber = new Date().getDay();
    if (dayNumber <= 5) {
      advice = "It's the weekday, get to work";
    } else {
      advice = "It's the weekend go do drugs";
    }
    return advice;
  }
});
