import { MigrationInterface, QueryRunner } from 'typeorm';
import { DEFAULT_WIDGETS } from '../settings/models/Settings';
import { services } from '../shared/services/services';

export class DashboardSettings1648214448116 implements MigrationInterface {
    name = 'DashboardSettings1648214448116';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`dashboard_settings\` (\`id\` varchar(36) NOT NULL, \`widget\` varchar(255) NOT NULL, \`order\` int NOT NULL, \`ownerUsername\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`dashboard_settings\` ADD CONSTRAINT \`FK_44eca2a73ba5b456b2a9509e390\` FOREIGN KEY (\`ownerUsername\`) REFERENCES \`user\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        const users = await services().userService.getAllUsers();
        for (const user of users) {
            await services().settingsService.updateWidgets(user.username, DEFAULT_WIDGETS);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`dashboard_settings\` DROP FOREIGN KEY \`FK_44eca2a73ba5b456b2a9509e390\``,
        );
        await queryRunner.query(`DROP TABLE \`dashboard_settings\``);
    }
}
