const {con} = require('./database')

byName = (username) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM User WHERE username=${username};`, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}

module.exports = {
    byName
}