// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class AddDashboardSettings1636302462708 implements MigrationInterface {
//     name = 'AddDashboardSettings1636302462708';

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(
//             `CREATE TABLE \`dashboard_settings\` (\`id\` char(36) NOT NULL, \`enabledWidgets\` text ('THIS_MONTH', 'THIS_YEAR', 'CURRENT_STATUS', 'LATEST_RECORDS', 'MONTHLY_CATEGORY', 'QUICK_ACTIONS') NOT NULL DEFAULT THIS_MONTH,THIS_YEAR,CURRENT_STATUS,LATEST_RECORDS,MONTHLY_CATEGORY,QUICK_ACTIONS, \`ownerUsername\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_44eca2a73ba5b456b2a9509e39\` (\`ownerUsername\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//         );
//         await queryRunner.query(
//             `ALTER TABLE \`dashboard_settings\` ADD CONSTRAINT \`FK_44eca2a73ba5b456b2a9509e390\` FOREIGN KEY (\`ownerUsername\`) REFERENCES \`user\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
//         );
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(
//             `ALTER TABLE \`dashboard_settings\` DROP FOREIGN KEY \`FK_44eca2a73ba5b456b2a9509e390\``,
//         );
//         await queryRunner.query(`DROP INDEX \`REL_44eca2a73ba5b456b2a9509e39\` ON \`dashboard_settings\``);
//         await queryRunner.query(`DROP TABLE \`dashboard_settings\``);
//     }
// }
