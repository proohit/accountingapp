import { randomBytes, scrypt } from 'crypto';
import crypto from 'crypto-js';
import AES from 'crypto-js/aes';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../users/entities/user.entity';

export class MigratePasswordHashes1667043163534 implements MigrationInterface {
  private readonly HASH_LENGTH = 32;

  public async up(queryRunner: QueryRunner): Promise<void> {
    const users: User[] = await queryRunner.query(`SELECT * FROM \`user\``);
    for (const user of users) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (user.password && user.private_key!) {
        const oldPassword = this.decodeOldPassword(
          user.password,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          user.private_key!,
        );
        const hash = await this.hashNewPassword(oldPassword);
        await queryRunner.query(
          `UPDATE user SET password='${hash}' WHERE \`username\`='${user.username}'`,
        );
      }
    }
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`private_key\``);
  }

  public async down(): Promise<void> {
    // we can't make this migration reversible because there is no way to retrieve the old password from the new hash
  }

  private decodeOldPassword = (
    encryptedPassword: string,
    privateKey: string,
  ) => {
    const passwordDecrypted = AES.decrypt(encryptedPassword, privateKey);
    const passwordDecryptedString =
      crypto.enc.Utf8.stringify(passwordDecrypted);
    return passwordDecryptedString;
  };

  private hashNewPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(64).toString('hex');
      scrypt(password, salt, this.HASH_LENGTH, (err, derivedKey) => {
        if (err) reject(err);
        resolve(this.getEncodedHash(derivedKey.toString('hex'), salt));
      });
    });
  }

  private getEncodedHash(hash: string, salt: string): string {
    return `${salt}:${hash}`;
  }
}
