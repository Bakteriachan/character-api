import express from "express";

import network from "./network.js";
import config from "../config/index.js";
import errors from "../middlewares/errors.js";

const app = express();

app.use(express.json());

app.use('/post', network);

app.use(errors);

const PORT = config.posts_service.PORT;

app.listen(PORT, () => {
    console.log('Posts listening on port ' + PORT);
})


