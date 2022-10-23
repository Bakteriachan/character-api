function error(message, code){
    if(!message)
        message = "Internal error";
    let err = new Error(message);
    if(!code)
        code = 500;
    err.statusCode = code;

    return err;
}

export default error;