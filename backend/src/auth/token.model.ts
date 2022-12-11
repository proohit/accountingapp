import dayjs from 'dayjs';

export class Token {
  id: string;
  validUntil: string;

  constructor(id: string, validUntil: string) {
    this.id = id;
    this.validUntil = validUntil;
  }

  static fromBase64(token: string) {
    const raw = Buffer.from(token, 'base64').toString('utf8');
    const tokenObject = JSON.parse(raw);
    return new Token(tokenObject.id, tokenObject.validUntil);
  }

  toBase64() {
    const token = {
      id: this.id,
      validUntil: this.validUntil,
    };
    return Buffer.from(JSON.stringify(token)).toString('base64');
  }

  isValid() {
    if (!this.id || !this.validUntil) return false;
    return (
      dayjs(this.validUntil).isValid() && dayjs().isBefore(this.validUntil)
    );
  }
}
