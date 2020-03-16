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

const allByUser = async (username) => {
    try {
        const recordsOfUser = await con.query(`SELECT * FROM Record WHERE owner='${username}';`);
        return {
            success: true, message: recordsOfUser[0].map(record => {
                const record1 = new Record()
                record1.setDescription(record.description)
                record1.setId(record.id)
                record1.setValue(record.value)
                record1.setOwner(record.owner)
                record1.setWallet(record.walletName)
                record1.setTimestamp(record.timestamp)
                return record1;
            })
        }
    } catch (error) {
        throw error;
    }
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

const byId = async (id) => {
    try {
        if (!id) {
            throw new Error('no id provided!')
        }
        const createdRecord = await con.query(`SELECT * FROM Record WHERE id=${id}`)
        return { success: true, message: createRecord[0] }
    } catch (error) {
        throw error;
    }
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
const deleteRecord = async (id) => {
    try {
        if (!id) {
            throw new Error('no id provided!')
        }
        const response = con.query(`DELETE FROM Record WHERE id=${id}`);
        return { success: true, message: `Deleted record with id ${id}` }
    } catch (error) {
        throw error
    }
}

/**
 * 
 */
const update = async (id, description, value, wallet, timestamp, owner) => {
    try {
        let sql = `UPDATE Record SET id=${id}`;
        if (description) sql += `, description='${description}'`;
        if (value) sql += `, value=${value}`;
        if (wallet === null) sql += `, walletName=${wallet}`;
        else if (wallet) sql += `, walletName='${wallet}'`;
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