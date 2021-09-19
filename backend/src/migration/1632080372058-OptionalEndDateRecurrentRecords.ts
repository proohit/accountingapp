import { MigrationInterface, QueryRunner } from 'typeorm';

export class OptionalEndDateRecurrentRecords1632080372058 implements MigrationInterface {
    name = 'OptionalEndDateRecurrentRecords1632080372058';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `recurrent_record` CHANGE `endDate` `endDate` datetime NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `recurrent_record` CHANGE `endDate` `endDate` datetime NOT NULL');
    }
}
