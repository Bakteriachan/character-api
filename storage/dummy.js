let db = {}

function list(tableName){
    if(!db[tableName])
        db[tableName] = []
    return db[tableName]
}

function get(tableName, id){
    let data = list(tableName);
    const result = data.filter(value => value.id === id);
    return result[0] || {};
}

function insert(tableName, data){
    if(!db[tableName])
        db[tableName] = []
    db[tableName].push(data);
    return true;
}

function query(tableName, cond){
    let data = list(tableName);
    let keys = Object.keys(cond);
    return data.filter(value => {
        let result = true;
        keys.forEach(key => {
            if(cond[key] !== value[key]){
                result = false;
            }
        });
        return result;
    })[0] || null;
}

export default {
    list,
    get,
    insert,
    query,
};