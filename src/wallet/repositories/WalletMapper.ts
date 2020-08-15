import { con } from '../../shared/repositories/database';
import Wallet from '../models/Wallet';

export const byName = async (name: string, owner: string): Promise<Wallet> => {
    try {
        const wallet = await con.query<Wallet[]>(`SELECT * FROM Wallet WHERE name = '${name}' AND owner='${owner}'`);
        return wallet[0][0];
    } catch (error) {
        throw new Error('Error retrieving wallet');
    }
};
export const byUser = async (owner: string): Promise<Wallet[]> => {
    try {
        const wallets = await con.query<Wallet[]>(`SELECT * FROM Wallet WHERE owner='${owner}'`);
        return wallets[0];
    } catch (error) {
        throw error;
    }
};
export const create = async (name: string, balance: number, owner: string): Promise<Wallet> => {
    try {
        await con.query<Wallet[]>(`INSERT INTO Wallet(name, balance, owner) VALUES('${name}',${balance},'${owner}') `);
        const createdWallet = await byName(name, owner);
        return createdWallet;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes the provided wallet
 * @param {string} name name of wallet
 * @param {string} owner owner as username
 */
export const deleteWallet = async (name: string, owner: string) => {
    try {
        con.query(`DELETE FROM Wallet WHERE name='${name}' AND owner='${owner}'`);
        return 'deleted wallet';
    } catch (error) {
        throw error;
    }
};

export const update = async (
    oldWalletName: string,
    newWalletName: string,
    newBalance: number,
    owner: string,
): Promise<Wallet> => {
    try {
        const oldWallet = await byName(oldWalletName, owner);
        const balance = newBalance || oldWallet.balance;
        await con.query(
            `UPDATE Wallet SET name='${newWalletName}', balance=${balance} WHERE name='${oldWalletName}' AND owner='${owner}'`,
        );
        const updatedWallet = await byName(newWalletName, owner);
        return updatedWallet;
    } catch (error) {
        throw error;
    }
};

export const createTable = async () => {
    try {
        const sql = `CREATE TABLE \`Wallet\` (
            \`name\` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
            \`owner\` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
            \`balance\` double NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
        const res = await con.query(sql);
    } catch (error) {}
};

export const createIndices = async () => {
    try {
        const sql = `ALTER TABLE \`Wallet\`
        ADD PRIMARY KEY (\`name\`,\`owner\`),
        ADD KEY \`FK_Wallet_User\` (\`owner\`);`;
        const res = await con.query(sql);
    } catch (error) {}
};

export const createConstraints = async () => {
    try {
        const sql = `ALTER TABLE \`Wallet\`
      ADD CONSTRAINT \`FK_Wallet_User\` FOREIGN KEY (\`owner\`) REFERENCES \`User\` (\`username\`);`;
        const res = await con.query(sql);
    } catch (error) {}
};
