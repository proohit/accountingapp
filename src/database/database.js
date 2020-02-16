const mysql = require('mysql')
const config = require('../../config.json')
const Record = require('./Record')

const con = mysql.createConnection({ host: config.host, port: 3306, user: config.user, password: config.password, database: config.database });

all = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM Record;', (err, data) => {
            if (err) reject(err);
            const result = data.map(record => new Record(record.id, record.value,record.description,record.walletName));  
            resolve(result);
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

close = () => {
    con.end();
}
module.exports = {
    all,close
}