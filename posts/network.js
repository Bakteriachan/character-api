import express from "express";

import controller from "./controller.js";
import remote from "../storage/remote.js";
import config from "../config/index.js";
import response from "../network/response.js";

const Controller = controller(remote('localhost', config.mysql_service.PORT));
const router = express.Router();

router.get('/', (req, res, next) => {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next)
});

router.get('/:id', (req, res, next) => {
    Controller.get(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next)
});

router.get('/query/:timestamp', (req, res, next) => {
    try{
        req.params.timestamp = Number(req.params.timestamp);
    } catch (TypeError) {
        response.error(req, res, 'Not a number', 400);
        return;
    }
    Controller.list()
        .then(data => {
            response.success(req, res, data.filter(value => value.timestamp >= req.params.timestamp), 200);
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Controller.insert(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next)
})

export default router;