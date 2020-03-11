const { con } = require('./database')
const Wallet = require('./Wallet')

byName = async (walletName) => {
    try {
        const wallet = await con.query(`SELECT * FROM Wallet WHERE name = '${walletName}'`)
        return { success: true, message: wallet[0] }
    } catch (error) {
        return { sucess: false, error, message: "Error retrieving wallet" }
    }
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
create = async (walletName, balance, owner) => {
    try {
        const created = await con.query(`INSERT INTO Wallet(name, balance, owner) VALUES('${walletName}',${balance},'${owner}') `);
        const createdWallet = await byName(walletName);
        return { success: true, message: createdWallet.message }
    } catch (error) {
        throw { success: false, message: error.message }
    }
}

/**
 * Deletes the provided wallet
 * @param {string} walletName name of wallet
 * @param {string} owner owner as username
 */
const deleteWallet = async (walletName, owner) => {
    try {
        con.query(`DELETE FROM Wallet WHERE name='${walletName}' AND owner='${owner}'`);
        return { success: true, message: "deleted wallet" }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    byName, create, byUser, deleteWallet
}