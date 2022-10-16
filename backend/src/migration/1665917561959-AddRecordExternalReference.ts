import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecordExternalReference1665917561959 implements MigrationInterface {
    name = 'AddRecordExternalReference1665917561959';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` ADD \`externalReference\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` DROP COLUMN \`externalReference\``);
    }
}
