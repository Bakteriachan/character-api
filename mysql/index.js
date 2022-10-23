import express from "express";

import router from "./network.js";
import config from "../config/index.js";
import errors from "../middlewares/errors.js";

const app = express();

app.use(express.json());

app.use('/', router);

app.use(errors);

const PORT = config.mysql_service.PORT;

app.listen(PORT, () => {
    console.log('Mysql service listening on port ' + PORT);
});