import mysql from "mysql";
import config from "../config/index.js";

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port,
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);
    
    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });
    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table){
    return new Promise((res, rej) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if(err) rej(err);
            res(data);
        })
    });
}

function get(table, id) {
    return new Promise((res, rej) => {
        connection.query(`SELECT * FROM ${table} WHERE id = "${id}"`, (err, data) => {
            if(err) rej(err);
            res(data);
        })
    })
}

function insert(table, values){
    return new Promise((res, rej) => {
        connection.query(`INSERT INTO ${table} SET ?`, values, (err, data) => {
            if(err) rej(err);
            res(null);
        })
    })
}

function query(table, cond, one){
    if(one !== false)
        one = true;
    return new Promise((res, rej) => {
        if(Object.keys(cond).length == 0)
            rej(null);  
        let query = `SELECT * FROM ${table} WHERE ?`;
        if(cond.expr){
            query = `SELECT * FROM ${table} WHERE ${cond.column} ${cond.expr} ?`;
            cond = cond.value;
        }
        connection.query(query, cond, (err, data, fields) => {
            if(err) rej(err);
            if(typeof(data) == 'undefined'){
                rej(null);
            }
            else{
                let response = [];
                data.forEach(el => {
                    let curr = {};
                    Object.keys(el).forEach(element => {
                        curr[element] = el[element];
                    });
                    response.push(curr);
                });
                if(one)
                    response = response[0]
                res(response);
            }
        })
    })
}

export default {
    list,
    get,
    insert,
    query
}