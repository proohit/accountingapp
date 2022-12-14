import { hashRecord } from '@accountingapp/shared';
import dayjs from 'dayjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRecordHashes1671032588488 implements MigrationInterface {
  name = 'UpdateRecordHashes1671032588488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const records = await queryRunner.query(
      `SELECT * FROM record WHERE externalReference IS NOT NULL`,
    );
    for (const record of records) {
      const hashValue = hashRecord(
        record.description.toString(),
        dayjs(record.timestamp).toISOString(),
        record.categoryId.toString(),
        record.value,
        record.walletId.toString(),
      );

      await queryRunner.query(
        `UPDATE record SET externalReference = '${hashValue}' WHERE id = '${record.id}'`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // This migration is not reversible
  }
}
