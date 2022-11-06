import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRecurrentRecord1632078609589 implements MigrationInterface {
  name = 'CreateRecurrentRecord1632078609589';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `recurrent_record` (`id` varchar(36) NOT NULL, `value` float NOT NULL DEFAULT '0', `description` varchar(255) NOT NULL DEFAULT '', `periodicity` varchar(255) NOT NULL, `startDate` datetime NOT NULL, `endDate` datetime NOT NULL, `walletId` varchar(255) NOT NULL, `ownerUsername` varchar(255) NOT NULL, `categoryId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `recurrent_record` ADD CONSTRAINT `FK_08e81bbe8f256196b9f150aabaa` FOREIGN KEY (`walletId`) REFERENCES `wallet`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `recurrent_record` ADD CONSTRAINT `FK_796041f90cdbd25cbe37994ffce` FOREIGN KEY (`ownerUsername`) REFERENCES `user`(`username`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `recurrent_record` ADD CONSTRAINT `FK_88f02d1fd5a9d3a3c7716826359` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `recurrent_record` DROP FOREIGN KEY `FK_88f02d1fd5a9d3a3c7716826359`',
    );
    await queryRunner.query(
      'ALTER TABLE `recurrent_record` DROP FOREIGN KEY `FK_796041f90cdbd25cbe37994ffce`',
    );
    await queryRunner.query(
      'ALTER TABLE `recurrent_record` DROP FOREIGN KEY `FK_08e81bbe8f256196b9f150aabaa`',
    );
    await queryRunner.query('DROP TABLE `recurrent_record`');
  }
}
