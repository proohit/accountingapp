export class AccHeaderBuilder {
  private header: Headers;
  constructor(token?: string) {
    this.header = new Headers();
    token && this.buildAuthorization(token);
    this.buildContentType();
  }

  private buildAuthorization = (token: string): Headers => {
    this.header.append('Authorization', token);
    return this.header;
  };

  private buildContentType = (): Headers => {
    this.header.append('Content-Type', 'application/json');
    return this.header;
  };

  public getHeader = (): Headers => {
    return this.header;
  };
}
