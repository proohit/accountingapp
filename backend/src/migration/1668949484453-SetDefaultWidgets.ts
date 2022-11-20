import { DEFAULT_WIDGETS } from '@accountingapp/shared';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDefaultWidgets1668949484453 implements MigrationInterface {
  name = 'SetDefaultWidgets1668949484453';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const allUsers = await queryRunner.query(`SELECT * FROM user`);
    for (const user of allUsers) {
      const dashboardSettings = await queryRunner.query(
        `SELECT * FROM dashboard_settings WHERE ownerUsername = '${user.username}'`,
      );

      if (dashboardSettings.length === 0) {
        for (const [index, widget] of DEFAULT_WIDGETS.entries()) {
          await queryRunner.query(
            `INSERT INTO dashboard_settings (\`id\`, \`widget\`, \`order\`, \`ownerUsername\`) VALUES (UUID(), '${widget}', ${index}, '${user.username}')`,
          );
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // not possible anymore
  }
}
