import request from "request";
import error from "../types/error.js";

function remote(host, port){
    let url = `http://${host}:${port}`;
    function list(table){
        return req(`${url}/${table}`, 'GET', null);
    }

    function get(table, id){
        return req(`${url}/${table}/${id}`, 'GET', null);
    }

    function insert(table, data) {
        return req(`${url}/${table}`, 'POST', data);
    }

    function query (table, cond) {
        return req(`${url}/query/${table}`, 'POST', cond);
    }

    function req(url, method, data){
        if(data) data = JSON.stringify(data);
        return new Promise((resolve, reject) => {
            request(url, {
                method: method,
                headers: {
                    'content-type': 'application/json',
                },
                body: data,
            }, (err, response, body) => {
                if(err || !body)reject(err);
                let result;
                try {
                    result = JSON.parse(body);
                } catch (err) {
                    console.log(body);
                    reject(error(err.message, 500));
                }
                if(result.error) { 
                    reject(error(result.error, 500));
                }
                resolve(result.data);
            })
        });
    }


    return {
        list,
        get,
        insert,
        query,
    }
}

export default remote;