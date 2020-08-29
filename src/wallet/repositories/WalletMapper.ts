import { pool } from '../../shared/repositories/database';
import { WalletNotFound } from '../models/Errors';
import Wallet from '../models/Wallet';
import { WalletRepository } from '../models/WalletRepository';

class WalletMapper implements WalletRepository {
    async update(oldWalletName: string, newWalletName: string, newBalance: number, owner: string) {
        const oldWallet = await this.byName(oldWalletName, owner);
        const balance = newBalance || oldWallet.balance;
        const name = newWalletName || oldWallet.name;

        await pool.query(
            `UPDATE Wallet SET name='${name}', balance=${balance} WHERE name='${oldWalletName}' AND owner='${owner}'`,
        );
        const updatedWallet = await this.byName(name, owner);
        return updatedWallet;
    }
    async deleteWallet(name: string, owner: string) {
        await pool.query(`DELETE FROM Wallet WHERE name='${name}' AND owner='${owner}'`);
        return { message: `Deleted wallet with name '${name}'` };
    }
    async create(name: string, balance: number, owner: string) {
        await pool.query<Wallet[]>(`INSERT INTO Wallet(name, balance, owner) VALUES('${name}',${balance},'${owner}') `);
        const createdWallet = await this.byName(name, owner);
        return createdWallet;
    }
    async byUser(owner: string) {
        const [wallets] = await pool.query<Wallet[]>(`SELECT * FROM Wallet WHERE owner='${owner}'`);
        return wallets;
    }
    async byName(name: string, owner: string) {
        const [wallets] = await pool.query<Wallet[]>(
            `SELECT * FROM Wallet WHERE name = '${name}' AND owner='${owner}'`,
        );
        if (wallets.length <= 0) throw new WalletNotFound();
        return wallets[0];
    }
    async createConstraints() {
        const sql = `ALTER TABLE \`Wallet\`
    ADD CONSTRAINT \`FK_Wallet_User\` FOREIGN KEY (\`owner\`) REFERENCES \`User\` (\`username\`);`;
        await pool.query(sql);
    }
    async createIndices() {
        const sql = `ALTER TABLE \`Wallet\`
    ADD PRIMARY KEY (\`name\`,\`owner\`),
    ADD KEY \`FK_Wallet_User\` (\`owner\`);`;
        await pool.query(sql);
    }
    async createTable() {
        const sql = `CREATE TABLE \`Wallet\` (
        \`name\` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`owner\` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`balance\` double NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
        await pool.query(sql);
    }
    async resetTable() {
        const sql = `DROP TABLE IF EXISTS \`Wallet\``;
        await pool.query(sql);
    }
}

const WALLET_MAPPER: WalletRepository = new WalletMapper();

export default WALLET_MAPPER;
