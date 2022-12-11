import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserResetToken1670765211764 implements MigrationInterface {
  name = 'UserResetToken1670765211764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`resetToken\` longtext NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetToken\``);
  }
}
