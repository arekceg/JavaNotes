import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "arek2";
const yourPassword = "pass2";
const authData = {
  username: yourUsername,
  password: yourPassword,
};
var yourBearerToken = "";

const renderResponse = (res, data) => {
  res.render("index.ejs", { content: JSON.stringify(data) });
};

const handleError = (res, error) => {
  const errorData = error.response ? error.response.data : error.message;
  console.log(errorData);
  renderResponse(res, errorData);
};

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/register", (req, res) => {
  axios
    .post(`${API_URL}register`, {
      username: yourUsername,
      password: yourPassword,
    })
    .then((response) => renderResponse(res, response.data))
    .catch((error) => handleError(res, error));
});

app.get("/noAuth", (req, res) => {
  axios
    .get(`${API_URL}random`)
    .then((response) => renderResponse(res, response.data))
    .catch((error) => handleError(res, error));
});

app.get("/basicAuth", (req, res) => {
  axios
    .get(`${API_URL}all`, {
      params: { page: 2 },
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    })
    .then((response) => renderResponse(res, response.data))
    .catch((error) => handleError(res, error));
});

app.get("/apiKey", (req, res) => {
  function fetchSecrets(apiKey) {
    axios
      .get(`${API_URL}filter`, {
        params: { score: 5, apiKey },
      })
      .then((response) => renderResponse(res, response.data))
      .catch((error) => handleError(res, error));
  }

});

app.get("/bearerToken", async (req, res) => {

  if (!yourBearerToken || yourBearerToken.trim() === "") {
    console.log("Refreshing token...");
    await refreshToken();
  }
  await fetchSecret();

  async function refreshToken() {
    console.log(authData);
    try {
      var response = await axios.post(`${API_URL}get-auth-token`, authData)
      yourBearerToken = await response.data.token;
      console.log("Received token: " + yourBearerToken);
      
    } catch (e) {
      console.log("Error when refreshing token");
      handleError(res, e);
    }
    // axios.post(`${API_URL}get-auth-token`, authData)
    //   .then((response) => {
    //     yourBearerToken = response.data.token;
    //     fetchSecret();
    //   })
    //   .catch((error) => handleError(res, error));
  }

  async function fetchSecret() {
    console.log("Fetching secret with bearer auth : " + yourBearerToken);
    try {
      const response = await axios.get(`${API_URL}secrets/42`, {
        headers: {
          Authorization: `Bearer ${yourBearerToken}`,
        },
      });
      renderResponse(res, response.data);
    } catch (error) {
      // console.log(error);
      handleError(res, error);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
