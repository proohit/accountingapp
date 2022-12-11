import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConfirmationToken1670786898967 implements MigrationInterface {
  name = 'ConfirmationToken1670786898967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`confirmToken\` longtext NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`confirmToken\``,
    );
  }
}
