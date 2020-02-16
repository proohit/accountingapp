const mysql = require('mysql')
const config = require('../../config.json')

const con = mysql.createConnection({ host: config.host, port: 3306, user: config.user, password: config.password, database: config.database });

close = () => {
    con.end();
}

module.exports = {
    con,close
}