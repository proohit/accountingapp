const {con} = require('./database')
const Record = require('./Record')

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

module.exports = {
    all, allByUser
}