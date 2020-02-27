/**
 * @param {string=} token Token for the Authorization header
 * @param {string=} method method of the request
 * @param {Object=} body body to post to url
 */
const params = (token, method, body) => {
    const reqParams = {
        headers: { "Authorization": token, "Content-Type": 'application/json', },
        method: method,
    }
    switch (method) {
        case 'GET':
        case 'DELETE': break;
        case 'POST':
        case 'PUT': reqParams.body = JSON.stringify(body)
        default: break;
    }

    return reqParams
}

export { params }