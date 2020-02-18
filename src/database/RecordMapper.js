const { con } = require('./database')
const Record = require('./Record')

all = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM Record;', (err, data) => {
            if (err) reject(err);
            const result = data.map(record => new Record(record.id, record.value, record.description, record.walletName, record.owner));
            resolve(result);
        });

    })
}

allByUser = (username) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM Record WHERE owner='${username}';`, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}

createRecord = (description, value, wallet, owner) => {
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO Record(description, value, walletName, owner) VALUES ('${description}',${value},'${wallet}','${owner}')`, (err, res) => {
            if (err) reject(err);
            con.query(`SELECT * FROM Record WHERE id=${res.insertId}`, (err, result) => {
                if (err) reject(err);
                console.log(result);
                let createdRecord = new Record()
                createdRecord.setId(result[0].id);
                createdRecord.setDescription(result[0].description);
                createdRecord.setValue(result[0].value);
                createdRecord.setWallet(result[0].walletName);
                createdRecord.setOwner(result[0].owner);

                console.log(createdRecord);
                resolve(createdRecord)
            })
        })
    })
}

module.exports = {
    all, allByUser, createRecord
}