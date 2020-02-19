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

byId = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) reject({ success: false, message: `no id provided` })
        con.query(`SELECT * FROM Record WHERE id=${id}`, (err, res) => {
            if (err) reject(err)
            if (res.length <= 0) reject({ success: false, message: `no record found for id ${id}` })
            else {
                let createdRecord = new Record();
                createdRecord.setId(res[0].id);
                createdRecord.setDescription(res[0].description);
                createdRecord.setValue(res[0].value);
                createdRecord.setWallet(res[0].walletName);
                createdRecord.setOwner(res[0].owner);
                resolve({ success: true, message: createdRecord })
            }
        })
    })
}

/**
 * creates a record. Parameters are necessary: description (description for the record), value (the value for the record, negative will reduce wallet balance), wallet (in which this record is cretided), owner (the user that this record belong to)
 */
createRecord = (description, value, wallet, owner) => {
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO Record(description, value, walletName, owner) VALUES ('${description}',${value},'${wallet}','${owner}')`, (err, res) => {
            if (err) reject(err);
            else {
                byId(res.insertId).then(createdRecord => {
                    console.log(createdRecord.message.owner);
                    resolve({ success: true, message: createdRecord.message })
                }).catch(err => {
                    console.log(err);
                    reject(err)
                });
            }
        })
    })
}

/**
 * expects an id as parameter. This id will be deleted from the database
 */
deleteRecord = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) reject({ success: false, message: `no id provided to delete` });
        con.query(`DELETE FROM Record WHERE id=${id}`, (err, res) => {
            if (err) reject({ err, success: false, message: `Something went wrong deleting record with id ${id}` });
            else resolve({ success: true, message: `Record with id ${id} deleted` });
        })
    })
}

module.exports = {
    all, allByUser, createRecord, deleteRecord, byId
}