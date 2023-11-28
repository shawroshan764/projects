import express, { Express } from "express";
const app: Express = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
var cors = require('cors')

const port = process.env.PORT || 8000;


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// MongoDB Connection
mongoose
    .connect(`mongodb+srv://${username}:${password}@cluster1.jlmll9b.mongodb.net/paytm-insider-clone`)
    .then(() => console.log("MongoDB Connected"))
    .catch((error: Error) => console.log("Mongo Error", error));


app.listen(port, () => {
    console.log(`Listening to PORT ${port}`);
})