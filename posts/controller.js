import dummy from "../storage/dummy.js";
import error from "../types/error.js";

const TABLE = 'posts';

function ctrl(store){
    if(!store)
        store = dummy;

    function list(){
        return store.list(TABLE);
    }

    function get(id){
        return store.get(TABLE, id);
    }

    /**
     * 
     * @param {int} timestamp 
     * 
     * @returns Posts created after `timestamp`
     */
    function query(timestamp) {
        return store.query(TABLE, {
            expr: ">=",
            column: "timestamp",
            value: timestamp,
        }, false);
    }

    function insert(data){
        if(!data.id)
            throw new error('Posts must have an id', 400)
        if(!data.userid)
            throw new error('Posts must belong to an user', 400);
        
        let timestamp = new Date().valueOf();
        return store.insert(TABLE, {
            id: data.id,
            userid: data.userid,
            timestamp: timestamp,
        })
    }



    return {
        list,
        insert,
        get,
        query,
    };

}   

export default ctrl;