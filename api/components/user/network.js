import Router from "express";
import response from "../../../network/response.js";
import Controller from "./index.js";

const router = Router();

router.get('/',(req,res, next)=>{
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next)
})

router.get('/:id', (req, res, next)=>{
    Controller.get(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Controller.insert(req.body)
        .then(data => {
            response.success(req, res, data, 201)
        })
        .catch(next)
})

export default router;