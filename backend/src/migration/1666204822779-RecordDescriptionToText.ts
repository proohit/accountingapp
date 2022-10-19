import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecordDescriptionToText1666204822779 implements MigrationInterface {
    name = 'RecordDescriptionToText1666204822779';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` MODIFY \`description\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` MODIFY \`description\` varchar(255) NOT NULL DEFAULT ''`);
    }
}
