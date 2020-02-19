const { con } = require('./database')
const Wallet = require('./Wallet')

byName = (walletName) => {
    return new Promise((reject, resolve) => {

        con.query(`SELECT * FROM Wallet WHERE walletName = '${walletName}'`, (err, res) => {
            if (err) reject({ success: false, err, message: `Something went wrong retrieving wallet with name ${walletName}` })
            else resolve({ success: true, message: res })
        })
    })
}

create = (walletName, balance, owner) => {
    return new Promise((resolve, reject) => {

        con.query(`INSERT INTO Wallet(walletName, balance, owner) VALUES('${walletName}',${balance},'${owner}') `, (err, res) => {
            if (err) reject({ success: false, err, message: `Something went wrong creating the wallet` })
            else byName(walletName).then(res => resolve(res)).catch(err => reject(err))
        })
    })
}

module.exports = {
    byName, create
}