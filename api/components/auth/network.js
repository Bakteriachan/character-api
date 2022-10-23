import Router from "express";

import controller from "./index.js";
import response from "../../../network/response.js";
const router = Router();

router.post('/login', (req, res, next) => {
    controller.login(req.body.username, req.body.password)
        .then((result) => {
            response.success(req, res, result, 200);
        })
        .catch(next)
});


export default router;