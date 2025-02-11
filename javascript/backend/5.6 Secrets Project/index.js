import e from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = e();
const API_URL = "https://secrets-api.appbrewery.com";
app.use(bodyParser.json());

app.listen(3000);
app.use(e.static("public"));

app.get("/", async (req, res) => {
    try {
        const { data } = await axios.get(`${API_URL}/random`);
        res.render("index.ejs", { user: data.username, secret: data.secret });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the secret.");
    }
});

// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
