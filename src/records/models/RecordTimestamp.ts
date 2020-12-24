export class RecordTimestamp {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;

  constructor(timestamp: string | Date, type: 'input' | 'timestamp' | 'date') {
    if (type === 'input') {
      this.fromInputValue(timestamp as string);
    }
    if (type === 'timestamp') {
      this.fromTimestamp(timestamp as string);
    }
    if (type === 'date') {
      this.fromDate(timestamp as Date);
    }
  }

  private toDoubleDigit(number: number): string {
    return ('0' + number).slice(-2);
  }

  public toString(): string {
    return `${this.year}-${this.toDoubleDigit(this.month)}-${this.toDoubleDigit(
      this.day
    )} ${this.toDoubleDigit(this.hour)}:${this.toDoubleDigit(
      this.minute
    )}:${this.toDoubleDigit(this.seconds)}`;
  }

  public toInputString(): string {
    return `${this.year}-${this.toDoubleDigit(this.month)}-${this.toDoubleDigit(
      this.day
    )}T${this.toDoubleDigit(this.hour)}:${this.toDoubleDigit(this.minute)}`;
  }

  private fromInputValue(value: string) {
    const date = value.split('T')[0];
    const time = value.split('T')[1];

    this.year = parseInt(date.split('-')[0], 10);
    this.month = parseInt(date.split('-')[1], 10);
    this.day = parseInt(date.split('-')[2], 10);

    this.hour = parseInt(time.split(':')[0], 10);
    this.minute = parseInt(time.split(':')[1], 10);
    this.seconds = 0;
  }

  private fromTimestamp(timestamp: string) {
    const date = timestamp.split(' ')[0];
    const time = timestamp.split(' ')[1];

    this.year = parseInt(date.split('-')[0], 10);
    this.month = parseInt(date.split('-')[1], 10);
    this.day = parseInt(date.split('-')[2], 10);

    this.hour = parseInt(time.split(':')[0], 10);
    this.minute = parseInt(time.split(':')[1], 10);
    this.seconds = parseInt(time.split(':')[2], 10);
  }

  private fromDate(date: Date) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.seconds = date.getSeconds();
  }
}
