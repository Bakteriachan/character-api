import express from "express";
import bodyParser from "body-parser";

import config from "../config/index.js"
import user from "./components/user/network.js";
import cors from "cors";
import auth from "./components/auth/network.js";
import errors from "../middlewares/errors.js";


//Express main Object
const app = express();

//JSON Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/api/user', user);
app.use('/auth', auth);

app.use(errors);


const PORT = config.api.PORT;
app.listen(PORT, () => {
    console.log("API listening on port " + PORT);
})