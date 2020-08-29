import { Category } from '../models/Category';
import { CategoryRepository } from '../models/CategoryRepository';
import { MessageResult } from '../../shared/models/RouteResult';
import { pool } from '../../shared/repositories/database';
import { CategoryNotFound } from '../models/Errors';

class CategoryMapper implements CategoryRepository {
    async getByUser(username: string): Promise<Category[]> {
        const [foundCategories] = await pool.query<Category[]>(`SELECT * FROM Category WHERE owner='${username}';`);

        return foundCategories;
    }
    async create(username: string, name: string): Promise<Category> {
        await pool.query(`INSERT INTO Category(name, owner) VALUES('${name}','${username}');`);
        const createdCategory = await this.getByName(username, name);
        return createdCategory;
    }
    async getByName(username: string, name: string): Promise<Category> {
        const [foundCategory] = await pool.query<Category[]>(
            `SELECT * FROM Category WHERE name='${name}' AND owner='${username}';`,
        );
        if (foundCategory.length <= 0) throw new CategoryNotFound();
        return foundCategory[0];
    }
    async delete(username: string, name: string): Promise<MessageResult> {
        await pool.query(`DELETE FROM Category WHERE name='${name}' AND owner='${username}';`);
        return { message: `Deleted category '${name}'` };
    }
    async update(username: string, oldName: string, newName: string): Promise<Category> {
        const oldCategory = await this.getByName(oldName, username);
        const name = newName || oldCategory.name;

        await pool.query(`UPDATE Category SET name='${name}' WHERE name='${oldName}' AND owner='${username}'`);
        const updatedCategory = await this.getByName(username, name);
        return updatedCategory;
    }
    async createTable(): Promise<void> {
        const sql = `CREATE TABLE \`Category\` (
            \`name\` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
            \`owner\` varchar(25) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
        await pool.query(sql);
    }
    async resetTable(): Promise<void> {
        const sql = `DROP TABLE IF EXISTS  \`Category\``;
        await pool.query(sql);
    }
    async createIndices(): Promise<void> {
        const sql = `ALTER TABLE \`Category\`
      ADD PRIMARY KEY (\`name\`),
      ADD KEY \`FK_Category_User\` (\`owner\`);`;
        await pool.query(sql);
    }
    async createConstraints(): Promise<void> {
        const sql = `ALTER TABLE \`Category\`
    ADD CONSTRAINT \`FK_Category_User\` FOREIGN KEY (\`owner\`) REFERENCES \`User\` (\`username\`);`;
        await pool.query(sql);
    }
}
const CATEGORY_MAPPER = new CategoryMapper();

export default CATEGORY_MAPPER;
