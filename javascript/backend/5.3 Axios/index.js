import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await getRandomActivity();
    console.log("Random activity for GET page: " + result);
    res.render("index.ejs", result);
  } catch (error) {
    handleError(error, res);
  }
});

app.post("/", async (req, res) => {
  try {
    const { type, participants } = req.body;
    var result;
    if (type === undefined && participants == undefined) {
      result = await getRandomActivity();
    } else {
      result = await getActivityFilteredByTypeAndParticipants(
        type,
        participants
      );
    }
    res.render("index.ejs", result);
  } catch (error) {
    handleError(error, res);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

function handleError(error, res) {
  console.error("Failed to make request:", error.message);
  if (error.response && error.response.status === 404) {
    res.render("index.ejs", { error: "No activity found" });
  } else {
    res.render("index.ejs", { error: error.message });
  }
}

async function getActivityFilteredByTypeAndParticipants(type, participants) {
  console.log(
    `Getting activity filtered for ${type} and ${participants} participants`
  );
  const activities = await fetchActivity(
    "https://bored-api.appbrewery.com/filter",
    {
      type,
      participants,
    }
  );
  console.log(activities.data[0]);
  return { data: activities.data[0] };
}

async function getRandomActivity() {
  console.log("Getting random activity");
  return await fetchActivity("https://bored-api.appbrewery.com/random");
}

async function fetchActivity(url, params = {}) {
  console.log(`Fetching activity from ${url} with params ${params}`);
  const response = await axios.get(url, { params });
  // console.log(response);
  return { data: response.data };
}
