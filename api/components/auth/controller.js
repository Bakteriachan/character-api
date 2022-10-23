import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dummy from "../../../storage/dummy.js";
import config from "../../../config/index.js";
import error from "../../../types/error.js"

const tabla = 'auth';

function ctrl(storage){
    if (!storage)
        storage = dummy;

    async function login(username, password){
        let data = await storage.query(tabla, {username: username});
        return new Promise((res, rej) => {
            if (!data) rej(null);
            let match = bcrypt.compareSync(password, data.password);
            if(match)
                res(jwt.sign(data, config.secure.TOKEN));
            else
                rej(error('Wrong password', 400));
        });
    }

    function insert(data){
        if(data.password){
            data.password = bcrypt.hashSync(data.password, 4);
        } else {
            throw new error('No password specified', 400);
        }
        return storage.insert(tabla, data)
    }

    return {
        login,
        insert
    }
}


export default ctrl;