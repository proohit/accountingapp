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
    if (!method === 'GET') reqParams.body = JSON.stringify(body)

    return reqParams
}

export { params }