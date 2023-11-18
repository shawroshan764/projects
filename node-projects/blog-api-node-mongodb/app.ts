import express, { Express, Response, Request } from "express";
const app: Express = express();
const dotenv = require("dotenv");
import mongoose from "mongoose";
const router = require("./routes/apiRoutes");
const cors = require('cors');

const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/api", router);
// Use dotenv.config() to load environment variables
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// MongoDB Connection
mongoose
    .connect(`mongodb+srv://${username}:${password}@cluster1.jlmll9b.mongodb.net/blog-app`)
    .then(() => console.log("MongoDB Connected"))
    .catch((error: Error) => console.log("Mongo Error", error));


app.listen(port, () => {
    console.log(`Listening to PORT ${port}`);

})