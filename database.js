const mysql = require('mysql')
const config = require('./config.json')

const con = mysql.createConnection({ host: config.host, port: 3306, user: config.user, password: config.password, database: config.database });

all = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM Record;', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}

allByUser = (userId) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM Record WHERE user=${userId};`, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}


module.exports = {
    all
}