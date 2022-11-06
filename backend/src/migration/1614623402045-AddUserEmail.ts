import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserEmail1614623402045 implements MigrationInterface {
  name = 'AddUserEmail1614623402045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user` ADD `email` varchar(255) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `email`');
  }
}
