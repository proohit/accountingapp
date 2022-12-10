import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserConfirmation1670677489956 implements MigrationInterface {
  name = 'UserConfirmation1670677489956';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`confirmed\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`confirmed\``);
  }
}
