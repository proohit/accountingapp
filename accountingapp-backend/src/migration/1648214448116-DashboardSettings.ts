import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { DEFAULT_WIDGETS } from '../settings/widgets';

export class DashboardSettings1648214448116 implements MigrationInterface {
  name = 'DashboardSettings1648214448116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`dashboard_settings\` (\`id\` varchar(36) NOT NULL, \`widget\` varchar(255) NOT NULL, \`order\` int NOT NULL, \`ownerUsername\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`dashboard_settings\` ADD CONSTRAINT \`FK_44eca2a73ba5b456b2a9509e390\` FOREIGN KEY (\`ownerUsername\`) REFERENCES \`user\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    const users = await queryRunner.query(`SELECT username FROM user`);
    for (const user of users) {
      for (const [index, widget] of DEFAULT_WIDGETS.entries()) {
        await queryRunner.query(
          `INSERT INTO dashboard_settings (\`id\`, \`widget\`, \`order\`, \`ownerUsername\`) VALUES (UUID(), '${widget}', ${index}, '${user.username}')`,
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`dashboard_settings\` DROP FOREIGN KEY \`FK_44eca2a73ba5b456b2a9509e390\``,
    );
    await queryRunner.query(`DROP TABLE \`dashboard_settings\``);
  }
}
