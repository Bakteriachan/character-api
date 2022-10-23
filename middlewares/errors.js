import response from "../network/response.js";

function errors(err, req, res, next) {
    let status = err.statusCode || 500;
    let message = err.message || 'Internal error';
    if(status >= 500)
        console.error(err);
    response.error(req, res, message, status);
}

export default errors;