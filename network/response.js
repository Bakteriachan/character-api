function success(req, res, data, code){
    if (!code) code = 200;
    let resData = {
        error: false,
        code: code,
    }
    if(data) resData.data = data;
    res.status(code).send(resData);
}

function error(req, res, data, code){
    if(!code) code = 500;
    let resData = {
        error: true,
        code: code,
    }
    if(data) resData.data = data;
    res.status(code).send(resData);
}

export default {
    success,
    error
};