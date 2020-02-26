const { con } = require('./database')
const Wallet = require('./Wallet')

byName = (walletName) => {
    return new Promise((reject, resolve) => {

        con.query(`SELECT * FROM Wallet WHERE name = '${walletName}'`, (err, res) => {
            if (err) reject({ success: false, err, message: `Something went wrong retrieving wallet with name ${walletName}` })
            else resolve({ success: true, message: res })
        })
    })
}
byUser = async (owner) => {
    try {
        const query = await con.query(`SELECT * FROM Wallet WHERE owner='${owner}'`);
        const result = query[0].map(wallet => wallet);
        return { success: true, message: result }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
create = (walletName, balance, owner) => {
    return new Promise((resolve, reject) => {

        con.query(`INSERT INTO Wallet(name, balance, owner) VALUES('${walletName}',${balance},'${owner}') `, (err, res) => {
            if (err) reject({ success: false, err, message: `Something went wrong creating the wallet` })
            else byName(walletName).then(res => resolve(res)).catch(err => reject(err))
        })
    })
}

module.exports = {
    byName, create, byUser
}