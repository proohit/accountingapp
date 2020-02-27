const { con } = require('./database')
const Record = require('./Record')

const all = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM Record;', (err, data) => {
            if (err) reject(err);
            const result = data.map(record => new Record(record.id, record.value, record.description, record.walletName, record.owner));
            resolve({ success: true, message: result });
        });

    })
}

const allByUser = (username) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM Record WHERE owner='${username}';`, (err, data) => {
            if (err) reject(err);
            resolve({
                success: true, message: data.map(record => {
                    const record1 = new Record()
                    record1.setDescription(record.description)
                    record1.setId(record.id)
                    record1.setValue(record.value)
                    record1.setOwner(record.owner)
                    record1.setWallet(record.walletName)
                    record1.setTimestamp(record.timestamp)
                    return record1;
                })
            });
        });
    })
}

const byWallet = async (username, wallet) => {
    try {
        let result = await con.query(`SELECT * FROM Record WHERE owner='${username}' AND walletName='${wallet}'`)
        const records = result[0].map(record => {
            const record1 = new Record();
            record1.setDescription(record.description)
            record1.setId(record.id)
            record1.setValue(record.value)
            record1.setOwner(record.owner)
            record1.setWallet(record.walletName)
            record1.setTimestamp(record.timestamp)
            return record1;
        })
        return { success: true, message: records }
    } catch (err) {
        return { success: false, message: err.message }
    }
}

const byId = (id) => {
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
                createdRecord.setTimestamp(res[0].timestamp)
                resolve({ success: true, message: createdRecord })
            }
        })
    })
}

/**
 * creates a record. Parameters are necessary: description (description for the record), value (the value for the record, negative will reduce wallet balance), wallet (in which this record is cretided), owner (the user that this record belong to)
 * @param {string} description
 * @param {number} value
 * @param {string} wallet
 * @param {object} timestamp
 * @param {string} owner
 */
const createRecord = async (description, value, wallet, timestamp, owner) => {
    try {
        const result = await con.query(`INSERT INTO Record(description, value, walletName,timestamp, owner) VALUES ('${description}',${value},'${wallet}','${timestamp}','${owner}')`)
        const insertedRecord = await byId(result[0].insertId);
        return { success: true, message: insertedRecord.message }
    } catch (error) {
        return { success: false, message: 'Error in SQL!', error: error }
    }
}

/**
 * expects an id as parameter. This id will be deleted from the database
 */
const deleteRecord = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) reject({ success: false, message: `no id provided to delete` });
        con.query(`DELETE FROM Record WHERE id=${id}`, (err, res) => {
            if (err) reject({ err, success: false, message: `Something went wrong deleting record with id ${id}` });
            else resolve({ success: true, message: `Record with id ${id} deleted` });
        })
    })
}

/**
 * 
 */
const update = async (id, description, value, wallet, timestamp, owner) => {
    try {
        let sql = `UPDATE Record SET id=${id}`;
        if (description) sql += `, description='${description}'`;
        if (value) sql += `, value=${value}`;
        if (wallet) sql += `, walletName='${wallet}'`;
        if (owner) sql += `, owner='${owner}'`;
        if (timestamp) sql += `, timestamp='${timestamp}'`;

        sql += ` WHERE id = ${id}`
        const res = await con.query(sql);
        const updatedRecord = await byId(id);
        return { success: true, message: updatedRecord.message }
    } catch (error) {

    }
}

module.exports = {
    all, allByUser, createRecord, deleteRecord, byId, update, byWallet
}