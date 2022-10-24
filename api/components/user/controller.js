import { nanoid } from "nanoid";

import dummy from "../../../storage/dummy.js"
import error from "../../../types/error.js";
import auth from "../auth/index.js";

const TABLA = 'user';

function ctrl(storage){
    if(!storage)
        storage = dummy;
    
    function list (){
        return storage.list(TABLA);
    }

    function get(id){
        return storage.get(TABLA,id)
    }

    async function insert(data){
        const user_data = {};
        if(!data.id){
            user_data.id = nanoid();
        }else{
            user_data.id = id;
        }
        if(data.username === undefined){
            throw new Error('No username specified for this user');
        } else {
            user_data.username = data.username;
        }

        if(await storage.query(TABLA,{username: user_data.username})){
            return new Promise((resolve, reject) => {
                reject(error('Username already exists', 400));
            });
        }
        
            

        if(data.name === undefined){
            throw new error('No name specified for this user', 400);
        } else {
            user_data.name = data.name;
        }

        if(!data.badge)
            user_data.badge = 'none';
        else
            user_data.badge = data.badge;
        
        if(data.points)
            user_data.points = data.points;
        else
            user_data.points = 0;

        auth.insert({
            id: user_data.id,
            username: user_data.username,
            password: data.password
        })


        return storage.insert(TABLA, user_data);
    }

    return {
        list,
        get,
        insert
    }
}

export default ctrl;
