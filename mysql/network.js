import express from "express";

import mysql from "../storage/mysql.js";
import responses from "../network/response.js";

const router = express.Router();

router.get('/:table', (req, res, next) => {
    mysql.list(req.params.table)
        .then(data => {
            responses.success(req, res, data, 200);          
        })
        .catch(next)
});

router.get('/:table/:id',(req, res, next) => {
    mysql.get(req.params.table, req.params.id)
        .then(data => {
            responses.success(req, res, data, 200);
        })
        .catch(next)
});

router.post('/query/:table', (req, res, next) => {
    mysql.query(req.params.table, req.body)
        .then(data => {
            responses.success(req, res, data, 200);
        })
        .catch(next)
})

router.post('/:table', (req, res, next) => {
    mysql.insert(req.params.table, req.body)
        .then(data => {
            responses.success(req, res, data, 201);
        })
        .catch(next)
})


export default router;