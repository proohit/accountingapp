export class ResetToken {
  id: string;
  validUntil: string;

  constructor(id: string, validUntil: string) {
    this.id = id;
    this.validUntil = validUntil;
  }

  static fromBase64(token: string) {
    const raw = Buffer.from(token, 'base64').toString('utf8');
    const tokenObject = JSON.parse(raw);
    return new ResetToken(tokenObject.id, tokenObject.validUntil);
  }

  toBase64() {
    const token = {
      id: this.id,
      validUntil: this.validUntil,
    };
    return Buffer.from(JSON.stringify(token)).toString('base64');
  }
}
