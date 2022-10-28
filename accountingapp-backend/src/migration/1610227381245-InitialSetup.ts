import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSetup1610227381245 implements MigrationInterface {
  name = 'InitialSetup1610227381245';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (`username` varchar(255) NOT NULL, `private_key` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`username`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `category` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `ownerUsername` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `wallet` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `balance` float NOT NULL, `ownerUsername` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      "CREATE TABLE `record` (`id` varchar(36) NOT NULL, `value` float NOT NULL DEFAULT '0', `description` varchar(255) NOT NULL DEFAULT '', `timestamp` timestamp NOT NULL, `walletId` varchar(255) NOT NULL, `ownerUsername` varchar(255) NOT NULL, `categoryId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `category` ADD CONSTRAINT `FK_142b9fbfe3a56a90ae45f102230` FOREIGN KEY (`ownerUsername`) REFERENCES `user`(`username`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `wallet` ADD CONSTRAINT `FK_3aebcdeaeb1ab5df40570c3a026` FOREIGN KEY (`ownerUsername`) REFERENCES `user`(`username`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `record` ADD CONSTRAINT `FK_3d741463341d2bc1bba71f9a4ab` FOREIGN KEY (`walletId`) REFERENCES `wallet`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `record` ADD CONSTRAINT `FK_0f300ebe5dabbe0fc7f5a413c1b` FOREIGN KEY (`ownerUsername`) REFERENCES `user`(`username`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `record` ADD CONSTRAINT `FK_73168a64f6e1844723c2b180cee` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `record` DROP FOREIGN KEY `FK_73168a64f6e1844723c2b180cee`',
    );
    await queryRunner.query(
      'ALTER TABLE `record` DROP FOREIGN KEY `FK_0f300ebe5dabbe0fc7f5a413c1b`',
    );
    await queryRunner.query(
      'ALTER TABLE `record` DROP FOREIGN KEY `FK_3d741463341d2bc1bba71f9a4ab`',
    );
    await queryRunner.query(
      'ALTER TABLE `wallet` DROP FOREIGN KEY `FK_3aebcdeaeb1ab5df40570c3a026`',
    );
    await queryRunner.query(
      'ALTER TABLE `category` DROP FOREIGN KEY `FK_142b9fbfe3a56a90ae45f102230`',
    );
    await queryRunner.query('DROP TABLE `record`');
    await queryRunner.query('DROP TABLE `wallet`');
    await queryRunner.query('DROP TABLE `category`');
    await queryRunner.query('DROP TABLE `user`');
  }
}
