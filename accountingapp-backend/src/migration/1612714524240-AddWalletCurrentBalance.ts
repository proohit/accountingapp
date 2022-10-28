import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWalletCurrentBalance1612714524240
  implements MigrationInterface
{
  name = 'AddWalletCurrentBalance1612714524240';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `wallet` ADD `currentBalance` float NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `wallet` DROP COLUMN `currentBalance`',
    );
  }
}
