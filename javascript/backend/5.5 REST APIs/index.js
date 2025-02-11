import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "71e55cf1-4dce-4a53-b114-2fd6eb6140db";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

const renderResponse = (res, data) => {
  const responseToRender = JSON.stringify(data);
  console.log("Rendering response: " + responseToRender);
  res.render("index.ejs", { content: responseToRender });
};

const handleError = (res, error) => {
  const errorData = error.response ? error.response.data : error.message;
  console.log("Rendering error: " + errorData);
  renderResponse(res, errorData);
};

async function callApiWithHandling(res, apiCall) {
  try {
    const response = await apiCall();
    renderResponse(res, response);
  } catch (e) {
    handleError(res, e);
  }
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  const getSecret = getSecretById(searchId);
  callApiWithHandling(res, getSecret);
});

app.post("/post-secret", (req, res) => {
  const postSecret = () => axios.post(`${API_URL}/secrets`, req.body, config).then(response => response.data);
  callApiWithHandling(res, postSecret);
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  const putSecret = () => axios.put(`${API_URL}/secrets/${searchId}`, req.body, config).then(response => response.data);
  callApiWithHandling(res, putSecret);
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  const patchData = {};
  if (req.body.secret) patchData.secret = req.body.secret;
  if (req.body.emScore) patchData.emScore = req.body.emScore;

  const patchSecret = () => axios.patch(`${API_URL}/secrets/${searchId}`, patchData, config).then(response => response.data);
  callApiWithHandling(res, patchSecret);
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  const deleteSecret = () => axios.delete(API_URL + "/secrets/" + searchId, config).then(response => response.data);
  callApiWithHandling(res, deleteSecret);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
function getSecretById(searchId) {
  return () => axios.get(API_URL + "/secrets/" + searchId, config).then(response => response.data);
}

