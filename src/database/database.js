const mysql = require('mysql')
const config = require('../../config.json')
let jwt = require('jsonwebtoken')

const con = mysql.createConnection({ host: config.host, port: 3306, user: config.user, password: config.password, database: config.database });

login = (req) => {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';
    return new Promise((resolve, reject) => {
        if (username && password) {
            if (username === mockedUsername && password === mockedPassword) {
                let token = jwt.sign({ username: username },
                    config.secret,
                    {
                        expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                resolve({ success: true, message: 'Authentication successful', token: token })
            } else {
                reject({ success: false, message: 'Incorrect username or password' })
            }
        } else {
            reject({ success: false, message: 'Authentication failed! Please check the request' })
        }
    })
}

verify = (req) => {

    return new Promise((resolve, reject) => {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if(!token) {
            reject({ success: false, message: "Token not provided" })
        }
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    reject({ success: false, message: "Token is not valid!" })
                } else {
                    resolve(decoded)
                }
            });

        } else {
            reject({ success: false, message: "Token not provided" })
        }
    });

}

close = () => {
    con.end();
}

module.exports = {
    con, close, verify, login
}