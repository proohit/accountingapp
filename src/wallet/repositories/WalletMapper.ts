import { MessageResult } from '../../shared/models/RouteResult';
import { pool } from '../../shared/repositories/database';
import { WalletNotFound } from '../models/Errors';
import Wallet from '../models/Wallet';

export const byName = async (name: string, owner: string): Promise<Wallet> => {
    const [wallets] = await pool.query<Wallet[]>(`SELECT * FROM Wallet WHERE name = '${name}' AND owner='${owner}'`);
    if (wallets.length <= 0) throw new WalletNotFound();
    return wallets[0];
};

export const byUser = async (owner: string): Promise<Wallet[]> => {
    const [wallets] = await pool.query<Wallet[]>(`SELECT * FROM Wallet WHERE owner='${owner}'`);
    return wallets;
};

export const create = async (name: string, balance: number, owner: string): Promise<Wallet> => {
    await pool.query<Wallet[]>(`INSERT INTO Wallet(name, balance, owner) VALUES('${name}',${balance},'${owner}') `);
    const createdWallet = await byName(name, owner);
    return createdWallet;
};

/**
 * Deletes the provided wallet
 * @param {string} name name of wallet
 * @param {string} owner owner as username
 */
export const deleteWallet = async (name: string, owner: string): Promise<MessageResult> => {
    await pool.query(`DELETE FROM Wallet WHERE name='${name}' AND owner='${owner}'`);
    return { message: `Deleted wallet with name '${name}'` };
};

export const update = async (
    oldWalletName: string,
    newWalletName: string,
    newBalance: number,
    owner: string,
): Promise<Wallet> => {
    const oldWallet = await byName(oldWalletName, owner);
    const balance = newBalance || oldWallet.balance;
    const name = newWalletName || oldWallet.name;

    await pool.query(
        `UPDATE Wallet SET name='${name}', balance=${balance} WHERE name='${oldWalletName}' AND owner='${owner}'`,
    );
    const updatedWallet = await byName(name, owner);
    return updatedWallet;
};

export const createTable = async (): Promise<void> => {
    const sql = `CREATE TABLE \`Wallet\` (
            \`name\` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
            \`owner\` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
            \`balance\` double NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
    await pool.query(sql);
};

export const resetTable = async (): Promise<void> => {
    const sql = `DROP TABLE IF EXISTS \`Wallet\``;
    await pool.query(sql);
};

export const createIndices = async (): Promise<void> => {
    const sql = `ALTER TABLE \`Wallet\`
        ADD PRIMARY KEY (\`name\`,\`owner\`),
        ADD KEY \`FK_Wallet_User\` (\`owner\`);`;
    await pool.query(sql);
};

export const createConstraints = async (): Promise<void> => {
    const sql = `ALTER TABLE \`Wallet\`
      ADD CONSTRAINT \`FK_Wallet_User\` FOREIGN KEY (\`owner\`) REFERENCES \`User\` (\`username\`);`;
    await pool.query(sql);
};
