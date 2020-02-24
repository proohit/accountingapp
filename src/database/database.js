const mysql = require('mysql2')
const config = require('../../config.json')
let jwt = require('jsonwebtoken')
const AES = require('crypto-js/aes')
const crypto = require('crypto-js')

const con = mysql.createConnection({ host: config.host, port: 3306, user: config.user, password: config.password, database: config.database }).promise();

register = (username, password) => {
    return new Promise((resolve, reject) => {
        var private_key = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 32; i++) {
            private_key += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const hashedPassword = crypto.enc.Utf8.parse(password);
        let passwordEncrypted = AES.encrypt(hashedPassword, private_key).toString();
        con.query(`INSERT INTO User(username, password, private_key) VALUES('${username}','${passwordEncrypted}','${private_key}')`)
        con.query(`SELECT * from User WHERE username='${username}'`, (err, res) => {
            if (err) reject(err);
            else resolve(res)
        })
    })


}

login = (req) => {
    let username = req.body.username;
    let password = req.body.password;
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM User WHERE username='${username}'`, (err, res) => {
            if (err) reject(err)
            if (!username || !password || res.length <= 0 || !res) {
                reject({ success: false, message: 'Incorrect username or password' })
                return;
            }
            let passwordDecrypted = AES.decrypt(res[0].password, res[0].private_key)
            passwordDecrypted = crypto.enc.Utf8.stringify(passwordDecrypted);

            if (username === res[0].username && password === passwordDecrypted) {
                let token = jwt.sign({ username: username },
                    config.secret,
                    {
                        expiresIn: '7 days' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                resolve({ success: true, message: 'Authentication successful', token: token })
            } else {
                reject({ success: false, message: 'Incorrect username or password' })
            }
        })
    })
}

verify = (req) => {

    return new Promise((resolve, reject) => {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (!token) {
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
    con, close, verify, login, register
}